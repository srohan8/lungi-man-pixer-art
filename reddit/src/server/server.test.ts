import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import type {AddressInfo, Server} from 'node:net'
import {after, before, beforeEach, test} from 'node:test'
import {type Context, redis, runWithContext} from '@devvit/web/server'
import {
  Endpoint,
  type ErrorRsp,
  type GetProgressRsp,
  type Progress,
  type SaveProgressRsp,
} from '../shared/api.ts'
import {cleanProgress, mergeProgress, PROGRESS_TTL_SECONDS} from './db.ts'
import {onReq} from './server.ts'

let server: Server
let serverURL: string
let userId: string | undefined = 't2_123'
const values = new Map<string, string>()
const expiries = new Map<string, number>()
const redisGet = redis.get.bind(redis)
const redisSet = redis.set.bind(redis)
const redisExpire = redis.expire.bind(redis)

before(async () => {
  redis.get = async key => values.get(key)
  redis.set = async (key, value) => {
    values.set(key, value)
    return 'OK'
  }
  redis.expire = async (key, seconds) => {
    expiries.set(key, seconds)
  }

  server = createServer(async (req, rsp) => {
    await runWithContext(
      {
        appName: 'kanjiravanam',
        postId: 't3_123',
        userId,
        username: 'username',
      } as unknown as Context,
      () => onReq(req, rsp),
    )
  })
  await new Promise<void>(resolve => {
    server.listen(0, '127.0.0.1', () => resolve())
  })
  const info = server.address() as AddressInfo
  serverURL = `http://127.0.0.1:${info.port}`
})

after(async () => {
  redis.get = redisGet
  redis.set = redisSet
  redis.expire = redisExpire
  if (!server.listening) return
  await new Promise<void>((resolve, reject) => {
    server.close(err => (err ? reject(err) : resolve()))
  })
})

beforeEach(() => {
  values.clear()
  expiries.clear()
  userId = 't2_123'
})

function save(body: unknown): Promise<Response> {
  return fetch(`${serverURL}/${Endpoint.SaveProgress}`, {
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
}

test('no saved progress yet', async () => {
  const rsp = await fetch(`${serverURL}/${Endpoint.GetProgress}`)
  assert.equal(rsp.status, 200)
  assert.deepEqual<GetProgressRsp>(await rsp.json(), {progress: null})
})

test('save, then load, and the save expires after 30 days', async () => {
  const p: Progress = {act: 3, max: 5, seen: 1, hi: 4200}
  const saved = await save(p)
  assert.equal(saved.status, 200)
  assert.deepEqual<SaveProgressRsp>(await saved.json(), {progress: p})
  assert.equal(expiries.get('progress:t2_123'), PROGRESS_TTL_SECONDS)
  const rsp = await fetch(`${serverURL}/${Endpoint.GetProgress}`)
  assert.deepEqual<GetProgressRsp>(await rsp.json(), {progress: p})
})

test('furthest level and best score only grow, act is the latest', async () => {
  await save({act: 4, max: 6, seen: 1, hi: 9000})
  const rsp = await save({act: 1, max: 2, seen: 0, hi: 100})
  assert.deepEqual<SaveProgressRsp>(await rsp.json(), {
    progress: {act: 1, max: 6, seen: 1, hi: 9000},
  })
})

test('progress is kept per user', async () => {
  await save({act: 2, max: 2, seen: 1, hi: 10})
  userId = 't2_other'
  const rsp = await fetch(`${serverURL}/${Endpoint.GetProgress}`)
  assert.deepEqual<GetProgressRsp>(await rsp.json(), {progress: null})
})

test('logged-out visitors get nothing and cannot save', async () => {
  userId = undefined
  const got = await fetch(`${serverURL}/${Endpoint.GetProgress}`)
  assert.deepEqual<GetProgressRsp>(await got.json(), {progress: null})
  const rsp = await save({act: 1, max: 1, seen: 1, hi: 1})
  assert.equal(rsp.status, 401)
  assert.equal(values.size, 0)
})

test('bad input is cleaned', () => {
  assert.deepEqual(cleanProgress(null), {act: 0, max: 0, seen: 0, hi: 0})
  assert.deepEqual(cleanProgress({act: -3, max: 'x', seen: 7, hi: 9e99}), {
    act: 0,
    max: 0,
    seen: 1,
    hi: 10_000_000,
  })
  assert.deepEqual(mergeProgress(null, {act: 1, max: 1, seen: 0, hi: 5}), {
    act: 1,
    max: 1,
    seen: 0,
    hi: 5,
  })
})

test('wrong method', async () => {
  const rsp = await fetch(`${serverURL}/${Endpoint.SaveProgress}`)
  assert.equal(rsp.status, 404)
  assert.deepEqual<ErrorRsp>(await rsp.json(), {
    error: 'not found',
    status: 404,
  })
})

test('404', async () => {
  const rsp = await fetch(serverURL)
  assert.equal(rsp.status, 404)
  assert.deepEqual<ErrorRsp>(await rsp.json(), {
    error: 'not found',
    status: 404,
  })
})

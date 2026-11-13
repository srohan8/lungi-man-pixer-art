// Runs before the game on the Reddit page.
// 1. Loads the player's saved progress from the app's server and puts it into browser storage,
//    where the game already looks for it (Reddit gives each app version its own browser storage,
//    so a new version would otherwise start everyone over).
// 2. Watches the game's save keys and sends the values to the server a moment after they change.
// 3. Then starts the game. If the server does not answer in time, the game starts with what is local.
import type {GetProgressRsp, Progress, SaveProgressReq} from '../shared/api.ts'

const KEYS = {
  act: 'lungiman-act',
  max: 'lungiman-max',
  seen: 'lungiman-prologue',
  hi: 'lungiman-hi',
} as const
const WAIT_MS = 2500
const SAVE_DELAY_MS = 700

function readLocal(): Progress {
  const num = (k: string): number => {
    try {
      return Math.max(0, Math.floor(Number(localStorage.getItem(k)) || 0))
    } catch {
      return 0
    }
  }
  return {
    act: num(KEYS.act),
    max: num(KEYS.max),
    seen: num(KEYS.seen) ? 1 : 0,
    hi: num(KEYS.hi),
  }
}

function writeLocal(p: Progress): void {
  try {
    if (p.act > 0) localStorage.setItem(KEYS.act, String(p.act))
    if (p.max > 0) localStorage.setItem(KEYS.max, String(p.max))
    if (p.seen) localStorage.setItem(KEYS.seen, '1')
    if (p.hi > 0) localStorage.setItem(KEYS.hi, String(p.hi))
  } catch {
    // Browser storage is not available: the game still runs, without saving on this device.
  }
}

async function loadServerProgress(): Promise<Progress | null> {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), WAIT_MS)
  try {
    const rsp = await fetch('api/progress', {
      headers: {Accept: 'application/json'},
      signal: ctl.signal,
    })
    if (!rsp.ok) return null
    return ((await rsp.json()) as GetProgressRsp).progress
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

function sendProgress(keepalive = false): void {
  const body: SaveProgressReq = readLocal()
  fetch('api/progress/save', {
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
    keepalive,
    method: 'POST',
  }).catch(() => {
    // Saving on the server failed this time; the next change tries again.
  })
}

function watchSaves(): void {
  const tracked: string[] = Object.values(KEYS)
  const original = Storage.prototype.setItem
  let timer: ReturnType<typeof setTimeout> | undefined
  Storage.prototype.setItem = function (key: string, value: string): void {
    original.call(this, key, value)
    if (tracked.includes(key)) {
      clearTimeout(timer)
      timer = setTimeout(sendProgress, SAVE_DELAY_MS)
    }
  }
  addEventListener('pagehide', () => {
    if (timer) {
      clearTimeout(timer)
      sendProgress(true)
    }
  })
}

function startGame(): void {
  const s = document.createElement('script')
  s.src = 'game.js'
  document.body.appendChild(s)
}

async function main(): Promise<void> {
  const local = readLocal()
  const server = await loadServerProgress()
  if (server) {
    // The server's act is the latest one; the furthest level, score and prologue flag only grow.
    writeLocal({
      act: server.act || local.act,
      max: Math.max(server.max, local.max),
      seen: server.seen || local.seen,
      hi: Math.max(server.hi, local.hi),
    })
  }
  watchSaves()
  const now = readLocal()
  const hasLocal = now.act > 0 || now.max > 0 || now.seen > 0 || now.hi > 0
  if (hasLocal && (!server || now.max > server.max || now.hi > server.hi))
    sendProgress()
  startGame()
}

void main()

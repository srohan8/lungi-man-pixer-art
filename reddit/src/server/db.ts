import {redis} from '@devvit/web/server'
import type {Progress} from '../shared/api.ts'

/** Saved progress is deleted 30 days after the last save (Reddit asks for user data to expire). */
export const PROGRESS_TTL_SECONDS = 30 * 24 * 60 * 60

const LIMITS = {act: 20, max: 20, hi: 10_000_000} as const

/** Clamp a value to a whole number from 0 to `top`; anything else becomes 0. */
export function whole(v: unknown, top: number): number {
  const n = Math.floor(Number(v))
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(n, top)
}

/** Make a safe Progress from any input. */
export function cleanProgress(v: unknown): Progress {
  const o = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>
  return {
    act: whole(o.act, LIMITS.act),
    max: whole(o.max, LIMITS.max),
    seen: whole(o.seen, 1),
    hi: whole(o.hi, LIMITS.hi),
  }
}

/**
 * New saved state from the old one and an update: act is the latest value (the game sets it back to Act I
 * after the ending), while the furthest level, the best score and the prologue flag only ever grow.
 */
export function mergeProgress(old: Progress | null, next: Progress): Progress {
  if (!old) return next
  return {
    act: next.act,
    max: Math.max(old.max, next.max),
    seen: Math.max(old.seen, next.seen),
    hi: Math.max(old.hi, next.hi),
  }
}

export async function dbGetProgress(userId: string): Promise<Progress | null> {
  const raw = await redis.get(progressKey(userId))
  if (!raw) return null
  try {
    return cleanProgress(JSON.parse(raw))
  } catch {
    return null
  }
}

export async function dbSaveProgress(
  userId: string,
  next: Progress,
): Promise<Progress> {
  const merged = mergeProgress(await dbGetProgress(userId), next)
  await redis.set(progressKey(userId), JSON.stringify(merged))
  await redis.expire(progressKey(userId), PROGRESS_TTL_SECONDS)
  return merged
}

function progressKey(userId: string): string {
  return `progress:${userId}`
}

/** Generic error detail for all responses. */
export type ErrorRsp = {error: string; status: number}

/**
 * The few values the game remembers for a player (the same ones it keeps in browser storage):
 * act = act to start from, max = furthest level reached, seen = 1 once the prologue was shown, hi = best score.
 */
export type Progress = {act: number; max: number; seen: number; hi: number}

/** The saved progress of the current Reddit user, or null when nothing is saved yet. */
export type GetProgressRsp = {progress: Progress | null}
export type SaveProgressReq = Progress
export type SaveProgressRsp = {progress: Progress}

export type Endpoint = (typeof Endpoint)[keyof typeof Endpoint]
export const Endpoint = {
  GetProgress: 'api/progress',
  SaveProgress: 'api/progress/save',
  OnAppInstall: 'internal/on/app/install',
  OnMenuNewPost: 'internal/on/menu/new-post',
} as const

export const EndpointMethod = {
  [Endpoint.GetProgress]: 'GET',
  [Endpoint.SaveProgress]: 'POST',
  [Endpoint.OnAppInstall]: 'POST',
  [Endpoint.OnMenuNewPost]: 'POST',
} as const satisfies {[endpoint: string]: 'GET' | 'POST'}

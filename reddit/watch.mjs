// Windows-safe replacement for the template's sh-based watch script.
// Copies the game in, then rebuilds the splash client and the server whenever they change.
import {execFileSync} from 'node:child_process'
import {context} from 'esbuild'

execFileSync(process.execPath, ['../tools/build-reddit.js'], {stdio: 'inherit'})

const common = {
  bundle: true,
  logLevel: 'warning',
  sourcemap: 'linked',
  target: 'es2023',
}
const client = await context({
  ...common,
  entryPoints: ['src/client/splash.ts'],
  format: 'esm',
  outdir: 'public',
  platform: 'browser',
})
const server = await context({
  ...common,
  entryPoints: ['src/server/index.ts'],
  format: 'cjs',
  outdir: 'dist/server',
  platform: 'node',
})
await Promise.all([client.watch(), server.watch()])
console.log('watching src/client and src/server')

// Minimal stub for browser bundles.
// The real `defaultProvider` is Node-only; in browser we never call it.
export const defaultProvider = () => {
  throw new Error(
    'AWS SDK defaultProvider (node) was referenced in a browser bundle. This stub should never be executed.'
  )
}
export default defaultProvider

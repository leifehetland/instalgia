/**
 * Returns a short relative-time string for a given ISO 8601 timestamp.
 * e.g. "just now", "5m", "3h", "2d", "4w", "8mo", "1y"
 */
export function formatRelativeTime(timestamp) {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diffMs = now - then

  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr  = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr  / 24)
  const diffWk  = Math.floor(diffDay / 7)
  const diffMo  = Math.floor(diffDay / 30)
  const diffYr  = Math.floor(diffDay / 365)

  if (diffSec < 60)  return 'just now'
  if (diffMin < 60)  return `${diffMin}m`
  if (diffHr  < 24)  return `${diffHr}h`
  if (diffDay < 7)   return `${diffDay}d`
  if (diffWk  < 5)   return `${diffWk}w`
  if (diffMo  < 12)  return `${diffMo}mo`
  return `${diffYr}y`
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function uniqueStrings(items = []) {
  return [...new Set(items.filter((item) => typeof item === 'string'))];
}

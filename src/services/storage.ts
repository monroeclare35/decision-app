const PREFIX = 'decision_app_'

function getStorage() {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function get<T>(key: string, fallback: T): T {
  const storage = getStorage()
  if (!storage) return fallback
  try {
    const raw = storage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function set<T>(key: string, value: T): void {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // storage full or unavailable — silently fail for MVP
  }
}

export function remove(key: string): void {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.removeItem(PREFIX + key)
  } catch {
    // silently fail
  }
}

export function clearAll(): void {
  const storage = getStorage()
  if (!storage) return
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key?.startsWith(PREFIX)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((k) => storage.removeItem(k))
  } catch {
    // silently fail
  }
}

export function exportData(): string {
  const storage = getStorage()
  if (!storage) return '{}'
  const data: Record<string, unknown> = {}
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (key?.startsWith(PREFIX)) {
      try {
        data[key] = JSON.parse(storage.getItem(key)!)
      } catch {
        data[key] = storage.getItem(key)
      }
    }
  }
  return JSON.stringify(data, null, 2)
}

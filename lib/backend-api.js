const BACKEND_API_BASE_URL = process.env.BACKEND_API_URL ?? 'http://127.0.0.1:4000/api'

export async function fetchBackendResource(path, fallbackData) {
  try {
    const response = await fetch(`${BACKEND_API_BASE_URL}${path}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Backend request failed for ${path}`)
    }

    return await response.json()
  } catch {
    return fallbackData
  }
}
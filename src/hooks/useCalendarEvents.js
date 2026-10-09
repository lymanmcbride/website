import { useCallback, useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_GCAL_API_KEY

// Fetches upcoming events (today onward, soonest first) from a public Google Calendar.
// Only runs when the component using it mounts, so other pages never call the API.
export function useCalendarEvents(calendarId) {
  const [state, setState] = useState({ status: 'loading', events: [] })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const params = new URLSearchParams({
      key: API_KEY ?? '',
      timeMin: startOfToday.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '50',
    })
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Calendar request failed (${response.status})`)
        return response.json()
      })
      .then((data) => {
        const events = (data.items ?? [])
          .filter((item) => item.status !== 'cancelled')
          .map((item) => ({
            id: item.id,
            title: item.summary || 'Untitled event',
            location: item.location || '',
            description: item.description || '',
            url: item.htmlLink,
            allDay: Boolean(item.start?.date),
            start: new Date(item.start?.dateTime ?? `${item.start?.date}T00:00:00`),
          }))
        setState({ status: 'ready', events })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', events: [] })
      })

    return () => controller.abort()
  }, [calendarId, attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading', events: [] })
    setAttempt((count) => count + 1)
  }, [])

  return { ...state, retry }
}

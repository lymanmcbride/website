import { useCallback, useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_GCAL_API_KEY

const decodeEntities = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')

// Google Calendar has no CTA field, so the button comes from the event description:
// the first link (an <a href> inserted in the editor, or a bare URL) becomes the CTA.
// The link text is the button label ("Get Tickets"); a bare URL falls back to "Learn More".
// The remaining text, with the link and HTML removed, becomes the short description.
export function parseDescription(raw = '') {
  let cta = null
  let text = raw

  const anchor = text.match(/<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i)
  if (anchor) {
    const label = decodeEntities(anchor[2].replace(/<[^>]*>/g, '')).trim()
    cta = { url: decodeEntities(anchor[1]), label: label && !/^https?:/i.test(label) ? label : 'Learn More' }
    text = text.replace(anchor[0], ' ')
  } else {
    const bare = text.match(/https?:\/\/[^\s<"']+/)
    if (bare) {
      cta = { url: bare[0], label: 'Learn More' }
      text = text.replace(bare[0], ' ')
    }
  }

  const description = decodeEntities(text.replace(/<br\s*\/?>|<\/p>|<\/div>/gi, '\n').replace(/<[^>]*>/g, ''))
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, ' ')
    .trim()

  return { cta, description }
}

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
            ...parseDescription(item.description),
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

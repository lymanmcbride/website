import styled from 'styled-components'
import { BackgroundImage } from '../components/BackgroundImage'
import { Container } from '../components/Container'
import { siteContent } from '../content/site'
import { useCalendarEvents } from '../hooks/useCalendarEvents'
import { theme } from '../styles/theme'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);

  h2 {
    margin: 0.25rem 0;
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    margin: 0.25rem 0 0;
  }
`

const When = styled.time`
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const RetryButton = styled.button`
  font: inherit;
  color: inherit;
  background: none;
  border: 1px solid currentColor;
  padding: 0.4rem 1rem;
  cursor: pointer;
`

const dateFormat = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

function formatWhen({ start, allDay }) {
  const date = dateFormat.format(start)
  return allDay ? date : `${date} · ${timeFormat.format(start)}`
}

export function Events() {
  const { status, events, retry } = useCalendarEvents(siteContent.calendarId)

  return (
    <BackgroundImage
      as="main"
      $image={siteContent.eventsBackground}
      $overlay={theme.overlay.page}
      $align="flex-start"
      $fixed
    >
      <Container>
        <h1>Events</h1>
        {status === 'loading' && <p>Loading events…</p>}
        {status === 'error' && (
          <>
            <p>The events list could not be loaded.</p>
            <RetryButton type="button" onClick={retry}>Try again</RetryButton>
          </>
        )}
        {status === 'ready' && events.length === 0 && <p>Nothing is on the calendar right now.</p>}
        {status === 'ready' && events.length > 0 && (
          <List>
            {events.map((event) => (
              <Item key={event.id}>
                <When dateTime={event.start.toISOString()}>{formatWhen(event)}</When>
                <h2>{event.title}</h2>
                {event.location && <p>{event.location}</p>}
                {event.description && <p>{event.description}</p>}
              </Item>
            ))}
          </List>
        )}
      </Container>
    </BackgroundImage>
  )
}

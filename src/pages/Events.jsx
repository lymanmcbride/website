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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);

  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`

const Details = styled.div`
  min-width: 0;

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

const Where = styled.p`
  color: rgba(255, 255, 255, 0.8);
`

const About = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
`

const Cta = styled.a`
  flex: none;
  color: inherit;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;
  white-space: nowrap;

  &:hover {
    opacity: 0.75;
  }
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

function EventItem({ event }) {
  const { start, allDay, title, location, description, cta } = event
  const date = dateFormat.format(start)

  return (
    <Item>
      <Details>
        <When dateTime={start.toISOString()}>{allDay ? date : `${date} · ${timeFormat.format(start)}`}</When>
        <h2>{title}</h2>
        {location && <Where>{location}</Where>}
        {description && <About>{description}</About>}
      </Details>
      {cta && (
        <Cta href={cta.url} target="_blank" rel="noopener noreferrer">
          {cta.label} →
        </Cta>
      )}
    </Item>
  )
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
        <h1>Upcoming Events</h1>
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
              <EventItem key={event.id} event={event} />
            ))}
          </List>
        )}
      </Container>
    </BackgroundImage>
  )
}

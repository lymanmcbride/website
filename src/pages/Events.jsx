import { BackgroundImage } from '../components/BackgroundImage'
import { Container } from '../components/Container'
import { siteContent } from '../content/site'
import { theme } from '../styles/theme'

export function Events() {
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
        <p>Concerts and events will be listed here.</p>
      </Container>
    </BackgroundImage>
  )
}

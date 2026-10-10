import styled from 'styled-components'
import { BackgroundImage } from '../components/BackgroundImage'
import { Container } from '../components/Container'
import { Muted } from '../components/Typography'
import { siteContent } from '../content/site'
import { theme } from '../styles/theme'

const Photo = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: 60dvh;
  object-fit: cover;
  margin-bottom: 1.5rem;
`

const PhotoSlot = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  max-height: 60dvh;
  background: ${({ theme }) => theme.colors.surface};
  margin-bottom: 1.5rem;
`

const list = (value) => (Array.isArray(value) ? value.filter(Boolean) : [])

export function About() {
  const { photoPath, aboutBackground, bio } = siteContent
  const paragraphs = list(bio)

  return (
    <BackgroundImage
      as="main"
      $image={aboutBackground}
      $overlay={theme.overlay.page}
      $align="flex-start"
      $fixed
    >
      <Container as="article">
        <h1>About</h1>
        <figure>
          {photoPath ? <Photo src={photoPath} alt="" /> : <PhotoSlot role="img" aria-label="Photo" />}
        </figure>
        <section aria-label="Bio">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          ) : (
            <Muted>Bio</Muted>
          )}
        </section>
      </Container>
    </BackgroundImage>
  )
}

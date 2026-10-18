import styled from 'styled-components'
import { BackgroundImage } from '../components/BackgroundImage'
import { Container } from '../components/Container'
import { siteContent } from '../content/site'
import { theme } from '../styles/theme'

const Wide = styled(Container)`
  max-width: 64rem;
`

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2.5rem;
  align-items: start;
`

const Ensemble = styled.section`
  margin-top: 3rem;
`

const Group = styled.section`
  /* Two 20rem columns + 2.5rem gap + 3rem page padding */
  @media (min-width: 45.5rem) {
    ${({ $rowSpan }) => $rowSpan && `grid-row: span ${$rowSpan};`}
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  padding: 1.25rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);

  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  h3 {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    margin: 0.75rem 0 0;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
  }
`

const Player = styled.iframe`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
`

const AudioPlayer = styled.iframe`
  display: block;
  width: 100%;
  height: 152px;
  border: 0;
  border-radius: 12px;
`

const AlbumPlayer = styled.iframe`
  display: block;
  width: 100%;
  height: 352px;
  border: 0;
  border-radius: 12px;
`

const AlbumTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  font-weight: 500;
`

const Cta = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  color: inherit;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    opacity: 0.75;
  }
`

const hasMedia = (r) => r?.id || r?.spotifyId

function Recording({ id, spotifyId, title, description }) {
  return (
    <Item>
      <h3>{title}</h3>
      {id ? (
        <Player
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <AudioPlayer
          src={`https://open.spotify.com/embed/track/${spotifyId}`}
          title={title}
          loading="lazy"
          allow="encrypted-media; clipboard-write"
        />
      )}
      {description && <p>{description}</p>}
    </Item>
  )
}

const albumSrc = ({ spotifyAlbumId, appleMusicPath }) =>
  spotifyAlbumId
    ? `https://open.spotify.com/embed/album/${spotifyAlbumId}`
    : `https://embed.music.apple.com/${appleMusicPath}`

export function Listen() {
  const albums = siteContent.ensembleAlbums.filter((a) => a?.spotifyAlbumId || a?.appleMusicPath)
  const groups = siteContent.listenGroups
    .map((group) => ({ ...group, recordings: group.recordings.filter(hasMedia) }))
    .filter((group) => group.recordings.length > 0)

  return (
    <BackgroundImage
      as="main"
      $image={siteContent.listenBackground}
      $overlay={theme.overlay.page}
      $align="flex-start"
      $fixed
    >
      <Wide>
        <h1>Listen</h1>
        {groups.length === 0 && albums.length === 0 && <p>No recordings yet.</p>}
        {groups.length > 0 && (
          <Columns>
            {groups.map(({ heading, recordings, cta, rowSpan }) => (
              <Group key={heading} aria-label={heading} $rowSpan={rowSpan}>
                <h2>{heading}</h2>
                <List>
                  {recordings.map((recording) => (
                    <Recording key={recording.id ?? recording.spotifyId} {...recording} />
                  ))}
                </List>
                {cta && (
                  <Cta href={cta.url} target="_blank" rel="noopener noreferrer">
                    {cta.label} →
                  </Cta>
                )}
              </Group>
            ))}
          </Columns>
        )}
        {albums.length > 0 && (
          <Ensemble aria-label="Ensemble recordings">
            <h2>Ensemble Recordings</h2>
            <Columns>
              {albums.map((album) => (
                <div key={album.spotifyAlbumId ?? album.appleMusicPath}>
                  <AlbumTitle>{album.title}</AlbumTitle>
                  <AlbumPlayer
                    src={albumSrc(album)}
                    title={album.title}
                    loading="lazy"
                    allow="autoplay *; encrypted-media *; clipboard-write; fullscreen"
                  />
                </div>
              ))}
            </Columns>
          </Ensemble>
        )}
      </Wide>
    </BackgroundImage>
  )
}

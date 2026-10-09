import styled from 'styled-components'

// Full-bleed section with a cover background image and a readability overlay.
// Falls back to a solid dark background when no image is supplied.
// Props: $image (url), $overlay (css gradient), $align ('flex-start' | 'center' | 'flex-end'), $fixed (bool)
export const BackgroundImage = styled.section`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $align }) => $align || 'flex-end'};
  padding: 6rem 1.5rem 3rem;
  color: ${({ theme }) => theme.colors.onDark};
  background-color: ${({ theme }) => theme.colors.dark};
  background-image: ${({ $image, $overlay, theme }) =>
    $image ? `${$overlay || theme.overlay.hero}, url(${$image})` : 'none'};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: ${({ $fixed }) => ($fixed ? 'fixed' : 'scroll')};
`

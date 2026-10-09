import styled from 'styled-components'

export const Display = styled.h1`
  margin: 0;
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 0.95;
`

export const Eyebrow = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.125rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const Muted = styled.p`
  color: ${({ theme }) => theme.colors.muted};
`

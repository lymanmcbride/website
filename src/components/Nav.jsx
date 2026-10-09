import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Bar = styled.nav`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;

  a {
    color: #fff;
    text-decoration: none;
    letter-spacing: 0.04em;
  }

  a:hover {
    text-decoration: underline;
  }
`

export function Nav() {
  return (
    <Bar aria-label="Primary">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/events">Events</NavLink>
    </Bar>
  )
}

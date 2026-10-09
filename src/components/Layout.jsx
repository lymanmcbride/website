import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Nav } from './Nav'

const Shell = styled.div`
  position: relative;
  min-height: 100dvh;
`

export function Layout() {
  return (
    <Shell>
      <Nav />
      <Outlet />
    </Shell>
  )
}

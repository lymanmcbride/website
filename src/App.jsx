import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Events } from './pages/Events'
import { Home } from './pages/Home'
import { Listen } from './pages/Listen'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="listen" element={<Listen />} />
      </Route>
    </Routes>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Events } from './pages/Events'
import { Home } from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
      </Route>
    </Routes>
  )
}

export default App

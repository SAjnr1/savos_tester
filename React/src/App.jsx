import { Routes, Route } from 'react-router-dom'

import Index from './Index'
import Programs from './pages/Programs/Programs'
import Campus from './pages/Campus/Campus'
import About from './pages/About/About'
import CommentsPage from './Components/Comments/CommentsPage'
import AdminPage from './Components/Comments/AdminPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Programs />} />
      <Route path="/product" element={<Campus />} />
      <Route path="/about" element={<About />} />
      <Route path="/testimonials" element={<CommentsPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
import { Route, Routes } from 'react-router-dom'
import HomePage from './modules/home'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App

import ReactDOM from 'react-dom/client'
import App from './App'

import './styles/global.scss'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <HashRouter>
    <App />
  </HashRouter>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './context/ContextApi.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextApi>
  </StrictMode>,
)

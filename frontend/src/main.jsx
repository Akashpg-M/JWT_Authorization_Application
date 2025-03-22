import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './Auth_Application/index.css'
import AuthApp from './Auth_Application/AuthApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthApp />
    </BrowserRouter>
  </StrictMode>,
)

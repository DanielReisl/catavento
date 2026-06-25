import { StrictMode } from 'react'
import { createRoot } from 'react-serif'
import { createRoot as initRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

initRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

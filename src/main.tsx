import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Assuming a global index.css exists
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
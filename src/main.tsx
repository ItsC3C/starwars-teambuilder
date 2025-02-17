import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GridComponent from './components/GridComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GridComponent />
  </StrictMode>,
)

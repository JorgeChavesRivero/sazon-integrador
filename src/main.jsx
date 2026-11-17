import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Catalogo from './components/Catalogo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Catalogo />
  </StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import anime from 'animejs/lib/anime.es.js';
import App from './App.jsx'
import './index.css'

// Phase 8E.8: Respect prefers-reduced-motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  anime.speed = 100; // Instantly complete animations instead of freezing at opacity: 0
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)

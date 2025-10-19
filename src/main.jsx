import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoadingFallback from './components/LoadingFallback.jsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)

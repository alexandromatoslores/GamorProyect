import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.jsx'

const handleError = (error, errorInfo) => {
  console.error('React Error Boundary caught an error:', error, errorInfo)
}

const handleUnhandledRejection = (event) => {
  console.error('Unhandled promise rejection:', event.reason)
}

const handleUncaughtError = (event) => {
  console.error('Uncaught error:', event.error)
}

window.addEventListener('unhandledrejection', handleUnhandledRejection)
window.addEventListener('error', handleUncaughtError)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <ErrorBoundary onError={handleError}>
      <UserProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </ErrorBoundary>
  </StrictMode>,
)

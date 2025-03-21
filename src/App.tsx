import CssBaseline from '@mui/joy/CssBaseline'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
      },
    },
    dark: {
      palette: {
        mode: 'dark',
      },
    },
  },
})

function App() {
  return (
    <>
      <InitColorSchemeScript />
      <CssVarsProvider theme={customTheme} disableTransitionOnChange>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </CssVarsProvider>
    </>
  )
}

export default App

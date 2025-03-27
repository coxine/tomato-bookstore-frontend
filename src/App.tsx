import CssBaseline from '@mui/joy/CssBaseline'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import PrivateRoute from './routes/PrivateRoute'

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
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CssVarsProvider>
    </>
  )
}

export default App

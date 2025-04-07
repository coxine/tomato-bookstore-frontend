import CssBaseline from '@mui/joy/CssBaseline'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Books from './pages/Books'
import BookDetails from './pages/Books/BookDetails'
import BookEdit from './pages/Books/BookEdit'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import AdminRoute from './routes/AdminRoute'
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
            <Route path="/404" element={<NotFound />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/books"
              element={
                <PrivateRoute>
                  <Books />
                </PrivateRoute>
              }
            />
            <Route
              path="/books/:id"
              element={
                <PrivateRoute>
                  <BookDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/books/edit/:id"
              element={
                <PrivateRoute>
                  <BookEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
      </CssVarsProvider>
    </>
  )
}

export default App

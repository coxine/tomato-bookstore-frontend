import {
  CssBaseline,
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme,
} from '@mui/joy'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Books from './pages/Books'
import BookDetails from './pages/Books/BookDetails'
import BookEdit from './pages/Books/BookEdit'
import ChapterPurchase from './pages/Books/ChapterPurchase'
import CartPage from './pages/Cart'
import ChapterEdit from './pages/Chapters/ChapterEdit'
import ChapterReader from './pages/Chapters/ChapterReader'
import Dashboard from './pages/Dashboard'
import AdsEdit from './pages/Dashboard/AdsEdit'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import AdminRoute from './routes/AdminRoute'
import PrivateRoute from './routes/PrivateRoute'
import { muiTheme } from './theme/muiTheme'

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
    <ThemeProvider theme={muiTheme}>
      <JoyCssVarsProvider theme={customTheme} disableTransitionOnChange>
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
              path="/books/:productId"
              element={
                <PrivateRoute>
                  <BookDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/books/purchase/:productId"
              element={
                <AdminRoute>
                  <ChapterPurchase />
                </AdminRoute>
              }
            />
            <Route
              path="/books/edit/:productId"
              element={
                <AdminRoute>
                  <BookEdit />
                </AdminRoute>
              }
            />
            <Route
              path="chapters/edit/:chapterId"
              element={
                <AdminRoute>
                  <ChapterEdit />
                </AdminRoute>
              }
            />
            <Route
              path="/chapters/:chapterId"
              element={
                <PrivateRoute>
                  <ChapterReader />
                </PrivateRoute>
              }
            />
            <Route
              path="/ads/edit/:adId"
              element={
                <AdminRoute>
                  <AdsEdit />
                </AdminRoute>
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
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </JoyCssVarsProvider>
    </ThemeProvider>
  )
}

export default App

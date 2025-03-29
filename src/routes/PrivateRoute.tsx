import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'
  if (!isLoggedIn) {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('isLoggedIn')
    return <Navigate to="/login" replace />
  }
  return children
}

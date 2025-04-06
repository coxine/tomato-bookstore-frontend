import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

interface AdminRouteProps {
  children: JSX.Element
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN'
  if (!isAdmin) {
    return <Navigate to="/404" replace />
  }
  return children
}

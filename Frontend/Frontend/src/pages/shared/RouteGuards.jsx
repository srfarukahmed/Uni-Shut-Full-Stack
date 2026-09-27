import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function RequireAuth({ role }) {
  const {user}=useAuth(); const location=useLocation()
  if(!user) return <Navigate to="/login" replace state={{from:location.pathname}}/>
  if(role && user.role!==role) return <Navigate to={`/${user.role.toLowerCase()}`} replace/>
  return <Outlet/>
}
export function GuestOnly() {
  const {user}=useAuth(); if(user) return <Navigate to={`/${user.role.toLowerCase()}`} replace/>
  return <Outlet/>
}

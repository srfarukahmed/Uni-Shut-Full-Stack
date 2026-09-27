import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/mockApi'

const AuthContext = createContext(null)
const SESSION = 'unishut-session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION) || 'null') } catch { return null }
  })
  useEffect(() => { api.getTrips().catch(()=>{}) }, [])
  const login = async (email,password,role) => { const u=await api.login(email,password,role); localStorage.setItem(SESSION,JSON.stringify(u)); setUser(u); return u }
  const register = async payload => { const u=await api.register(payload); localStorage.setItem(SESSION,JSON.stringify(u)); setUser(u); return u }
  const logout = () => { localStorage.removeItem(SESSION); setUser(null) }
  const value = useMemo(()=>({user,login,register,logout,isAuthenticated:!!user}),[user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)

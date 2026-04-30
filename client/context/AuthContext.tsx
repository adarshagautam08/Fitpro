"use client"
import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { setAccessToken as setTokenInLib } from '../lib/auth'

interface AuthContextType {
  user: any
  accessToken: string
  login: (token: string, userData: any) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`, {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.accessToken) {
          setAccessToken(data.accessToken)    
          setTokenInLib(data.accessToken)
          setUser(data.user)
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))

  }, [])

  const login = (token: string, userData: any) => {
    setAccessToken(token)
    setTokenInLib(token)
    setUser(userData)
  }

  const logout = () => {
    setAccessToken("")
    setTokenInLib("")
    setUser(null)
  }
if (isLoading) return null
  return (
    
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
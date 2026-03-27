import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin' | 'alumni'
  department?: string
  year?: number
  rollNo?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role?: string) => boolean
  logout: () => void
}

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

interface AppContextType extends AuthContextType, ThemeContextType {}

const AppContext = createContext<AppContextType | null>(null)

const mockUsers: Record<string, User> = {
  'student@vit.edu.in': {
    id: 'STU001',
    name: 'Aarav Sharma',
    email: 'student@vit.edu.in',
    role: 'student',
    department: 'CSE',
    year: 3,
    rollNo: '21CSE0042',
  },
  'admin@vit.edu.in': {
    id: 'ADM001',
    name: 'Dr. Admin Singh',
    email: 'admin@vit.edu.in',
    role: 'admin',
    department: 'Administration',
  },
  'alumni@vit.edu.in': {
    id: 'ALU001',
    name: 'Arjun Mehta',
    email: 'alumni@vit.edu.in',
    role: 'alumni',
    department: 'CSE',
  },
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('vit-theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
    const savedUser = localStorage.getItem('vit-user')
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)) } catch {}
    }
  }, [])

  const login = (email: string, _password: string): boolean => {
    const found = mockUsers[email.toLowerCase()]
    if (found) {
      setUser(found)
      localStorage.setItem('vit-user', JSON.stringify(found))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vit-user')
  }

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('vit-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('vit-theme', 'light')
      }
      return next
    })
  }

  return (
    <AppContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isDark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

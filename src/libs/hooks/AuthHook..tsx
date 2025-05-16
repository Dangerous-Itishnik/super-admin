import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/generated/graphql'

export interface AdminLoginResponse {
  loginAdmin: {
    logged: boolean
  }
}

export interface AdminLoginVariables {
  email: string
  password: string
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  const [loginAdmin, { loading: loginLoading }] = useLoginMutation()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginAdmin({
        variables: { email, password },
      })

      if (data) {
        setIsAuthenticated(true)
        router.push('/users')
        return { success: true }
      }
      return { success: false, error: 'Authentication failed' }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
    router.push('/')
  }

  return {
    isAuthenticated,
    isLoading,
    loginLoading,
    login,
    logout,
  }
}

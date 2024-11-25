import { defineStore } from 'pinia'
import { BackendApi } from '~/services/backend-api'

interface User {
  id: string
  username: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    refreshToken: null as string | null,
    isAuthenticated: false,
  }),

  actions: {
    async login(username: string, password: string, otpCode?: string) {
      try {
        const api = new BackendApi()
        const response = await api.login(username, password, otpCode)
        
        if ('otpRequired' in response) {
          return { requireOtp: true }
        }

        if ('token' in response) {
          this.setToken(response.token)
          this.setRefreshToken(response.refreshToken)
          this.setUser({
            id: '1',
            username,
            email: `${username}@example.com`,
            role: 'user'
          })
          return { success: true }
        }

        throw new Error('Invalid response from server')
      } catch (error: any) {
        throw new Error(error.message || 'Failed to login')
      }
    },

    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    setToken(token: string) {
      this.token = token
      localStorage.setItem('auth_token', token)
    },

    setRefreshToken(rt: string) { 
      this.refreshToken = rt
      localStorage.setItem('refresh_token', rt)
    },

    logout() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      navigateTo('/login')
    },

    async refreshLogin() {
      try {
        const api = new BackendApi()
        const storedRefreshToken = localStorage.getItem('refresh_token')
        
        if(!storedRefreshToken) {
          this.logout()
          throw new Error('No refresh token')
        }

        const response = await api.refreshToken(storedRefreshToken)
        
        if ('token' in response) {
          this.setToken(response.token)
          this.setRefreshToken(response.refreshToken)
          this.setUser({
            id: '1',
            username: 'user',
            email: 'user@example.com',
            role: 'user'
          })
          return { success: true }
        }

        throw new Error('Invalid response from server')
      } catch (error: any) {
        this.logout()
        throw new Error(error.message || 'Failed to refresh login')
      }
    },

    checkAuth() {
      return this.isAuthenticated
    }
  },
})
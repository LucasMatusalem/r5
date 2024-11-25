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
    async login(username: string, password: string) {
      try {
        const api = new BackendApi()
        const response = await api.login(username, password) as any
        if (response.requireOtp) {
          return { requireOtp: true }
        }
        this.setUser(response.user)
        this.setToken(response.token)
        this.setRefreshToken(response.refreshToken)
        return { success: true }
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
      localStorage.remove('refresh_token')
      navigateTo('/login')
    },

    async refreshLogin() {
      try {
        const api = new BackendApi()
        if(!this.refreshToken) {
          this.logout()
          throw new Error('No refresh token')
        }
        const response = await api.refreshToken(this.refreshToken) as any
        this.setUser(response.user)
        this.setToken(response.token)
        this.setRefreshToken(response.refreshToken)
        return { success: true }
      } catch (error: any) {
        this.logout()
        throw new Error(error.message || 'Failed to reauthenticate')
      }
    },

    async verifyOtp(username: string, password: string, optCode: string) {
      // try {
      //   const api = new BackendApi()
      //   if(!this.refreshToken) {
      //     this.logout()
      //     throw new Error('No refresh token')
      //   }
      //   const response = await api.refreshToken(this.refreshToken) as any
      //   this.setUser(response.user)
      //   this.setToken(response.token)
      //   this.setRefreshToken(response.refreshToken)
      return { success: true }
      // } catch (error: any) {
      //   this.logout()
      //   throw new Error(error.message || 'Failed to reauthenticate')
      // }
    },

    checkAuth() {
      return this.isAuthenticated
    }
  },
})
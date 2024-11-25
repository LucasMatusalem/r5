export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (!auth.isAuthenticated) {
    const token = localStorage.getItem('auth_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (token && refreshToken) {
      try {
        await auth.refreshLogin()
      } catch (error) {
        if (authRequired) return navigateTo('/login')
      }
    } else if (authRequired) {
      return navigateTo('/login')
    }
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return navigateTo('/')
  }
})
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (!auth.isAuthenticated) {
    const isValid = auth.checkAuth()
    if (authRequired && !isValid) {
      return navigateTo('/login')
    }
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return navigateTo('/')
  }
})
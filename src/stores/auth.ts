import { ref, computed } from 'vue'

interface AuthUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
}

function load<T>(key: string): T | null {
  if (typeof localStorage === 'undefined') return null
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try { return JSON.parse(raw) as T } catch { return null }
}

export const authToken = ref<string | null>(
  typeof localStorage !== 'undefined' ? localStorage.getItem('eagle_token') : null
)

export const authUser = ref<AuthUser | null>(load<AuthUser>('eagle_user'))

export const userInitials = computed(() => {
  if (!authUser.value) return 'AU'
  const { first_name, last_name } = authUser.value
  return `${first_name[0] ?? ''}${last_name[0] ?? ''}`.toUpperCase()
})

export const userDisplayName = computed(() => {
  if (!authUser.value) return 'Admin'
  const { first_name, last_name } = authUser.value
  return `${first_name} ${last_name}`.trim() || authUser.value.username
})

export function setAuth(token: string, user: AuthUser) {
  authToken.value = token
  authUser.value = user
  localStorage.setItem('eagle_token', token)
  localStorage.setItem('eagle_user', JSON.stringify(user))
}

export function clearToken() {
  authToken.value = null
  authUser.value = null
  localStorage.removeItem('eagle_token')
  localStorage.removeItem('eagle_user')
}

import { ref } from 'vue'

export const authToken = ref<string | null>(
  typeof localStorage !== 'undefined' ? localStorage.getItem('eagle_token') : null
)

export function setToken(token: string) {
  authToken.value = token
  localStorage.setItem('eagle_token', token)
}

export function clearToken() {
  authToken.value = null
  localStorage.removeItem('eagle_token')
}

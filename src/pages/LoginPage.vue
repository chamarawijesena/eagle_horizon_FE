<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setAuth } from '../stores/auth'

const router = useRouter()

const login = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

function isEmail(value: string) {
  return value.includes('@')
}

async function handleLogin() {
  if (!login.value || !password.value) {
    error.value = 'Please fill in all fields.'
    return
  }
  error.value = ''
  isLoading.value = true

  const body = isEmail(login.value)
    ? { email: login.value, password: password.value }
    : { username: login.value, password: password.value }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      // Surface the first error message returned by the API
      const msg =
        data?.detail ||
        data?.non_field_errors?.[0] ||
        data?.email?.[0] ||
        data?.username?.[0] ||
        data?.password?.[0] ||
        'Login failed. Please check your credentials.'
      error.value = msg
      return
    }

    // Accept token from common DRF response shapes
    const token = data?.key || data?.token || data?.access || data?.access_token
    if (token && data?.user) setAuth(token, data.user)
    else if (token) setAuth(token, { id: 0, username: '', email: '', first_name: '', last_name: '', role: '' })

    const role = data?.user?.role ?? ''
    router.push(role === 'ADMIN' ? '/admin/dashboard' : '/api-test')
  } catch (e: any) {
    error.value = 'Unable to reach the server. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-left">
      <div class="login-brand">
        <RouterLink to="/" class="brand-link">
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 34,32 2,32" fill="#E8A020" opacity="0.9"/>
            <polygon points="18,8 28,28 8,28" fill="#1B3A6B"/>
            <rect x="15" y="16" width="6" height="12" fill="#E8A020"/>
          </svg>
          <span>Eagle Constructions</span>
        </RouterLink>
      </div>

      <div class="login-visual">
        <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Buildings -->
          <rect x="40" y="220" width="80" height="160" fill="#2d5a9e" rx="4"/>
          <rect x="50" y="230" width="20" height="20" fill="#E8A020" opacity="0.6"/>
          <rect x="80" y="230" width="20" height="20" fill="#E8A020" opacity="0.6"/>
          <rect x="50" y="260" width="20" height="20" fill="#E8A020" opacity="0.4"/>
          <rect x="80" y="260" width="20" height="20" fill="#E8A020" opacity="0.8"/>
          <rect x="50" y="290" width="20" height="20" fill="#E8A020" opacity="0.6"/>
          <rect x="80" y="290" width="20" height="20" fill="#E8A020" opacity="0.3"/>

          <rect x="140" y="150" width="100" height="230" fill="#1B3A6B" rx="4"/>
          <rect x="155" y="165" width="25" height="25" fill="#E8A020" opacity="0.7"/>
          <rect x="195" y="165" width="25" height="25" fill="#E8A020" opacity="0.4"/>
          <rect x="155" y="205" width="25" height="25" fill="#E8A020" opacity="0.5"/>
          <rect x="195" y="205" width="25" height="25" fill="#E8A020" opacity="0.8"/>
          <rect x="155" y="245" width="25" height="25" fill="#E8A020" opacity="0.6"/>
          <rect x="195" y="245" width="25" height="25" fill="#E8A020" opacity="0.4"/>
          <rect x="155" y="285" width="25" height="25" fill="#E8A020" opacity="0.7"/>
          <rect x="195" y="285" width="25" height="25" fill="#E8A020" opacity="0.3"/>
          <!-- Roof peak -->
          <polygon points="140,150 190,80 240,150" fill="#E8A020"/>

          <rect x="260" y="190" width="70" height="190" fill="#2d5a9e" rx="4"/>
          <rect x="272" y="205" width="18" height="18" fill="#E8A020" opacity="0.5"/>
          <rect x="302" y="205" width="18" height="18" fill="#E8A020" opacity="0.8"/>
          <rect x="272" y="235" width="18" height="18" fill="#E8A020" opacity="0.6"/>
          <rect x="302" y="235" width="18" height="18" fill="#E8A020" opacity="0.4"/>

          <rect x="350" y="240" width="90" height="140" fill="#1B3A6B" rx="4"/>
          <rect x="365" y="255" width="22" height="22" fill="#E8A020" opacity="0.6"/>
          <rect x="400" y="255" width="22" height="22" fill="#E8A020" opacity="0.4"/>
          <rect x="365" y="290" width="22" height="22" fill="#E8A020" opacity="0.7"/>
          <rect x="400" y="290" width="22" height="22" fill="#E8A020" opacity="0.5"/>

          <!-- Ground -->
          <rect x="0" y="375" width="480" height="25" fill="#0D1F3C" rx="2"/>
          <!-- Stars -->
          <circle cx="60" cy="50" r="2" fill="white" opacity="0.5"/>
          <circle cx="120" cy="30" r="1.5" fill="white" opacity="0.4"/>
          <circle cx="300" cy="60" r="2" fill="white" opacity="0.6"/>
          <circle cx="420" cy="40" r="1.5" fill="white" opacity="0.4"/>
          <circle cx="460" cy="90" r="2" fill="white" opacity="0.5"/>
        </svg>

        <div class="login-quote">
          <p>"Building excellence one project at a time."</p>
          <span>— Eagle Constructions</span>
        </div>
      </div>
    </div>

    <div class="login-right">
      <div class="login-form-wrap">
        <div class="form-header">
          <h1>Welcome back</h1>
          <p>Sign in to your Eagle Constructions account</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form" novalidate>
          <div v-if="error" class="error-msg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ error }}
          </div>

          <div class="form-group">
            <label for="login">Email or Username</label>
            <div class="input-wrap">
              <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input
                id="login"
                v-model="login"
                type="text"
                placeholder="you@example.com or username"
                autocomplete="username"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">
              Password
              <a href="#" class="forgot-link">Forgot password?</a>
            </label>
            <div class="input-wrap">
              <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                autocomplete="current-password"
                required
              />
              <button type="button" class="toggle-pw" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <div class="form-check">
            <label class="check-label">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              Remember me for 30 days
            </label>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span>{{ isLoading ? 'Signing in…' : 'Sign In' }}</span>
          </button>
        </form>

        <div class="form-divider">
          <span>Need access?</span>
        </div>
        <RouterLink to="/contact" class="contact-link">Contact our team to request an account</RouterLink>

        <p class="back-home">
          <RouterLink to="/">← Back to Home</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 70px);
}

/* Left Panel */
.login-left {
  background: var(--primary-dark);
  color: var(--white);
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
}

.login-left::before {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(232, 160, 32, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.login-brand {
  margin-bottom: 2rem;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--white);
  font-size: 1.15rem;
  font-weight: 700;
}

.brand-link span {
  color: var(--accent);
}

.login-visual {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.login-visual svg {
  width: 100%;
  max-width: 420px;
}

.login-quote {
  text-align: center;
}

.login-quote p {
  font-size: 1.05rem;
  font-style: italic;
  color: rgba(255,255,255,0.8);
  margin-bottom: 0.25rem;
}

.login-quote span {
  font-size: 0.82rem;
  color: var(--accent);
  font-weight: 600;
}

/* Right Panel */
.login-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: var(--white);
}

.login-form-wrap {
  width: 100%;
  max-width: 420px;
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.35rem;
}

.form-header p {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff0f0;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  margin-bottom: 1.25rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
}

.forgot-link {
  font-size: 0.82rem;
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
}

.forgot-link:hover {
  color: var(--accent);
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.85rem;
  color: var(--text-muted);
  pointer-events: none;
}

.input-wrap input {
  width: 100%;
  padding: 0.7rem 2.75rem 0.7rem 2.75rem;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--text);
  background: var(--light);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;
}

.input-wrap input:focus {
  border-color: var(--primary);
  background: var(--white);
  box-shadow: 0 0 0 3px rgba(27, 58, 107, 0.1);
}

.toggle-pw {
  position: absolute;
  right: 0.85rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.toggle-pw:hover {
  color: var(--primary);
}

.form-check {
  display: flex;
  align-items: center;
}

.check-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--text-muted);
  cursor: pointer;
  user-select: none;
}

.check-label input[type="checkbox"] {
  accent-color: var(--primary);
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: var(--primary);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.85rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  width: 100%;
  font-family: inherit;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.form-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0 0.75rem;
  color: var(--text-muted);
  font-size: 0.82rem;
}

.form-divider::before,
.form-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.contact-link {
  display: block;
  text-align: center;
  font-size: 0.88rem;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  padding: 0.65rem;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  transition: border-color 0.2s, color 0.2s;
}

.contact-link:hover {
  border-color: var(--primary);
  color: var(--primary-dark);
}

.back-home {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
}

.back-home a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.back-home a:hover {
  color: var(--primary);
}

@media (max-width: 768px) {
  .login-page {
    grid-template-columns: 1fr;
  }
  .login-left {
    display: none;
  }
  .login-right {
    padding: 2rem 1.25rem;
    min-height: calc(100vh - 70px);
  }
}
</style>

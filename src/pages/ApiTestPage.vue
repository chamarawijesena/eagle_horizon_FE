<script setup lang="ts">
import ApiTester from '../components/ApiTester.vue'
import { authToken, clearToken } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  clearToken()
  router.push('/login')
}
</script>

<template>
  <div class="api-test-page">
    <div class="page-bar">
      <span class="page-title">API Test Console</span>
      <div class="bar-right">
        <span v-if="authToken" class="token-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Authenticated
        </span>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>
    <ApiTester />
  </div>
</template>

<style scoped>
.api-test-page {
  min-height: calc(100vh - 70px);
  background: #181818;
  color: #fff;
}

.page-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  background: #111;
  border-bottom: 1px solid #2a2a2a;
}

.page-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #E8A020;
  letter-spacing: 0.5px;
}

.bar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.token-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.3);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
}

.logout-btn {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 0.3rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  font-family: inherit;
}

.logout-btn:hover {
  color: #fff;
  border-color: rgba(255,255,255,0.3);
}
</style>

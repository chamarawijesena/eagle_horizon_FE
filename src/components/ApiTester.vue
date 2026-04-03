<script setup lang="ts">
import { ref } from 'vue'

const url = ref('http://127.0.0.1:8000/api/v1/inventory/equipment-categories/')
const response = ref('')
const error = ref('')
const loading = ref(false)
const status = ref<number | null>(null)

async function send() {
  loading.value = true
  error.value = ''
  response.value = ''
  status.value = null
  try {
    const res = await fetch(url.value)
    status.value = res.status
    const data = await res.json()
    response.value = JSON.stringify(data, null, 2)
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="tester">
    <h2>API Tester</h2>
    <div class="row">
      <input v-model="url" placeholder="Enter URL" spellcheck="false" />
      <button @click="send" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send' }}
      </button>
    </div>
    <div v-if="status" class="status" :class="status < 300 ? 'ok' : 'err'">
      Status: {{ status }}
    </div>
    <pre v-if="response" class="body">{{ response }}</pre>
    <pre v-if="error" class="body err-text">Error: {{ error }}</pre>
  </div>
</template>

<style scoped>
.tester {
  max-width: 800px;
  margin: 2rem auto;
  text-align: left;
}
.row {
  display: flex;
  gap: 0.5rem;
}
input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border: 1px solid #555;
  border-radius: 6px;
  background: #1a1a1a;
  color: #fff;
}
button {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
.status {
  margin-top: 0.75rem;
  font-weight: bold;
}
.ok { color: #4caf50; }
.err { color: #f44336; }
.body {
  margin-top: 0.75rem;
  padding: 1rem;
  background: #111;
  border: 1px solid #333;
  border-radius: 6px;
  font-size: 0.85rem;
  overflow: auto;
  max-height: 500px;
  white-space: pre-wrap;
  word-break: break-all;
}
.err-text { color: #f44336; }
</style>

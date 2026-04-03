<script setup lang="ts">
defineProps<{ section: string }>()
</script>

<template>
  <div class="placeholder-page">
    <div class="placeholder-card">
      <div class="ph-icon">
        <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 34,32 2,32" fill="#E8A020" opacity="0.9"/>
          <polygon points="18,8 28,28 8,28" fill="#1B3A6B"/>
          <rect x="15" y="16" width="6" height="12" fill="#E8A020"/>
        </svg>
      </div>
      <h2>{{ section }}</h2>
      <p>This section is currently under development. Full functionality will be available soon.</p>
      <RouterLink to="/admin/dashboard" class="back-btn">← Back to Dashboard</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.placeholder-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 128px);
}

.placeholder-card {
  background: #fff;
  border: 1px solid #eef1f6;
  border-radius: 16px;
  padding: 3rem 2.5rem;
  text-align: center;
  max-width: 420px;
  box-shadow: 0 4px 20px rgba(27,58,107,0.08);
}

.ph-icon {
  margin-bottom: 1.25rem;
}

.placeholder-card h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1B3A6B;
  margin: 0 0 0.6rem;
}

.placeholder-card p {
  font-size: 0.92rem;
  color: #5a6a80;
  line-height: 1.65;
  margin: 0 0 1.75rem;
}

.back-btn {
  display: inline-block;
  background: #1B3A6B;
  color: #fff;
  font-weight: 700;
  font-size: 0.88rem;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s;
}

.back-btn:hover {
  background: #0D1F3C;
}
</style>

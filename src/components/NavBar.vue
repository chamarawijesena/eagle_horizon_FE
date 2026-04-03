<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="brand" @click="closeMenu">
        <div class="logo-icon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 34,32 2,32" fill="#E8A020" opacity="0.9"/>
            <polygon points="18,8 28,28 8,28" fill="#1B3A6B"/>
            <rect x="15" y="16" width="6" height="12" fill="#E8A020"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">Eagle</span>
          <span class="brand-sub">Constructions</span>
        </div>
      </RouterLink>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <RouterLink to="/" @click="closeMenu" active-class="active">Home</RouterLink>
        <RouterLink to="/about" @click="closeMenu" active-class="active">About Us</RouterLink>
        <RouterLink to="/faq" @click="closeMenu" active-class="active">FAQ</RouterLink>
        <RouterLink to="/contact" @click="closeMenu" active-class="active">Contact Us</RouterLink>
        <RouterLink to="/login" class="nav-login" @click="closeMenu">Login</RouterLink>
      </nav>

      <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: var(--primary-dark);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-icon {
  display: flex;
  align-items: center;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 0.5px;
}

.brand-sub {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.7);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-links a {
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--white);
  background: rgba(232, 160, 32, 0.15);
  color: var(--accent);
}

.nav-login {
  background: var(--accent) !important;
  color: var(--primary-dark) !important;
  font-weight: 700 !important;
  padding: 0.45rem 1.2rem !important;
  border-radius: 6px !important;
  margin-left: 0.5rem;
  transition: background 0.2s !important;
}

.nav-login:hover {
  background: var(--accent-hover) !important;
  color: var(--primary-dark) !important;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--white);
  border-radius: 2px;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--primary-dark);
    flex-direction: column;
    padding: 1rem;
    gap: 0.25rem;
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
  }

  .nav-login {
    margin-left: 0 !important;
  }
}
</style>

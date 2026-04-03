<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { clearToken, authUser, userInitials, userDisplayName } from '../stores/auth'

const route = useRoute()
const router = useRouter()

const sidebarCollapsed = ref(false)
const mobileOpen = ref(false)
const profileOpen = ref(false)
const notifOpen = ref(false)

function handleLogout() {
  profileOpen.value = false
  clearToken()
  router.push('/login')
}

function closeDropdowns() {
  profileOpen.value = false
  notifOpen.value = false
}

const currentSection = computed(() => {
  const name = route.name as string
  const map: Record<string, string> = {
    'admin-dashboard': 'Dashboard',
    'admin-inventory': 'Inventory',
    'admin-orders': 'Orders',
    'admin-returns': 'Returns',
    'admin-customers': 'Customers',
    'admin-maintenance': 'Maintenance',
    'admin-invoices': 'Invoices',
    'admin-audit-logs': 'Audit Logs',
    'admin-settings': 'Settings',
  }
  return map[name] ?? 'Admin'
})

const navItems = [
  {
    label: 'Dashboard', path: '/admin/dashboard',
    icon: '<path d="M3 3h7v7H3zM13 3h8v7h-8zM13 13h8v8h-8zM3 13h7v8H3z" stroke-width="1.5"/>',
  },
  {
    label: 'Inventory', path: '/admin/inventory',
    icon: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  },
  {
    label: 'Orders', path: '/admin/orders',
    icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>',
  },
  {
    label: 'Returns', path: '/admin/returns',
    icon: '<polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>',
  },
  {
    label: 'Customers', path: '/admin/customers',
    icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
  },
  {
    label: 'Maintenance', path: '/admin/maintenance',
    icon: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  },
  {
    label: 'Invoices', path: '/admin/invoices',
    icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  },
  {
    label: 'Audit Logs', path: '/admin/audit-logs',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  },
  {
    label: 'Settings', path: '/admin/settings',
    icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>',
  },
]

const notifications = [
  { id: 1, text: '3 inventory items are critically low', time: '5m ago', type: 'red' },
  { id: 2, text: 'Order ORD-2041 requires approval', time: '22m ago', type: 'amber' },
  { id: 3, text: 'Maintenance ticket TKT-091 overdue', time: '1h ago', type: 'red' },
]

const branches = ['Main Store — Yattogoda', 'New Store — Kobbewala']
const selectedBranch = ref(branches[0])
</script>

<template>
  <div class="admin-shell" @click="closeDropdowns">
    <!-- Mobile overlay -->
    <div v-if="mobileOpen" class="mobile-overlay" @click.stop="mobileOpen = false"></div>

    <!-- Sidebar -->
    <aside
      class="admin-sidebar"
      :class="{ collapsed: sidebarCollapsed, 'mobile-open': mobileOpen }"
      @click.stop
    >
      <div class="sidebar-logo">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none" flex-shrink="0">
          <polygon points="18,2 34,32 2,32" fill="#E8A020" opacity="0.9"/>
          <polygon points="18,8 28,28 8,28" fill="#1B3A6B"/>
          <rect x="15" y="16" width="6" height="12" fill="#E8A020"/>
        </svg>
        <span class="logo-text">Eagle Admin</span>
      </div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          active-class="nav-item--active"
          @click="mobileOpen = false"
        >
          <span class="nav-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" v-html="item.icon"></svg>
          </span>
          <span class="nav-label">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <button class="sidebar-collapse-btn" @click.stop="sidebarCollapsed = !sidebarCollapsed" aria-label="Toggle sidebar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <polyline v-if="!sidebarCollapsed" points="15 18 9 12 15 6"/>
          <polyline v-else points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </aside>

    <!-- Main area -->
    <div class="admin-main">
      <!-- Top bar -->
      <header class="admin-topbar" @click.stop>
        <div class="topbar-left">
          <button class="mobile-menu-btn" @click.stop="mobileOpen = !mobileOpen" aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h1 class="topbar-title">{{ currentSection }}</h1>
        </div>

        <div class="topbar-right">
          <!-- Search -->
          <div class="topbar-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search…" />
          </div>

          <!-- Notifications -->
          <div class="topbar-icon-wrap" @click.stop="notifOpen = !notifOpen; profileOpen = false">
            <button class="icon-btn" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span class="notif-badge">{{ notifications.length }}</span>
            </button>
            <div v-if="notifOpen" class="dropdown notif-dropdown">
              <div class="dropdown-header">
                <strong>Notifications</strong>
                <span class="badge-count">{{ notifications.length }}</span>
              </div>
              <div v-for="n in notifications" :key="n.id" class="notif-item" :class="`notif-${n.type}`">
                <span class="notif-dot"></span>
                <div>
                  <p>{{ n.text }}</p>
                  <span>{{ n.time }}</span>
                </div>
              </div>
              <RouterLink to="/admin/audit-logs" class="dropdown-footer" @click="notifOpen = false">View all notifications</RouterLink>
            </div>
          </div>

          <!-- Quick action -->
          <button class="btn-quick">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Quick Action</span>
          </button>

          <!-- Branch switcher -->
          <div class="branch-switcher">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <select v-model="selectedBranch">
              <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>

          <!-- Profile -->
          <div class="profile-wrap" @click.stop="profileOpen = !profileOpen; notifOpen = false">
            <div class="profile-trigger">
              <div class="avatar">{{ userInitials }}</div>
              <span class="profile-name">{{ userDisplayName }}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div v-if="profileOpen" class="dropdown profile-dropdown">
              <div class="profile-info">
                <div class="avatar avatar--lg">{{ userInitials }}</div>
                <div>
                  <strong>{{ userDisplayName }}</strong>
                  <span>{{ authUser?.email }}</span>
                  <span v-if="authUser?.role" class="role-badge">{{ authUser.role }}</span>
                </div>
              </div>
              <hr />
              <RouterLink to="/admin/settings" class="dropdown-item" @click="profileOpen = false">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                Settings
              </RouterLink>
              <button class="dropdown-item dropdown-item--danger" @click="handleLogout">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="admin-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ── Shell ── */
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #F5F7FA;
}

/* ── Sidebar ── */
.admin-sidebar {
  width: 240px;
  background: #0D1F3C;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.25s ease;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 200;
}

.admin-sidebar.collapsed {
  width: 64px;
}

/* ── Logo ── */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1.1rem;
  height: 64px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
}

.logo-text {
  font-size: 0.95rem;
  font-weight: 800;
  color: #E8A020;
  letter-spacing: 0.3px;
}

.admin-sidebar.collapsed .logo-text {
  display: none;
}

/* ── Nav ── */
.sidebar-nav {
  flex: 1;
  padding: 0.75rem 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 1.1rem;
  color: rgba(255,255,255,0.62);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.9);
}

.nav-item--active {
  background: rgba(232,160,32,0.13);
  color: #E8A020;
  border-left-color: #E8A020;
}

.nav-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 18px;
}

.admin-sidebar.collapsed .nav-label {
  display: none;
}

.admin-sidebar.collapsed .nav-item {
  padding: 0.6rem;
  justify-content: center;
  border-left: none;
}

/* ── Collapse button ── */
.sidebar-collapse-btn {
  margin: 0.75rem;
  padding: 0.5rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.sidebar-collapse-btn:hover {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.9);
}

/* ── Main ── */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ── Topbar ── */
.admin-topbar {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #dce3ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  gap: 1rem;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: #5a6a80;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
}

.topbar-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1B3A6B;
  margin: 0;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Search */
.topbar-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #F5F7FA;
  border: 1px solid #dce3ed;
  border-radius: 8px;
  padding: 0.4rem 0.75rem;
  color: #5a6a80;
}

.topbar-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.85rem;
  color: #1a1a2e;
  width: 160px;
  font-family: inherit;
}

.topbar-search input::placeholder {
  color: #9aabb8;
}

/* Notif */
.topbar-icon-wrap {
  position: relative;
}

.icon-btn {
  position: relative;
  background: #F5F7FA;
  border: 1px solid #dce3ed;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #5a6a80;
  transition: background 0.15s;
}

.icon-btn:hover {
  background: #eef1f6;
  color: #1B3A6B;
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #DC2626;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

/* Quick action */
.btn-quick {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #1B3A6B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.45rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background 0.15s;
}

.btn-quick:hover {
  background: #0D1F3C;
}

/* Branch switcher */
.branch-switcher {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #F5F7FA;
  border: 1px solid #dce3ed;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  color: #5a6a80;
  font-size: 0.82rem;
}

.branch-switcher select {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.82rem;
  color: #1a1a2e;
  cursor: pointer;
  font-family: inherit;
  max-width: 180px;
}

/* Profile */
.profile-wrap {
  position: relative;
  cursor: pointer;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  border: 1px solid #dce3ed;
  background: #F5F7FA;
  transition: background 0.15s;
}

.profile-trigger:hover {
  background: #eef1f6;
}

.avatar {
  width: 30px;
  height: 30px;
  background: #1B3A6B;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
}

.avatar--lg {
  width: 40px;
  height: 40px;
  font-size: 0.85rem;
}

.profile-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a2e;
}

/* Dropdowns */
.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid #dce3ed;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(27,58,107,0.14);
  z-index: 300;
  min-width: 260px;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0.75rem;
  border-bottom: 1px solid #f0f2f5;
}

.dropdown-header strong {
  font-size: 0.9rem;
  color: #1B3A6B;
}

.badge-count {
  background: #DC2626;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
}

/* Notif dropdown */
.notif-dropdown {
  width: 300px;
}

.notif-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #f5f7fa;
  transition: background 0.15s;
}

.notif-item:hover {
  background: #f9fafb;
}

.notif-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}

.notif-red .notif-dot { background: #DC2626; }
.notif-amber .notif-dot { background: #D97706; }
.notif-blue .notif-dot { background: #2563EB; }

.notif-item p {
  font-size: 0.83rem;
  color: #1a1a2e;
  margin: 0 0 0.2rem;
  line-height: 1.4;
}

.notif-item span {
  font-size: 0.75rem;
  color: #9aabb8;
}

.dropdown-footer {
  display: block;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.82rem;
  color: #1B3A6B;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
  border-top: 1px solid #f0f2f5;
}

.dropdown-footer:hover {
  background: #f5f7fa;
}

/* Profile dropdown */
.profile-dropdown {
  min-width: 240px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
}

.profile-info strong {
  display: block;
  font-size: 0.88rem;
  color: #1a1a2e;
}

.profile-info span {
  font-size: 0.78rem;
  color: #9aabb8;
  display: block;
}

.role-badge {
  display: inline-block !important;
  margin-top: 0.25rem;
  background: rgba(232,160,32,0.15);
  color: #D97706;
  font-size: 0.68rem !important;
  font-weight: 700;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  letter-spacing: 0.5px;
}

.profile-dropdown hr {
  border: none;
  border-top: 1px solid #f0f2f5;
  margin: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  font-size: 0.87rem;
  color: #1a1a2e;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-family: inherit;
  transition: background 0.15s;
}

.dropdown-item:hover {
  background: #f5f7fa;
}

.dropdown-item--danger {
  color: #DC2626;
}

.dropdown-item--danger:hover {
  background: #fef2f2;
}

/* Content */
.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #F5F7FA;
}

/* ── Mobile overlay ── */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 199;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .topbar-search input { width: 120px; }
  .branch-switcher { display: none; }
}

@media (max-width: 768px) {
  .mobile-menu-btn { display: flex; }

  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px !important;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .admin-sidebar.mobile-open {
    transform: translateX(0);
  }

  .sidebar-collapse-btn { display: none; }
  .topbar-search { display: none; }
  .btn-quick span { display: none; }
  .profile-name { display: none; }
}
</style>

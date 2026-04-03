import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import FaqPage from '../pages/FaqPage.vue'
import ApiTestPage from '../pages/ApiTestPage.vue'

export const routes = [
  // Public routes
  { path: '/', component: HomePage, name: 'home' },
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/about', component: AboutPage, name: 'about' },
  { path: '/contact', component: ContactPage, name: 'contact' },
  { path: '/faq', component: FaqPage, name: 'faq' },
  { path: '/api-test', component: ApiTestPage, name: 'api-test' },

  // Admin routes — nested under AdminLayout
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { isAdmin: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard',   name: 'admin-dashboard',   component: () => import('../pages/admin/AdminDashboard.vue') },
      { path: 'inventory',   name: 'admin-inventory',   component: () => import('../pages/admin/AdminInventory.vue') },
      { path: 'orders',      name: 'admin-orders',      component: () => import('../pages/admin/AdminPlaceholder.vue'), props: { section: 'Orders' } },
      { path: 'returns',     name: 'admin-returns',     component: () => import('../pages/admin/AdminPlaceholder.vue'), props: { section: 'Returns' } },
      { path: 'customers',   name: 'admin-customers',   component: () => import('../pages/admin/AdminPlaceholder.vue'), props: { section: 'Customers' } },
      { path: 'maintenance', name: 'admin-maintenance', component: () => import('../pages/admin/AdminPlaceholder.vue'), props: { section: 'Maintenance' } },
      { path: 'invoices',    name: 'admin-invoices',    component: () => import('../pages/admin/AdminPlaceholder.vue'), props: { section: 'Invoices' } },
      { path: 'audit-logs',  name: 'admin-audit-logs',  component: () => import('../pages/admin/AdminPlaceholder.vue'), props: { section: 'Audit Logs' } },
      { path: 'settings',    name: 'admin-settings',    component: () => import('../pages/admin/AdminPlaceholder.vue'), props: { section: 'Settings' } },
    ],
  },
]

export function createAppRouter() {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
      return savedPosition || { top: 0 }
    },
  })
}

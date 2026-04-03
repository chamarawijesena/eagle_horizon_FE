import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import FaqPage from '../pages/FaqPage.vue'
import ApiTestPage from '../pages/ApiTestPage.vue'

export const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/about', component: AboutPage, name: 'about' },
  { path: '/contact', component: ContactPage, name: 'contact' },
  { path: '/faq', component: FaqPage, name: 'faq' },
  { path: '/api-test', component: ApiTestPage, name: 'api-test' },
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

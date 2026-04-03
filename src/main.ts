import { createSSRApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router/index'

export function createApp() {
  const app = createSSRApp(App)
  const router = createAppRouter()
  app.use(router)
  return { app, router }
}

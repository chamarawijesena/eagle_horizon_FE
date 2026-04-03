import { renderToWebStream } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url: string) {
  const { app, router } = createApp()

  await router.push(url)
  await router.isReady()

  const ctx = {}
  const stream = renderToWebStream(app, ctx)

  return { stream }
}

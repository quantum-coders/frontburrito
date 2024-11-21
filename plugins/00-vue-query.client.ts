// plugins/00-vue-query.client.ts
import { defineNuxtPlugin } from '#app'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient()

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
})

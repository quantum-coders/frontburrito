// plugins/wagmi.client.ts
import { defineNuxtPlugin } from '#app'
import { WagmiPlugin } from '@wagmi/vue'
import { wagmiConfig } from '~/config/wagmiConfig' // Asegúrate de que la ruta es correcta

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiConfig })
})

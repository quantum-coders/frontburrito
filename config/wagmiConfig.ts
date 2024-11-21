// config/wagmiConfig.ts
import { http, createConfig } from '@wagmi/vue'
import { avalanche } from '@wagmi/vue/chains'

export const wagmiConfig = createConfig({
  chains: [avalanche],
  transports: {
    [avalanche.id]: http(),
  },
})

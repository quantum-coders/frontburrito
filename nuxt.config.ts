// @ts-ignore
export default defineNuxtConfig({
	ssr: false,
	spaLoadingTemplate: 'spa-loading-template.html',
	css: [
		'~/assets/styles/main.scss',
		'~/assets/fonts/style.css',
	],
	icon:{
		mode: 'svg'
	},
	modules: [
		'nuxt-svgo',
		'@nuxtjs/i18n',
		'@nuxtjs/device',
		'@pinia/nuxt',
		'nuxt-swiper',
		"@nuxt/icon"
	],
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: 'Accelerating Memetic DeFi' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ hid: 'og:title', property: 'og:title', content: 'MemeAI index' },
				{ hid: 'og:description', property: 'og:description', content: 'Accelerating Memetic DeFi' },
				{
					hid: 'og:image',
					property: 'og:image',
					content: 'https://burritoai.finance/new-crypto-AI-defi-best-crypto-business-narrative-fintech.png'
				},
				{ hid: 'og:url', property: 'og:url', content: 'https://burritoai.finance/' },
				{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
				{ hid: 'twitter:title', name: 'twitter:title', content: 'Accelerating Memetic DeFi' },
				{ hid: 'twitter:description', name: 'twitter:description', content: 'Accelerating Memetic DeFi' },
				{
					hid: 'twitter:image',
					name: 'twitter:image',
					content: 'https://burritoai.finance/new-crypto-AI-defi-best-crypto-business-narrative-fintech.png'
				}
			],
			link: [
				// favicon.png
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
				{ rel: 'stylesheet', href: '/fonts/fonts.css' },
			],
			script: [
				{ src: 'https://cdnjs.cloudflare.com/ajax/libs/textfit/2.4.0/textFit.min.js' }
			],
		}
	},
	imports: {
		dirs: [
			'stores',
		],
	},
	runtimeConfig: {
		public: {
			baseURL: process.env.BASE_URL || 'http://localhost:1337',
			rpcProvider: process.env.RPC_PROVIDER,
			burritoTokenAddress: process.env.BURRITO_TOKEN_ADDRESS,
			usdtAddress: process.env.USDT_ADDRESS,
			chainId: process.env.CHAIN_ID,
			network: process.env.NETWORK,
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				sass: {
					additionalData: '@import "~/assets/styles/variables.sass"\nhtml\n\tmargin: 0',
				}
			}
		}
	}
})

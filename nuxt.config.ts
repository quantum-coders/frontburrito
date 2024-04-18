// @ts-ignore
export default defineNuxtConfig({
	ssr: false,
	spaLoadingTemplate: 'spa-loading-template.html',
	css: [
		'~/assets/styles/main.scss',
		'~/assets/fonts/style.css',
	],
	modules: [
		'nuxt-svgo',
		'@nuxtjs/i18n',
		'nuxt-swiper',
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
					content: 'https://burritoai.finance/burrito-IA-finance-logo.png'
				},
				{ hid: 'og:url', property: 'og:url', content: 'https://burritoai.finance/' },
				{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
				{ hid: 'twitter:title', name: 'twitter:title', content: 'Accelerating Memetic DeFi' },
				{ hid: 'twitter:description', name: 'twitter:description', content: 'Accelerating Memetic DeFi' },
				{
					hid: 'twitter:image',
					name: 'twitter:image',
					content: 'https://burritoai.finance/burrito-IA-finance-logo.png'
				}
			],
			link: [
				{ rel: 'icon', href: '/favicon.ico' }
			],
			script: [
				{ src: '/scripts/font-awesome/all.js', },
				{ src: 'https://cdnjs.cloudflare.com/ajax/libs/textfit/2.4.0/textFit.min.js' }
			],
		}
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

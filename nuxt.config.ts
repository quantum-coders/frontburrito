// @ts-ignore
export default defineNuxtConfig({
  ssr: false,
	spaLoadingTemplate: 'spa-loading-template.html',
	css: [
		'~/assets/styles/main.scss',
	],
	modules: [
		'nuxt-svgo',
		'@nuxtjs/i18n',
		'nuxt-swiper',
	],
	app: {
		head: {
			title: 'Fun CryptoIA Finances, people with democratized IA digital finances',
			htmlAttrs: {
				lang: 'es',
			  },
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: 'Accelerating Memetic DeFi' },
				{ name: 'format-detection', content: 'telephone=no' },
			],
			link: [
				{ rel: 'icon', href: '/favicon.ico' },
			],
			script: [ { src: '/scripts/font-awesome/all.js', } ],
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

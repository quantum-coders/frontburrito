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

<template>
	<site-header />
	<section class="site-wrapper">
		<NuxtPage />
	</section>
	<site-footer />
</template>

<script setup>
	useHead({
		htmlAttrs: {
			lang: 'en',
		},
		titleTemplate: '%s',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'Automated mails with AI',
			},
		],
	});
</script>

<style lang="sass">

	img
		max-width: 100%

	html
		min-height: 100vh

	body
		background: linear-gradient(90deg, rgba(200, 178, 85, 1) 0%, rgba(227, 203, 166, 1) 23%, rgba(207, 204, 187, 1) 100%)
		min-height: 100vh
		display: flex
		flex-direction: column

	#__nuxt
		flex: 1
		overflow: hidden
		min-height: 100vh
		display: flex
		flex-direction: column

	.site-wrapper
		flex: 1
</style>
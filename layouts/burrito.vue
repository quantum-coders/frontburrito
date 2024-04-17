<template>
	<platform-header />
	<section class="site-wrapper">
		<NuxtPage />
	</section>
	<platform-footer />
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

	.site-wrapper
		flex: 1
		display: flex
		flex-direction: column

</style>
<template>
	<div class="block-start">
		<div class="container">
			<h2 class="mb-5">
				Enjoy unfiltered conversations, exclusive perks, and vibrant AI.<br>
				Join the fun and spice up your digital life today!
			</h2>

			<div class="text-center mb-5">
				<nuxt-link
					to="/chat/dashboard"
					class="btn btn-burrito"
					@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Start Now from Final Section' })"
				>
					Start Now
				</nuxt-link>
			</div>

			<div class="position-relative d-flex justify-content-center align-items-center">
				<img src="/images/rich-burrito.png" alt="Start Now!" class="rich-burrito-final"/>
			</div>
		</div>
	</div>
</template>

<script setup>

	onMounted(() => {
		// Cargar el script de Twitter de forma segura
		if (!document.getElementById('twitter-wjs')) {
			const script = document.createElement('script')
			script.id = 'twitter-wjs'
			script.src = "https://platform.twitter.com/widgets.js"
			script.async = true
			document.head.appendChild(script)
		}
	})
</script>

<style lang="sass" scoped>
	h2
		color: $brand1
		text-align: center
		font-size: 1.8rem
		max-width: 800px
		margin: 0 auto 2rem
		font-weight: 900

	.btn-burrito
		font-size: 1.2rem
		padding: 0.75rem 2rem

	.rich-burrito-final
		image-rendering: pixelated
		width: calc(103px * 5)
		display: block
		margin: 2rem auto 0
		max-width: 100%
		z-index: 2

	.tweets-container
		max-width: 600px
		margin: 0 auto

	.timeline-wrapper
		background: #fff
		border: 1px solid #ccc
		border-radius: 8px
		overflow: hidden

		:deep(iframe)
			width: 100% !important
			border-radius: 8px !important

	.tweet-card
		background: #fff
		border: 1px solid #ccc
		border-radius: 8px

	.tweet-avatar
		width: 50px
		height: 50px
		border-radius: 50%
		object-fit: cover

	.tweet-author
		font-size: 1.1rem
		font-weight: 700

	.tweet-username
		font-size: 0.9rem
		font-weight: 400
		color: #666
		margin-left: 0.5rem

	.tweet-text
		font-size: 1rem
		margin-bottom: 0.5rem
		line-height: 1.4

	.tweet-meta
		font-size: 0.9rem
		color: #999

	// Estilos personalizados para el embedded timeline
	:deep(.timeline-wrapper)
		&::-webkit-scrollbar
			width: 6px
			background-color: transparent

		&::-webkit-scrollbar-thumb
			background-color: rgba(29, 161, 242, 0.5)
			border-radius: 10px

		&::-webkit-scrollbar-track
			background-color: transparent
</style>

<template>
	<nuxt-link to="/" class="logo" @mouseenter="changePhrase">
		<img alt="Burrito AI" src="/images/logo.svg" />
		<div class="phrase">
			<span>{{ selectedPhrase }}</span>
		</div>
	</nuxt-link>
</template>

<script setup>

	const phrases = [
		'A burrito a day keeps the fomo away',
		'AI for the people',
		'Nothing better than a burrito',
		'Spice up your life with AI',
	];

	const selectedPhrase = ref('');

	const changePhrase = () => {
		selectedPhrase.value = phrases[Math.floor(Math.random() * phrases.length)];
	};

</script>

<style lang="sass" scoped>
	.logo
		width: 40px

		&:hover
			.phrase
				span
					left: 45px

		.phrase
			position: absolute
			top: 50%
			overflow: clip
			width: 250px
			transform: translateY(-50%)
			font-size: 0.875rem
			line-height: 1.1
			z-index: 1
			color: $brand1

			span
				text-wrap: balance
				display: block
				left: -500px
				width: 200px
				transition: all 500ms ease-in-out

		img
			width: 100%
			z-index: 2
</style>
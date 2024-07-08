<template>
	<div class="block block-hero">
		<div class="hero-logo">
			<img class="heart" src="/images/heart.svg" alt="">

			<img class="nothing" src="/images/nothing.svg" alt="">
			<img class="like" src="/images/like.svg" alt="">
			<img class="a" src="/images/a.svg" alt="">
			<img class="burrito-photo" src="/images/burrito-photo.png" alt="">
			<img class="burrito" src="/images/burrito.svg" alt="">
		</div>

		<div class="copy">
			<img class="gif" src="/images/burrito-idle.gif" alt="">
			<div class="copy-wrapper">
				<h3>SIMPLIFYING CRYTPO AI MARKETS</h3>
				<p>Feast on Innovation with the Spiciest Token in Tech. Dive into a delicious blend of blockchain technology and artificial intelligence, where every token packs a punch of flavor and cutting-edge AI. Wrap up your assets in something exciting—taste the future with Burrito AI!</p>

				<p class="buttons d-flex">
					<a href="#" class="btn btn-burrito flex-grow-1">Presale Live</a>
					<a href="#" class="btn btn-burrito flex-grow-1">Uncensored Chat</a>
				</p>
			</div>
		</div>

		<img class="seal" src="/images/seal.svg" alt="">
	</div>

</template>

<script setup>
</script>

<style lang="sass" scoped>

	.block-hero
		padding: 5rem 0

	.hero-logo
		width: 80%
		aspect-ratio: 3.1
		margin: 0 auto 1rem

		img
			position: absolute

			&.nothing
				top: 0
				left: 0
				width: 55.83%
				height: auto

			&.like
				top: 0
				left: 56.83%
				width: 29.15%
				height: auto

			&.a
				bottom: 5%
				left: 5%
				width: 13.89%
				height: auto

			&.burrito
				bottom: 5.5%
				right: 0
				width: 69.73%
				height: auto

			&.burrito-photo
				bottom: 0
				right: 59%
				width: 29%
				height: auto

				&:hover
					animation: shakeX 1s infinite

			&.heart
				top: 10%
				right: 6%
				width: 12%
				height: auto
				z-index: 100

				&:hover
					animation: bounce 1s infinite

	.copy
		width: 75%
		padding-left: 5%
		margin: 0 auto

		.gif
			position: absolute
			right: 0
			top: 50%
			transform: translateY(-60%)
			width: 48px * 5
			image-rendering: pixelated

		.copy-wrapper
			width: calc(100% - 240px - 1rem)

			h3
				color: $brand2
				font-size: 2rem
				font-weight: 900

			p
				margin-bottom: 2rem

			.buttons
				gap: 3rem
				max-width: 800px

			.btn-burrito
				font-size: 1.5rem

	.seal
		margin: 10rem auto 5rem
		display: block
		width: 120px
		animation: rotating 30s linear infinite

	// Animation of constant rotation
	@keyframes rotating
		from
			transform: rotate(0deg)
		to
			transform: rotate(360deg)
</style>
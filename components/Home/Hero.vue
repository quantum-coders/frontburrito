<template>
	<div class="block block-hero">

		<img class="gif d-block d-sm-none" src="/images/burrito-idle.gif" alt="">
		<div class="hero-logo">
			<img class="heart" src="/images/heart.svg" alt="">

			<img class="nothing" src="/images/nothing.svg" alt="">
			<img class="like" src="/images/like.svg" alt="">
			<img class="a" src="/images/a.svg" alt="">
			<img class="burrito-photo" src="/images/burrito-photo.png" alt="">
			<img class="burrito" src="/images/burrito.svg" alt="">
		</div>

		<div class="copy">
			<img class="gif d-none d-sm-block" src="/images/burrito-idle.gif" alt="">
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
		padding-top: 5rem

		@media (min-width: $sm)
			padding: 5rem 0

	.hero-logo
		width: 90%
		margin: 0 auto 1rem
		aspect-ratio: 1.4

		@media (min-width: $sm)
			width: 80%
			aspect-ratio: 3.1

		img
			position: absolute

			&.nothing
				width: 100%
				z-index: 1

				@media (min-width: $sm)
					top: 0
					left: 0
					width: 55.83%
					height: auto
					z-index: 1

			&.like
				top: 27%
				left: 0
				width: 50%
				height: auto
				z-index: 2

				@media (min-width: $sm)
					top: 0
					left: 56.83%
					width: 29.15%
					height: auto
					z-index: 2

			&.a
				top: 29%
				right: 0
				width: 18.89%
				height: auto
				z-index: 4

				@media (min-width: $sm)
					top: auto
					right: auto
					bottom: 5%
					left: 5%
					width: 13.89%
					height: auto
					z-index: 3

			&.burrito-photo
				bottom: 34%
				right: 13%
				width: 43%
				height: auto
				z-index: 3

				@media (min-width: $sm)
					bottom: 0
					right: 59%
					width: 29%
					height: auto

				&:hover
					animation: shakeX 1s infinite

			&.burrito
				bottom: 5.5%
				right: 0
				width: 100%
				height: auto

				@media (min-width: $sm)
					bottom: 5.5%
					right: 0
					width: 69.73%
					height: auto
					z-index: 4

			&.heart
				top: -13%
				right: 0
				width: 18%
				height: auto
				z-index: 100

				@media (min-width: $sm)
					top: 10%
					right: 6%
					width: 12%

				&:hover
					animation: bounce 1s infinite

	.gif
		image-rendering: pixelated
		margin: 0 auto -8px
		width: 48px * 4

		@media (min-width: $sm)
			position: absolute
			right: 0
			top: 50%
			transform: translateY(-60%)
			width: 48px * 5

	.copy
		width: 90%
		margin: 0 auto

		@media (min-width: $sm)
			width: 75%
			padding-left: 5%

		.copy-wrapper
			@media (min-width: $sm)
				width: calc(100% - 240px - 1rem)

			h3
				color: $brand2
				font-size: 1rem
				font-weight: 900

				@media (min-width: $sm)
					font-size: 2rem

			p
				margin-bottom: 2rem

			.buttons
				gap: 3rem
				max-width: 800px
				flex-direction: column

				@media (min-width: $sm)
					flex-direction: row

			.btn-burrito
				@media (min-width: $sm)
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
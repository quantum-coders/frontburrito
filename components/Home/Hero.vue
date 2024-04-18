<template>
	<div class="block block-hero d-flex align-items-center">
		<div class="container">
			<div class="row align-items-center flex-column-reverse flex-sm-row">
				<div class="col-12 col-sm-8">
					<div class="copy">
						<svgo-nothing class="nothing" />
						<svgo-simplifying filled class="simplifying" />
						<p>Feast on Innovation with the Spiciest Token in Tech. Dive into a delicious blend of blockchain technology and artificial intelligence, where every token packs a punch of flavor and cutting-edge AI. Wrap up your assets in something exciting—taste the future with Burrito AI!</p>
					</div>
				</div>
				<div class="col-12 col-sm-4">
					<img class="robot" src="/home/splash.png" alt="">
				</div>
			</div>
		</div>

		<a href="#" class="btn btn-presale">Presale live NOW!</a>
	</div>
</template>

<script setup>
</script>

<style lang="sass" scoped>
	.block-hero
		min-height: 80dvh
		background: $brand1
		color: white
		margin-bottom: 10rem
		padding-bottom: 100px

		.nothing
			width: 100%
			height: auto
			margin-bottom: 0.5rem

		:deep(.simplifying)
			width: 100%
			height: auto
			margin-bottom: 1rem
			fill: $brand2 !important

		.copy
			text-align: center
			z-index: 2

			@media (min-width: $sm)
				text-align: left

		.robot
			max-width: 75%
			display: block
			margin: 0 auto

			@media (min-width: $sm)
				max-width: 100%

		.btn-presale
			position: absolute
			bottom: -1.75rem
			left: 50%
			transform: translateX(-50%)
			background: $brand2
			font-weight: bold
			color: white
			text-decoration: none
			transition: background 0.3s
			border-radius: var(--bs-border-radius-pill)
			outline: 1rem solid white
			padding: 1rem 3rem
			margin-top: 2rem
			font-size: 1rem

			&:hover
				background: $brand1

			@media (min-width: $sm)
				outline: 1.5rem solid white
				padding: 2rem 5rem
				margin-top: 2rem
				font-size: 1.2rem



</style>
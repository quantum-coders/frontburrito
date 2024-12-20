<template>
	<div class="block block-hero">

		<img class="gif d-block d-sm-none" src="/images/burrito-idle.gif" alt="">
		<div class="hero-logo">
			<!-- NOTHING LIKE A BURRITO IMAGERY KEEPS THE ORIGINAL LOOK -->
			<!-- <img class="heart" src="/images/heart.svg" alt=""> -->
			<img class="nothing" src="/images/nothing.svg" alt="">
			<img class="like" src="/images/like.svg" alt="">
			<img class="a" src="/images/a.svg" alt="">
			<img class="burrito-photo" src="/images/burrito-photo.png" alt="">
			<img class="burrito" src="/images/burrito.svg" alt="">
		</div>

		<div class="copy">
			<img class="gif d-none d-sm-block" src="/images/burrito-idle.gif" alt="">
			<div class="copy-wrapper">
				<h3 class="fw-bold text-brand mb-2">BurritoAI: Unleash AI & Earn Big with DeFi</h3>
				<p class="mb-2">
					Hold <strong>$BurritoAI</strong> and tap into uncensored AI tools, flexible DeFi billing, and up to
					<strong>19.72% APY</strong> annually. More tokens = more power, more profit, and exclusive features.
					Don’t hesitate—buy now and start earning.
				</p>

				<p class="buttons d-flex">
					<a
						href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44e2ec158a3dc2b6cfc97093f"
						target="_blank"
						class="btn btn-burrito flex-grow-1"
						@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Buy BurritoAI' })"
					>
						Buy $BurritoAI
					</a>
					<nuxt-link
						to="/chat"
						class="btn btn-burrito flex-grow-1"
						@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Try our Unbiased AI' })"
					>
						Try our Unbiased AI
					</nuxt-link>
					<nuxt-link
						to="/chat/images"
						class="btn btn-burrito flex-grow-1"
						@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Unfiltered Image Tool' })"
					>
						Unfiltered Image Tool
					</nuxt-link>
				</p>

				<!-- Avalanche & Trader Joe Row -->
				<div class="trust-row d-flex flex-column flex-sm-row align-items-center gap-3">
					<div class="d-flex align-items-center gap-2">
						<span class="fw-bold text-muted small">Built on</span>
						<img src="/images/avax-logo.svg" alt="Avalanche Logo" class="trust-logo">
					</div>

					<div class="d-flex align-items-center gap-2">
						<span class="fw-bold text-muted small">Listed on</span>
						<img src="/images/lfg.png" alt="Trader Joe Logo" class="trust-logo">
						<a
							href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44e2ec158a3dc2b6cfc97093f"
							target="_blank"
							class="btn btn-sm btn-outline-burrito"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Trade on Trader Joe' })"
						>
							Trade on Trader Joe
						</a>
					</div>
				</div>
			</div>
		</div>

		<img class="seal" src="/images/seal.svg" alt="">
	</div>
</template>

<style lang="sass" scoped>
	.block-hero
		padding-top: 5rem

		@media (min-width: $sm)
			padding: 15dvh 0

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

	.gif
		image-rendering: pixelated
		margin: 0 auto -8px
		width: 48px * 4
		z-index: 10

		@media (min-width: $sm)
			position: absolute
			right: 0
			top: -100px
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
				font-size: 1.5rem
				font-weight: 900

				@media (min-width: $sm)
					font-size: 1.6rem

			.buttons
				flex-wrap: wrap
				gap: 0.5rem
				max-width: 800px
				flex-direction: column

				@media (min-width: $sm)
					flex-direction: row
					gap: 0.5rem

				.btn-burrito
					flex-basis: 30%
					display: flex
					align-items: center
					justify-content: center
					line-height: 1
					padding: 1rem 2rem

					@media (min-width: $sm)
						font-size: 1.5rem

	.seal
		margin: 10rem auto 5rem
		display: block
		width: 120px
		animation: rotating 30s linear infinite

	@keyframes rotating
		from
			transform: rotate(0deg)
		to
			transform: rotate(360deg)

	.trust-row
		gap: 2rem
		margin-bottom: 2rem

		.trust-logo
			height: 20px

	.btn-outline-burrito
		border: 2px solid #e3592f
		color: #e3592f
		font-weight: 700
		text-transform: uppercase
		font-size: 0.75rem
		background: transparent

		&:hover
			background: #e3592f
			color: #fff
</style>

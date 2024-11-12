<template>
	<div class="block block-features">
		<div class="container">

			<div class="copy">
				<h2 class="title">Born from collective friendship, driven by a spirit of free expression and open dialogue. BurritoAI is here to shake things up with wildly entertaining AI chats!</h2>

				<div class="content-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-between">
					<p class="content">We believe in keeping it real. Users have ownership of their data and anonymity.
BurritoAI holders unlock a suite of AI features, like AI-chat with web search in depth, image generation, and soon trading on-chain.
					</p>
					<div class="wow-wrapper">
						<img class="wow" src="/images/wow.png" alt="WOW">
						<div class="balloon">
							<p>SUCH UNCENSORED</p>
						</div>
					</div>
				</div>
			</div>

			<article class="feature" id="ai">
				<img class="vibes" src="/images/feel-the-vibes.svg" alt="">
				<img class="omg" src="/images/omg.svg" alt="">

				<div class="copy">
					<h3>Free Range Conversations</h3>
					<p>Not shackled by the usual constraints.
						Holders also enjoy benefits from tokenomics, airdrops, Liquidity Pool incentives, APY and more.
It’s like enjoying an AI-burrito just the way you like it! 🌯</p>
					<p class="text-end">
						<nuxt-link href="/chat/dashboard" class="btn btn-burrito">>CHAT</nuxt-link>
					</p>
				</div>
				<div class="animation-wrapper">
					<animations-chat class="flex-grow-1" />
				</div>
			</article>

			<article class="feature" id="tokens">
				<img class="weird" src="/images/stay-weird.svg" alt="">
				<div class="copy">
					<h3>A Spicy Investment</h3>
					<p>The BurritoAI Token utility unlocks premium features and advanced functionalities within the Burrito AI ecosystem. Whether you're a tech enthusiast or an investor, the Burrito AI Token offers a blend of utility and growth potential, making it a hot addition to your portfolio.</p>
					<p class="text-end">
						<!-- <a href="#" class="btn btn-burrito">JOIN OUR PRESALE</a> -->
					</p>
				</div>
				<div class="animation-wrapper animation-wrapper-token">
					<animations-emoji-rain
						class="emoji-rain"
						:emojis="['⭐', '✨', '🌟', '🌙']"
						:speed="9"
						:density="50"
						:spawn="true"
					/>
					<img src="/images/rich-burrito.png" alt="Join Our Presale">
				</div>
			</article>

			<article class="feature" id="nfts">
				<img class="lfg" src="/images/lfg.svg" alt="">
				<div class="copy">
					<h3>Spice up</h3>
					<p>Congrats! You are an early adopter! Stay tuned for special perks like access to limited-edition assets, exclusive features, and priority in future drops. With airdrops on the horizon for stakers, your commitment will unlock even more benefits.</p>
					<p class="text-end">
						<!-- <a href="#" class="btn btn-burrito">Comming Soon</a> -->
					</p>
				</div>
				<div class="animation-wrapper animation-wrapper-nfts">
					<img src="/images/burritos-nfts.gif" alt="Burrito NFTs">
				</div>
			</article>
		</div>
		<platform-socials />
	</div>
</template>

<script setup>
</script>

<style lang="sass" scoped>
	.block-features
		padding: 5rem 0

		@media (min-width: $sm)
			padding: 10rem 0

		.title
			color: $brand1
			font-weight: 900
			font-size: 1.5rem
			text-align: center
			text-wrap: balance
			margin-bottom: 2rem

			@media (min-width: $sm)
				font-size: 2rem

		.content-wrapper
			margin: 0 auto 5rem
			max-width: 80%
			gap: 1rem

			@media (min-width: $sm)
				gap: 3rem

			.wow-wrapper
				align-self: flex-end

				.wow
					image-rendering: pixelated
					min-width: 52px * 3

				.balloon
					position: absolute
					width: 200px
					aspect-ratio: 3.6
					background: url('/images/wow-balloon.svg') no-repeat
					background-size: contain
					display: flex
					justify-content: center
					align-items: center
					color: white
					right: 90%
					top: 90%

					p
						text-align: center
						margin-top: 2%
						margin-right: 5%
						margin-bottom: 0

			.content
				margin-bottom: 0

	.feature
		margin: 0 auto 8rem
		border: 3px solid $brand1
		border-radius: 0.5rem
		box-shadow: 0 2rem 0 $brand1
		display: flex
		flex-direction: column-reverse
		align-items: stretch

		@media (min-width: $sm)
			flex-direction: row
			max-width: calc(100% - 200px)

		.animation-wrapper
			flex-grow: 1
			overflow: hidden
			aspect-ratio: 1
			border-bottom: 2px solid $brand1

			@media (min-width: $sm)
				aspect-ratio: auto
				border: 0

			&.animation-wrapper-token

				.emoji-rain
					overflow: hidden
					z-index: 1

				img
					position: absolute
					left: 50%
					transform: translateX(-50%)
					bottom: 0
					width: 206px
					image-rendering: pixelated
					z-index: 2

					@media (min-width: $sm)
						left: 0
						width: 206px * 2
						transform: none

			&.animation-wrapper-nfts
				display: flex
				justify-content: center
				align-items: center

				img
					position: absolute
					image-rendering: pixelated
					width: 100%
					height: 100%
					object-fit: contain

		.copy
			padding: 1rem
			z-index: 10

			@media (min-width: $sm)
				max-width: 65%

			p:last-child
				margin-bottom: 0

			h3
				text-transform: uppercase
				font-family: 'Chibold', sans-serif
				font-size: 2.5rem
				color: $brand1

			.btn-burrito
				padding: 0.5rem 2rem

		.vibes
			width: 120px
			position: absolute
			z-index: 100
			right: -5px
			top: -50px

			@media (min-width: $sm)
				width: 150px
				right: -50px
				top: -50px

		.omg
			width: 120px
			position: absolute
			z-index: 100
			left: 0
			bottom: -50px

			@media (min-width: $sm)
				left: auto
				width: 120px
				right: -50px
				bottom: -50px

		.weird
			width: 120px
			position: absolute
			z-index: 100
			right: -10px
			top: -30px

			@media (min-width: $sm)
				top: auto
				width: 150px
				right: -50px
				bottom: -50px

		.lfg
			width: 140px
			position: absolute
			z-index: 100
			right: -10px
			top: -40px

			@media (min-width: $sm)
				width: 150px
				right: -50px
				top: -20px
</style>
<template>
	<div class="block block-features">
		<div class="container">

			<div class="copy">
				<h2 class="title">Ever found yourself craving some uncensored, unapologetic, and undeniably entertaining AI chat? Well, buckle up, buttercup, because Burrito AI is here to serve you a piping hot plate of AI conversations with a side of sass!</h2>

				<div class="content-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-between">
					<p class="content">At Burrito AI, we believe in keeping it real. None of that watered-down, sugar-coated nonsense you find elsewhere. Our AI is trained to chat with you like a true friend – brutally honest, hilariously blunt, and delightfully candid. If you’re tired of boring bots and need a dose of real talk, Burrito AI is your new bestie.</p>
					<div class="wow-wrapper">
						<img class="wow" src="/images/wow.png" alt="WOW">
						<div class="balloon">
							<p>SUCH UNCENSORED</p>
						</div>
					</div>
				</div>
			</div>

			<article class="feature">
				<img class="vibes" src="/images/feel-the-vibes.svg" alt="">
				<img class="omg" src="/images/omg.svg" alt="">

				<div class="copy">
					<h3>Free Range Conversations</h3>
					<p>Our AI isn’t shackled by the usual constraints. Want to talk about taboo topics? Go ahead! Burrito AI dives headfirst into the spicy stuff without flinching. No filters, no censors – just raw, unfiltered chat.</p>
					<p class="text-end">
						<a href="#" class="btn btn-burrito">START CHAT NOW</a>
					</p>
				</div>
			</article>

			<article class="feature">
				<img class="weird" src="/images/stay-weird.svg" alt="">
				<div class="copy">
					<h3>A Spicy Investment</h3>
					<p>The Burrito AI Token is your VIP pass to exclusive content, premium features, and advanced functionalities within the Burrito AI ecosystem. As our AI grows in popularity, the demand for these tokens can increase, potentially boosting their value. Whether you're a tech enthusiast or an investor, the Burrito AI Token offers a blend of utility and growth potential, making it a hot addition to your portfolio.</p>
					<p class="text-end">
						<a href="#" class="btn btn-burrito">JOIN OUR PRESALE</a>
					</p>
				</div>
			</article>

			<article class="feature">
				<img class="lfg" src="/images/lfg.svg" alt="">
				<div class="copy">
					<h3>Burrito AI NFTs</h3>
					<p>Owning a Burrito AI NFT isn’t just about the art – it’s about being part of an exclusive community. NFT holders enjoy special perks like access to limited-edition content, exclusive events, and priority in future drops. Plus, with the growing popularity of AI-generated art, your Burrito AI NFT could become a valuable asset. So, spice up your digital collection and join the hottest NFT community around.</p>
					<p class="text-end">
						<a href="#" class="btn btn-burrito">MINT A BURRITO</a>
					</p>
				</div>
			</article>
		</div>
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
		padding: 2rem
		box-shadow: 0 2rem 0 $brand1

		@media (min-width: $sm)
			max-width: calc(100% - 200px)

		.copy
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
			top: -20px

			@media (min-width: $sm)
				width: 150px
				right: -50px
				top: -20px
</style>
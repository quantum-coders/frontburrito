<template>
	<div class="block block-features py-5 mt-5">
		<div class="container">

			<div class="copy mb-5">
				<h2 class="title mb-4 text-justify">
					Born from a collective vision and fueled by fearless innovation, BurritoAI merges cutting-edge AI
					with DeFi. Early holders unlock exclusive access and earning potential. Shape the future now.
				</h2>

				<div
					class="content-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-between mb-5">
					<p class="content mb-4 mb-sm-0 content-limited">
						Your freedom and anonymity are at the heart of everything. By
						holding <strong>$BurritoAI</strong>, you unlock fun, uncensored AI-driven chat with deep search,
						visionary image generation, and soon, on-chain trading to amplify your
						financial growth.<br><br>
						Trust is our foundation: Our smart contracts are fully audited and publicly verifiable.
						<a
							href="https://snowtrace.io/address/0xf65645a42609f6b44E2EC158A3Dc2b6CfC97093f#code"
							target="_blank"
							class="text-decoration-underline"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'View Token Contract Code' })"
						>View Token Contract</a> |
						<a
							href="https://snowtrace.io/address/0x6a6C07A4Ca2451FF67077dFf367dfD68E841BBAE#code"
							target="_blank"
							class="text-decoration-underline"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'View Staking Contract Code' })"
						>View Staking Contract</a> |
						<a
							href="https://snowtrace.io/address/0xAC1a3bD88779EFdec7C7d59B4eE2e6470741EB83#code"
							target="_blank"
							class="text-decoration-underline"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'View DeFi Billing Contract Code' })"
						>View AI-Credit Manager Contract</a>
						<br><br>
						Step in early, stake confidently, and secure a spicy key role in forging an AI-DeFi ecosystem
						that rewards bold participation and forward thinking.
						<a
							href="https://snowtrace.io/token/0xf65645a42609f6b44E2EC158A3Dc2b6CfC97093f/balances?chainid=43114"
							target="_blank"
							class="text-decoration-underline"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'View Vesting Schedule' })"
						>Check Vesting Details</a>.
					</p>
					<div class="wow-wrapper position-relative mt-4 mt-sm-0">
						<img class="wow wow-image" src="/images/wow.png" alt="WOW">
						<div class="balloon balloon-text">
							<p>SUCH UNCENSORED</p>
						</div>
					</div>
				</div>
			</div>

			<article class="feature mb-6" id="ai">
				<img class="vibes" src="/images/feel-the-vibes.svg" alt="">
				<img class="omg" src="/images/omg.svg" alt="">

				<div class="copy p-4 position-relative z-index-10">
					<h3 class="mb-4 feature-title">Free Range Conversations</h3>
					<p class="mb-4 text-content">
						Break free with uncensored and advanced AI.
						As a $BurritoAI holder, enjoy priority access to innovation, limitless chat, staking rewards, and lucrative APY. Shape AI-driven DeFi.
					</p>
					<p class="text-end mb-0">
						<nuxt-link
							to="/chat/dashboard"
							class="btn btn-burrito px-4 py-2 text-uppercase fw-bold"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Go to Chat Dashboard' })"
						>
							CHAT HERE
						</nuxt-link>
					</p>
				</div>
				<div class="animation-wrapper flex-grow-1 border-bottom-brand overflow-hidden">
					<animations-chat class="flex-grow-1"/>
				</div>
			</article>

			<article class="feature mb-6" id="tokens">
				<img class="weird" src="/images/stay-weird.svg" alt="">

				<div class="copy p-4 position-relative z-index-10">
					<h3 class="mb-4 feature-title">A Spicy Investment</h3>
					<p class="mb-4 text-content">
						Your <strong>BurritoAI Token</strong> serves as a gateway to tomorrow’s AI revolution. Secure
						elite features, premium APY, and ongoing enhancements designed for those who join
						early. With transparent audits and meticulously structured vesting, you can trust the burritoAI ecosystem.
					</p>
					<p class="text-end mb-0">
						<a
							href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f"
							target="_blank"
							class="btn btn-burrito px-4 py-2 text-uppercase fw-bold"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Buy Token from Features Section' })"
						>
							Buy & Stake
						</a>
					</p>
				</div>
				<div
					class="animation-wrapper animation-wrapper-token flex-grow-1 border-bottom-brand position-relative overflow-hidden">
					<animations-emoji-rain
						class="emoji-rain"
						:emojis="['⭐', '✨', '🌟', '🌙']"
						:speed="9"
						:density="50"
						:spawn="true"
					/>
					<img src="/images/rich-burrito.png" alt="Join Our Presale" class="rich-burrito-img">
				</div>
			</article>

			<article class="feature mb-5" id="nfts">
				<img class="lfg" src="/images/lfg.png" alt="">

				<div class="copy p-4 position-relative z-index-10">
					<h3 class="mb-4 feature-title">Spice Up</h3>
					<p class="mb-4 text-content">
						Unlocks exclusive perks and rare AI assets. Claim priority drops, visionary features, and tangible rewards. Shape the future—don’t just watch history, own it.
						<a
							href="https://app.unvest.io/projects/43114/0xf65645a42609f6b44e2ec158a3dc2b6cfc97093f/locks"
							target="_blank"
							class="text-decoration-underline"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Check Airdrop & Vesting Info' })"
						>
							Check Vesting & Airdrop Details
						</a> Secure your role in shaping the ecosystem’s trajectory. Don’t just watch history
						unfold—own it.
					</p>
				</div>
				<div
					class="animation-wrapper animation-wrapper-nfts flex-grow-1 d-flex justify-content-center align-items-center position-relative overflow-hidden">
					<img src="/images/burritos-nfts.gif" alt="Burrito NFTs" class="nfts-img">
				</div>
			</article>
		</div>


		<platform-socials class="socials" />
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
				min-width: calc(52px * 3)

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
					font-weight: 700
					font-size: 0.9rem

	.content-limited
		max-width: 600px
		line-height: 1.6

	.feature
		margin: 0 auto 8rem
		border: 3px solid $brand1
		border-radius: 0.5rem
		box-shadow: 0 2rem 0 $brand1
		display: flex
		flex-direction: column-reverse
		align-items: stretch
		position: relative

		@media (min-width: $sm)
			flex-direction: row
			max-width: calc(100% - 200px)

		.copy
			padding: 1rem
			z-index: 10
			@media (min-width: $sm)
				max-width: 65%

			h3
				text-transform: uppercase
				font-family: 'Chibold', sans-serif
				font-size: 2.5rem
				color: $brand1

			.btn-burrito
				padding: 0.5rem 2rem

		.text-content
			line-height: 1.6

		.feature-title
			font-size: 2rem
			font-weight: 900
			text-transform: uppercase
			color: $brand1

		.border-bottom-brand
			border-bottom: 2px solid $brand1

		.animation-wrapper
			flex-grow: 1
			overflow: hidden
			aspect-ratio: 1
			@media (min-width: $sm)
				aspect-ratio: auto
				border: 0

		&.animation-wrapper-token
			position: relative

			.emoji-rain
				overflow: hidden
				z-index: 1
				pointer-events: none

		.rich-burrito-img
			position: absolute
			left: 50%
			bottom: 0
			transform: translateX(-50%)
			width: 206px
			image-rendering: pixelated
			z-index: 40

			@media (min-width: $sm)
				left: 0
				width: calc(206px * 2)
				transform: none

		&.animation-wrapper-nfts
			display: flex
			justify-content: center
			align-items: center
			position: relative
			overflow: hidden

		.nfts-img
			position: absolute
			image-rendering: pixelated
			width: calc(88px * 3)
			height: auto

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

	.socials

		padding-top: 3rem
		margin-bottom: 4rem

</style>

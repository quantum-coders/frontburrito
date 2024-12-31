<template>
	<div class="buy-page pt-5">
		<!-- Hero Section -->
		<section class="hero-section position-relative text-white d-flex align-items-center">
			<div class="particles-overlay"></div>
			<div class="container position-relative z-3 py-5">
				<div class="row align-items-center">
					<div class="col-lg-7">
						<h1 class="display-3 fw-bold text-gradient mb-4">Acquire $BURRITOAI</h1>
						<p class="lead mb-4">
							Step into a world where AI innovation meets DeFi opportunity.
							Acquire $BURRITOAI on Avalanche and gain entry to an AI-driven
							ecosystem that thrives on privacy, performance, and true decentralization.
						</p>
						<div class="d-flex flex-wrap gap-3">
							<a
								href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f"
								target="_blank"
								class="btn btn-glow btn-lg"
								@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Buy BURRITO - Hero' })"
							>
								Buy on Trader Joe
							</a>
							<a
								href="https://snowtrace.io/token/0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f"
								target="_blank"
								class="btn btn-outline-light btn-lg"
								@click="useMarketingStore().trackEvent('click_link', { link_name: 'Verify Snowtrace - Hero' })"
							>
								Verify on Snowtrace
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Highlighted Info Section -->
		<section class="py-5 bg-light">
			<div class="container">
				<div class="row g-4 align-items-center">
					<div class="col-md-6">
						<div class="card shadow-sm border-0 h-100">
							<div class="card-body p-4">
								<h2 class="h4 mb-4 text-center">Contract Details</h2>
								<div class="d-flex align-items-center justify-content-between mb-3">
									<span class="text-muted">Contract:</span>
									<div class="d-flex align-items-center">
										<code class="me-2">{{ tokenAddress }}</code>
										<button class="btn btn-outline-primary btn-sm" @click="copyAddress">
											<icon name="ph:copy"/>
										</button>
									</div>
								</div>
								<div class="d-flex justify-content-between mb-2">
									<span class="text-muted">Token:</span>
									<span>BurritoAI ($BURRITOAI)</span>
								</div>
								<div class="d-flex justify-content-between mb-2">
									<span class="text-muted">Network:</span>
									<span>Avalanche (C-Chain)</span>
								</div>
								<div class="d-flex justify-content-between">
									<span class="text-muted">Decimals:</span>
									<span>18</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div
							class="info-banner p-4 rounded-3 text-white h-100 d-flex flex-column justify-content-center">
							<h2 class="h4 mb-3">Before You Buy</h2>
							<p class="mb-4">
								Ensure your wallet is configured for Avalanche, fund it with AVAX for gas,
								and always confirm the contract address from official sources.
								Keep your keys secure and stay informed.
							</p>
							<div class="text-center">
								<a
									href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f"
									target="_blank"
									class="btn btn-light"
									@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Trade Now - Info Banner' })"
								>
									Trade Now
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Steps to Buy (Vertical Timeline) -->
		<section class="py-5">
			<div class="container">
				<h2 class="text-center mb-4">How to Purchase $BURRITOAI</h2>
				<p class="text-center lead mb-5">
					Follow these streamlined steps to become part of the BurritoAI ecosystem.
				</p>

				<div class="timeline position-relative">
					<div class="timeline-line"></div>

					<div class="timeline-step d-flex flex-column flex-md-row mb-5">
						<div class="timeline-marker"></div>
						<div class="timeline-content ms-md-4">
							<h3 class="h5 mb-3">1. Configure Your Wallet</h3>
							<p class="mb-0">
								Install a Web3 wallet like MetaMask and add the Avalanche C-Chain.
								Confirm network settings before proceeding.
							</p>
						</div>
					</div>

					<div class="timeline-step d-flex flex-column flex-md-row mb-5">
						<div class="timeline-marker"></div>
						<div class="timeline-content ms-md-4">
							<h3 class="h5 mb-3">2. Add AVAX</h3>
							<p class="mb-0">
								Obtain AVAX to cover gas fees and provide liquidity for the swap.
								Transfer from an exchange or another wallet.
							</p>
						</div>
					</div>

					<div class="timeline-step d-flex flex-column flex-md-row mb-5">
						<div class="timeline-marker"></div>
						<div class="timeline-content ms-md-4">
							<h3 class="h5 mb-3">3. Access Trader Joe</h3>
							<p class="mb-0">
								Navigate to Trader Joe, select $BURRITOAI as your target token,
								and prepare to swap AVAX or another supported asset.
							</p>
						</div>
					</div>

					<div class="timeline-step d-flex flex-column flex-md-row">
						<div class="timeline-marker"></div>
						<div class="timeline-content ms-md-4">
							<h3 class="h5 mb-3">4. Execute the Swap</h3>
							<p class="mb-0">
								Enter the desired amount of $BURRITOAI, confirm transaction details,
								and finalize the swap. Welcome to the BurritoAI community!
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Safety & Verification -->
		<section class="py-5 bg-light">
			<div class="container">
				<h2 class="text-center mb-4">Stay Secure & Informed</h2>
				<p class="text-center lead mb-5">
					Make informed decisions and safeguard your investment.
					Crypto markets are dynamic, and knowledge is your best ally.
				</p>

				<div class="row g-4">
					<div class="col-md-4">
						<div class="card border-0 shadow-sm h-100 text-center p-4">
							<icon name="ph:shield-check-fill" size="32" class="text-primary mb-3"/>
							<h3 class="h6 mb-3">Official Verification</h3>
							<p class="mb-0">Double-check contract addresses and links from official BurritoAI channels
								before purchasing.</p>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card border-0 shadow-sm h-100 text-center p-4">
							<icon name="ph:key-fill" size="32" class="text-primary mb-3"/>
							<h3 class="h6 mb-3">Protect Your Keys</h3>
							<p class="mb-0">Never disclose your private keys. Maintain wallet security and verify all
								URLs before connecting.</p>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card border-0 shadow-sm h-100 text-center p-4">
							<icon name="ph:info-fill" size="32" class="text-primary mb-3"/>
							<h3 class="h6 mb-3">Research the Project</h3>
							<p class="mb-0">Understand BurritoAI’s vision, roadmap, and community engagement before
								making your purchase.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Final CTA -->
		<section class="final-cta-section py-5 text-white text-center position-relative">
			<div class="particles-overlay"></div>
			<div class="container position-relative z-3">
				<h2 class="mb-4 fw-bold">Embrace the Future of Decentralized AI</h2>
				<p class="lead mb-4">
					Secure your $BURRITOAI tokens now and join a forward-thinking
					ecosystem that pairs AI ingenuity with blockchain security.
				</p>
				<a
					href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f"
					target="_blank"
					class="btn btn-glow btn-lg"
					@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Start Your Journey - Final CTA' })"
				>
					Start Your Journey
				</a>
			</div>
		</section>
	</div>
</template>

<script setup>
	const tokenAddress = '0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f'

	const copyAddress = async () => {
		await navigator.clipboard.writeText(tokenAddress)
		// Optional: You could add a local UI notification here.
	}

	// SEO Setup
	const title = 'Buy $BURRITOAI - Step into AI-Driven DeFi on Avalanche'
	const description = 'Learn how to buy $BURRITOAI, the native token fueling the BurritoAI ecosystem. Get on board with AI-powered DeFi on Avalanche and secure your place in a future without boundaries.'

	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			{property: 'og:type', content: 'website'},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance/buy'},
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			{
				name: 'keywords',
				content: 'buy burrito token, burritoAI, AVAX token, trader joe, avalanche blockchain, decentralized exchange, crypto investing, ai defi'
			}
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance/buy'}
		]
	})

	definePageMeta({
		layout: 'burrito'
	})
</script>

<style lang="sass" scoped>

	.buy-page
		.hero-section
			background: radial-gradient(circle at 50% 50%, #2d2d2d 0%, #1a1a1a 100%)
			min-height: 60vh
			position: relative
			overflow: hidden
			z-index: 1

			.particles-overlay
				position: absolute
				top: 0
				left: 0
				right: 0
				bottom: 0
				background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
				z-index: -1

		.text-gradient
			background: linear-gradient(135deg, #fff 0%, #ffd700 100%)
			-webkit-background-clip: text
			-webkit-text-fill-color: transparent

		.btn-glow
			background: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%)
			border: none
			color: white
			font-weight: 600
			position: relative
			overflow: hidden
			transition: all 0.3s ease

			&:hover
				transform: translateY(-2px)
				box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2)

			&:after
				content: ''
				position: absolute
				top: -50%
				left: -50%
				width: 200%
				height: 200%
				background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)
				transform: rotate(45deg)
				animation: glow 3s infinite

		@keyframes glow
			0%
				transform: rotate(45deg) translateY(0)
			50%
				transform: rotate(45deg) translateY(-10%)
			100%
				transform: rotate(45deg) translateY(0)

	.info-banner
		background: linear-gradient(135deg, $primary 0%, darken($primary, 15%) 100%)
		color: white

	.timeline
		position: relative

		.timeline-line
			position: absolute
			left: 15px
			top: 0
			bottom: 0
			width: 2px
			background: rgba(0, 0, 0, 0.1)
			margin-left: 0.5rem

		.timeline-step
			position: relative

			.timeline-marker
				width: 30px
				height: 30px
				background: $primary
				border-radius: 50%
				position: absolute
				left: 0
				top: 0.2rem
				transform: translate(-50%, 0)

			.timeline-content
				background: #fff
				border-radius: 0.5rem
				box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05)
				padding: 1rem 1.5rem

	.final-cta-section
		background: radial-gradient(circle at 50% 50%, #2d2d2d 0%, #1a1a1a 100%)
		position: relative
		overflow: hidden

		.particles-overlay
			position: absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
			z-index: -1
</style>

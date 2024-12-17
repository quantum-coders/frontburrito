<template>
	<section
		class="whitepaper-section position-relative overflow-hidden text-white d-flex align-items-center justify-content-center mt-5">
		<div class="particles-overlay"></div>
		<div class="container position-relative z-3 py-5">
			<div class="row align-items-center">
				<div class="col-lg-6 mb-5 mb-lg-0">
					<div class="content-box p-4 rounded-3 bg-glass">
						<h2 class="display-4 fw-bold mb-4 text-gradient">Explore Our Whitepaper</h2>
						<p class="lead mb-4">
							Dive deep into the BurritoAI vision, technology, and tokenomics.
							Our comprehensive whitepaper details the strategic roadmap,
							security measures, and the innovative AI-driven ecosystem
							powering our platform.
						</p>
						<ul class="list-unstyled mb-4">
							<li class="d-flex align-items-start mb-3">
								<icon name="ph:check-circle-fill" class="text-primary me-3" size="24"/>
								<div>
									<strong>In-Depth Tokenomics:</strong> Understand the long-term economics and vesting
									schedules.
								</div>
							</li>
							<li class="d-flex align-items-start mb-3">
								<icon name="ph:check-circle-fill" class="text-primary me-3" size="24"/>
								<div>
									<strong>AI & Blockchain Synergy:</strong> Learn how our AI protocols thrive on
									Avalanche's fast, secure network.
								</div>
							</li>
							<li class="d-flex align-items-start">
								<icon name="ph:check-circle-fill" class="text-primary me-3" size="24"/>
								<div>
									<strong>Sustainable Growth Strategy:</strong> Discover how BurritoAI ensures
									long-term value and community-driven development.
								</div>
							</li>
						</ul>
						<div class="d-flex gap-3 flex-wrap">
							<a
								href="/BurritoAI-Whitepaper.pdf"
								target="_blank"
								class="btn btn-glow btn-lg"
								@click="marketingStore.trackEvent('click_link', { link_name: 'Whitepaper Download - Main CTA' })"
							>
								Download Whitepaper
							</a>
							<a
								href="https://snowtrace.io/token/0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f"
								target="_blank"
								class="btn btn-outline-light btn-lg"
								@click="marketingStore.trackEvent('click_link', { link_name: 'Snowtrace Link - Whitepaper Section' })"
							>
								Verify on Snowtrace
							</a>
						</div>
					</div>
				</div>
				<div class="col-lg-6 text-center text-lg-end">
					<div class="paper-image-container d-inline-block position-relative">
						<div class="floating-illustration bg-glass rounded-3 p-4">
							<icon name="ph:file-text-fill" size="64" class="text-white"/>
							<h3 class="h5 mt-3 mb-0 text-white">BurritoAI Whitepaper</h3>
						</div>
						<div class="blur-bubble"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	const marketingStore = useMarketingStore()

	const title = 'BurritoAI Whitepaper - Unveiling Our Vision & Technology'
	const description = 'Download the BurritoAI whitepaper to explore our groundbreaking AI-driven ecosystem, tokenomics, and long-term strategy on the Avalanche network. Secure your spot in the future of AI and DeFi.'

	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			{property: 'og:type', content: 'website'},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance/whitepaper'},
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			{
				name: 'keywords',
				content: 'BurritoAI whitepaper, AI DeFi, tokenomics, avalanche blockchain, AI-driven ecosystem, crypto research, blockchain investment, future of AI'
			}
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance/whitepaper'}
		]
	})
	definePageMeta({
		layout: 'burrito'
	})
</script>

<style lang="sass" scoped>

	.whitepaper-section
		min-height: 80vh
		background: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #2d2d2d 100%)
		position: relative
		z-index: 1
		display: flex

		.particles-overlay
			position: absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
			z-index: -1

		.bg-glass
			background: rgba(255, 255, 255, 0.1)
			backdrop-filter: blur(10px)
			border: 1px solid rgba(255, 255, 255, 0.1)
			border-radius: 16px

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

		.paper-image-container
			position: relative

			.floating-illustration
				width: 200px
				height: 200px
				display: flex
				flex-direction: column
				align-items: center
				justify-content: center
				border-radius: 16px
				background: rgba(255, 255, 255, 0.1)
				backdrop-filter: blur(10px)
				transition: transform 0.3s ease, box-shadow 0.3s ease
				margin: auto

				&:hover
					transform: translateY(-5px)
					box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175)

			.blur-bubble
				position: absolute
				width: 100px
				height: 100px
				background: rgba($primary, 0.4)
				border-radius: 50%
				filter: blur(50px)
				top: -20px
				right: -20px
				animation: floatBubble 6s ease-in-out infinite

		@keyframes floatBubble
			0%, 100%
				transform: translateY(0)
			50%
				transform: translateY(-10px)
</style>

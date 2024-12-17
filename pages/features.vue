<template>
	<div class="features-page pt-5">
		<!-- Hero Section -->
		<section class="hero-section py-5 bg-dark text-white">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-lg-8 mx-auto text-center">
						<h1 class="display-4 fw-bold mb-4">Privacy-First AI Revolution</h1>
						<p class="lead mb-4">Experience unrestricted AI capabilities while maintaining complete
							anonymity through blockchain technology</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Main Features -->
		<section class="main-features py-5">
			<div class="container">
				<!-- Privacy & Security Section -->
				<div class="row g-4 mb-5">
					<div class="col-12">
						<h2 class="text-center mb-4">Privacy & Security First</h2>
						<p class="text-center lead mb-5">No personal data required - just connect your crypto wallet and
							start exploring</p>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:shield-check-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Complete Anonymity</h3>
								<p class="mb-0">Access all features using only your crypto wallet - no phone numbers,
									emails, or personal data required.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:lock-key-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Decentralized Infrastructure</h3>
								<p class="mb-0">Built on Avalanche blockchain for maximum security and transparency in
									every interaction.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:wallet-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Flexible DeFi Billing</h3>
								<p class="mb-0">Pay for services through smart contracts - no traditional payment
									methods needed.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- AI Capabilities -->
				<div class="row g-4 mb-5">
					<div class="col-12">
						<h2 class="text-center mb-4">Unrestricted AI Power</h2>
						<p class="text-center lead mb-5">Experience AI without artificial limitations or biased
							filters</p>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:chat-circle-text-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Uncensored Conversations</h3>
								<p class="mb-0">Engage with AI models free from content restrictions or filters - pure,
									unbiased interactions.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:magnifying-glass-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Optional Deep Web Search</h3>
								<p class="mb-0">Enable advanced search capabilities for comprehensive information access
									when needed.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:brain-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Advanced LLMs</h3>
								<p class="mb-0">Access cutting-edge Large Language Models without compromising on
									performance or privacy.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Tokenomics Benefits -->
				<div class="row g-4">
					<div class="col-12">
						<h2 class="text-center mb-4">Rewarding Economics</h2>
						<p class="text-center lead mb-5">Hold $BURRITO tokens for exclusive benefits and earning
							potential</p>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:chart-line-up-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">High APY Staking</h3>
								<p class="mb-0">Earn substantial returns through our carefully designed staking program
									with up to 19.72% APY.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:users-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Community Governance</h3>
								<p class="mb-0">Shape the future of BurritoAI through token-based voting and community
									participation.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-hover">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10">
									<icon name="ph:fire-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Token Burns</h3>
								<p class="mb-0">Regular token burns ensure long-term value appreciation and sustainable
									tokenomics.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<marketing-cta
			page-name="Features Page"
			dark-mode
			title="Ready to Experience Uncensored AI?"
			subtitle="Join now and unlock the full potential of decentralized AI"
		/>
	</div>
</template>

<script setup>
	const title = 'BurritoAI Features - Privacy-First AI & DeFi on Avalanche'
	const description = 'Access uncensored AI capabilities anonymously through blockchain technology. Experience unrestricted conversations, optional deep web search, and earn up to 19.72% APY on Avalanche.'

	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			// Open Graph / Facebook
			{property: 'og:type', content: 'website'},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance/features'},
			// Twitter
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			// Keywords
			{
				name: 'keywords',
				content: 'decentralized AI, privacy AI, uncensored AI, DeFi staking, Avalanche blockchain, anonymous AI chat, deep web search, high APY crypto, BurritoAI token, blockchain privacy'
			},
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance/features'}
		],
	})

	definePageMeta({
		layout: 'burrito',
	})
</script>

<style lang="sass" scoped>
	.feature-icon
		width: 64px
		height: 64px
		display: flex
		align-items: center
		justify-content: center
		border-radius: 12px

	.shadow-hover
		transition: all 0.3s ease

		&:hover
			transform: translateY(-5px)
			box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175) !important

	.bg-dark
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)
</style>

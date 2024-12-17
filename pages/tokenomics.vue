<template>
	<div class="tokenomics-page pt-5">
		<!-- Hero Section -->
		<section class="hero-section py-5 bg-dark text-white">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-lg-8 mx-auto text-center">
						<h1 class="display-4 fw-bold mb-4">BurritoAI Tokenomics</h1>
						<p class="lead mb-4">Strategic token distribution with verifiable on-chain transparency</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Transparency Banner -->
		<section class="py-4 bg-light border-bottom">
			<div class="container">
				<div class="row">
					<div class="col-12 text-center">
						<a
							href="https://snowtrace.io/token/0xf65645a42609f6b44E2EC158A3Dc2b6CfC97093f/balances?chainid=43114"
							target="_blank"
							rel="noopener noreferrer"
							class="d-inline-flex align-items-center gap-2 text-decoration-none"
							@click="useMarketingStore().trackEvent('click_link', { link_name: 'View Holders - Snowtrace' })"
						>
							<icon name="ph:chart-pie-slice-fill" class="text-primary"/>
							View all token holders and vesting contracts on Snowtrace
							<icon name="ph:arrow-right"/>
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Distribution Details -->
		<section class="py-5">
			<div class="container">
				<!-- Distribution Table -->
				<div class="row mb-5">
					<div class="col-12">
						<div class="card border-0 shadow-sm">
							<div class="card-header bg-white py-4">
								<h2 class="h4 mb-0 text-center">Token Distribution</h2>
							</div>
							<div class="card-body p-0">
								<div class="table-responsive">
									<table class="table table-hover mb-0">
										<thead class="bg-light">
										<tr>
											<th class="border-0">Category</th>
											<th class="border-0 text-end">Tokens</th>
											<th class="border-0 text-end">Percentage</th>
											<th class="border-0 text-end">Value</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>
												<div class="d-flex align-items-center">
													<span class="badge bg-primary me-2">1</span>
													Visionaries DAO
													<span class="badge bg-secondary ms-2">7-Year Vesting</span>
												</div>
											</td>
											<td class="text-end">67,907,977</td>
											<td class="text-end">22.64%</td>
											<td class="text-end">$0.00</td>
										</tr>
										<tr>
											<td>
												<div class="d-flex align-items-center">
													<span class="badge bg-primary me-2">2</span>
													Staking Rewards Contract
												</div>
											</td>
											<td class="text-end">32,870,379</td>
											<td class="text-end">10.96%</td>
											<td class="text-end">$0.00</td>
										</tr>
										<!-- Add all other rows following the same pattern -->
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Key Features -->
				<div class="row g-4 mb-5">
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-sm">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10 rounded-circle">
									<icon name="ph:lock-key-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Long-Term Vesting</h3>
								<p class="mb-0">7-year vesting schedules for core allocations ensure sustainable growth
									and alignment with long-term goals.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-sm">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10 rounded-circle">
									<icon name="ph:fire-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Continuous Burns</h3>
								<p class="mb-0">4.40% allocated to Continuous Null Burn mechanism for progressive token
									scarcity and value appreciation.</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-sm">
							<div class="card-body p-4">
								<div class="feature-icon mb-3 bg-primary bg-opacity-10 rounded-circle">
									<icon name="ph:chart-line-up-fill" class="text-primary" size="32"/>
								</div>
								<h3 class="h5 mb-3">Staking Rewards</h3>
								<p class="mb-0">Combined 18% allocation for staking rewards ensures sustainable yield
									for long-term holders.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Transparency Section -->
				<div class="row mb-2">
					<div class="col-12">
						<div class="card border-0 bg-light">
							<div class="card-body p-4">
								<h3 class="h4 mb-4 text-center">Verify On-Chain</h3>
								<div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
									<a
										href="/BurritoAI-Whitepaper.pdf"
										target="_blank"
										class="btn btn-outline-primary"
										@click="useMarketingStore().trackEvent('click_link', { link_name: 'View Whitepaper' })"
									>
										<icon name="ph:file-text-fill" class="me-2"/>
										Whitepaper
									</a>
									<a
										href="https://snowtrace.io/token/0xf65645a42609f6b44E2EC158A3Dc2b6CfC97093f"
										target="_blank"
										class="btn btn-outline-primary"
										@click="useMarketingStore().trackEvent('click_link', { link_name: 'View Token Contract' })"
									>
										<icon name="ph:file-code-fill" class="me-2"/>
										Token Contract
									</a>
									<a
										href="https://snowtrace.io/token/0xf65645a42609f6b44E2EC158A3Dc2b6CfC97093f/balances"
										target="_blank"
										class="btn btn-outline-primary"
										@click="useMarketingStore().trackEvent('click_link', { link_name: 'View Holders' })"
									>
										<icon name="ph:users-fill" class="me-2"/>
										View Holders
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<marketing-cta
			page-name="Tokenomics Page"
			dark-mode
			title="Join the BurritoAI Ecosystem"
			subtitle="Participate early and secure your position in the future of AI and DeFi"
		/>
	</div>
</template>

<script setup>
	const title = 'BurritoAI Tokenomics - Transparent Token Distribution & Vesting'
	const description = 'Explore BurritoAI\'s tokenomics: verifiable on-chain distribution, 7-year vesting schedules, and sustainable staking rewards. View all holders and vesting contracts on Snowtrace.'

	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			// Open Graph / Facebook
			{property: 'og:type', content: 'website'},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance/tokenomics'},
			// Twitter
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			// Keywords
			{
				name: 'keywords',
				content: 'BurritoAI tokenomics, BURRITO token holders, token vesting, token distribution, staking rewards, DeFi token, Avalanche token, token burns, crypto investment, blockchain transparency'
			},
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance/tokenomics'}
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

	.bg-dark
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)

	.table
		th, td
			padding: 1rem
			vertical-align: middle

		td
			.badge
				font-weight: normal

	.btn-outline-primary:hover
		.icon
			color: white
</style>

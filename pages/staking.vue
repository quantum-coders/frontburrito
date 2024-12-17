<template>
	<div class="staking-page">
		<!-- Hero Section with Live Stats -->
		<section class="hero-section position-relative">
			<div class="particles-overlay"></div>
			<div class="container position-relative z-3">
				<div class="row min-vh-75 align-items-center ">
					<div class="col-lg-6 ">
						<h1 class="display-3 fw-bold text-gradient mb-4">Stake & Earn Real Rewards</h1>
						<div class="stats-card bg-glass p-4 mb-4">
							<div class="d-flex justify-content-between mb-3">
								<span class="text-white">Current APY</span>
								<span class="fs-4 fw-bold text-success">Up to 19.72%</span>
							</div>
							<div class="d-flex justify-content-between mb-3">
								<span class="text-white">Total Value Locked</span>
								<span class="fs-4 fw-bold text-white">{{ formatNumber(tvl) }} $BURRITO</span>
							</div>
							<div class="d-flex justify-content-between">
								<span class="text-white">Total Stakers</span>
								<span class="fs-4 fw-bold text-white">{{ formatNumber(totalStakers) }}</span>
							</div>
						</div>
						<div class="d-flex gap-3">
							<nuxt-link
								to="/staking-dashboard"
								class="btn btn-glow btn-lg"
								@click="openStakingDashboard(); useMarketingStore().trackEvent('click_cta', { cta_name: 'Start Staking - Hero' })"
							>
								Start Earning Now
							</nuxt-link>
							<a
								href="#calculator"
								class="btn btn-outline-light btn-lg"
								@click="useMarketingStore().trackEvent('click_link', { link_name: 'Calculate Rewards' })"
							>
								Calculate Rewards
							</a>
						</div>
					</div>
					<div class="col-lg-6 d-none d-lg-block">
						<div class="floating-cards">
							<div class="reward-card bg-glass p-4 floating">
								<div class="recent-stake text-white">
									<div class="d-flex align-items-center gap-3 mb-2">
										<div class="reward-icon">🚀</div>
										<div>
											<h3 class="h5 mb-1">Recent Stake</h3>
											<p class="mb-0">{{ formatAddress(recentStake.address) }} staked</p>
											<p class="mb-0 text-success">{{ formatNumber(recentStake.amount) }}
												$BURRITO</p>
										</div>
									</div>
								</div>
							</div>
							<div class="reward-card bg-glass p-4 floating-delayed">
								<div class="latest-reward text-white">
									<div class="d-flex align-items-center gap-3 mb-2">
										<div class="reward-icon">💎</div>
										<div>
											<h3 class="h5 mb-1">Latest Reward</h3>
											<p class="mb-0">{{ formatAddress(latestReward.address) }} earned</p>
											<p class="mb-0 text-success">{{ formatNumber(latestReward.amount) }}
												$BURRITO</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- How It Works -->
		<section class="py-5 bg-light">
			<div class="container">
				<h2 class="text-center mb-5">How BurritoAI Staking Works</h2>
				<div class="row g-4">
					<div class="col-md-3">
						<div class="step-card bg-white p-4 rounded-3 shadow-sm h-100">
							<div class="step-number mb-3">1</div>
							<h3 class="h5 mb-3">Connect Wallet</h3>
							<p class="mb-0">Connect your Web3 wallet containing $BURRITO tokens to get started.</p>
						</div>
					</div>
					<div class="col-md-3">
						<div class="step-card bg-white p-4 rounded-3 shadow-sm h-100">
							<div class="step-number mb-3">2</div>
							<h3 class="h5 mb-3">Choose Period</h3>
							<p class="mb-0">Select your preferred staking duration: 30-365 days. Longer periods earn
								higher APY.</p>
						</div>
					</div>
					<div class="col-md-3">
						<div class="step-card bg-white p-4 rounded-3 shadow-sm h-100">
							<div class="step-number mb-3">3</div>
							<h3 class="h5 mb-3">Stake Tokens</h3>
							<p class="mb-0">Approve and stake your tokens. Smart contract ensures your funds are
								secure.</p>
						</div>
					</div>
					<div class="col-md-3">
						<div class="step-card bg-white p-4 rounded-3 shadow-sm h-100">
							<div class="step-number mb-3">4</div>
							<h3 class="h5 mb-3">Earn Rewards</h3>
							<p class="mb-0">Watch your rewards grow in real-time. Claim them once your period ends.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Calculator Section -->
		<section id="calculator" class="py-5">
			<div class="container">
				<div class="row g-4">
					<div class="col-lg-6">
						<div class="card border-0 bg-dark h-100">
							<div class="card-body p-4">
								<h3 class="text-white mb-4">Rewards Calculator</h3>
								<div class="mb-4">
									<label class="form-label text-white">Amount to Stake</label>
									<div class="input-group">
										<span class="input-group-text">$BURRITO</span>
										<input
											type="number"
											class="form-control"
											v-model="calculatorAmount"
											@input="calculateRewards"
										>
									</div>
								</div>
								<div class="mb-4">
									<label class="form-label text-white">Staking Period</label>
									<div class="period-selector d-flex gap-2 flex-wrap">
										<button
											v-for="period in [30, 90, 180, 365]"
											:key="period"
											class="btn"
											:class="selectedPeriod === period ? 'btn-primary' : 'btn-outline-light'"
											@click="selectedPeriod = period; calculateRewards()"
										>
											{{ period }} Days
										</button>
									</div>
								</div>
								<div class="results p-3 bg-glass rounded">
									<div class="d-flex justify-content-between mb-2">
										<span class="text-white">Estimated Rewards:</span>
										<span class="text-success">{{ calculatedRewards }} $BURRITO</span>
									</div>
									<div class="d-flex justify-content-between">
										<span class="text-white">APY Rate:</span>
										<span class="text-success">{{ selectedPeriod >= 365 ? '19.72%' : '11%' }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Staking Comparison Table -->
					<div class="col-lg-6">
						<div class="card border-0 shadow-sm h-100">
							<div class="card-body p-4">
								<h3 class="mb-4">Staking Periods Comparison</h3>
								<div class="table-responsive">
									<table class="table table-hover">
										<thead>
										<tr>
											<th>Duration</th>
											<th>APY</th>
											<th>Min Stake</th>
											<th>Features</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>30 Days</td>
											<td>11.00%</td>
											<td>100 $BURRITO</td>
											<td>Basic Rewards</td>
										</tr>
										<tr>
											<td>90 Days</td>
											<td>13.50%</td>
											<td>100 $BURRITO</td>
											<td>Enhanced Rewards</td>
										</tr>
										<tr>
											<td>180 Days</td>
											<td>16.25%</td>
											<td>100 $BURRITO</td>
											<td>Premium Rewards</td>
										</tr>
										<tr>
											<td>365 Days</td>
											<td>19.72%</td>
											<td>100 $BURRITO</td>
											<td>Maximum Rewards</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Recent Activity -->
		<section class="py-5 bg-dark text-white">
			<div class="container">
				<h2 class="text-center mb-5">Recent Staking Activity</h2>
				<div class="table-responsive">
					<table class="table table-dark table-hover">
						<thead>
						<tr>
							<th>Address</th>
							<th>Action</th>
							<th>Amount</th>
							<th>Time</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="activity in recentActivity" :key="activity.id">
							<td>{{ formatAddress(activity.address) }}</td>
							<td>
                                    <span :class="`badge bg-${activity.type === 'stake' ? 'success' : 'primary'}`">
                                        {{ activity.type === 'stake' ? 'Staked' : 'Claimed' }}
                                    </span>
							</td>
							<td>{{ formatNumber(activity.amount) }} $BURRITO</td>
							<td>{{ formatTime(activity.timestamp) }}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<!-- Security Features -->
		<section class="py-5">
			<div class="container">
				<h2 class="text-center mb-5">Security & Transparency</h2>
				<div class="row g-4">
					<div class="col-md-4">
						<div class="security-card text-center p-4">
							<div class="security-icon mb-3">🔒</div>
							<h3 class="h5 mb-3">Audited Contract</h3>
							<p class="mb-0">Smart contract audited by leading security firms ensuring your funds are
								safe.</p>
							<a
								href="https://snowtrace.io/address/0x6a6C07A4Ca2451FF67077dFf367dfD68E841BBAE"
								target="_blank"
								class="stretched-link"
								@click="useMarketingStore().trackEvent('click_link', { link_name: 'View Contract' })"
							></a>
						</div>
					</div>
					<div class="col-md-4">
						<div class="security-card text-center p-4">
							<div class="security-icon mb-3">📊</div>
							<h3 class="h5 mb-3">Transparent Rules</h3>
							<p class="mb-0">Clear staking rules and rewards calculation visible on-chain.</p>
							<a
								href="/BurritoAI-Whitepaper.pdf"
								target="_blank"
								class="stretched-link"
								@click="useMarketingStore().trackEvent('click_link', { link_name: 'View Documentation' })"
							></a>
						</div>
					</div>
					<div class="col-md-4">
						<div class="security-card text-center p-4">
							<div class="security-icon mb-3">⚡</div>
							<h3 class="h5 mb-3">Instant Withdrawals</h3>
							<p class="mb-0">Claim your rewards instantly once your staking period ends.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="py-5 bg-light">
			<div class="container">
				<h2 class="text-center mb-5">Frequently Asked Questions</h2>
				<div class="row">
					<div class="col-lg-8 mx-auto">
						<div class="accordion" id="stakingFaq">
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button" type="button" data-bs-toggle="collapse"
											data-bs-target="#faq1">
										What is the minimum staking amount?
									</button>
								</h2>
								<div id="faq1" class="accordion-collapse collapse show">
									<div class="accordion-body">
										The minimum staking amount is 100 $BURRITO tokens.
									</div>
								</div>
							</div>
							<!-- Add more FAQ items -->
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ Section (Continuación) -->
		<section class="py-5 bg-light">
			<div class="container">
				<h2 class="text-center mb-5">Frequently Asked Questions</h2>
				<div class="row">
					<div class="col-lg-8 mx-auto">
						<div class="accordion" id="stakingFaq">
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
											data-bs-target="#faq2">
										How are rewards calculated?
									</button>
								</h2>
								<div id="faq2" class="accordion-collapse collapse">
									<div class="accordion-body">
										Rewards are calculated based on your staking amount and duration. Annual staking
										(365 days) earns 19.72% APY, while shorter periods earn proportionally adjusted
										rates.
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
											data-bs-target="#faq3">
										Can I withdraw early?
									</button>
								</h2>
								<div id="faq3" class="accordion-collapse collapse">
									<div class="accordion-body">
										No, tokens are locked for the duration of your chosen staking period. This helps
										maintain stability and ensures fair rewards for all stakers.
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
											data-bs-target="#faq4">
										Are rewards auto-compounding?
									</button>
								</h2>
								<div id="faq4" class="accordion-collapse collapse">
									<div class="accordion-body">
										Currently, rewards are not auto-compounding. You can claim your rewards once
										your staking period ends and choose to restake them for additional earnings.
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
											data-bs-target="#faq5">
										Is there a maximum staking amount?
									</button>
								</h2>
								<div id="faq5" class="accordion-collapse collapse">
									<div class="accordion-body">
										Yes, the maximum staking amount per wallet is 1,000,000 $BURRITO tokens to
										ensure fair distribution of rewards.
									</div>
								</div>
							</div>
							<!-- Add more FAQs if needed -->
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Final CTA -->
		<section class="py-5 bg-dark text-white">
			<div class="container">
				<div class="row">
					<div class="col-lg-8 mx-auto text-center">
						<h2 class="mb-4">Start Earning Rewards Today</h2>
						<p class="lead mb-4">Join thousands of holders already earning up to 19.72% APY through
							staking</p>
						<div class="d-flex gap-3 justify-content-center">
							<nuxt-link
								to="/staking-dashboard"
								class="btn btn-glow btn-lg"
								@click="openStakingDashboard(); useMarketingStore().trackEvent('click_cta', { cta_name: 'Start Staking - Bottom' })"
							>
								Start Staking Now
							</nuxt-link>
							<a
								href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44E2EC158A3Dc2b6Cfc97093f"
								target="_blank"
								class="btn btn-outline-light btn-lg"
								@click="useMarketingStore().trackEvent('click_cta', { cta_name: 'Buy BURRITO - Bottom' })"
							>
								Buy $BURRITO
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	const title = 'Stake $BURRITO - Earn Up to 19.72% APY with Real-time Rewards'
	const description = 'Start earning passive rewards by staking your $BURRITO tokens. Choose flexible staking periods, track real-time earnings, and participate in our secure staking program.'

	// State
	const showDashboard = ref(false)
	const calculatorAmount = ref(1000)
	const selectedPeriod = ref(30)
	const tvl = ref(2500000)
	const totalStakers = ref(1234)

	// Mock data for recent activity
	const recentActivity = ref([
		{id: 1, address: '0x1234...5678', type: 'stake', amount: 50000, timestamp: Date.now() - 300000},
		{id: 2, address: '0x8765...4321', type: 'claim', amount: 2500, timestamp: Date.now() - 900000},
		// Add more mock data if needed
	])

	const recentStake = ref({
		address: '0x1234...5678',
		amount: 50000
	})

	const latestReward = ref({
		address: '0x8765...4321',
		amount: 2500
	})

	// Computed
	const calculatedRewards = computed(() => {
		const rate = selectedPeriod.value >= 365 ? 0.1972 : 0.11
		return ((calculatorAmount.value * rate) / 365 * selectedPeriod.value).toFixed(2)
	})

	// Methods
	const formatNumber = (num) => {
		return new Intl.NumberFormat('en-US').format(num)
	}

	const formatAddress = (address) => {
		return address // Already formatted in mock data
	}

	const formatTime = (timestamp) => {
		return new Intl.RelativeTimeFormat('en', {numeric: 'auto'}).format(
			-Math.round((Date.now() - timestamp) / 60000),
			'minutes'
		)
	}

	const openStakingDashboard = () => {
		showDashboard.value = true
		useMarketingStore().trackEvent('open_staking_dashboard', {})
	}

	const closeDashboard = () => {
		showDashboard.value = false
	}

	// SEO
	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance/staking'},
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			{
				name: 'keywords',
				content: 'BurritoAI staking, crypto staking, high APY staking, passive income crypto, AVAX staking, secure staking, token rewards, DeFi staking'
			},
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance/staking'}
		],
	})

	definePageMeta({
		layout: 'burrito',
	})

	onMounted(() => {
		// loadContractData() could be called here if needed
	})
</script>

<style lang="sass" scoped>
	.staking-page
		.hero-section
			background: radial-gradient(circle at 50% 50%, #2d2d2d 0%, #1a1a1a 100%)
			min-height: 75vh
			color: white
			position: relative
			overflow: hidden
			z-index: 1
			padding-top: 100px

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

		.bg-glass
			background: rgba(255, 255, 255, 0.1)
			backdrop-filter: blur(10px)
			border: 1px solid rgba(255, 255, 255, 0.1)
			border-radius: 16px

	.floating-cards
		position: relative
		height: 400px

		.reward-card
			position: absolute
			width: 300px
			backdrop-filter: blur(10px)
			border: 1px solid rgba(255, 255, 255, 0.1)
			background: rgba(255, 255, 255, 0.1)
			border-radius: 16px
			padding: 20px
			color: white
			transition: all 0.3s ease

			&.floating
				animation: float 6s ease-in-out infinite
				top: 300px
				right: 0

			&.floating-delayed
				animation: float 6s ease-in-out infinite 2s
				top: 200px
				right: 50px

		.reward-icon
			font-size: 2rem
			line-height: 1
			margin-bottom: 0.5rem

	.btn-glow
		background: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%)
		border: none
		color: white
		position: relative
		overflow: hidden
		transition: all 0.3s ease
		font-weight: 600

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
			background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)
			transform: rotate(45deg)
			animation: glow 3s infinite

	@keyframes glow
		0%
			transform: rotate(45deg) translateY(0)
		50%
			transform: rotate(45deg) translateY(-10%)
		100%
			transform: rotate(45deg) translateY(0)

	.stats-card
		backdrop-filter: blur(10px)
		border: 1px solid rgba(255, 255, 255, 0.1)
		border-radius: 16px

	.security-card
		background: white
		border-radius: 1rem
		transition: transform 0.3s ease, box-shadow 0.3s ease
		cursor: pointer

		&:hover
			transform: translateY(-5px)
			box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175)

		.security-icon
			font-size: 2.5rem

	.step-number
		width: 40px
		height: 40px
		background: $primary
		color: white
		border-radius: 50%
		display: flex
		align-items: center
		justify-content: center
		font-weight: bold
		font-size: 1.2rem

	.accordion-button
		&:not(.collapsed)
			background-color: rgba($primary, 0.1)
			color: $primary

	.table-dark
		background-color: transparent

		td, th
			color: white
			border-color: rgba(255, 255, 255, 0.1)

	.badge
		font-weight: normal
		padding: 0.5em 1em

	@keyframes float
		0%, 100%
			transform: translateY(0) rotate(-2deg)
		50%
			transform: translateY(-20px) rotate(2deg)

	@keyframes glow
		0%
			transform: rotate(45deg) translateY(0)
		50%
			transform: rotate(45deg) translateY(-10%)
		100%
			transform: rotate(45deg) translateY(0)

	@media (max-width: 768px)
		.floating-cards
			display: none

		.hero-section
			min-height: 50vh

		.stats-card
			margin-bottom: 2rem

	::-webkit-scrollbar
		width: 8px
		height: 8px

	::-webkit-scrollbar-track
		background: rgba(255, 255, 255, 0.1)
		border-radius: 4px

	::-webkit-scrollbar-thumb
		background: rgba(255, 255, 255, 0.3)
		border-radius: 4px

		&:hover
			background: rgba(255, 255, 255, 0.4)

	.btn:focus, .form-control:focus
		box-shadow: 0 0 0 0.25rem rgba(#0d6efd, 0.25)
</style>

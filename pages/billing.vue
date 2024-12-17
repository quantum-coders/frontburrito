<template>
	<div class="billing-page py-5 mt-5">
		<div class="container">
			<template v-if="web3Store.initLoading">
				<!-- Loading state -->
				<div class="d-flex justify-content-center align-items-center my-5">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
			</template>
			<template v-else-if="web3Store.isConnected && !web3Store.initLoading">
				<!-- Billing Dashboard -->
				<h1 class="display-5 fw-bold text-primary mb-4">My Billing Dashboard</h1>
				<p class="lead mb-5">
					Review your billing history, manage payments, and track usage for BurritoAI services.
				</p>
				<!-- Billing component -->
				<web3-billing
					:show-close-button="false"
				/>
			</template>
			<template v-else>
				<!-- Not connected -->
				<div class="text-center my-5">
					<h2 class="mb-4">Please Connect Your Wallet</h2>
					<p class="text-muted mb-4">To access the billing dashboard, please connect your Web3 wallet.</p>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
	const web3Store = useWeb3Store()
	const marketingStore = useMarketingStore()

	const title = 'BurritoAI Billing - Manage Your Payments & Usage'
	const description = 'Access the BurritoAI billing dashboard to review transaction history, manage payments, and track usage of AI-driven DeFi services.'

	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			{property: 'og:type', content: 'website'},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance/billing-dashboard'},
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			{
				name: 'keywords',
				content: 'BurritoAI billing, billing dashboard, crypto payments, DeFi services, usage tracking'
			}
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance/billing-dashboard'}
		]
	})

	definePageMeta({
		layout: 'burrito'
	})

	onMounted(() => {
		marketingStore.trackEvent('view_billing_dashboard', {})
	})
</script>

<style scoped>
	.billing-page {
		min-height: 100vh;
	}
</style>

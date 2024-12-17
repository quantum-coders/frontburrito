<template>
	<section class="cta-section py-5" :class="darkMode ? 'bg-dark text-white' : 'bg-light'">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 mx-auto text-center">
					<h2 class="mb-4">{{ title }}</h2>
					<p class="lead mb-4">{{ subtitle }}</p>
					<div class="d-flex gap-3 justify-content-center">
						<a
							href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44E2EC158A3Dc2b6CfC97093f"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-lg white-text"
							:class="darkMode ? 'btn-primary' : 'btn-primary'"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: `Buy BurritoAI - ${pageName}` })"
						>
							Buy $BURRITO
						</a>
						<nuxt-link
							to="/staking-dashboard"
							class="btn btn-lg"
							:class="darkMode ? 'btn-outline-light' : 'btn-outline-primary'"
							@click="useMarketingStore().trackEvent('click_cta', { cta_name: `Start Staking - ${pageName}` })"
						>
							Start Staking
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: 'Join the BurritoAI Ecosystem'
		},
		subtitle: {
			type: String,
			default: 'Participate early and secure your position in the future of AI and DeFi'
		},
		darkMode: {
			type: Boolean,
			default: false
		},
		pageName: {
			type: String,
			required: true
		}
	})
</script>

<style lang="sass" scoped>
	.bg-dark
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)
</style>

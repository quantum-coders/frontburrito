<template>
	<div class="block block-nodes bg-white mt-3">
		<div class="container">
			<div class="block-wrapper d-flex align-items-center flex-column flex-sm-row">
				<img src="/advisory.png" class="d-none d-sm-block nodes" alt="">
				<img src="/nodes-mobile.png" class="nodes d-block d-sm-none mb-4" alt="">
				<div class="content">
					<div class="feature mb-5 mt-8" v-for="(feature, index) in features" :key="index">
						<h3 class="subtitle purple mb-7">{{ feature.title }}</h3>
						<div v-html="feature.copy" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
const features = [
  {
    title: "AI-fine tuning Deep analysis on Trading, NFTs",
    copy: "Our bots provide you with the insights and automation needed to streamline everyprocess. From lead generation to closing deals, AI assists you every step of the way, ensuring that your productitvity is focus on building more complete analyis years ahead of the curve. Dealing to geting things done efficiently."
  },
  {
    title: "Real AI with real crypto users",
    copy: "Say goodbye to general weak AI, with just some $burritoAI token you can access AI-powered tools that understands and responds to your real-time processes with the right information at the right time."
  },
  {
    title: "Institutional-grade Multi-Chain liquidity",
    copy: "Leverage cutting-edge AI tools to enhance instutiotional investing. Our AI-driven solutions fintech architecture allows for Institutions to manage AI-crypto shares. Thanks to blockchain, customer data is secure, personalized and it increase incentivates log term research and development."
  }
];
</script>
<style lang="sass" scoped>
	.block
		padding: 5rem 0

		@media (min-width: $sm)
			padding: 0 0 10rem

		.block-wrapper
			max-width: 1000px
			margin: 0 auto

			.nodes
				width: 90%

				@media (min-width: $sm)
					width: 180px
					margin-right: 5rem
</style>

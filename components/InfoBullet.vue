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
    copy: "Our AI sales platforms provide you with the insights and automation needed to streamline your sales process. From lead generation to closing deals, AI assists you every step of the way, ensuring that your sales team can focus on building relationships and closing more deals efficiently."
  },
  {
    title: "Real AI with real crypto users",
    copy: "Say goodbye to manual email responses. Our AI-powered email tool understands and responds to customer queries in real-time, ensuring they receive the right information at the right time. Enhance customer satisfaction and free up your team to focus on what they do best."
  },
  {
    title: "Multi-Chain liquidity",
    copy: "Leverage cutting-edge AI tools to enhance your sales strategy. Our AI-driven solutions analyze customer data to predict buying patterns, enabling personalized sales approaches that dramatically increase conversion rates."
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

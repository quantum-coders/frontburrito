<template>
	<div class="block block-features">
		<div class="container">
			<div class="line d-none d-sm-block" />

			<article class="feature">
				<div class="feature-image"></div>
				<div class="feature-copy">
					<h2>AI-fine tuning Deep analysis on Trading, NFTs</h2>
					<p>Our bots provide you with the insights and automation needed to streamline every process. From lead generation to closing deals, AI assists you every step of the way, ensuring that your productivity is focus on building more complete analysis years ahead of the curve. Dealing to getting things done efficiently.</p>
				</div>
			</article>

			<article class="feature">
				<div class="feature-image"></div>
				<div class="feature-copy">
					<h2>Real AI with real crypto users</h2>
					<p>Say goodbye to general weak AI, with just some $burritoAI token you can access AI-powered tools that understands and responds to your real-time processes with the right information at the right time.</p>
				</div>
			</article>

			<article class="feature">
				<div class="feature-image"></div>
				<div class="feature-copy">
					<h2>Institutional-grade Multi-Chain liquidity</h2>
					<p>Leverage cutting-edge AI tools to enhance institutional investing. Our AI-driven solutions fintech architecture allows for Institutions to manage AI-crypto shares. Thanks to blockchain, customer data is secure, personalized and it increase incentives log term research and development.</p>
				</div>
			</article>

		</div>
	</div>
</template>

<script setup>
	useHead({
		title: 'Burrito AI',
	});

</script>

<style lang="sass" scoped>
	.block-features

		.line
			height: 100%
			position: absolute
			left: 110px
			border-left: 1px solid #AAA

		.feature
			margin-bottom: 5rem
			display: flex
			flex-direction: column
			gap: 1rem

			@media (min-width: $sm)
				gap: 2rem
				align-items: center
				flex-direction: row

			.feature-image
				width: 150px
				min-width: 150px
				aspect-ratio: 1
				background: white
				border: 1px solid #AAA
				border-radius: 50%

				@media (min-width: $sm)
					width: 200px
					min-width: 200px

			h2
				font-size: 1.5rem
				margin-bottom: 1rem
				color: $brand2

</style>
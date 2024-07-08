<template>
	<div class="block bg-white">
		<div class="container">
			<div class="row flex-lg-row align-items-center justify-content-center text-center">
				<div class="col col-12 col-lg-6 order-2 order-lg-1 text-start">
					<h2 class="trong purple title text-center text-lg-start">
						Empowering the crypto community<br class="d-none d-lg-block">
					</h2>
					<h3 class="purple mb-4 subtitle text-center text-lg-start">by lowering the barriers to AI powered systems.</h3>
					<p class="text-center">
						<bpay-button-v2 to="https://traderjoexyz.com/avalanche/pool/v21/0xf65645a42609f6b44e2ec158a3dc2b6cfc97093f/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e/50" target="_blank" class="mr-8" image-src="/photo_5.png" >Add-Liquidity & Earn Passive Income</bpay-button-v2>
					</p>
				</div>
				<div class="col col-12 col-lg-6 order-1 order-lg-2 text-center">
					<img class="image" src="/images/defi-trending-fintech-blockchain.png" alt="BlockPay cards">
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style scoped lang="sass">
	.btn-gradient
		width: 80%

		:deep(img)
			width: 300px

	.h2
		color: $brand1
	.image
		width: 100%
		margin-top: 1rem
		max-width: 500px
		display: block
		margin-left: auto
		margin-right: auto
		justify-content: center

		@media (min-width: $lg)
			order: 1
			margin-top: 0
			margin-bottom: 2rem

	.block
		padding-bottom: 3rem

		@media (min-width: $lg)
			padding: 5rem 0

</style>

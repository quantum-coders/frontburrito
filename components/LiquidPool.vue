<template>
	<div class="block bg-white">
		<div class="container">
			<div class="row flex-column-reverse flex-lg-row align-items-center justify-content-center text-center">
				<div class="col col-12 col-lg-6 text-start">
					<h2 class="strong title purple text-center text-lg-start">
						Empowering businesses and individuals<br class="d-none d-lg-block">
					</h2>
					<h3 class="purple mb-4 subtitle text-center text-lg-start">by lowering the barriers to financial inclusion.</h3>
					<p class="text-center">
						<bpay-button-v2 to="/token-sale/#buy" image-src="/photo_5.png" >Add Liquidity & Earn</bpay-button-v2>
					</p>
				</div>
				<div class="col col-12 col-lg-6 text-center text-lg-end">
					<img class="image" src="/photo_5.png" alt="BlockPay cards">
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

	.image
		margin-top: -100px
		max-width: 500px

		@media (min-width: $lg)
			margin-top: -150px
			margin-bottom: -180px
			z-index: 10

	.block
		padding-bottom: 3rem

		@media (min-width: $lg)
			padding: 5rem 0

</style>

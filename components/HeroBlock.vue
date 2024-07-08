<template>
	<div class="block block-hero bg-white d-flex align-items-center">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-12 col-sm-6">
					<img class="image" src="/images/photo_7_w_prev_ui.png" alt="">
				</div>
				<div class="col-12 col-sm-6 text-center" style="margin-left: 0px;"> <!-- Añade text-center aquí -->
					<img class="logo" src="/images/photo_5.png" alt="Blockpay Advisory">
					<h2 class="title mb-5" style="color: #E3CBA6;"><strong>Because it is important to democratize<br> the combination of AI+Crypto</strong></h2>
					<div class="button-group d-flex justify-content-center gap-4"> <!-- Ajusta este div para centrar los botones -->
						<!-- <bpay-button-v2 tag="button" class="px-5 btn-send">How to buy</bpay-button-v2>
						<bpay-button-v2 tag="button" class="px-5 btn-send">Tokenomics</bpay-button-v2> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style lang="sass" scoped>

	.block
		height: 80vh
		overflow-x: clip

		.logo
			max-width: 90%
			margin: 0 auto 0rem
			display: block

			@media (min-width: $sm)
				max-width: 100%
				margin: auto

		.image
			width: 150%
			max-width: 150%
			left: 55%
			transform: translateX(-45%)
			margin-top: 4rem
			margin-bottom: -6rem

			@media (min-width: $sm)
				max-width: 100vw
				width: 60vw
				position: absolute
				left: 50%
				top: 50%
				margin: auto
				transform: translate(-50%, -40%)
		.glow
			animation: glow 7s infinite
			@keyframes glow
				0%, 100%
					text-shadow: 0 0 5px #E3CBA6, 0 0 10px #CFCCBB, 0 0 15px #3E3C3E
				30%
					text-shadow: 0 0 5px #CFCCBB, 0 0 10px #3E3C3E, 0 0 15px #C8B255
				70%
					text-shadow: 0 0 15px #3E3C3E, 0 0 20px #E3CBA6, 0 0 23px #C8B255, 0 0 27px #3E3C3E
</style>
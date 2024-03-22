<template>
	<div class="block block-subnet bg-white">
		<div class="container">
			<div class="row align-items-center flex-row-reverse">
				<div class="col col-12 col-sm-6">
					<div class="animation">
						<iframe
							src="https://player.vimeo.com/video/850725489?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&background=1"
							frameborder="0"
							allow="autoplay; fullscreen; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</div>
				<div class="col col-12 col-sm-6">
					<div class="content text-center text-sm-start d-sm-inline-block">
						<h2 class="title purple mb-3">MemeFun Index</h2>
						<h3 class="subtitle purple mb-4">$BurritoIA is building an
								Multichain IA index
								financial data and to offer
								tokenized real-world machine learning.</h3>

						<p class="text-center">

							<nuxt-link
								class="purple"
								to="https://avascan.info/blockchain/c/token/0x8CcEE641C3D937dC89D1d94fe4D8051624042Fcf"
								target="_blank"
							>See
								<strong><u>BurritoIA</u></strong> contract on-chain
							</nuxt-link>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style lang="sass" scoped>
	.animation
		padding: 87.5% 0 0 0
		position: relative

		iframe
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%

	.block
		padding: 5rem 0

		@media (min-width: $sm)
			padding: 0 0 10rem

	ul
		display: inline-block

	.button-app
		max-width: 80%
		margin-top: auto
</style>

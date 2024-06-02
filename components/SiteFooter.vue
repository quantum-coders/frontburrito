<template>
	<footer class="site-footer">
		<div class="logo-wrapper d-flex align-items-center mb-2 mb-md-4">
			<span class="divider"></span>
			<img src="/burrito-IA-finance-logo.png" class="footer-logo mx-3" width="150" alt="Blockpay" />
			<span class="divider"></span>
		</div>
		<div class="container">
			<div class="p-3">


				<div class="footer-columns row mb-5 align-items-stretch">
					<div class="col col-12 col-md-4 d-flex flex-column align-items-center justify-content-center text-center">
						<ul class="list-unstyled">
							<li class="p-3">
								<nuxt-link
									class="text-decoration-none"
									style="color:#3E3C3E;"
								:to="'/tokenomics-crypto-IA-defi'"
								><strong>Tokenomics</strong>
								</nuxt-link>
							</li>
							<li class="p-3">
								<nuxt-link
									class="text-decoration-none"
									style="color:#3E3C3E;"
								:to="'/staking-ia-crypto-finance'"
								><strong>Staking-IA</strong>
								</nuxt-link>
							</li>
							<li class="p-3">
								<nuxt-link
									class="text-decoration-none"
									style="color:#3E3C3E;"
								:to="'/how-tu-buy-burrito-ia-artificial-cryptocurrency'"
								><strong>Markets</strong>
								</nuxt-link>
							</li>
						</ul>
					</div>
					<div class="col col-12 col-md-4 d-flex flex-column align-items-center justify-content-center text-center">
						<div class="data-chunk px-4 mb-4">
							<p class="text-center d-flex flex-column align-items-center">
								<img width="25px" class="mb-3" style="color:#3E3C3E;" src="/burritopng.png" alt="Contáctanos">
								<a style="color:#3E3C3E;" href="/terms-and-conditions-crypto-ai-platform">terms & conditions</a>
							</p>
						</div>

						<!--<div class="data-chunk px-4">
							<p class="text-white text-center d-flex flex-column align-items-center">
								<img width="20px" class="mb-3" src="/icon-marker.svg" alt="Dónde estamos">
								<span>Centros Comerciales Desarrollo Atlixcáyotl int. 403, Atlixcáyotl 3192, Puebla, México. C.P. 72830</span>
							</p>
						</div>-->
					</div>

					<div class="col col-12 col-md-4 d-flex align-items-center">
						<div class="row">
							<div class="col-12 d-flex justify-content-center">
								<bpay-button-v2
									class="mb-4 btn-terms"
									target="_blank"
        							href="https://burritoai.finance/WhitePaper-burritoAI-crypto-AI-Finances.pdf"
									style="color:white"
								>
									Whitepaper 🌯🤖
								</bpay-button-v2>
							</div>
							<!-- <div class="col-12 d-flex justify-content-center">
								<bpay-button-v2
									href="/how-tu-buy-burrito-ia-artificial-cryptocurrency"
									target="_blank"
									class="text"
									style="color:#3E3C3E;"
								>
									<img src="/burritopng.png">
									AI Markets
								</bpay-button-v2>
							</div> -->
						</div>
					</div>
				</div>

				<p class="text-center footer-copy text-balance" style="color:#3E3C3E;">Real AI architecture for Crypto-Markets® {{ new Date().getFullYear() }}.
				</p>
			</div>
		</div>
	</footer>
</template>

<script setup>
</script>

<style lang="sass">
	.site-footer
		.logo-wrapper
			.divider
				border-top: 1px solid rgba(255, 255, 255, 0.5)
				flex: 1

				@media (min-width: $md)
					&:first-child
						flex: 0
						flex-basis: 15%

					&:last-child
						flex: 1

		.footer-columns
			.col
				display: flex
				justify-content: center
				align-items: center

		.btn-gradient
			width: 50%

			.btn-image
				margin: 0
				min-width: 60px
				text-align: center

				img
					width: 45px

			.btn-text
				flex: 1

			@media (min-width: $sm)
				width: 100px !important

	.btn-terms
		white-space: break-spaces !important

	.footer-copy a
		color: white
</style>
<template>
	<section class="section-dashboard">
		<div class="please-connect">
			<div class="connect">
				<img src="/images/pepe-burrito.png" alt="Pepe Burrito">
				<p class="title">Please connect your wallet, fren</p>

				<div class="content">
					<p class="subtitle">Why connect your wallet?</p>
					<ul class="benefits-list">
						<li class="list-group-item">Access staking features and create unlimited chats with our AI
							models
						</li>
						<li class="list-group-item">Receive special rewards and promotions</li>
						<li class="list-group-item">Safe and secure connection via trusted providers</li>
					</ul>
					<button type="button" class="help-link" data-bs-toggle="modal" data-bs-target="#helpModal">
						How to connect my wallet?
					</button>
				</div>
			</div>
		</div>

		<!-- Help Modal -->
		<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="helpModalLabel">How to Connect Your Wallet</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p>Connecting your wallet is simple and secure:</p>
						<ol>
							<li>Click on the "Connect" button located in the navbar.</li>
							<li>Select your preferred wallet provider, like MetaMask.</li>
							<li>Follow the on-screen instructions to authorize the connection.</li>
						</ol>
						<p>Once connected, you can enjoy all the features and benefits of our platform!</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="sass" scoped>
	#helpModal
		z-index: 10000

	.section-dashboard
		display: flex
		flex-direction: column
		flex-grow: 1
		padding-top: 71px

		@media (min-width: $sm)
			padding-top: 0

	.please-connect
		display: flex
		flex-direction: column
		flex-grow: 1
		justify-content: center
		align-items: center
		padding: 5rem 0

		.connect
			text-align: center
			max-width: 700px
			padding: 1rem
			border: 2px solid $primary
			box-shadow: 0 1rem 0 0 $primary !important
			border-radius: 0.5rem
			background-color: white
			// Asegura fondo blanco

			img
				margin-bottom: 1rem
				image-rendering: pixelated
				width: 88px
			// 44px * 2

			.title
				font-size: 2rem
				line-height: 1.1
				font-family: Chibold, sans-serif
				color: $brand1
				margin-bottom: 1.5rem

			.content
				.subtitle
					font-weight: bold
					font-size: 1.1rem
					color: $brand1
					margin-bottom: 1rem

				.benefits-list
					list-style: none
					padding: 0
					margin-bottom: 1.5rem

					li
						padding: 0.5rem 0
						border-bottom: 1px solid rgba($primary, 0.1)

						&:last-child
							border-bottom: none

				.help-link
					color: $primary
					text-decoration: underline
					background: none
					border: none
					padding: 0
					cursor: pointer

					&:hover
						color: darken($primary, 10%)
</style>

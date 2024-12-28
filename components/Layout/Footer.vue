<!-- Footer.vue -->
<template>
	<footer class="site-footer">
		<div class="pixel-border"></div>
		<div class="container py-5">
			<div class="row gy-5">
				<!-- Navigation Section -->
				<div class="col-12 col-md-3">
					<div class="footer-section">
						<h3 class="footer-title">Navigation</h3>
						<nav class="footer-navigation">
							<ul class="list-unstyled">
								<li>
									<nuxt-link to="/" class="d-flex align-items-center gap-2">
										<icon name="ph:house" />
										Home
									</nuxt-link>
								</li>
								<li>
									<a
										href="/BurritoAI-Whitepaper.pdf"
										target="_blank"
										rel="noopener noreferrer"
										class="d-flex align-items-center gap-2"
									>
										<icon name="ph:file-text" />
										Whitepaper
									</a>
								</li>
								<li>
									<a
										href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44e2ec158a3dc2b6cfc97093f"
										target="_blank"
										rel="noopener noreferrer"
										class="d-flex align-items-center gap-2"
									>
										<icon name="ph:trend-up" />
										Buy $BURRITOAI
									</a>
								</li>
								<li>
									<nuxt-link to="chat/dashboard" class="d-flex align-items-center gap-2">
										<icon name="ph:chats-circle" />
										Dashboard
									</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/team" class="d-flex align-items-center gap-2">
										<icon name="ph:users-three" />
										Team
									</nuxt-link>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<!-- Community Section -->
				<div class="col-12 col-md-5">
					<div class="footer-section">
						<h3 class="footer-title">Community</h3>
						<div class="social-links">
							<a
								href="https://t.me/burritoAIDeFi"
								target="_blank"
								rel="noopener noreferrer"
								class="social-link"
							>
								<icon name="ph:telegram-logo-fill" class="social-icon" />
								<span>Telegram</span>
							</a>
							<a
								href="https://x.com/burritoAIDeFi"
								target="_blank"
								rel="noopener noreferrer"
								class="social-link"
							>
								<icon name="ri:twitter-x-fill" class="social-icon" />
								<span>X</span>
							</a>
							<a
								href="https://discord.gg/ejp8cEqRNF"
								target="_blank"
								rel="noopener noreferrer"
								class="social-link"
							>
								<icon name="ph:discord-logo-fill" class="social-icon" />
								<span>Discord</span>
							</a>
						</div>
					</div>
				</div>

				<!-- Newsletter Section -->
				<div class="col-12 col-md-4">
					<div class="footer-section">
						<h3 class="footer-title">Join Our Waitlist</h3>
						<p class="newsletter-text">Be the first to get BurritoAI Alphas!</p>
						<MarketingSubscriptionForm
							placeholder="Enter your email" joinText="Join"
							joiningText="Joining..."
						/>
					</div>
				</div>
			</div>

			<!-- Footer Bottom -->
			<div class="footer-bottom">
				<div
					class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-5 pt-5 border-top border-light"
				>
					<div class="footer-logo d-flex align-items-center gap-3">
						<img src="/images/burrito-photo-small.png" alt="Burrito AI" class="footer-burrito" />
						<span class="copyright">© {{ new Date().getFullYear() }} Burrito AI. All rights reserved.</span>
					</div>
					<div class="footer-links d-flex gap-4">
						<nuxt-link to="/privacy">Privacy Policy</nuxt-link>
						<nuxt-link to="/terms">Terms of Use</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
</script>

<style lang="sass" scoped>
	.site-footer
		position: relative
		background: $brand1
		color: white
		font-family: 'Chibold', sans-serif

		.pixel-border
			position: absolute
			top: -10px
			left: 0
			width: 100%
			height: 10px
			background: url('/images/triangle.png') repeat-x center
			background-size: auto 100%
			image-rendering: pixelated

	.footer-title
		font-size: 1.5rem
		margin-bottom: 1.5rem
		color: white
		position: relative
		display: inline-block

		&:after
			content: ''
			position: absolute
			bottom: -5px
			left: 0
			width: 100%
			height: 2px
			background: rgba(255, 255, 255, 0.2)

	.footer-navigation
		ul
			li
				margin-bottom: 1rem
				transition: transform 0.2s ease

				&:hover
					transform: translateX(5px)

				a
					color: white
					text-decoration: none
					font-size: 1.1rem
					transition: all 0.2s ease

					&:hover
						color: lighten($brand1, 40%)
						text-decoration: none

	.social-links
		display: grid
		grid-template-columns: repeat(3, 1fr)
		gap: 0.5rem

		.social-link
			display: flex
			align-items: center
			flex-direction: column
			gap: 0.5rem
			color: white
			text-decoration: none
			padding: 1rem
			border-radius: 0.5rem
			transition: all 0.2s ease
			border: 2px solid rgba(255, 255, 255, 0.1)
			text-align: center

			&:hover
				background: rgba(255, 255, 255, 0.1)
				transform: translateY(-2px)

			.social-icon
				width: 30px
				height: 30px
				transition: transform 0.3s ease

				&:hover
					transform: scale(1.1)

	.newsletter-text
		color: rgba(255, 255, 255, 0.8)
		margin-bottom: 1rem

	.error-message
		color: $secondary
		background: rgba(0, 0, 0, 0.2)
		padding: 0.5rem
		border-radius: 0.25rem
		margin-bottom: 1rem
		font-size: 0.9rem

	.newsletter-form
		width: 100%

		.form-wrapper
			position: relative
			width: 100%
			display: flex
			gap: 0.5rem
			border: 2px solid black
			border-radius: 0.5rem
			background: white
			box-shadow: 0 0.5em 0 0 black
			overflow: hidden

			@media (max-width: 575.98px)
				flex-direction: column
				gap: 0

		.email-input
			flex: 1
			min-width: 0
			padding: 0.75rem 1rem
			border: none
			background: white
			color: black
			font-size: 1rem

			&:focus
				outline: none
				background: #f8f9fa

			&::placeholder
				color: rgba(0, 0, 0, 0.5)

		.submit-button
			padding: 0.75rem 1.5rem
			border: none
			background: black
			color: white
			font-weight: 500
			text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5)
			transition: all 0.2s ease
			white-space: nowrap
			min-width: 80px

			@media (max-width: 575.98px)
				width: 100%
				border-radius: 0

			&:hover:not(:disabled)
				background: #222

			&:disabled
				opacity: 0.7
				cursor: not-allowed

	.footer-bottom
		.footer-burrito
			image-rendering: pixelated

		.footer-links
			a
				color: rgba(255, 255, 255, 0.8)
				text-decoration: none
				transition: color 0.2s ease

				&:hover
					color: white

	@media (max-width: 768px)
		.footer-bottom
			.footer-logo
				flex-direction: column
				text-align: center

			.footer-links
				width: 100%
				justify-content: center
</style>

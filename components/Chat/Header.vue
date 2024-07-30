<template>
	<header class="site-header">
		<div class="d-flex align-items-center justify-content-between">

			<layout-logo />

			<nav class="primary-navigation">
				<ul class="list-unstyled">
					<li class="wallet">
						<a href="#">Connect Wallet</a>
						<img alt="Burrito" src="/images/burrito-photo.png" />
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script setup>
</script>

<style scoped lang="sass">

	.site-header
		position: fixed
		width: 100%
		top: 0
		z-index: 1000
		padding: 0.75rem
		transition: all 250ms ease

		@media (min-width: $sm)
			position: sticky
			padding: 1rem 0 1rem 2rem

		&.fixed
			background: white url("/images/background-texture.png")
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)

		.primary-navigation
			display: none
			justify-content: space-between
			padding: 1rem 0

			@media (min-width: $sm)
				display: flex

			ul
				margin-bottom: 0
				display: flex
				gap: 2rem
				align-items: center

				li
					display: block
					padding-right: 50px
					font-size: 0.8rem

					&.wallet
						width: 180px
						white-space: nowrap
						overflow-x: clip

						img
							position: absolute
							right: -10px
							top: 50%
							transform: translateY(-50%)
							width: 70px

					a
						text-transform: uppercase
						display: block
						color: black
						font-weight: bold
						text-decoration: none

						&:hover
							color: $brand1

</style>
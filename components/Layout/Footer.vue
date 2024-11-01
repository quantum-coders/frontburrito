<template>
	<footer class="site-footer">
		<div class="container">
			<div class="row">
				<div class="col-4">

					<nav class="footer-navigation">
						<ul class="list-unstyled">
							<li><a href="/BurritoAI-Whitepaper.pdf" target="_blank">Whitepaper</a></li>
							<li><nuxt-link to="/team">Team</nuxt-link></li>
							<li><nuxt-link to="/">AI Services</nuxt-link></li>
						</ul>
					</nav>

				</div>
				<div class="col-4"></div>
				<div class="col-4"></div>
			</div>

		</div>
	</footer>
</template>

<script setup>
</script>

<style lang="sass">

	.site-footer
		padding: 3rem 0
		background: $brand1
		color: white

		&:before
			content: ''
			position: absolute
			top: -10px
			left: 0
			width: 100%
			height: 10px
			background: url('/images/triangle.png') repeat-x center
			background-size: auto 100%
			image-rendering: pixelated

		.footer-navigation

			ul
				margin-bottom: 0

				li
					margin-bottom: 1rem

					a
						color: white
						text-decoration: none

						&:hover
							text-decoration: underline
</style>
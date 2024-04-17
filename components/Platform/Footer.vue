<template>
	<footer class="site-footer">
		<div class="container">
			<div class="row">
				<div class="col-4">

					<nav class="footer-navigation">
						<ul class="list-unstyled">
							<li><a href="#">Tokenomics</a></li>
							<li><a href="#">Staking</a></li>
							<li><a href="#">Markets</a></li>
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
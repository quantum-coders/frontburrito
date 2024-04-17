<template>
	<header class="site-header">
		<div class="container d-flex align-items-center justify-content-between">
			<a href="" class="logo"></a>
			
			<nav class="primary-navigation">
				<ul class="list-unstyled">
					<li><a href="#">Tokenomics</a></li>
					<li><a href="#">Staking</a></li>
					<li><a href="#">Markets</a></li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script setup>
</script>

<style lang="sass">

	.site-header
		background: $brand1
		color: white

		.primary-navigation
			display: flex
			justify-content: space-between
			padding: 1rem 0

			ul
				margin-bottom: 0

				li
					display: inline
					margin-right: 1rem

					a
						color: white
						text-decoration: none

						&:hover
							text-decoration: underline

</style>
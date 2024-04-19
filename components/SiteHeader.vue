<template>
	<header class="site-header">
		<div class="container">
			<nav class="navbar navbar-expand-lg">
				<nuxt-link class="navbar-brand" to="/">
					<img src="/burrito-IA-finance-logo.png" height="90" width="200" class="logo" alt="IA-finance-logo" />
				</nuxt-link>
				<nav
					class="primary-nav ms-auto d-flex flex-column align-items-center justify-content-center"
					:class="{ 'is-active': menuIsActive }"
				>
					<ul class="menu d-flex flex-column flex-md-row align-items-center list-unstyled mb-0">
						<li class="menu-item m-3">
							<nuxt-link
								@click="menuIsActive = false"
								class="text-decoration-none h6"
								style="color:#3E3C3E;"
								:to="'/tokenomics-crypto-IA-defi'"
							>
								Tokenomics
							</nuxt-link>
						</li>
						<li class="menu-item m-3">
							<nuxt-link
								@click="menuIsActive = false"
								class="text-decoration-none h6"
								style="color:#3E3C3E;"
								:to="'/staking-ia-crypto-finance'"
							>
								Staking-IA
							</nuxt-link>
						</li>
						<li class="menu-item m-3">
							<nuxt-link
								@click="menuIsActive = false"
								style="color:#3E3C3E;"
								class="text-decoration-none h6"
								:to="'/how-tu-buy-burrito-ia-artificial-cryptocurrency'"
							>
								Markets
							</nuxt-link>
						</li>
					</ul>
				</nav>
				<hamburger
					class="hamburger d-block d-md-none"
					:open="menuIsActive"
					@toggle="menuIsActive = !menuIsActive"
				/>
			</nav>
		</div>
	</header>
</template>

<script setup>
	const menuIsActive = ref(false);
</script>

<style lang="sass" scoped>
	.logo
		z-index: 2
		position: relative
		width: 80px

	.hamburger
		z-index: 2
		margin-left: auto !important
		margin-top: -16px !important

	.site-header
		overflow: hidden
		z-index: 1000
		height: 111px

	.primary-nav
		position: fixed
		z-index: 1
		top: 0
		left: 0
		opacity: 0
		width: 100%
		height: 100dvh
		pointer-events: none
		transition: 500ms all
		background: linear-gradient(90deg, rgba(215,93,65,1) 0%, rgba(207,204,187,1) 5%, rgba(207,204,187,1) 95%, rgba(215,93,65,1) 100%)

		a:not(.button-wallet, .lang-item)
			position: relative

			&:after
				content: ''
				position: absolute
				bottom: -40px
				left: 10%
				width: 80%
				height: 1px
				background: transparent
				transition: all 500ms

			&.router-link-exact-active,
			&:hover
				&:after
					width: 100%
					left: 0
					background: #fff
					bottom: -10px

		&.is-active
			pointer-events: all
			opacity: 1

		@media (min-width: $md)
			width: auto
			height: auto
			pointer-events: all
			opacity: 1
			position: relative
			background: transparent

		.language-switcher
			border: 1px solid rgba(255, 255, 255, 0.25)
			border-radius: 100vw
			padding: 0 1rem
			display: flex
			gap: 0.5rem

			@media (min-width: $sm)
				margin-left: 1rem

			a.lang-item
				display: block
				padding: 0.5rem
				text-decoration: none
				color: white
				line-height: 1
				opacity: 0.25
				transition: 500ms all

				&:hover, &.active
					opacity: 1
</style>

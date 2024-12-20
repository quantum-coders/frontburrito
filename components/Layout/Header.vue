<template>
	<header class="site-header" :class="{ 'nav-open': navOpen }">
		<div class="d-flex align-items-center w-100 position-relative">
			<!-- Logo on the left -->
			<layout-logo class="me-3" />

			<!-- Mobile toggler in the center -->
			<div class="d-block d-sm-none flex-grow-1 d-flex justify-content-center">
				<button
					class="navbar-toggler border-0 bg-transparent p-2 d-flex align-items-center"
					type="button"
					@click="toggleNav"
					aria-label="Toggle navigation"
				>
					<span v-if="!navOpen" class="menu-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					</span>
					<span v-else class="close-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</span>
				</button>
			</div>

			<!-- Desktop nav in the middle (hidden on mobile) -->
			<nav class="primary-navigation d-none d-sm-flex flex-grow-1 justify-content-end me-4">
				<ul class="list-unstyled mb-0 d-flex gap-3 align-items-center">
					<li>
						<nuxt-link
							to="/"
							@click="marketingStore.trackEvent('click_nav', { nav_item: 'Home' })"
							active-class="active"
							class="nav-link"
						>
							Home
						</nuxt-link>
					</li>
					<li>
						<nuxt-link
							to="/features"
							@click="marketingStore.trackEvent('click_nav', { nav_item: 'Features' })"
							active-class="active"
							class="nav-link"
						>
							Features
						</nuxt-link>
					</li>
					<li>
						<nuxt-link
							to="/tokenomics"
							@click="marketingStore.trackEvent('click_nav', { nav_item: 'Tokenomics' })"
							active-class="active"
							class="nav-link"
						>
							Tokenomics
						</nuxt-link>
					</li>
					<li>
						<nuxt-link
							to="/staking"
							@click="marketingStore.trackEvent('click_nav', { nav_item: 'Staking' })"
							active-class="active"
							class="nav-link"
						>
							Staking
						</nuxt-link>
					</li>
					<li>
						<nuxt-link
							@click="linkClicked('Buy')"
							to="/buy"
							active-class="active"
							class="nav-link"
						>
							Buy
						</nuxt-link>
					</li>
					<li>
						<nuxt-link
							to="/whitepaper"
							rel="noopener noreferrer"
							@click="marketingStore.trackEvent('click_nav', { nav_item: 'Whitepaper' })"
							class="nav-link"
							active-class="active"
						>
							Whitepaper
						</nuxt-link>
					</li>
					<li>
						<nuxt-link
							to="/community"
							@click="marketingStore.trackEvent('click_nav', { nav_item: 'Community' })"
							active-class="active"
							class="nav-link"
						>
							Community
						</nuxt-link>
					</li>
				</ul>
			</nav>

			<!-- Wallet on the right -->
			<layout-wallet-new />
		</div>

		<!-- Mobile menu -->
		<nav
			v-if="navOpen"
			class="primary-navigation-mobile d-block d-sm-none"
			v-click-outside="closeNav"
		>
			<ul class="list-unstyled mb-0 d-flex flex-column gap-3 align-items-start p-3">
				<li>
					<nuxt-link
						to="/"
						@click="linkClicked('Home')"
						active-class="active"
						class="nav-link"
					>
						Home
					</nuxt-link>
				</li>
				<li>
					<nuxt-link
						to="/features"
						@click="linkClicked('Features')"
						active-class="active"
						class="nav-link"
					>
						Features
					</nuxt-link>
				</li>
				<li>
					<nuxt-link
						to="/tokenomics"
						@click="linkClicked('Tokenomics')"
						active-class="active"
						class="nav-link"
					>
						Tokenomics
					</nuxt-link>
				</li>
				<li>
					<nuxt-link
						to="/staking"
						@click="linkClicked('Staking')"
						active-class="active"
						class="nav-link"
					>
						Staking
					</nuxt-link>
				</li>
				<li>
					<nuxt-link
						@click="linkClicked('Buy')"
						to="/buy"
						active-class="active"
						class="nav-link"
					>
						Buy
					</nuxt-link>
				</li>
				<li>
					<nuxt-link
						to="/whitepaper"
						rel="noopener noreferrer"
						@click="marketingStore.trackEvent('click_nav', { nav_item: 'Whitepaper' })"
						class="nav-link"
						active-class="active"
					>
						Whitepaper
					</nuxt-link>
				</li>
				<li>
					<nuxt-link
						to="/community"
						@click="linkClicked('Community')"
						active-class="active"
						class="nav-link"
					>
						Community
					</nuxt-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup>
	const marketingStore = useMarketingStore();
	const navOpen = ref(false);

	const toggleNav = () => {
		navOpen.value = !navOpen.value;
	};

	const closeNav = () => {
		navOpen.value = false;
	};

	const linkClicked = (nav_item) => {
		marketingStore.trackEvent('click_nav', { nav_item });
		closeNav();
	};
</script>

<style scoped lang="sass">
	.site-header
		position: fixed
		width: 100%
		top: 0
		z-index: 10000
		padding: 0.75rem 0 0.75rem 0.75rem
		transition: all 250ms ease
		background: white url("/images/background-texture.png")

	.navbar-toggler
		cursor: pointer
		transition: all 0.3s ease

		&:hover
			opacity: 0.8

		.menu-icon, .close-icon
			display: flex
			align-items: center
			justify-content: center
			color: #000
			transition: transform 0.3s ease

		.menu-icon
			svg
				transform-origin: center

				&:hover
					transform: scale(1.1)

		.close-icon
			svg
				transform-origin: center

				&:hover
					transform: rotate(90deg)

	.nav-link
		text-transform: uppercase
		color: black
		font-weight: bold
		text-decoration: none
		transition: color 0.3s ease

		&:hover
			color: $brand1

		&.active
			color: $brand1
			position: relative

			&:after
				content: ''
				position: absolute
				bottom: -4px
				left: 0
				width: 100%
				height: 2px
				background-color: $brand1

	.primary-navigation
		@media (min-width: $sm)
			display: flex

		ul
			margin-bottom: 0
			align-items: center

			li
				font-size: 0.8rem

	.primary-navigation-mobile
		position: absolute
		top: 100%
		left: 0
		right: 0
		background: white
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
		animation: slideDown 0.3s ease-out forwards

		ul li
			font-size: 0.9rem

	@keyframes slideDown
		from
			opacity: 0
			transform: translateY(-10px)
		to
			opacity: 1
			transform: translateY(0)
</style>

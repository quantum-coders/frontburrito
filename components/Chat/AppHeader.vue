<template>
	<div class="site-actions d-flex align-items-center gap-3">
		<div class="wallet"
		     :class="{ 'wrong-network': (!cryptoStore.wrongNetwork && cryptoStore.currentAccount != null) }">
			<a href="#" @click.prevent="switchNetwork" class="switch-network">Wrong network</a>
			<a
				v-if="cryptoStore.currentAccount == null"
				href="#"
				@click.prevent="walletModalRef.openDialog()"
				class="connect-wallet d-flex align-items-center gap-2"
			>
				<span class="d-none d-sm-block text-nowrap">Connect Wallet</span>
				<platform-wallet-animation class="d-none d-sm-flex wallet-animation"/>
			</a>
			<span class="account" v-else>
						<span class="bpay d-flex align-items-center">
							<span class="d-none d-sm-block text-nowrap fw-bolder">
								{{ parseFloat(cryptoStore.bpayBalance || 0).toFixed(2) ?? 0.0 }}
							</span>
						</span>

						<span class="address">{{ currentAccountTrimmed }}</span>
						<a href="#" @click.prevent="disconnectWallet">
							<platform-wallet-animation class="wallet-animation closed"/>
						</a>
					</span>
		</div>
	</div>
	<platform-modal ref="walletModalRef">
		<template #default="{ close: closeDialog }">
			<a class="close" href="#" @click.prevent="closeDialog">
				Test
			</a>
			<web3-wallet @connect="closeDialog"/>
		</template>
	</platform-modal>
</template>
<script setup>
const {isCorrectNetwork, switchNetwork} = useWeb3();
const menuActive = ref(false);
const walletModalRef = ref(null);
const hamburgerRef = ref(null);

const cryptoStore = useCryptoStore();

const {
	currentAccountTrimmed,
	disconnectWallet,
} = useWeb3();

onMounted(async () => {
	await isCorrectNetwork();
});

const closeMenu = () => {
	menuActive.value = false;
	hamburgerRef.value.close();
};

</script>
<style lang="sass" scoped>

.close
	position: absolute
	top: 1rem
	right: 1rem
	cursor: pointer
	z-index: 10

.site-header
	position: fixed
	top: 0
	left: 0
	width: 100%
	z-index: 100
	background: white

.logo
	width: 25px
	height: auto
	transition: all 500ms ease-in-out

	&:hover
		transform: scale(1.2)
		fill: #6400AE !important

		path
			fill: #6400AE !important

	@media (min-width: $lg)
		width: 32px

.wallet
	display: none

	@media (min-width: $lg)
		display: flex

	.switch-network
		position: absolute
		height: 100%
		width: 100%
		top: 0
		left: 0
		z-index: 1000
		background: rgba(255, 255, 255, 0.85)
		font-size: 0.7rem
		display: flex
		justify-content: center
		align-items: center
		opacity: 0
		pointer-events: none
		transition: all 0.3s ease-in-out
		font-weight: 900
		color: currentColor
		text-decoration: none

	&.wrong-network
		.switch-network
			opacity: 1
			pointer-events: auto

.site-menu
	position: fixed
	opacity: 0
	pointer-events: none
	transition: opacity 0.3s
	height: calc(100dvh - 65px)
	width: 100%
	top: 65px
	left: 0
	background: white
	z-index: 100

	&.is-active
		opacity: 1
		pointer-events: auto

	@media (min-width: $lg)
		opacity: 1
		position: relative
		pointer-events: auto
		height: auto
		top: auto
		left: auto
		background: none
		width: auto

	ul
		li
			width: 100%

			@media (min-width: $lg)
				width: auto

				&:hover

					& > .submenu
						opacity: 1
						pointer-events: auto
						margin-top: 0

			a
				display: block
				color: var(--bs-body-color)
				text-decoration: none
				font-weight: 500
				padding: 0.5rem
				white-space: nowrap

				@media (min-width: $lg)
					padding: 1rem

				.down
					margin-left: 0.5rem
					width: 10px
					height: auto


			& > .submenu
				z-index: 100
				padding: 0.5rem 0

				@media (min-width: $lg)
					width: 240px
					background: #F8F8F8
					opacity: 0
					position: absolute
					top: calc(100% - 1px)
					margin-top: -1rem
					left: 50%
					transform: translateX(-50%)
					pointer-events: none
					transition: all 0.3s ease-in-out

				li
					border-bottom: 1px solid #E5E5E5

					&.is-disabled
						opacity: 0.5
						pointer-events: none

					@media (min-width: $lg)
						border-bottom: none

					&:hover
						& > a
							font-weight: bold

					a
						white-space: nowrap
						display: block
						font-weight: normal
						padding: 0.5rem 1rem

						small
							font-size: 0.6rem

						@media (min-width: $lg)
							text-align: center

.bpay
	gap: 0.5rem
	border-right: 1px solid #ccc
	padding-right: 0.5rem

.social
	display: flex
	gap: 1rem
	margin-left: auto

	@media (min-width: $lg)
		margin-left: 0

	svg
		top: -2px

	a
		color: currentColor


.site-actions
	display: flex
	justify-content: flex-end

	@media (min-width: $lg)
		min-width: 200px

	.connect-wallet
		height: 24px
		display: flex
		align-items: center
		gap: 2px
		color: var(--bs-body-color)
		text-decoration: none
		cursor: pointer
		position: relative
		z-index: 101

		svg
			width: 16px
			height: 16px
			margin-bottom: 0

	.account
		display: flex
		height: 24px
		align-items: center
		gap: 0.5rem

		svg
			width: 16px
			height: 16px
			margin-bottom: 2px

.hamburger
	margin-top: -2px
</style>
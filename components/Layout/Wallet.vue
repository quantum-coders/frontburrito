<template>
	<div class="wallet-button" v-if="!cryptoStore.currentAccount">
		<a href="#" @click.prevent="walletModalRef.openDialog()">Connect Wallet</a>
		<img alt="Burrito" src="/images/burrito-photo.png" />
	</div>

	<div class="wallet-info" v-else>
		<div class="wallet-summary d-flex align-items-stretch gap-2">
			<img src="/images/burrito-token-icon.svg" alt="">
			<span class="d-none d-md-flex burrito-balance">
				{{ parseFloat(cryptoStore.burritoBalance || 0).toFixed(4) ?? 0.0 }}
			</span>
			<span class="address ms-2 d-none d-md-flex">{{ currentAccountTrimmed }}</span>

			<div class="wallet-button">
				<a href="#" class="wallet-button" @click.prevent="toggleWalletMenu">Wallet</a>
				<img alt="Burrito" src="/images/burrito-photo.png" />
			</div>
		</div>

		<div v-if="showWalletMenu" class="wallet-menu">

			<div class="connected-account d-flex flex-column p-2">
				<small class="label">Connected Account</small>
				<span class="text-truncate fs-5">{{ currentAccountTrimmed }}</span>
			</div>

			<div class="d-flex flex-column">
				<div class="coin d-flex align-items-center gap-2 py-1 px-2">
					<img src="/images/burrito-token-icon.svg" alt="BURRITO" class="token-icon">
					<div>
						<small class="label">BURRITO AI Tokens</small>
						<p class="coin-qty">{{ parseFloat(cryptoStore.burritoBalance || 0).toFixed(4) ?? 0.0 }}</p>
					</div>
				</div>
				<div class="coin d-flex align-items-center gap-2 py-1 px-2">
					<img src="/usdt-avax.svg" alt="USDT" class="token-icon">
					<div>
						<small class="label">USDT</small>
						<p class="coin-qty">{{ parseFloat(cryptoStore.usdtBalance || 0).toFixed(4) ?? 0.0 }}</p>
					</div>
				</div>
				<div class="coin d-flex align-items-center gap-2 py-1 px-2">
					<img src="/avax-logo.svg" alt="AVAX" class="token-icon">
					<div>
						<small class="label">AVAX</small>
						<p class="coin-qty">{{ parseFloat(cryptoStore.avaxBalance || 0).toFixed(4) ?? 0.0 }}</p>
					</div>
				</div>
				<div class="coin d-flex align-items-center gap-2 py-1 px-2">
					<icon name="cryptocurrency:usd" size="24" />
					<div>
						<small class="label">Account Balance (USD)</small>
						<p class="coin-qty">{{ parseFloat(cryptoStore?.userBalance || 0).toFixed(4) ?? 0.0 }}</p>
					</div>
				</div>
				<div class="d-flex justify-content-center p-3">
					<button
						class="btn btn-primary btn-sm me-2 d-flex align-items-center"
						@click.prevent="handleStaking"
					>
						<Icon name="ph:wallet" class="me-2" />
						Staking
					</button>
					<button
						class="btn btn-info btn-sm me-2 text-white d-flex align-items-center"
						@click.prevent="handleBilling"
					>
						<Icon name="ph:credit-card" class="me-2" />
						Billing
					</button>
					<button
						class="btn btn-danger btn-sm text-white d-flex align-items-center"
						@click.prevent="handleDisconnectWallet"
					>
						<Icon name="ri:logout-circle-r-line" class="me-2" />
						Disconnect Wallet
					</button>
				</div>

				<div
					v-if="!cryptoStore.wrongNetwork && cryptoStore.currentAccount" class="alert alert-danger mt-2"
					role="alert"
				>
					<a href="#" @click.prevent="switchNetwork" class="alert-link">Wrong network. Click here to
						switch.</a>
				</div>

			</div>
		</div>
	</div>

	<platform-modal ref="walletModalRef" class="p-0">
		<template #default="{ close: closeDialog }">
			<web3-wallet @connect="closeDialog" :close="closeDialog" />
		</template>
	</platform-modal>

	<platform-modal ref="walletModalRef">
		<template #default="{ close: closeDialog }">
			<button type="button" class="btn-close" aria-label="Close" @click.prevent="closeDialog"></button>
			<web3-wallet @connect="closeDialog" />
		</template>
	</platform-modal>

	<platform-modal ref="stakingModalRef">
		<template #default="{ close: closeDialog }">
			<button type="button" class="btn-close" aria-label="Close" @click.prevent="closeDialog"></button>
			<web3-staking @close="closeDialog" />
		</template>
	</platform-modal>

	<platform-modal ref="billingModalRef">
		<template #default="{ close: closeDialog }">
			<button type="button" class="btn-close" aria-label="Close" @click.prevent="closeDialog"></button>
			<web3-billing @close="closeDialog" />
		</template>
	</platform-modal>
</template>

<script setup>
	const cryptoStore = useCryptoStore();
	const { switchNetwork, disconnectWallet } = useWeb3();
	const showWalletMenu = ref(false);

	const walletModalRef = ref(null);
	const stakingModalRef = ref(null);
	const billingModalRef = ref(null);

	const currentAccountTrimmed = computed(() => {
		if(cryptoStore.currentAccount) {
			return `${ cryptoStore.currentAccount.slice(0, 6) }...${ cryptoStore.currentAccount.slice(-4) }`;
		}
		return '';
	});

	const toggleWalletMenu = () => {
		showWalletMenu.value = !showWalletMenu.value;
	};

	const handleStaking = () => {
		stakingModalRef.value.openDialog();
		showWalletMenu.value = false;
	};

	const handleBilling = () => {
		billingModalRef.value.openDialog();
		showWalletMenu.value = false;
	};

	const handleDisconnectWallet = () => {
		disconnectWallet();
		showWalletMenu.value = false;
	};
</script>

<style lang="sass" scoped>

	.wallet-info
		padding-left: 1rem

		.wallet-button
			transition: none !important

		&:has(.wallet-menu)
			.wallet-button
				a
					background: #F2F3E6
					border-bottom: 0
					border-radius: 0.5rem 0.5rem 0 0
					box-shadow: none
					padding-bottom: 20px
					margin-bottom: -20px

					&:after
						content: ''
						position: absolute
						bottom: 0
						right: 0
						width: 80%
						height: 20px
						background: #F2F3E6
						z-index: 100

		.burrito-balance
			border-right: 2px solid $brand1
			align-items: center
			justify-content: center
			padding-right: 0.5rem

		.address
			align-items: center
			justify-content: center

		.wallet-menu
			position: absolute
			min-width: 250px
			top: 100%
			right: 102px
			z-index: 10
			border: 2px solid $brand1
			box-shadow: 0 0.5em 0 $brand1
			border-radius: 0.5rem 0 0.5rem 0.5rem
			background: #F2F3E6

			.coin,
			.connected-account
				border-bottom: 1px solid $brand1

			.coin
				.coin-qty
					line-height: 1
					margin: 0

			.label
				color: $brand1
				line-height: 1

				font-size: 0.75rem
				font-weight: 900

			.token-icon
				width: 24px
				height: 24px
				margin-right: 0.5rem

				&.wallet-icon
					margin-right: 0

		&:before
			content: ''
			position: absolute
			top: 50%
			transform: translateY(-50%)
			left: 0
			width: 100%
			height: calc(100% + 5px)
			border-radius: 10rem 0 0 10rem
			border: 2px solid $brand1
			border-right: 0

		.wallet-button
			top: -1px

	.wallet-button
		white-space: nowrap
		overflow-x: clip
		align-items: center
		display: flex
		font-size: 0.8rem
		gap: 2rem

		a
			font-weight: 900
			text-decoration: none
			border: 2px solid $brand1
			border-radius: 0.5rem
			color: $brand1
			text-transform: uppercase
			padding: 0.25rem 1rem
			box-shadow: 0 0.5em 0 $brand1
			transition: all 150ms ease-in-out !important

			&:active
				transform: translateY(0.5em)
				box-shadow: none

		img
			right: 0
			width: 70px
			transform: scale(1.5)
</style>
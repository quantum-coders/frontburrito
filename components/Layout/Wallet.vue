<template>
	<div class="wallet-button" v-if="!cryptoStore.currentAccount">
		<a href="#" @click.prevent="walletModalRef.openDialog()">Connect Wallet</a>
		<img alt="Burrito" src="/images/burrito-photo.png"/>
	</div>

	<div class="wallet-info" v-else>
		<div class="wallet-summary d-flex align-items-stretch gap-2">
			<img class="token-icon d-none d-sm-block" src="/images/burrito-token-icon.svg" alt="">
			<span class="d-none d-md-flex burrito-balance">
        {{ formatBalance(cryptoStore.burritoBalance) }}
      </span>
			<span class="address ms-2 d-none d-md-flex">{{ currentAccountTrimmed }}</span>

			<div class="wallet-button-container" v-click-outside="closeWalletMenu">
				<div class="wallet-button">
					<a href="#" class="wallet-button" @click.prevent="toggleWalletMenu">Wallet</a>
					<img alt="Burrito" src="/images/burrito-photo.png"/>
				</div>

				<div v-if="showWalletMenu" class="wallet-menu">
					<div class="connected-account d-flex flex-column p-2">
						<div
							v-if="!cryptoStore.isCorrectNetwork && cryptoStore.currentAccount"
							class="alert alert-danger mb-2 p-1 text-center"
						>
							<a href="#" @click.prevent="switchNetwork" class="alert-link">
								Wrong network honey. Switch here.
							</a>
						</div>

						<small class="label">Connected Account</small>
						<span class="text-truncate fs-5">{{ currentAccountTrimmed }}</span>
					</div>

					<div class="d-flex flex-column">
						<div class="coin d-flex align-items-center gap-2 py-1 px-2">
							<img src="/images/burrito-token-icon.svg" alt="BURRITO" class="token-icon">
							<div>
								<small class="label">BURRITO AI Tokens</small>
								<p class="coin-qty">{{ formatBalance(cryptoStore.burritoBalance) }}</p>
								<span v-if="web3Store.walletMobileLoading" class="mobile-loading-indicator"></span>

							</div>
						</div>
						<div class="coin d-flex align-items-center gap-2 py-1 px-2">
							<img src="/usdt-avax.svg" alt="USDT" class="token-icon">
							<div>
								<small class="label">USDT</small>
								<p class="coin-qty">{{ formatBalance(cryptoStore.usdtBalance) }}</p>
								<span v-if="web3Store.walletMobileLoading" class="mobile-loading-indicator"></span>

							</div>
						</div>
						<div class="coin d-flex align-items-center gap-2 py-1 px-2">
							<img src="/images/avax-logo.svg" alt="AVAX" class="token-icon">
							<div>
								<small class="label">AVAX</small>
								<p class="coin-qty">{{ formatBalance(cryptoStore.avaxBalance) }}</p>
								<span v-if="web3Store.walletMobileLoading" class="mobile-loading-indicator"></span>

							</div>
						</div>
						<div class="coin d-flex align-items-center gap-2 py-1 px-2">
							<icon name="cryptocurrency:usd" size="24"/>
							<div>
								<small class="label">Account Balance (USD)</small>
								<p class="coin-qty">{{ formatBalance(cryptoStore?.userBalance) }}</p>
								<span v-if="web3Store.walletMobileLoading" class="mobile-loading-indicator"></span>

							</div>
						</div>

						<div class="d-flex wallet-buttons">
							<button
								class="btn btn-sm flex-grow-1 d-flex align-items-center gap-2"
								@click="handleStaking"
							>
								<icon name="ph:wallet"/>
								Staking
							</button>
							<button
								class="btn btn-sm flex-grow-1 d-flex align-items-center gap-2"
								@click="handleBilling"
							>
								<icon name="ph:credit-card"/>
								Billing
							</button>
							<button
								class="btn btn-sm flex-grow-1 d-flex align-items-center gap-2"
								@click="handleDisconnectWallet"
							>
								<icon name="ri:logout-circle-r-line"/>
								Disconnect
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<platform-dialog ref="stakingModalRef" class="pretty-scrolls">
			<template #default="{ close }">
				<web3-staking
					:close="() => handleClose('staking', close)"
					v-if="useAuth().isAuthenticated && showStakingModal"
				/>
			</template>
		</platform-dialog>

		<platform-dialog ref="billingModalRef" class="">
			<template #default="{ close }">
				<web3-billing
					:close="() => handleClose('billing', close)"
					v-if="useAuth().isAuthenticated && showBillingModal"
				/>
			</template>
		</platform-dialog>
	</div>

	<platform-modal ref="walletModalRef" class="">
		<template #default="{ close }">
			<web3-wallet
				@connect="handleWalletConnect(close)"
				:close="close"
			/>
		</template>
	</platform-modal>
</template>

<script setup>

	const cryptoStore = useCryptoStore();
	const {switchNetwork, disconnectWallet} = useWeb3();
	const showWalletMenu = ref(false);
	const web3Store = useWeb3Store();
	const walletModalRef = ref(null);
	const stakingModalRef = ref(null);
	const billingModalRef = ref(null);
	const showStakingModal = ref(false);
	const showBillingModal = ref(false);

	// Format balance helper
	const formatBalance = (value) => {
		return parseFloat(value || 0).toFixed(4) ?? '0.0000';
	};

	const currentAccountTrimmed = computed(() => {
		if (cryptoStore.currentAccount) {
			return `${cryptoStore.currentAccount.slice(0, 6)}...${cryptoStore.currentAccount.slice(-4)}`;
		}
		return '';
	});

	onMounted(async () => {
		const authToken = localStorage.getItem('authToken');
		if (authToken) await useAuth().me(authToken);
	});

	const handleWalletConnect = async (close) => {
		try {
			console.log('🤝 Handling wallet connection...');
			// Asegúrate de que cryptoStore actualice los balances después de la conexión
			// await cryptoStore.updateBalances(); // Asume que tienes este método en tu store
			close(); // Cierra el modal después de conectar exitosamente
		} catch (error) {
			console.error('❌ Error connecting wallet:', error);
		}
	};

	const handleClose = (modalType, closeDialog) => {
		if (modalType === 'staking') {
			showStakingModal.value = false;
		} else if (modalType === 'billing') {
			showBillingModal.value = false;
		}
		closeDialog();
	};

	const toggleWalletMenu = () => {
		showWalletMenu.value = !showWalletMenu.value;
	};

	const closeWalletMenu = () => {
		showWalletMenu.value = false;
	};

	const handleStaking = () => {
		stakingModalRef.value.openDialog();
		showStakingModal.value = true;
		showWalletMenu.value = false;
	};

	const handleBilling = () => {
		billingModalRef.value.openDialog();
		showBillingModal.value = true;
		showWalletMenu.value = false;
	};

	const handleDisconnectWallet = () => {
		console.log('disconnecting wallet');
		disconnectWallet();
		console.log('wallet disconnected');
		showWalletMenu.value = false;
		console.log('wallet menu closed');
		localStorage.removeItem('authToken');
		console.log('authToken removed');
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

		.token-icon
			width: 24px

		.burrito-balance
			font-size: 0.8em
			font-weight: bold
			border-right: 2px solid $brand1
			align-items: center
			justify-content: center
			padding-right: 0.5rem

		.address
			font-size: 0.8em
			font-weight: bold
			align-items: center
			justify-content: center

		.wallet-menu
			position: absolute
			width: calc(100vw - 2rem)
			top: 100%
			right: 1rem
			z-index: 10
			border: 2px solid $brand1
			box-shadow: 0 0.5em 0 $brand1
			border-radius: 0.5rem 0 0.5rem 0.5rem
			background: #F7F2E9

			@media (min-width: $sm)
				width: 400px
				right: 102px

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
			z-index: 100
			right: 0
			width: 70px
			transform: scale(1.5)

	.wallet-buttons
		.btn
			border-radius: 0
			border-right: 1px solid $brand1
			justify-content: center

			&:last-child
				border-right: 0

	.alert-link
		font-size: 0.875rem
		text-decoration: none


</style>

<style lang="sass" scoped>
	.mobile-loading-indicator
		display: none
		// Por defecto oculto
		position: absolute
		right: -20px
		top: 50%
		transform: translateY(-50%)
		width: 12px
		height: 12px
		border: 2px solid $brand1
		border-radius: 50%
		border-top-color: transparent
		animation: spin 1s linear infinite

	@keyframes spin
		to
			transform: translateY(-50%) rotate(360deg)

	// Solo mostrar en móvil
	@media (max-width: $sm)
		.mobile-loading-indicator
			display: block

	// Si prefieres usar clases de Bootstrap para el responsive:
	@media (max-width: 576px)
		.mobile-loading-indicator
			display: block
</style>

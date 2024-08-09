<template>
	<div class="site-actions d-flex align-items-center gap-3 position-relative">
		<div v-if="cryptoStore.currentAccount" class="wallet-summary d-flex align-items-center gap-2">
			<img src="/burrito-icon_black.svg" alt="BURRITO" class="token-icon-burrito d-none d-md-block">
			<span class="fw-bold d-none d-md-block">BURRITO:</span>
			<span class="d-none d-md-block">{{ parseFloat(cryptoStore.burritoBalance || 0).toFixed(4) ?? 0.0 }}</span>
			<span class="address ms-2 d-none d-md-block">{{ currentAccountTrimmed }}</span>
			<button class="btn btn-outline-secondary btn-sm ms-2" @click="toggleWalletMenu">Wallet</button>
		</div>

		<div v-else class="connect-wallet-container">
			<a
				href="#" @click.prevent="walletModalRef.openDialog()"
				class="btn btn-primary d-flex align-items-center gap-2"
			>
				<span>Connect Wallet</span>
				<img src="/burrito-icon_white.svg" alt="Wallet" class="token-icon wallet-icon">
			</a>
		</div>

		<div v-if="showWalletMenu" class="wallet-menu position-absolute bg-white shadow-sm p-3 border rounded">
			<div class="d-flex justify-content-between align-items-center mb-2 gap-3">
				<small class="fw-bold">Connected Account:</small>
				<span class="text-truncate">{{ currentAccountTrimmed }}</span>
			</div>
			<hr class="dropdown-divider">
			<div class="d-flex flex-column gap-2">
				<div class="d-flex align-items-center gap-2">
					<img src="/burrito-icon_black.svg" alt="BURRITO" class="token-icon">
					<div>
						<small class="text-muted">BURRITO AI Tokens</small>
						<div>{{ parseFloat(cryptoStore.burritoBalance || 0).toFixed(4) ?? 0.0 }}</div>
					</div>
				</div>
				<hr class="dropdown-divider">
				<div class="d-flex align-items-center gap-2">
					<img src="/usdt-avax.svg" alt="USDT" class="token-icon">
					<div>
						<small class="text-muted">USDT</small>
						<div>{{ parseFloat(cryptoStore.usdtBalance || 0).toFixed(4) ?? 0.0 }}</div>
					</div>
				</div>
				<hr class="dropdown-divider">
				<div class="d-flex align-items-center gap-2">
					<img src="/avax-logo.svg" alt="AVAX" class="token-icon">
					<div>
						<small class="text-muted">AVAX</small>
						<div>{{ parseFloat(cryptoStore.avaxBalance || 0).toFixed(4) ?? 0.0 }}</div>
					</div>
				</div>
				<hr class="dropdown-divider">
				<!-- Nuevo balance para gastar en la IA -->
				<div class="d-flex align-items-center gap-2">
					<icon
						name="cryptocurrency:usd"
						size="24"
					/>
					<div>
						<small class="text-muted">Account Balance (USD)</small>
						<div>{{ parseFloat(cryptoStore?.userBalance || 0).toFixed(4) ?? 0.0 }}</div>
					</div>
				</div>
				<hr class="dropdown-divider">
				<div class="d-flex justify-content-center mt-2">
					<button
						class="btn btn-primary btn-sm me-2 d-flex align-items-center"
						@click.prevent="handleStaking"
					>
						<icon name="ph:wallet" class="me-2" />
						Staking
					</button>
					<button
						class="btn btn-info btn-sm me-2 text-white d-flex align-items-center"
						@click.prevent="handleBilling"
					>
						<icon name="ph:credit-card" class="me-2" />
						Billing
					</button>
					<button
						class="btn btn-danger btn-sm text-white d-flex align-items-center"
						@click.prevent="handleDisconnectWallet"
					>
						<icon name="ri:logout-circle-r-line" class="me-2" />
						Disconnect Wallet
					</button>
				</div>
			</div>
		</div>
	</div>

	<platform-dialog ref="walletModalRef">
		<template #default="{ close: closeDialog }">
			<button type="button" class="btn-close" aria-label="Close" @click.prevent="closeDialog"></button>
			<web3-wallet @connect="closeDialog" />
		</template>
	</platform-dialog>
	<platform-dialog ref="stakingModalRef">
		<template #default="{ close: closeDialog }">
			<button type="button" class="btn-close" aria-label="Close" @click.prevent="closeDialog"></button>
			<web3-staking @close="closeDialog" />
		</template>
	</platform-dialog>
	<platform-dialog ref="billingModalRef">
		<template #default="{ close: closeDialog }">
			<button type="button" class="btn-close" aria-label="Close" @click.prevent="closeDialog"></button>
			<web3-billing @close="closeDialog" />
		</template>
	</platform-dialog>
</template>

<script setup>
	const cryptoStore = useCryptoStore();
	const { switchNetwork, disconnectWallet } = useWeb3();
	const showWalletMenu = ref(false);
	const walletModalRef = ref(null);
	const stakingModalRef = ref(null);
	const billingModalRef = ref(null);

	const handleStaking = () => {
		stakingModalRef.value.openDialog();
		showWalletMenu.value = false;
	};

	const handleBilling = () => {
		billingModalRef.value.openDialog();
		showWalletMenu.value = false;
	};

	const currentAccountTrimmed = computed(() => {
		if(cryptoStore.currentAccount) {
			return `${ cryptoStore.currentAccount.slice(0, 6) }...${ cryptoStore.currentAccount.slice(-4) }`;
		}
		return '';
	});

	const toggleWalletMenu = () => {
		showWalletMenu.value = !showWalletMenu.value;
	};

	const closeWalletMenu = (event) => {
		if(!event.target.closest('.wallet-menu') && !event.target.closest('.btn-outline-secondary')) {
			showWalletMenu.value = false;
		}
	};

	const handleDisconnectWallet = () => {
		disconnectWallet();
		showWalletMenu.value = false;
	};

	onMounted(() => {
		document.addEventListener('click', closeWalletMenu);
	});
</script>

<style lang="sass" scoped>
	$md: 768px
	$lg: 992px

	.token-icon-burrito
		width: 24px
		height: 24px
		margin-right: 0

	.site-actions
		display: flex
		justify-content: flex-end
		align-items: center
		gap: 1rem
		@media (min-width: $lg)
			min-width: 200px

	.wallet-summary
		display: flex
		align-items: center

	.wallet-menu
		min-width: 250px
		top: 100%
		right: 0
		z-index: 10
		@media (max-width: $md)
			min-width: 200px
			right: auto
			left: 0
			margin: 0 auto

	.token-icon
		width: 24px
		height: 24px
		margin-right: 0.5rem

		&.wallet-icon
			margin-right: 0

	.address
		font-size: 0.85rem
		font-weight: 500
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis

	.btn-close
		position: absolute
		top: 1rem
		right: 1rem
		cursor: pointer
		z-index: 10

	.dropdown-divider
		border-top: 1px solid #dee2e6
		margin: 0.2rem 0
</style>

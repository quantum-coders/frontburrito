<template>
	<div class="web3-wallet">
		<div class="wallet-header">
			<button type="button" class="btn-close" aria-label="Close" @click.prevent="close"></button>
			<h5 class="wallet-title text-center">Connect a wallet</h5>
		</div>

		<div class="loading" :class="{ 'active': loading }">
			<!-- bootstrap spinner -->
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div class="px-3">
			<nav class="wallets">
				<div class="row align-items-stretch" v-if="$device.isDesktop">
					<div class="col-4 col-wallet d-flex flex-column align-items-center justify-content-end">
						<img alt="" class="selector" src="/images/wallets/selector-arrow.gif" />

						<div
							v-if="$device.isDesktop"
							class="wallet"
						>
							<a
								v-if="!coreInstalled"
								href="https://core.app"
								target="_blank"
								class="wallet-link"
							/>
							<a v-else @click.prevent="doConnect('core')" href="#" class="wallet-link" />
							<img
								class="wallet-sprite sprite-core"
								src="/images/wallets/core.gif"
								alt="Core"
							>
							<p class="wallet-name">Core</p>
							<p class="wallet-status">
								<span class="installed" v-if="coreInstalled">
									<span class="inst">Installed</span>
									<span class="conn">Connect</span>
								</span>
								<span class="get" v-else>Get</span>
							</p>
						</div>
					</div>
					<div class="col-4 col-wallet d-flex flex-column align-items-center justify-content-end">
						<img alt="" class="selector" src="/images/wallets/selector-arrow.gif" />

						<div class="wallet">
							<a
								v-if="!metamaskInstalled"
								href="https://metamask.io/"
								target="_blank"
								class="wallet-link"
							/>
							<a v-else @click.prevent="doConnect('metamask')" href="#" class="wallet-link" />
							<img
								class="wallet-sprite sprite-metamask"
								src="/images/wallets/metamask.gif"
								alt="Metamask"
							>
							<p class="wallet-name">Metamask</p>
							<p class="wallet-status">
								<span class="installed" v-if="metamaskInstalled">
									<span class="inst">Installed</span>
									<span class="conn">Connect</span>
								</span>
								<span class="get" v-else>Get</span>
							</p>
						</div>
					</div>
					<div class="col-4 col-wallet d-flex flex-column align-items-center justify-content-end">
						<img alt="" class="selector" src="/images/wallets/selector-arrow.gif" />

						<div class="wallet">
							<a
								v-if="!rabbyInstalled"
								href="https://rabby.io/"
								target="_blank"
								class="wallet-link"
							/>
							<a v-else @click.prevent="doConnect('rabby')" href="#" class="wallet-link" />
							<img
								class="wallet-sprite sprite-rabby"
								src="/images/wallets/rabby.gif"
								alt="Rabby Wallet"
							>
							<p class="wallet-name">Rabby Wallet</p>
							<p class="wallet-status">
								<span class="installed" v-if="rabbyInstalled">
									<span class="inst">Installed</span>
									<span class="conn">Connect</span>
								</span>
								<span class="get" v-else>Get</span>
							</p>
						</div>
					</div>
				</div>
				<div class="row align-items-center justify-content-center" v-else>
					<div class="wallet">
						<a @click.prevent="doConnect('walletconnect')" href="#" class="wallet-link" />
						<img
							class="wallet-sprite sprite-metamask"
							src="/images/wallets/metamask.gif"
							alt="Metamask"
						>
						<p class="wallet-name">WalletConnect</p>
						<p class="wallet-status">
							<span class="installed">
								<span
									class="conn"
									@click.prevent="doConnect('walletconnect')"
								>Connect</span>
							</span>
						</p>
						<p class="text-muted small">
							In order to connect your wallet, you must have Metamask App installed on your device.
						</p>
					</div>
				</div>
			</nav>
			<div class="copy d-none">
				<h4>What is a Wallet?</h4>

				<h6>A Secure Digital Asset Holder</h6>
				<p>Wallets store, send, receive, and showcase digital assets such as Ethereum and NFTs.</p>

				<h6>A Simplified Login Experience</h6>
				<p>Rather than creating new accounts and passwords for each website, simply connect your wallet.</p>
			</div>
		</div>
	</div>
</template>
<script setup>
	const cryptoStore = useCryptoStore();
	import { injectedProvider } from 'thirdweb/wallets';
	const { isMobile } = useDevice();
	const route = useRoute();
	const loading = ref(false);

	const {
		initProvider,
		requestNetworkChange,
		checkConnection,
		loginWithMetamask,
	} = useWeb3();

	const emit = defineEmits([ 'connect' ]);

	const nftCounter = ref(0);

	const props = defineProps({
		close: {
			type: Function,
			default: () => {},
		},
	});

	const metamaskInstalled = ref(false);
	const coreInstalled = ref(false);
	const rabbyInstalled = ref(false);

	onMounted(async () => {
		console.info("checkpint....")
		const isMobileParam = route?.query?.isMobileDevice ?? 'false';
		console.log('isMobileDevice:', isMobileParam);
		if (isMobileParam === 'true') {
			console.info("Estas entrando?")
			await initProvider('metamask', true, false)
		}
		console.log('idaadfs Mobile', isMobile);
		let providerName = localStorage.getItem('providerName');
		console.log('prasdfasdfasdfasdfasdfoviderName', providerName);
		if(providerName !== '' && providerName != null) {
			await initProvider(providerName, true);
		}
		const resMetamask = await injectedProvider('io.metamask');
		console.info("------------------>metamask", resMetamask);
		metamaskInstalled.value = await injectedProvider('io.metamask');
		rabbyInstalled.value = await injectedProvider('io.rabby');
		coreInstalled.value = !!window.avalanche;

	});

	const doConnect = async (provider) => {
		loading.value = true;
		try {
			await initProvider(provider, false, isMobile);
			loading.value = false;
		} catch(e) {
			console.error(e);
			loading.value = false;
		}
		emit('connect');
	};
</script>

<style scoped lang="sass">
	.wallet-sprite
		image-rendering: pixelated

		&.sprite-core
			width: 27 * 2px

		&.sprite-metamask
			width: 33 * 2px

		&.sprite-rabby
			width: 29 * 2px
			left: -8px

	.web3-wallet
		width: 800px
		max-width: 100%

		.wallet-header
			border-bottom: 1px solid rgba($brand1, 0.25)
			padding: 0.5rem

			.btn-close
				position: absolute
				right: 1rem
				top: 50%
				transform: translateY(-50%)
				z-index: 10

			.wallet-title
				font-family: "Chibold", sans-serif
				font-size: 2.5rem
				color: $primary
				margin: 0

		.loading
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: rgba(255, 255, 255, 0.8)
			z-index: 100
			display: flex
			justify-content: center
			align-items: center
			opacity: 0
			transition: all 500ms ease-in-out
			pointer-events: none

			&.active
				opacity: 1
				pointer-events: all

		.wallets
			padding: 2rem
			text-align: center
			width: 100%

			.col-wallet
				border: 1px solid transparent
				border-radius: 0.5rem
				padding-top: 1rem

				.selector
					width: 14px
					position: absolute
					top: 1rem
					image-rendering: pixelated
					opacity: 0

				&:hover
					border: 1px solid $brand1

					.selector
						opacity: 1

			.wallet
				margin-top: 1.5rem
				width: 100%
				display: flex
				flex-direction: column
				align-items: center
				justify-content: flex-end

				.wallet-name
					color: $brand1
					font-weight: bold
					margin-bottom: 0

				.wallet-link
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					z-index: 10

				.wallet-status
					font-size: 0.75rem
					width: 100%

					.installed
						height: 16px
						display: block

						span
							position: absolute
							left: 50%
							transform: translateX(-50%)
							top: 0
							transition: all 500ms ease-in-out

							&.inst
								opacity: 1
								color: var(--bs-success)
								font-weight: bold

							&.conn
								background: var(--bs-success)
								color: white
								border-radius: 1rem
								padding: 0 1rem
								opacity: 0

				&:hover
					.wallet-status
						.installed
							.inst
								opacity: 0

							.conn
								opacity: 1

				img
					margin-bottom: 0.5rem

			li
				display: flex
				justify-content: space-between
				margin-bottom: 2rem
				align-items: center

				.wallet-link
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					z-index: 100

				img
					transition: all 500ms ease

				.is-installed
					font-size: 0.8rem
					font-weight: normal

					a
						font-weight: normal
						font-size: 0.8rem

					.installed
						color: #9AE780

						span
							position: absolute
							right: 0
							top: 50%
							transform: translateY(-50%)
							transition: all 500ms ease

							&.inst
								opacity: 1

							&.conn
								opacity: 0

					.get
						color: #CCC
						transition: all 500ms ease

				a
					display: flex
					align-items: center
					text-decoration: none
					color: currentColor
					font-weight: 600
					font-size: 1.2rem

					img
						width: 30px
						margin-right: 1rem

		.copy
			text-align: center

			@media (min-width: $sm)
				text-align: left
				padding-left: 2rem

			a
				color: currentColor

			h3
				font-size: 1.5rem

			h4
				font-size: 1.25rem

			p
				color: #4C4C4C

			.btn-get
				box-shadow: 0 14px 25px 0 #ECECEC
				background: white
				padding: 0.75rem 1rem
				border: 1px solid rgba(black, 0.125)
				width: 200px

</style>

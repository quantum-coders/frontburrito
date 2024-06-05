<template>
	<div class="web3-wallet">
		<h2 class="title mb-5">Connect a wallet</h2>

		<div class="loading" :class="{ 'active': loading }">
			<!-- bootstrap spinner -->
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div class="row align-items-stretch">
			<div class="col-12 col-sm-5 col-wallets">
				<nav class="wallets">
					<ul class="list-unstyled">
						<li>
							<a v-if="!coreInstalled" href="https://core.app" target="_blank" class="wallet-link" />
							<a v-else @click.prevent="doConnect('core')" href="#" class="wallet-link" />

							<a><img src="/images/core.png" alt="Core"> Core</a>

							<span class="is-installed">
								<span class="installed" v-if="coreInstalled">
									<span class="inst">Installed</span>
									<span class="conn">Connect</span>
								</span>
								<span class="get" v-else>Get</span>
							</span>
						</li>
						<li>
							<a v-if="!metamaskInstalled" href="https://metamask.io/" target="_blank" class="wallet-link" />
							<a v-else @click.prevent="doConnect('metamask')" href="#" class="wallet-link" />

							<a><img src="/images/metamask.png" alt="Metamask"> Metamask</a>

							<span class="is-installed">
								<span class="installed" v-if="metamaskInstalled">
									<span class="inst">Installed</span>
									<span class="conn">Connect</span>
								</span>
								<span class="get" v-else>Get</span>
							</span>
						</li>
						<li>
							<a v-if="!rabbyInstalled" href="https://rabby.io/" target="_blank" class="wallet-link" />
							<a v-else @click.prevent="doConnect('rabby')" href="#" class="wallet-link" />

							<a><img src="/images/rabbit-coin.png" alt="Rabby Wallet"> Rabby Wallet</a>

							<span class="is-installed">
								<span class="installed" v-if="rabbyInstalled">
									<span class="inst">Installed</span>
									<span class="conn">Connect</span>
								</span>
								<span class="get" v-else>Get</span>
							</span>
						</li>
					</ul>
				</nav>

			</div>
			<div class="col-12 col-sm-7">
				<div class="copy">
					<h3>What is a Wallet?</h3>

					<h4>A Secure Digital Asset Holder</h4>
					<p>Wallets store, send, receive, and showcase digital assets such as Ethereum and NFTs.</p>

					<h4>A Simplified Login Experience</h4>
					<p>Rather than creating new accounts and passwords for each website, simply connect your wallet.</p>
				</div>

			</div>
		</div>
	</div>
</template>
<script setup>
	const cryptoStore = useCryptoStore();
	import { injectedProvider } from 'thirdweb/wallets';

	const loading = ref(false);

	const {
		initProvider,
		requestNetworkChange,
		checkConnection,
	} = useWeb3();

	const emit = defineEmits([ 'connect' ]);

	const nftCounter = ref(0);

	const metamaskInstalled = ref(false);
	const coreInstalled = ref(false);
	const rabbyInstalled = ref(false);

	onMounted(async () => {
		console.log("[Wallet.vue] onMounted")
		const providerName = localStorage.getItem('providerName')
		console.log("[Wallet.vue] providerName", providerName)
		if(providerName !== '' && providerName != null){
			await initProvider(providerName, true);
		}
		metamaskInstalled.value = await injectedProvider('io.metamask');
		rabbyInstalled.value = await injectedProvider('io.rabby');
		coreInstalled.value = !!window.avalanche;
	});

	const doConnect = async (provider) => {
		loading.value = true;
		try {
			await initProvider(provider);
			loading.value = false;
		}catch (e) {
			console.error(e);
			loading.value = false;
		}
		emit('connect');
	};
</script>

<style scoped lang="sass">
	.web3-wallet
		width: 800px
		max-width: 100%
		padding: 0.5rem

		@media (min-width: $sm)
			padding: 2rem

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

		.col-wallets
			border-bottom: 1px solid #ccc
			margin-bottom: 1rem

			@media (min-width: $sm)
				border-bottom: 0
				border-right: 1px solid #ccc
				margin-bottom: 0

		.wallets
			padding-right: 2rem

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

				&:hover
					img
						margin-left: 1rem

					.installed span
						&.conn
							opacity: 1 !important

						&.inst
							opacity: 0 !important

					.is-installed .get
						color: #333

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

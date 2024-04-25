<template>
	<div class="web3-wallet">
		<a
				v-if="cryptoStore.currentAccount == null"
				href="#" class="connect-wallet d-flex align-items-center gap-2">
			<span class="d-none d-sm-block">Connect Wallet</span>
			<svgo-icon-wallet class="icon-wallet" />
		</a>
		<ul class="submenu list-unstyled" v-if="cryptoStore.currentAccount == null">
			<li><a href="#"
					@click="doConnect('core')"
			>Core Wallet</a></li>
			<li><a
					@click="doConnect('metamask')"
					href="#">Metamask</a></li>
		</ul>
		<div v-else-if="cryptoStore.correctNetwork === 0" class="d-flex align-items-center">
			<a
					href="#"
					@click="switchNetwork"
					class="button-wallet button-wrong-network btn btn-lg rounded-pill border-1 border-white h6 d-flex align-items-center text-danger"
			>
				<svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 576 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
					<path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
				</svg>
				Wrong network
			</a>
		</div>
		<div v-else class="d-flex align-items-center">
			<a
					href="#"
					class="button-wallet btn btn-lg rounded-pill border-1 border-black h6"
			>
									<span class="wallet-actions">
										<span class="account" v-if="cryptoStore.initLoading">
											<span
													class="spinner-border spinner-border-sm"
													role="status"
													aria-hidden="true"
											></span>
										</span>
										<span v-else class="account">{{ currentAccountTrimmed }}</span>
										<span @click="disconnectWallet" class="disconnect">Disconnect</span>
									</span>

				<div
						class="nfts"
				>
					<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 512 512"
					>
						<path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z" />
					</svg>
					<nuxt-link
							class="nft-link"
							to="/dashboard"
					>
											<span v-if="cryptoStore.initLoading || cryptoStore.nftsLoading || cryptoStore.stakedNftsLoading">
												<span
														class="spinner-border spinner-border-sm"
														role="status"
														aria-hidden="true"
												></span>
											</span>
						<span v-else>
												{{ cryptoStore.nfts.length + cryptoStore.stakedNfts.length }} NFT{{ cryptoStore.nfts.length > 1 ? 's' : '' }}
											</span>
					</nuxt-link>
				</div>
			</a>
		</div>
	</div>
</template>
<script setup>
const cryptoStore = useCryptoStore();

const {
	currentAccountTrimmed,
	initProvider,
	disconnectWallet,
	requestNetworkChange,
	checkConnection,
} = useWeb3();

const nftCounter = ref(0);

onMounted(async () => {
	const isConnected = await checkConnection();
	if(isConnected) {
		await initProvider();
	}
});

const doConnect = async (provider) => {
	await initProvider(provider);
	await requestNetworkChange();
};

const switchNetwork = async () => {
	await requestNetworkChange();
};
</script>

<style scoped lang="sass">
	.web3-wallet
		position: relative
		display: inline-block
		z-index: 2000

	.connect-wallet
		display: flex
		align-items: center
		gap: 2px
		color: var(--bs-body-color)
		text-decoration: none
		font-weight: bold
		cursor: pointer
		position: relative
		z-index: 101

	.submenu
		position: absolute
		top: 100%
		left: 50%
		transform: translateX(-50%) translateY(5px)
		background: #F8F8F8
		padding: 0.5rem 0
		z-index: 1100
		box-shadow: 0 8px 16px rgba(0,0,0,0.1)
		transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out
		transform-origin: top
		opacity: 0
		visibility: hidden
		pointer-events: none
		margin-top: 10px
		&:before
			content: ''
			position: absolute
			top: -10px
			height: 10px
			left: 0
			right: 0
			z-index: -1

	.web3-wallet:hover .submenu
		display: block
		opacity: 1
		visibility: visible
		pointer-events: auto
		transform: translateX(-50%) translateY(0px)

	.submenu li a
		display: block
		padding: 0.5rem 1rem
		color: var(--bs-body-color)
		text-decoration: none
		white-space: nowrap
		font-weight: bold
		transition: color 0.3s ease

	.submenu li a:hover
		color: var(--brand1)

	.button-wallet
		font-size: 1rem !important
		margin: 0
		transition: 500ms all
		min-width: 180px
		position: relative
		height: 40px
		align-items: stretch
		display: flex
		padding: 0
		justify-content: center

		&.button-wrong-network
			svg
				fill: $danger
				margin-right: 0.5rem

		&.is-connect
			align-items: center
			justify-content: center

		.nfts
			display: flex
			font-weight: bold
			align-items: center
			padding: 0 1rem
			border-left: 1px solid black
			gap: 0.5rem

			&:empty
				display: none

			.nft-link
				color: black
				text-decoration: none
				width: 60px

			svg
				fill: white

		.wallet-actions
			display: flex
			align-items: center
			justify-content: center
			position: relative
			transition: opacity 500ms

			&:hover
				.disconnect
					opacity: 1

				.account
					opacity: 0

			.account
				padding: 1rem
				display: flex
				font-weight: bold
				align-items: center
				justify-content: center
				inset: 0
				transition: opacity 500ms
				width: 150px

			.disconnect
				font-weight: bold
				padding: 1rem
				display: flex
				align-items: center
				justify-content: center
				position: absolute
				inset: 0
				opacity: 0
				transition: opacity 500ms
</style>

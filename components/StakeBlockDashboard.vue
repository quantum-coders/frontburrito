<template>
	<div id="staking" class="block block-stake bg-white position-relative">
		<!-- <div class="loading" v-if="cryptoStore.nftsLoading || cryptoStore.stakingLoading">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div> -->
		<div class="container">
			<div class="title d-flex flex-column flex-sm-row justify-content-between gap-2 gap-sm-4 align-items-center align-items-center">
				<h1 class="purple m-0 fw-bold text-center text-start text-balance">Stake your NFTs to buy $BurritoIA</h1>
				<p class="purple m-0 text-center text-sm-end text-balance">Select your NFT to be STAKED
					<small>(Stake as many as you wish)</small>
				</p>
			</div>

			<!--<div v-if="nfts.length < 5" class="d-flex align-items-center justify-content-end gap-2">
				<h6 class="mb-0">You can still mint {{ 5 - nfts.length }} NFTs</h6>
				<nuxt-link to="/presale-access-nft#secure">
					<bpay-button-v2 class="btn-sm px-4">Mint Now!</bpay-button-v2>
				</nuxt-link>
			</div>-->

			<div
				class="cards d-flex gap-4 align-items-center flex-column flex-sm-row mb-2"
			>
				nfcarouselle
			</div>

			<div class="legends-wrapper">
				<div class="row align-items-center">
					<div class="col-12 col-sm-7">
						<p class="buttons text-end px-3 d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
							<bpay-button-v2
								disabled
							>
								<img class="btn-image btn-image-3" src="/ui3.png" alt="">
								STAKE
							</bpay-button-v2>
							<bpay-button-v2
							>
								<img class="btn-image btn-image-3" src="/ui3.png" alt="">
								STAKE
							</bpay-button-v2>

							<bpay-button-v2 to="/presale-access-nft#secure">
								<img class="btn-image btn-image-3" src="/ui3.png" alt="">
								BACK TO MINT
							</bpay-button-v2>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	.legends-wrapper
		width: 90%
		margin: 0 auto

	.loading
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		background: rgba(white, 50%)
		z-index: 100
		width: 100%
		height: 100%
		display: flex
		justify-content: center
		align-items: center

	.swiper-button-prev,
	.swiper-button-next
		color: $purple

		&::after
			font-size: 1.5rem

	.swiper-button-prev
		@media (min-width: $sm)
			left: -2rem

	.swiper-button-next
		@media (min-width: $sm)
			right: -2rem

	.title
		h1
			font-size: 1.5rem

			@media (min-width: $sm)
				white-space: nowrap
				font-size: 1.2rem

			@media (min-width: $md)
				font-size: 1.3rem

			@media (min-width: $lg)
				font-size: 1.8rem

			@media (min-width: $xl)
				font-size: 2.3rem

		p
			font-size: 1rem

			@media (min-width: $sm)
				white-space: nowrap
				font-size: 0.8rem

			@media (min-width: $md)
				font-size: 0.8rem

			@media (min-width: $lg)
				font-size: 1rem

			@media (min-width: $xl)
				font-size: 1.2rem

	.swiper-slide
		text-align: center
		padding: 2rem 0 0
		display: flex
		justify-content: center
		align-items: center
		transition: all 400ms

		&.is-muted
			opacity: 0.5

		@media (min-width: $sm)
			padding: 5rem 0 0

		&:has(.is-active)
			z-index: 100

		.btn
			position: relative
			z-index: 100

	.block
		padding: 3rem 0
		z-index: 100
		position: relative

		@media (min-width: $sm)
			padding: 5rem 0
			padding-bottom: 0

		.video-wrapper
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			margin: 0 auto

			.direct-video-wrapper
				transition: all 500ms
				position: relative

				&:before
					// 100% overlay with white border
					content: ''
					position: absolute
					top: -1px
					left: -1px
					width: calc(100% + 2px)
					height: calc(100% + 2px)
					border: 2px solid white
					z-index: 100
					pointer-events: none

			.nft-video
				width: 200px
				cursor: pointer
				transition: all 400ms
				margin: 0 auto

			.btn
				opacity: 0
				pointer-events: none
				transition: all 500ms

			&.is-active
				.direct-video-wrapper
					transform: scale(1.1)
					position: relative
					top: -20px

					@media (min-width: $sm)
						transform: scale(1.21)

				.btn
					opacity: 1
					pointer-events: all

		.staked
			width: 300px
			min-width: 300px
			margin: 0 2rem

			video
				width: 100%

		.bpay-card
			aspect-ratio: 9 / 12.7
			border-radius: 0.25rem
			background: linear-gradient(180deg, #EBEBEB 0%, #FAFAFA 100%)

		.cards-carrousel
			width: 100%

			@media (min-width: $sm)
				width: calc(100% - 400px)
				margin: 0 auto

			.video-wrapper
				@media (min-width: $sm)
					width: 80%
					video
						width: 100%

			.bpay-card
				margin: 0 auto
				width: 40%
				position: relative
				top: -6%

				@media (min-width: $sm)
					width: 65%
					margin-top: 8%

		:deep(.btn-gradient)
			img
				height: 70px !important
				width: auto
</style>
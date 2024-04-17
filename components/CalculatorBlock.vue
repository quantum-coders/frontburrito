<template>
    <div class="modal-wrapper">
        <div class="mint-modal">
            <button type="button" class="btn-close" aria-label="Close" />
            <div class="mint-wizard">
                <div class="steps d-flex">
                    <div class="step step-1">
                        <!-- Contenido del paso 1 -->
                    </div>
                    <div class="step step-2">
                        <!-- Contenido del paso 2 -->
                    </div>
                    <div class="step step-3">
                        <!-- Contenido del paso 3 -->
                    </div>
                    <div class="step step-4 flex-grow-1 flex-column">
                        <!-- Contenido del paso 4 -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>

	.modal-wrapper
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 1000
		display: flex
		align-items: center
		justify-content: center
		box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2)
		backdrop-filter: blur(5px)

		.mint-modal
			background: white
			width: 90%
			max-width: 900px
			border-radius: 1rem
			z-index: 10
			box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .08)
			position: relative
			padding-bottom: 2rem
			padding-top: 2rem

			.btn-close
				position: absolute
				top: 1rem
				right: 1rem
				color: $purple
				width: 1.5rem
				cursor: pointer
				opacity: 1
				z-index: 10000

	.loading
		position: absolute
		left: 0
		top: -10%
		width: 100%
		height: 110%
		display: flex
		align-items: center
		justify-content: center
		background: white
		z-index: 100
		opacity: 0
		pointer-events: none
		transition: opacity 500ms

		&.active
			opacity: 1
			pointer-events: all

	.step-video
		height: 300px
		max-height: 300px
		text-align: center

		video
			height: 100%
			max-width: 100%
			max-height: 300px

		.card-video-wrapper
			max-width: 100%
			display: block
			position: relative

			.card-video-reveal,
			.card-video-revealed
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				opacity: 0

			.card-video-revealed
				transition: transform 0.5s ease-in-out

				&:hover
					transform: scale(1.1)


		&:has(.card-video:nth-child(2)) .card-video
			max-width: calc(100% / 2)

		&:has(.card-video:nth-child(3)) .card-video
			max-width: calc(100% / 3)

		&:has(.card-video:nth-child(4)) .card-video
			max-width: calc(100% / 4)

		&:has(.card-video:nth-child(5)) .card-video
			max-width: calc(100% / 5)

	.wizard-button
		background: linear-gradient(180deg, $purple 0%, #2300AE 100%)
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
		color: white
		border: 0
		padding: 1.5rem 2.5rem
		border-radius: 8px
		font-weight: bolder
		font-size: 1rem

	.steps
		height: 450px
		position: relative

		.step
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%

	.step-3 .step-video
		position: relative

		&:after
			content: ''
			position: absolute
			bottom: -25%
			left: 0
			width: 100%
			height: 7%
			// background gradient from 0 to 100% opacity
			background: linear-gradient(180deg, rgba(white, 0) 0%, white 100%)

	// Specific stuff --------------------------------------------------------------------------------------------------

	.step1-wallet
		word-break: break-all

	.check
		width: 40px
		opacity: 0
		pointer-events: none
		transition: opacity 500ms

		&.active
			opacity: 1
			pointer-events: all

	.closed-chest,
	.idle-chest,
	.glow-chest
		max-height: 125% !important
		height: 125% !important
</style>
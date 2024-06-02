<template>
	<div class="button-wrapper">
		<button>
			<span class="svg-wrapper">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path
						fill="currentColor"
						d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
					></path>
				</svg>
			</span>
			<span class="button-text">Send</span>
		</button>
	</div>

</template>

<script setup>
</script>

<style lang="sass" scoped>

	button
		font-family: inherit
		font-size: 1rem
		background: $brand1
		color: white
		gap: 1rem
		padding: 0.5rem 2rem
		display: flex
		align-items: center
		border: none
		border-radius: 10rem
		transition: all 500ms ease-in-out
		cursor: pointer
		overflow: hidden

		.button-text
			display: block
			transform-origin: center center
			transition: all 500ms ease-in-out

		svg
			display: block
			transform-origin: center center
			transition: all 500ms ease-in-out

		&:hover
			.svg-wrapper
				animation: fly 500ms ease-in-out infinite alternate

			svg
				transform: translateX(1.75em) rotate(45deg) scale(1.1)

			.button-text
				transform: translateX(5em)

		&:active
			transform: scale(0.95)


	@keyframes fly
		from
			transform: translateY(0.1em)
		to
			transform: translateY(-0.1em)
</style>
<template>
	<div class="animation-wrapper">
		<div class="square square1"></div>
		<div class="square square2"></div>

		<div class="line"></div>
	</div>
</template>

<script setup>
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.animation-wrapper
		display: flex
		gap: 0.3rem
		align-items: center
		justify-content: center
		width: 40px
		transition: all 0.3s ease

		.line
			position: absolute
			width: 10px
			height: 2px
			background-color: var(--bs-body-color)
			transition: all 0.3s ease
			left: 50%
			top: 50%
			transform: translate(-50%, -50%)
			opacity: 0

		.square
			border: 2px solid var(--bs-body-color)
			aspect-ratio: 1
			width: 16px
			transition: all 0.3s ease
			border-radius: 0.125rem

	.animation-wrapper.closed,
	.connect-wallet:hover .animation-wrapper
		gap: 0

		.square2
			margin-left: -2px

		.line
			opacity: 1
</style>
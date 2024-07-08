<template>
	<div class="marquee">
		<div class="track">
			<div class="content">
				<img src="/images/what-are-you-waiting-for.svg" alt="">
				<img src="/images/what-are-you-waiting-for.svg" alt="">
				<img src="/images/what-are-you-waiting-for.svg" alt="">
			</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style lang="sass" scoped>

	.marquee
		overflow: clip
		width: 100vw
		max-width: 100%
		height: 100px
		// slightly rotate the marquee to make it more interesting
		transform: rotate(2deg) scale(1.5)
		margin-bottom: 5rem

		.track
			position: absolute
			white-space: nowrap
			will-change: transform
			animation: marquee 32s linear infinite

		.content
			white-space: nowrap

			img
				height: 100px
				margin-right: 3rem

	@keyframes marquee
		0%
			transform: translateX(0)
		100%
			transform: translateX(-50%)
</style>
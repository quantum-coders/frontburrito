<template>
	<div class="block block-video">
		<div class="container">
			<h2>Democratizing IA will increase transparency and efficiency</h2>
			<p>Blockchain-based global and efficient crypto+IA finances, to accelerate prosperity and accelerate humanity.</p>

			<div class="video-wrapper">
				<div class="ratio ratio-16x9">
					<iframe
						data-v-24391455=""
						width="560"
						height="315"
						src="https://www.youtube.com/embed/Rk-wAtC89UI?si=BVCoVSyAJr_4nf47"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen=""
					></iframe>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	useHead({
		title: 'Burrito AI',
	});

</script>

<style lang="sass" scoped>
	.block-video
		background: white
		text-align: center
		padding: 5rem 0

		h2
			margin-bottom: 0.5rem
			color: $brand2

		p
			font-size: 1.2rem

			margin-bottom: 3rem

		.video-wrapper
			max-width: 800px
			margin: 0 auto

</style>
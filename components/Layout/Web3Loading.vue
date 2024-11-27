<template>
	<div class="loading-wrapper">
		<div class="loading-container">
			<div class="loading-content">
				<img src="/images/burrito-photo.png" alt="Burrito" class="loading-burrito"/>

				<div class="loading-bar">
					<div class="loading-progress"></div>
				</div>

				<div class="loading-message">
					<p>{{ currentMessage }}</p>
				</div>

				<div class="loading-dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const messages = [
		"🌯 Rolling up the blockchain...",
		"🔄 Connecting to your wallet...",
		"🎨 Loading your personalized experience...",
		"🚀 Initializing Web3...",
		"✨ Setting up your secure connection...",
		"🌟 Almost ready to serve you...",
		"🎮 Preparing your dashboard...",
		"🔗 Syncing with the network..."
	];

	const currentMessage = ref(messages[0]);
	let messageIndex = 0;

	onMounted(() => {
		const interval = setInterval(() => {
			messageIndex = (messageIndex + 1) % messages.length;
			currentMessage.value = messages[messageIndex];
		}, 2000);

		onUnmounted(() => {
			clearInterval(interval);
		});
	});
</script>

<style lang="sass" scoped>
	.loading-wrapper
		min-height: 100vh
		display: flex
		align-items: center
		justify-content: center
		background: $complement
		padding: 1rem

	.loading-container
		max-width: 400px
		width: 100%
		text-align: center
		padding: 2rem
		border: 2px solid $brand1
		border-radius: 1rem
		background: $complement
		box-shadow: 0 0.5em 0 $brand1
		margin: 1rem

	.loading-content
		display: flex
		flex-direction: column
		align-items: center
		gap: 1.5rem

	.loading-burrito
		width: 80px
		height: 80px
		animation: bounce 1s ease-in-out infinite alternate

	.loading-bar
		width: 100%
		height: 10px
		background: lighten($brand1, 40%)
		border-radius: 5px
		overflow: hidden
		border: 2px solid $brand1

		.loading-progress
			height: 100%
			width: 50%
			background: $brand1
			border-radius: 5px
			animation: loading 1.5s ease-in-out infinite

	.loading-message
		min-height: 2rem

		p
			margin: 0
			font-family: 'Chibold', sans-serif
			color: $brand1
			font-size: 1.2rem
			animation: fadeIn 0.5s ease-in-out

	.loading-dots
		display: flex
		gap: 0.5rem
		margin-top: 1rem

		span
			width: 8px
			height: 8px
			background: $brand1
			border-radius: 50%
			animation: pulse 1s ease-in-out infinite

			&:nth-child(2)
				animation-delay: 0.2s

			&:nth-child(3)
				animation-delay: 0.4s

	@keyframes loading
		0%
			transform: translateX(-100%)
		100%
			transform: translateX(100%)

	@keyframes bounce
		0%
			transform: translateY(0)
		100%
			transform: translateY(-10px)

	@keyframes fadeIn
		0%
			opacity: 0
			transform: translateY(10px)
		100%
			opacity: 1
			transform: translateY(0)

	@keyframes pulse
		0%, 100%
			transform: scale(1)
			opacity: 1
		50%
			transform: scale(0.7)
			opacity: 0.5
</style>

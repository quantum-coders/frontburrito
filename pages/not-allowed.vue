<script setup>
	definePageMeta({
		layout: 'burrito',
	});

</script>

<template>
	<div class="not-allowed-container">
		<h1>403 - Not Allowed</h1>
		<p>You do not have permission to access this page.</p>
	</div>
</template>

<style scoped lang="sass">
	.not-allowed-container
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		min-height: 100vh
		text-align: center

		h1
			font-size: 2rem
			margin-bottom: 1rem

		p
			font-size: 1rem
			color: #777
</style>

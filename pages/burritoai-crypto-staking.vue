<template>
  <div class="center-container">
	<web3-staking />
  </div>
  <br>
  <earn-benefits />
</template>

<script setup>
	definePageMeta({ layout: 'burrito' });
</script>

<style lang="sass" scoped>
	.center-container
		display: flex
		justify-content: center
		align-items: center
		width: 100vw
		height: 100vh
		min-height: 100vh
		padding-top: 37px
</style>
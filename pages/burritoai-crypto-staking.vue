<template>
  <div class="center-container">
	<web3-staking />
  </div>
  <earn-stakemarket />
  <earn-benefits class="earn-benefits"/>
  <platform-socials class="social-div"/>
  <br>
</template>

<script setup>
	definePageMeta({ layout: 'burrito' });
</script>

<style lang="sass" scoped>
	.center-container
		display: flex
		flex-direction: column
		justify-content: flex-start
		align-items: center
		width: 100vw
		padding-top: 49px
		flex-grow: 1

		@media (min-width: 1200px)
			padding-top: 10px

	html, body
		height: 100%
	.earn-benefits
		padding-top: 20px
		
		@media (min-width: 1200px)
			padding-top: 15px

	.social-div
		padding-bottom: 15px
		
		@media (min-width: 1200px)
			padding-bottom: 11px
</style>
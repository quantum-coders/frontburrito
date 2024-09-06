<template>
	<div class="benefits-container">
	  <div class="benefit-card">
		<div class="benefit-content">
		  <h3>Exclusive airdrops for LP Providers</h3>
		  <p class="gauges-count">Unlock the highest rewards by providing liquidity.</p>
		  <ul>
			<li>Boost rewards in Avax and BurritoAI.</li>
			<li>Claim additional incentives reserved for top contributors.</li>
		  </ul>
		  <button class="check-btn">Boost Your Rewards Now</button>
		</div>
	  </div>
	  <div class="benefit-card">
		<div class="benefit-content">
		  <h3>Stake, Earn $burritoai and Chill</h3>
		  <p class="total-distributed">Total Distributed: 634.97 $burritoai</p>
		  <ul>
			<li>Weekly revenue sharing</li>
			<li>Weekly $burritoai pool rewards</li>
		  </ul>
		</div>
	  </div>
	</div>
</template>

<style lang="sass" scoped>
	.benefits-container
		display: flex
		flex-direction: column
		align-items: center
		gap: 1rem
		margin-top: 1rem
		margin-bottom: 2rem
		width: 100% // Full width for container

	.benefit-card
		background-color: white
		border-radius: 10px
		padding: 1.5rem
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
		width: 95% // 95% width for each card to make it almost full-width
		text-align: left
		display: flex
		flex-direction: column // Make sure each card is vertically stacked
		margin: 0 auto // Center the card horizontally on the page

	@media (min-width: 768px)
		.benefit-card
			width: 90% // Slightly adjust for larger screens to keep alignment
			max-width: none

	.benefit-content
		display: flex
		flex-direction: column
		align-items: flex-start // Align content inside card to the left

	h3
		color: #D75D41
		font-weight: bold
		margin-bottom: 1rem

	.total-distributed, .gauges-count
		font-size: 0.9rem
		color: #333	
		margin-bottom: 1rem

	ul
		list-style-type: none
		padding: 0
		margin-bottom: 1rem
		color: #555
  
	li
		text-align: left
		margin-bottom: 0.5rem

	.check-btn
		background-color: $brand1
		color: white
		border: none
		border-radius: 5px
		padding: 0.5rem 1.5rem
		cursor: pointer
		transition: background-color 0.3s ease

		&:hover
			background-color: $brand2
</style>

<template>
	<div class="socials-container">
		<ul class="social-icons">
			<li>
				<a href="https://x.com/burritoAIDeFi" target="_blank">
					<img src="/images/icon-x.png" alt="X" />
				</a>
			</li>
			<li>
				<a href="https://discord.gg/ejp8cEqRNF" target="_blank">
					<img src="/images/icon-exchange.png" alt="Discord" />
				</a>
			</li>
			<li>
				<a href="https://t.me/burritoAIDeFi" target="_blank">
					<img src="/images/icon-telegram.png" alt="Telegram" />
				</a>
			</li>
			<!-- <li>
				<a href="#" target="_blank">
					<img src="/images/icon-international.svg" alt="DexTools" />
				</a>
			</li> -->
		</ul>
	</div>
</template>

<style lang="sass" scoped>
.socials-container
	display: flex
	justify-content: space-around
	align-items: center
	margin-top: 2rem
	width: 100%

	.social-icons
		display: flex
		list-style: none
		padding: 0
		margin: 0
		gap: 2.5rem

		li
			a
				display: inline-block

				img
					width: 30px
					height: 30px
					transition: transform 0.3s ease, opacity 0.3s ease

					&:hover
						transform: scale(1.1)
						opacity: 0.8

		@media (min-width: $sm)
			li
				a
					img
						width: 40px
						height: 40px

		@media (min-width: $md)
			li
				a
					img
						width: 50px
						height: 50px
</style>

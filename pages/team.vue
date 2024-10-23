<template>
	<img class="thumbs-up" src="/images/team/burrito-thumbs-up.png" alt="">

	<div class="container">
		<div class="title">
			<h2>Who the <span class="grawlix">#$?!</span></h2>
			<h3>Is behind<br>this product?</h3>
		</div>


		<div class="team-wrapper">
			<article class="team-member">
				<img src="/images/team/marcus.jpg" alt="@TaoCybernetics" />
				<div class="team-info">
					<h2>@TaoCybernetics</h2>
					<h3>Developer & Blockchain Marker Maker</h3>
					<p>System Engineer, developer at Blockpay Network, hashpowerlab.web.app, lunadefi.ai and Blockchain Market Strategist with 8 years of experience in blockchain systems.</p>

					<p class="text-end">
						<a href="#" class="btn btn-primary text-white">
							Follow on
							<icon name="line-md:twitter-x-alt" />
						</a>
					</p>
				</div>
			</article>

			<article class="team-member">
				<img src="/images/team/rodrigo.jpg" alt="@TheWebChimp" />
				<div class="team-info">
					<h2>@TheWebChimp</h2>
					<h3>Full Stack Developer</h3>
					<p>10+ years of expertise in web infrastructure development and frontend engineering. Known as "the best frontend in this hemisphere." Previously led frontend teams at Universal Music, Under Armour and more resulting in a 40% improvement in user engagement metrics.</p>

					<p class="text-end">
						<a href="#" class="btn btn-primary text-white">
							Follow on
							<icon name="line-md:twitter-x-alt" />
						</a>
					</p>
				</div>
			</article>

			<article class="team-member">
				<img src="/images/team/jesus.jpg" alt="@_0xJesus" />
				<div class="team-info">
					<h2>@_0xJesus</h2>
					<h3>Full Stack Developer</h3>
					<p>Co-founder of AG1 Labs, Bonkhemist, and Burrito.AI. Has won over 5 hackathons in the last year. 9+ years of experience in software development and backend integration.</p>

					<p class="text-end">
						<a href="#" class="btn btn-primary text-white">
							Follow on
							<icon name="line-md:twitter-x-alt" />
						</a>
					</p>
				</div>
			</article>

			<article class="team-member">
				<img src="/images/team/rodrigo.jpg" alt="Erick Niet" />
				<div class="team-info">
					<h2>Erick Niet</h2>
					<h3>Digital Asset Trading & Blockchain Investments</h3>
					<p>Business developer and investor with a forward-thinking approach, Erick embodies the entrepreneurial spirit of Silicon Valley. Always ahead of the curve, he's fluent in both the language of tech and the nuances of investment.</p>

					<p class="text-end">
						<a href="#" class="btn btn-primary text-white">
							Follow on
							<icon name="line-md:twitter-x-alt" />
						</a>
					</p>
				</div>
			</article>
		</div>
	</div>

</template>

<script setup>
	definePageMeta({ layout: 'burrito' });
</script>

<style lang="sass" scoped>

	.grawlix
		color: white
		display: inline-block
		background: black
		padding: 0.25rem 2rem
		border-radius: 100px
		top: -0.25rem

		@media (min-width: $sm)
			transform: rotate(-3deg)
			top: -1rem

	.title
		// slightly rotate the title
		transform: rotate(-3deg)
		margin-bottom: 5rem
		margin-top: 7rem

		@media (min-width: $sm)
			margin-top: 1rem

		h2
			font-family: "Chibold", sans-serif
			color: $primary
			margin-bottom: 0.25rem

			@media (min-width: $sm)
				font-size: 3vw

		h3
			font-family: "Chibold", sans-serif
			color: $primary
			font-size: 10vw
			line-height: 0.85
			text-wrap: balance
			margin-bottom: 0.25rem

			@media (min-width: $sm)
				font-size: 6vw

	.thumbs-up
		position: absolute
		mix-blend-mode: overlay
		left: 50%
		transform: translateX(-50%)
		opacity: 0.20
		width: 110vw

		@media (min-width: $sm)
			transform: none
			left: auto
			opacity: 1
			position: fixed
			right: -10vw
			width: 50vw
			top: 100px


	.team-member
		display: flex
		gap: 1rem
		align-items: flex-start
		margin-bottom: 2rem
		border-bottom: 1px dashed $primary

		@media (min-width: $sm)
			width: 60vw
			max-width: 750px

		&:last-child
			border-bottom: 0

		img
			width: 90px
			aspect-ratio: 1
			border-radius: 100%
			background: #AAA
			flex-shrink: 0

		.team-info
			flex-grow: 1

			h2
				font-family: "Chibold", sans-serif
				color: $primary
				margin-bottom: 0.25rem

			h3
				color: $primary
				font-size: 1rem
				font-weight: 900
				margin-bottom: 0.5rem

</style>
<template>
	<div class="wait-list" :class="{ 'is-invisible': !visible }">
		<div class="close">
			<icon @click.prevent="disableWaitList" name="bx:bx-x"/>
		</div>

		<p>Join our wait list to be the first to get BurritoAI Alphas!</p>

		<MarketingSubscriptionForm placeholder="Email address" joinText="Join" joiningText="Joining..."/>
	</div>
</template>

<script setup>

	const visible = ref(true)
	const waitList = localStorage.getItem('waitList')
	if (waitList === '0') {
		visible.value = false
	}

	const disableWaitList = (forever = false) => {
		visible.value = false
		if (forever) localStorage.setItem('waitList', '0')
	}
</script>

<style lang="sass" scoped>
	.wait-list
		position: fixed
		bottom: 2rem
		right: 2rem
		background: $brand1
		color: white
		border: 2px solid black
		box-shadow: 0 0 1rem rgba(black, 50%)
		backdrop-filter: blur(0.25rem)
		padding: 1rem
		border-radius: 0.5rem
		z-index: 100
		transition: opacity 1s
		width: 230px

		&.is-invisible
			opacity: 0
			pointer-events: none

		.error
			background: $secondary
			color: black
			border: 2px solid black
			box-shadow: 0 5px 0 0 black
			border-radius: 0.25rem
			padding: 0.5rem
			line-height: 1.2
			margin-bottom: 1rem

		.close
			z-index: 2
			top: -0.5rem
			right: -0.5rem
			padding: 0.5rem
			border-radius: 0.25rem
			aspect-ratio: 1
			width: 35px
			position: absolute
			background: $brand1
			display: flex
			justify-content: center
			align-items: center
			border: 2px solid black

			.iconify
				cursor: pointer

		.form-control
			border: 2px solid black
			box-shadow: 0 0.5em 0 0 black

		.btn
			text-shadow: 0 0 1rem black
			padding-left: 2rem
			padding-right: 2rem
			color: white
			background: black
			border: none
			box-shadow: 0 0.5em 0 0 black

			&:before
				content: ''
				position: absolute
				top: calc(100% - 1px)
				left: 5%
				height: 1px
				width: 90%
				background: linear-gradient(90deg, transparent 0%, rgba(white, 0.5) 50%, transparent 100%)
</style>

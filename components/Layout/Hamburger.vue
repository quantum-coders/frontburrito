<template>
	<div id="nav-icon" :class="{ open: props.open }" @click="toggle">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
</template>

<script setup>

	// Receive open prop from parent
	const props = defineProps([ 'open' ]);

	const emit = defineEmits([ 'toggle' ]);

	const toggle = () => {
		emit('toggle', !props.open.value);
	};

</script>

<style lang="sass" scoped>
	#nav-icon
		width: 30px
		height: 20px
		position: relative
		margin: 0
		transform: rotate(0deg)
		-webkit-transition: .5s ease-in-out
		-moz-transition: .5s ease-in-out
		-o-transition: .5s ease-in-out
		transition: .5s ease-in-out
		cursor: pointer

	#nav-icon span
		display: block
		position: absolute
		height: 20%
		width: 50%
		background: white
		opacity: 1
		transform: rotate(0deg)
		-webkit-transition: .25s ease-in-out
		-moz-transition: .25s ease-in-out
		-o-transition: .25s ease-in-out
		transition: .25s ease-in-out

	#nav-icon span:nth-child(even)
		left: 50%
		border-radius: 0 9px 9px 0

	#nav-icon span:nth-child(odd)
		left: 0
		border-radius: 9px 0 0 9px

	#nav-icon span:nth-child(1), #nav-icon span:nth-child(2)
		top: 0

	#nav-icon span:nth-child(3), #nav-icon span:nth-child(4)
		top: 50%

	#nav-icon span:nth-child(5), #nav-icon span:nth-child(6)
		top: 100%

	#nav-icon.open span:nth-child(1), #nav-icon.open span:nth-child(6)
		transform: rotate(45deg)

	#nav-icon.open span:nth-child(2), #nav-icon.open span:nth-child(5)
		transform: rotate(-45deg)

	#nav-icon.open span:nth-child(1)
		left: 3px
		top: 7px

	#nav-icon.open span:nth-child(2)
		left: calc(50% - 2px)
		top: 7px

	#nav-icon.open span:nth-child(3)
		left: -50%
		opacity: 0

	#nav-icon.open span:nth-child(4)
		left: 100%
		opacity: 0

	#nav-icon.open span:nth-child(5)
		left: 3px
		top: 17px

	#nav-icon.open span:nth-child(6)
		left: calc(50% - 2px)
		top: 17px
</style>
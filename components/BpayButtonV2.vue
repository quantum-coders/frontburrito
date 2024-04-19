<template>
	<!-- if we receive to prop, make it nuxt link-->
	<component :is="tag" class="btn-gradient" v-if="!props.to">
		<slot></slot>
	</component>
	<nuxt-link :to="props.to" class="btn-gradient" v-else>
		<slot></slot>
	</nuxt-link>
</template>

<script setup>
	const props = defineProps({
		tag: {
			type: String,
			default: 'a',
		},
		to: {
			type: String,
			default: '',
		},
	});
</script>

<style lang="sass" scoped>
	.btn-gradient
		display: inline-flex
		gap: 1rem
		cursor: pointer
		justify-content: center
		align-items: center
		padding: 1rem
		border-radius: 8px
		background: $brand2
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
		transition: all 500ms
		max-width: 100%
		font-size: 1rem
		color: white
		border: 0
		white-space: nowrap
		font-weight: 700
		min-width: 200px

		&.btn-sm
			padding: 0.5rem
			min-width: 100px

		&:hover
			filter: drop-shadow(0px 7px 7px rgba(0, 0, 0, 0.5))

		:deep(.btn-image)
			user-select: none
			pointer-events: none
			max-height: 30px
			width: auto

			&.btn-image-1
				max-height: 30px

			&.btn-image-2
				max-height: 40px

			&.btn-image-3
				max-height: 50px

			&.btn-image-4
				max-height: 60px

			&.btn-image-5
				max-height: 70px

			&.btn-image-sm
				max-height: 20px

			&.btn-image-lg
				max-height: 40px

		.btn-text
			display: inline-block
			width: auto
			font-weight: 600
			text-align: center

	a.btn-gradient
		color: white
		text-decoration: none
		user-select: none

	.btn-gradient[disabled]
		background: linear-gradient(180deg, #EBEBEB 0%, #FAFAFA 100%), linear-gradient(180deg, #6400AE 0%, #2300AE 100%)
		pointer-events: none
		color: #B9B9B9

		:deep(.btn-image)
			filter: invert(1)
			opacity: 0.25
</style>
<!-- components/SubscriptionForm.vue -->
<template>
	<form @submit.prevent="onSubmit" class="newsletter-form">
		<div class="form-wrapper">
			<input
				type="email"
				class="email-input"
				:placeholder="placeholder"
				v-model="localEmail"
			>
			<button
				class="submit-button"
				type="submit"
				:disabled="isLoading"
			>
				{{ isLoading ? joiningText : joinText }}
			</button>
		</div>
	</form>
</template>

<script setup>
	const {successToast, errorToast} = usePrettyToast();

	const props = defineProps({
		placeholder: {
			type: String,
			default: 'Enter your email'
		},
		joinText: {
			type: String,
			default: 'Join'
		},
		joiningText: {
			type: String,
			default: 'Joining...'
		}
	})

	const marketingStore = useMarketingStore()
	const localEmail = ref('')
	const successMessage = ref('')

	const isLoading = computed(() => marketingStore.isLoading)
	const error = computed(() => marketingStore.errorData)

	const onSubmit = async () => {
		// Limpiar mensaje de éxito anterior, si existe
		successMessage.value = ''

		const result = await marketingStore.subscribe(localEmail.value)
		console.log('result', result)
		if (result) {
			localEmail.value = ''
			successToast('You have successfully subscribed!')
		}
	}
</script>

<style scoped lang="sass">
	.newsletter-form
		width: 100%

		.form-wrapper
			position: relative
			width: 100%
			display: flex
			gap: 0.5rem
			border: 2px solid black
			border-radius: 0.5rem
			background: white
			box-shadow: 0 0.5em 0 0 black
			overflow: hidden

			@media (max-width: 575.98px)
				flex-direction: column
				gap: 0

		.email-input
			flex: 1
			min-width: 0
			padding: 0.75rem 1rem
			border: none
			background: white
			color: black
			font-size: 1rem

			&:focus
				outline: none
				background: #f8f9fa

			&::placeholder
				color: rgba(0, 0, 0, 0.5)

		.submit-button
			padding: 0.75rem 1.5rem
			border: none
			background: black
			color: white
			font-weight: 500
			text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5)
			transition: all 0.2s ease
			white-space: nowrap
			min-width: 80px

			@media (max-width: 575.98px)
				width: 100%
				border-radius: 0

			&:hover:not(:disabled)
				background: #222

			&:disabled
				opacity: 0.7
				cursor: not-allowed

	.error-message
		color: $secondary
		background: rgba(0, 0, 0, 0.2)
		padding: 0.5rem
		border-radius: 0.25rem
		margin-bottom: 1rem
		font-size: 0.9rem

	.success-message
		color: #0f0
		background: rgba(0, 0, 0, 0.2)
		padding: 0.5rem
		border-radius: 0.25rem
		margin-bottom: 1rem
		font-size: 0.9rem
</style>

<template>
	<div>
		<!-- Modal Backdrop -->
		<div
			v-if="modelValue"
			class="modal-backdrop fade show"
		></div>

		<!-- Modal -->
		<div
			v-if="modelValue"
			class="modal d-block"
			tabindex="-1"
			role="dialog"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<!-- Modal Header -->
					<div class="modal-header">
						<h5 class="modal-title">Privacy Settings</h5>
						<button
							type="button"
							class="btn-close"
							@click="closeModal"
							aria-label="Close"
						></button>
					</div>

					<!-- Modal Body -->
					<div class="modal-body">
						<p class="mb-3">
							We use Google Analytics to improve your browsing experience and analyze website traffic.
						</p>
						<p class="mb-4">
							By accepting, you consent to the processing of data about you by Google in the manner and
							for the purposes set out in our Privacy Policy.
							No personal data is collected, just the number of visitors and their behavior on the
							website.
						</p>

						<div class="form-check">
							<input
								type="checkbox"
								class="form-check-input"
								id="analyticsConsent"
								v-model="analyticsConsent"
							>
							<label class="form-check-label" for="analyticsConsent">
								I accept the use of Google Analytics
							</label>
						</div>
					</div>

					<!-- Modal Footer -->
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							@click="closeModal"
						>
							Decline
						</button>
						<button
							type="button"
							class="btn btn-primary"
							@click="acceptAndClose"
							:disabled="!analyticsConsent"
						>
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		modelValue: {
			type: Boolean,
			required: true
		}
	});

	const emit = defineEmits(['update:modelValue', 'accept']);
	const analyticsConsent = ref(false);

	const closeModal = () => {
		analyticsConsent.value = false;
		emit('update:modelValue', false);
	};

	const acceptAndClose = () => {
		if (analyticsConsent.value) {
			emit('accept', true);
			closeModal();
		}
	};

	// Close modal on escape key
	onMounted(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && props.modelValue) {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleEscape);

		onUnmounted(() => {
			document.removeEventListener('keydown', handleEscape);
		});
	});
</script>

<template>
	<teleport to="body">
		<div class="modal-wrapper" ref="modal" v-show="visible" :class="{ hide }">
			<div class="modal-content">
				<slot :close="closeDialog"/>
			</div>
		</div>
	</teleport>
</template>

<script setup>

	// Get the modal element from the ref
	const modal = ref(null);
	const visible = ref(false);
	const hide = ref(false);

	const openDialog = () => {
		visible.value = true;
	};

	const open = () => {
		openDialog();
	};

	const closeDialog = () => {
		hide.value = true;

		modal.value.addEventListener('animationend', () => {
			// If it does not have the hide class, cancel
			if (!modal.value.classList.contains('hide')) return;

			visible.value = false;
			hide.value = false;
			modal.value.removeEventListener('animationend', () => {
			}, false);
		});
	};

	const close = () => {
		closeDialog();
	};

	defineExpose({openDialog, closeDialog, open, close});
</script>

<style lang="sass" scoped>
	#wcm-modal
		z-index: 9999 !important
	.wcm-overlay
		z-index: 9999 !important
	.v-toast
		z-index: 10000 !important

	.modal-wrapper
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 50
		animation: backdrop-fade 0.3s ease forwards
		align-items: center
		justify-content: center
		display: flex

		&.hide
			.modal-content
				animation: hide 0.25s ease-out forwards

		.modal-content
			padding: 0
			border-radius: 0.5rem
			position: fixed
			overflow: visible
			border: 2px solid $brand1
			outline: 0.25rem solid white
			background: var(--bs-body-bg)
			width: auto
			max-width: calc(100% - 2rem)
			animation: show 0.3s ease-out forwards

	@keyframes backdrop-fade
		from
			background: rgba(black, 0)
		to
			background: rgba(black, 0.5)

	@keyframes show
		from
			opacity: 0
			transform: scale(0.9)
		to
			opacity: 1
			transform: scale(1)

	@keyframes hide
		from
			opacity: 1
			transform: scale(1)
		to
			opacity: 0
			transform: scale(0.9)
</style>

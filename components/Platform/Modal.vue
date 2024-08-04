<template>
	<dialog class="dialog" ref="dialog">
		<!-- expose close method on slot scope -->
		<slot :close="closeDialog" />
	</dialog>
</template>

<script setup>

	// Get the dialog element from the ref
	const dialog = ref(null);

	const openDialog = () => {
		// Open the dialog using the ref
		dialog.value.showModal();
	};

	const open = () => {
		openDialog();
	};

	const closeDialog = () => {
		dialog.value.classList.add('hide');
		dialog.value.addEventListener('animationend', () => {
			// If it does not have the hide class, cancel
			if(!dialog.value.classList.contains('hide')) return;

			dialog.value.classList.remove('hide');
			dialog.value.close();
			dialog.value.removeEventListener('animationend', () => { }, false);
		});
	};

	const close = () => {
		closeDialog();
	};

	defineExpose({ openDialog, closeDialog, open, close });
</script>

<style lang="sass">

	&:before
		content: ''
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		background: rgba(black, 0)
		z-index: 10000
		opacity: 0
		pointer-events: none
		transition: all 500ms ease-in-out

	&:has(dialog[open].hide-backdrop)
		&:before
			opacity: 1

</style>

<style lang="sass" scoped>

	.dialog
		padding: 0
		border-radius: 0.5rem
		position: fixed
		overflow: visible
		border: 2px solid $brand1
		outline: 0.25rem solid white

		&.hide-backdrop
			&::backdrop
				display: none

		&[open]
			animation: show 0.3s ease-out forwards

			&::backdrop
				animation: backdrop-fade 0.3s ease forwards

		&.hide
			animation: hide 0.25s ease-out forwards

			&::backdrop
				animation: backdrop-fade 0.3s ease backwards
				animation-direction: reverse

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
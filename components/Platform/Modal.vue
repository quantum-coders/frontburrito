<template>
	<dialog class="dialog" ref="dialog">
		<slot :close="closeDialog" />
	</dialog>
</template>

<script setup>

	// Receive function from parent as close callback
	const props = defineProps({
		closeDialog: {
			type: Function,
			default: null,
		},
		closeOnBackdrop: {
			type: Boolean,
			default: true,
		},
	});

	const emit = defineEmits([ 'close' ]);

	// Get the dialog element from the ref
	const dialog = ref(null);

	const openDialog = () => {
		// Open the dialog using the ref
		dialog.value.showModal();
	};

	const open = () => { openDialog(); };

	const closeDialog = () => {

		console.log('CLOSE DIALOG');

		dialog.value.classList.add('hide');
		dialog.value.addEventListener('animationend', () => {
			// If it does not have the hide class, cancel
			if(!dialog.value.classList.contains('hide')) return;

			dialog.value.classList.remove('hide');
			dialog.value.close();
			dialog.value.removeEventListener('animationend', () => { }, false);

			if(props.closeDialog && props.closeOnBackdrop) {
				props.closeDialog();
			}

			emit('close');
		});
	};

	const close = () => { closeDialog(); };

	onMounted(() => {
		if(props.closeOnBackdrop) {
			dialog.value.addEventListener('click', function(event) {
				console.log('click');

				const rect = dialog.value.getBoundingClientRect();
				const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
				if(!isInDialog) {

					console.log('CLOSE DIALOG FROM EVENT LISTENER');
					closeDialog();
				}
			});
		}
	});

	onUnmounted(() => {
		if(props.closeOnBackdrop) {
			if(dialog && dialog.value) {
				dialog.value.removeEventListener('click', () => { }, false);
			}
		}
	});

	defineExpose({ openDialog, open, closeDialog, close });
</script>

<style lang="sass" scoped>

	.dialog
		border: 0
		padding: 1rem
		border-radius: 0.5rem
		position: fixed

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
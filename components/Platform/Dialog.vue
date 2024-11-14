<template>
	<div
		class="modal fade"
		tabindex="-1"
		role="dialog"
		ref="modal"
		@keydown.esc="closeDialog"
	>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<slot :close="closeDialog"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {Modal} from 'bootstrap';

	const modal = ref(null);
	let bootstrapModal = null;

	const openDialog = () => {
		if (bootstrapModal) bootstrapModal.show();
	};

	const closeDialog = () => {
		if (bootstrapModal) bootstrapModal.hide();
	};

	const open = () => {
		openDialog();
	};

	const close = () => {
		closeDialog();
	};

	defineExpose({openDialog, closeDialog, open, close});

	onMounted(() => {
		bootstrapModal = new Modal(modal.value, {
			backdrop: true,
			keyboard: true,
			focus: true,
		});
	});

	onBeforeUnmount(() => {
		if (bootstrapModal) {
			bootstrapModal.dispose();
			bootstrapModal = null;
		}
	});
</script>

<style scoped lang="sass">
	.modal-dialog
		max-width: 90%
		width: auto
		position: relative
	// Importante para el posicionamiento del botón

	.modal-content
		border-radius: 0.5rem
		border: 2px solid $brand1
		outline: 0.25rem solid white
		overflow: hidden
		position: relative

	// Nuevo estilo mejorado para el botón flotante
	.floating-close-btn
		position: fixed
		// Cambiado a fixed para que siempre sea visible
		top: 1rem
		right: 1rem
		z-index: 9999
		// Número alto para asegurar que esté por encima de todo
		width: 2.5rem
		height: 2.5rem
		border-radius: 50%
		// Hace el botón circular
		background: $brand1
		// Color de fondo naranja
		border: 2px solid white
		// Borde blanco para contraste
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2)
		// Sombra suave
		color: white
		// Color del texto X
		font-size: 1.5rem
		line-height: 1
		cursor: pointer
		display: flex
		align-items: center
		justify-content: center
		transition: all 0.2s ease
		padding: 0
		transform: translate(50%, -50%)
		// Ajusta la posición para que esté perfectamente en la esquina

		&:hover
			transform: translate(50%, -50%) scale(1.1)
			// Efecto de hover con escala
			background: darken($brand1, 10%)
			// Oscurece el naranja en hover
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3)
		// Sombra más pronunciada en hover

		&:focus
			outline: none
			box-shadow: 0 0 0 3px rgba($brand1, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)
		// Ring focus

		&:active
			transform: translate(50%, -50%) scale(0.95)
		// Efecto de click

		span
			margin-top: -2px
	// Ajuste fino para centrar la X

	// Aseguramos que el contenido del modal sea scrolleable
	.modal-body
		max-height: 80vh
		overflow-y: auto
		padding: 1.5rem
	// Aumentado el padding para mejor espaciado

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

	.modal.fade.show
		animation: show 0.3s ease-out forwards

	.modal.fade
		animation: hide 0.25s ease-out forwards

	.modal-backdrop.show
		opacity: 0.5

	// Ocultar el botón de cierre por defecto de Bootstrap si existe
	// Ocultar el botón de cierre por defecto de Bootstrap si existe
	::v-deep .btn-close
		display: none !important

</style>

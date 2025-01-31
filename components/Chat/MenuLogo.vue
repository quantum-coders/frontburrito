<!-- SideMenu.vue -->
<template>
	<div>
		<!-- Menú lateral (Offcanvas) -->
		<div
			class="offcanvas offcanvas-start"
			:class="{ 'show': modelValue }"
			tabindex="-1"
		>
			<div class="offcanvas-header">
				<img src="/images/logo.svg" alt="Logo" class="logo"/>
				<button
					type="button"
					class="btn-close"
					@click="$emit('update:modelValue', false)"
				></button>
			</div>

			<div class="offcanvas-body p-0">
				<div class="menu-items">
					<router-link
						to="/"
						class="menu-item d-flex align-items-center gap-2"
						@click="$emit('update:modelValue', false)"
					>
						<i class="bi bi-house"></i>
						Home
					</router-link>

					<router-link
						to="/billing"
						class="menu-item d-flex align-items-center gap-2"
						@click="$emit('update:modelValue', false)"
					>
						<i class="bi bi-credit-card"></i>
						Billing
					</router-link>

					<router-link
						to="/staking"
						class="menu-item d-flex align-items-center gap-2"
						@click="$emit('update:modelValue', false)"
					>
						<i class="bi bi-graph-up-arrow"></i>
						Staking
					</router-link>

					<router-link
						to="/chats"
						class="menu-item d-flex align-items-center gap-2"
						@click="$emit('update:modelValue', false)"
					>
						<i class="bi bi-chat-dots"></i>
						Chats
					</router-link>

					<button
						class="menu-item d-flex align-items-center gap-2 w-100 text-start"
						@click="openStats"
					>
						<i class="bi bi-bar-chart"></i>
						Chat Stats
					</button>
				</div>
			</div>
		</div>

		<!-- Backdrop -->
		<div
			class="offcanvas-backdrop fade"
			:class="{ 'show': modelValue }"
			v-if="modelValue"
			@click="$emit('update:modelValue', false)"
		></div>

		<!-- Componente ChatStats -->
		<chat-stats-mobile ref="statsModal"/>

	</div>
</template>

<script setup>

	const props = defineProps({
		modelValue: {
			type: Boolean,
			required: true
		}
	})

	const emit = defineEmits(['update:modelValue'])
	const statsModal = ref(null)

	const openStats = () => {
		emit('update:modelValue', false) // Cierra el menú
		statsModal.value.showStats = true // Abre stats
	}

	// Cerrar con Escape
	onMounted(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && props.modelValue) {
				emit('update:modelValue', false)
			}
		}
		document.addEventListener('keydown', handleEscape)

		onUnmounted(() => {
			document.removeEventListener('keydown', handleEscape)
		})
	})
</script>

<style lang="sass" scoped>
	.offcanvas
		border: none
		max-width: 280px

		.offcanvas-header
			background: $brand1
			padding: 1rem

			.logo
				height: 32px
				width: auto

			.btn-close
				filter: invert(1)
				opacity: 0.8

				&:hover
					opacity: 1

	.menu-items
		display: flex
		flex-direction: column

		.menu-item
			padding: 1rem
			color: $brand1
			text-decoration: none
			border: none
			background: none
			transition: all 0.2s ease
			font-size: 0.9rem

			i
				font-size: 1.1rem

			&:hover, &:active
				background: rgba($brand1, 0.05)

			&.router-link-active
				background: rgba($brand1, 0.1)
				font-weight: 600
</style>

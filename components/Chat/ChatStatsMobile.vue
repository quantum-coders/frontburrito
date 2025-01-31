<!-- ChatStats.vue -->
<template>
	<!-- Botón para abrir stats -->
	<button
		class="stats-trigger btn btn-sm  align-items-center m-2"
		@click="showStats = true"
	>
		<i class="bi bi-graph-up"></i>
		Chat Stats
	</button>

	<!-- Modal de Bootstrap -->
	<div
		class="modal fade"
		:class="{ 'show': showStats }"
		tabindex="-1"
		:style="{ display: showStats ? 'block' : 'none' }"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header border-0">
					<h5 class="modal-title">Chat Statistics</h5>
					<button
						type="button"
						class="btn-close"
						@click="showStats = false"
					></button>
				</div>
				<div class="modal-body p-0">
					<div class="stats-list">
						<div class="stat-item d-flex justify-content-between align-items-center p-3 border-bottom">
							<strong>Messages</strong>
							<span>{{ chatStore.chat.messageStatistics.count.toLocaleString('en-US') }}</span>
						</div>

						<div class="stat-item d-flex justify-content-between align-items-center p-3 border-bottom">
							<strong>Created</strong>
							<span>{{ useTimeAgo(chatStore.chat.messageStatistics.created).value }}</span>
						</div>

						<div class="stat-item d-flex justify-content-between align-items-center p-3 border-bottom">
							<strong>Last Activity</strong>
							<span>{{ useTimeAgo(chatStore.chat.messageStatistics.modified).value }}</span>
						</div>

						<div class="stat-item d-flex justify-content-between align-items-center p-3 border-bottom">
							<strong>Token Usage</strong>
							<span>{{ chatStore.chat.tokensUsed.toLocaleString('en-US') }}</span>
						</div>

						<div class="stat-item d-flex justify-content-between align-items-center p-3">
							<strong>Cost</strong>
							<span>${{ chatStore.chat.totalCost.toLocaleString('en-US') }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Backdrop del modal -->
	<div
		class="modal-backdrop fade"
		:class="{ 'show': showStats }"
		v-if="showStats"
		@click="showStats = false"
	></div>
</template>

<script setup>
	import {useTimeAgo} from '@vueuse/core'

	const chatStore = useChatStore()
	const showStats = ref(false)

	// Cerrar modal con Escape
	onMounted(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && showStats.value) {
				showStats.value = false
			}
		}
		document.addEventListener('keydown', handleEscape)

		onUnmounted(() => {
			document.removeEventListener('keydown', handleEscape)
		})
	})
</script>

<style lang="sass" scoped>
	$complement: #ffff

	.stats-trigger
		width: 100%
		max-width: 40px
		font-size: 9px
		margin-top: 1rem
		background: $brand1
		color: $complement
		border: none

		&:hover
			opacity: 0.9

	.modal-content
		border: 2px solid $brand1
		border-radius: 1rem
		overflow: hidden

	.modal-header
		background: $brand1
		padding: 0.75rem 1rem

		.modal-title
			color: $complement
			font-size: 1rem
			font-weight: bold
			margin: 0

		.btn-close
			filter: invert(1)
			opacity: 0.8

			&:hover
				opacity: 1

	.stats-list
		.stat-item
			background: $complement

			strong
				color: $brand1
				font-size: 0.9rem

			span
				color: rgba($brand1, 0.8)
				font-size: 0.9rem

			&:hover
				background: rgba($brand1, 0.05)
</style>

<template>
	<nav aria-label="breadcrumb" class="breadcrumb-container">
		<div class="breadcrumb-wrapper">
			<ol class="breadcrumb">
				<li class="breadcrumb-item">
					<nuxt-link to="/" class="breadcrumb-link">Home</nuxt-link>
				</li>
				<li
					v-for="(breadcrumb, index) in breadcrumbs"
					:key="index"
					class="breadcrumb-item"
					:class="{ active: index === breadcrumbs.length - 1 }"
				>
					<nuxt-link
						v-if="index !== breadcrumbs.length - 1"
						:to="getBreadcrumbPath(breadcrumb)"
						class="breadcrumb-link"
					>
						{{ breadcrumb.name }}
					</nuxt-link>
					<span v-else class="breadcrumb-current">{{ breadcrumb.name }}</span>
				</li>
			</ol>
		</div>
	</nav>
</template>

<script setup>
	const route = useRoute();

	const breadcrumbs = computed(() => {
		const paths = route.path.split('/').filter(Boolean);
		return paths.map((path, index) => {
			return {
				name: path.charAt(0).toUpperCase() + path.slice(1),
				path: '/' + paths.slice(0, index + 1).join('/'),
			};
		});
	});

	const getBreadcrumbPath = (breadcrumb) => {
		return breadcrumb.name.toLowerCase() === 'chat'
			? '/chat/dashboard'
			: breadcrumb.path;
	};
</script>

<style scoped lang="sass">
	.breadcrumb-container
		padding: 0.75rem 1rem
		background: $complement
		border-bottom: 1px solid rgba($brand1, 0.1)

		@media (max-width: $sm - 1)
			padding: 0.5rem 0.75rem

	.breadcrumb-wrapper
		width: 100%
		overflow-x: auto
		white-space: nowrap
		scrollbar-width: none
		// Firefox
		-ms-overflow-style: none
		// IE and Edge

		&::-webkit-scrollbar
			display: none
	// Chrome, Safari, Opera

	.breadcrumb
		display: inline-flex
		flex-wrap: nowrap
		background: none
		padding: 0
		margin: 0
		min-width: min-content
		font-size: 0.875rem

		@media (max-width: $sm - 1)
			font-size: 0.75rem

	.breadcrumb-item
		display: inline-flex
		align-items: center
		flex-shrink: 0

		&:not(:last-child)
			margin-right: 0.5rem

		& + .breadcrumb-item::before
			content: ">"
			margin: 0 0.5rem
			color: $brand1
			opacity: 0.75
			flex-shrink: 0

	.breadcrumb-link
		color: $brand1
		text-decoration: none
		transition: color 0.2s ease
		max-width: 150px
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap

		&:hover
			color: darken($brand1, 10%)
			text-decoration: underline

	.breadcrumb-current
		color: rgba($brand1, 0.6)
		max-width: 150px
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
</style>

<template>
	<nav aria-label="breadcrumb" class="breadcrumb-container">
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
		font-size: 0.875rem
		margin-bottom: 0

	.breadcrumb
		background: none
		padding: 0
		margin-bottom: 0

	.breadcrumb-item + .breadcrumb-item::before
		content: ">"

	.breadcrumb-link
		text-decoration: none
		cursor: pointer

		&:hover
			text-decoration: underline

	.breadcrumb-current
		color: #6c757d
		cursor: default

	.breadcrumb-item
		cursor: default
</style>
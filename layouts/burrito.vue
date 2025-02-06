<template>
	<layout-header :class="{ 'fixed': headerFixed, 'header-hidden': isInChatRoute }" />
	<waypoint class="waypoint" @change="headerWaypoint" />

	<section class="site-wrapper">
		<nuxt-page />
	</section>

	<platform-wait-list />

	<layout-footer :class="{ 'footer-hidden': mobileFooterHide }" />
</template>

<script setup>
	import { Waypoint } from 'vue-waypoint';
	import { useRoute } from 'vue-router';

	const { isMobile } = useDevice();
	const route = useRoute();
	const headerFixed = ref(false);
	const web3Store = useWeb3Store();

	const mobileFooterHide = computed(() => {
		return route.path.startsWith('/chat/');
	});

	const isInChatRoute = computed(() => {
		// Mostrar el header si estamos en chat/dashboard
		if(!isMobile) {
			console.log('isMobile', isMobile);
			return false;
		}
		if(route.path.startsWith('/chat/dashboard')) {
			return false;
		}
		// Ocultar el header en todas las demás rutas de chat
		return route.path.startsWith('/chat/');
	});

	useHead({
		htmlAttrs: {
			lang: 'en',
		},
		titleTemplate: '%s',
		title: 'BurritoAI',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'democratizing AI',
			},
		],
	});

	const headerWaypoint = (waypointState) => {
		headerFixed.value = waypointState.direction === 'UP';
	};
</script>

<style lang="sass">
	.waypoint
		position: absolute
		top: 80px
		width: 20px

	.site-wrapper
		flex: 1
		display: flex
		flex-direction: column
		max-width: 100vw
		overflow: clip

	.header-hidden
		display: none

	.footer-hidden
		display: none
</style>

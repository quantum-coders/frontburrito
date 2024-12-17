<template>
	<GtmNoscript/>
	<NuxtLayout>
	</NuxtLayout>
</template>

<script setup>
	const marketingStore = useMarketingStore()

	onMounted(() => {
		marketingStore.trackPageView()
	})
</script>

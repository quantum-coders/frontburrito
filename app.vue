<template>
	<GtmNoscript/>
	<NuxtLayout>
	</NuxtLayout>
</template>

<script setup>
	const router = useRouter()

	onMounted(() => {
		const pageName = router.currentRoute.value.name
		const urlParams = new URLSearchParams(window.location.search)
		const trackingParams = {
			page_title: document.title,
			page_path: window.location.pathname,
			page_name: pageName,
			traffic_source: urlParams.get('utm_source') || document.referrer || 'direct'
		}

		// Solo añade los UTM parameters si existen
		if (urlParams.get('utm_medium')) {
			trackingParams.utm_medium = urlParams.get('utm_medium')
		}

		if (urlParams.get('utm_campaign')) {
			trackingParams.utm_campaign = urlParams.get('utm_campaign')
		}

		useTrackEvent('page_view', trackingParams)
	})
</script>

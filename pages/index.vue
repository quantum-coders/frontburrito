<template>
	<home-hero />
	<home-everyone />
	<home-features />
	<home-waiting />
	<home-start />
<!--
//TODO: when user base increase and this became a bottleneck, we can use this code to show the privacy modal
<analytics-privacy-modal v-model="showPrivacyModal" @accept="handlePrivacy" />-->
</template>

<script setup>
	definePageMeta({ layout: 'burrito' });
	const showPrivacyModal = ref(false);

	onMounted(() => {
		if (!localStorage.getItem('analyticsConsent')) {
			showPrivacyModal.value = true;
		}
	});
	const handlePrivacy = (accepted) => {
		if (accepted) {
			localStorage.setItem('analyticsConsent', 'true');
		}
	};

</script>

<style lang="sass" scoped>

</style>

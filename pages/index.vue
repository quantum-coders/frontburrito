<template>
	<home-hero/>
	<home-everyone/>
	<home-features/>
	<home-waiting/>
	<home-start/>
</template>

<script setup>
	const title = 'BurritoAI - Revolutionary AI Technology on Avalanche | Next-Gen Cryptocurrency Investment'
	const description = 'Join the future of AI and blockchain with BurritoAI on Avalanche. Our uncensored AI technology combines the explosive growth of artificial intelligence with the security and speed of AVAX. Early investment opportunity in the intersection of AI and crypto.'

	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			// Open Graph / Facebook
			{property: 'og:type', content: 'website'},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance'},
			// Twitter
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			// Keywords
			{
				name: 'keywords',
				content: 'AI crypto, Avalanche blockchain, AVAX investment, artificial intelligence cryptocurrency, uncensored AI, decentralized AI, BurritoAI token, AI blockchain technology, crypto investment opportunity, next-gen AI platform, DeFi AI'
			},
			// Additional SEO
			{name: 'robots', content: 'index, follow'},
			{name: 'author', content: 'BurritoAI'},
			// Relevancy tags
			{name: 'theme-color', content: '#ffffff'},
			{name: 'application-name', content: 'BurritoAI'},
			// Mobile optimization
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			// Language
			{'http-equiv': 'content-language', content: 'en'},
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance'},
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
		],
	})

	definePageMeta({
		layout: 'burrito',
		// Adding structured data for better SEO
		script: [
			{
				type: 'application/ld+json',
				children: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: 'BurritoAI',
					description: 'Revolutionary AI technology platform built on Avalanche blockchain',
					url: 'https://burritoai.finance',
					logo: 'https://burritoai.finance/images/seal.svg',
					sameAs: [
						'https://x.com/burritoAIDeFi',
						'https://t.me/burritoAIDeFi',
						'https://discord.gg/ejp8cEqRNF'
					]
				})
			}
		]
	})

	// Privacy modal logic
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

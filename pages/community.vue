<template>
	<div class="community-page">
		<!-- Hero / Introduction Section -->
		<section class="mt-5 bg-primary text-white py-5">
			<div class="container text-center">
				<h1 class="display-3 fw-bold mb-4">Join the BurritoAI Community</h1>
				<p class="lead mb-5">
					Connect with like-minded enthusiasts, get the latest updates, and shape the future of AI-driven
					DeFi.
					Our community is the beating heart of BurritoAI. Let's build together, innovate, and thrive.
				</p>
			</div>
		</section>

		<!-- Community Links Section -->
		<section class="py-5 bg-white text-dark">
			<div class="container text-center">
				<h2 class="fw-bold mb-4 text-primary">Connect On Our Official Channels</h2>
				<p class="lead mb-5">
					Stay informed, share ideas, and join the conversation. Our official channels keep you in the loop.
				</p>
				<ul class="list-unstyled d-flex justify-content-center gap-4 mb-0">
					<li>
						<a
							href="https://x.com/burritoAIDeFi"
							target="_blank"
							@click="marketingStore.trackEvent('click_social', { network: 'X' })"
						>
							<img src="/images/icon-x.png" alt="X" width="50" height="50"
								 class="rounded-circle border p-2"/>
						</a>
					</li>
					<li>
						<a
							href="https://discord.gg/ejp8cEqRNF"
							target="_blank"
							@click="marketingStore.trackEvent('click_social', { network: 'Discord' })"
						>
							<img src="/images/icon-exchange.png" alt="Discord" width="50" height="50"
								 class="rounded-circle border p-2"/>
						</a>
					</li>
					<li>
						<a
							href="https://t.me/burritoAIDeFi"
							target="_blank"
							@click="marketingStore.trackEvent('click_social', { network: 'Telegram' })"
						>
							<img src="/images/icon-telegram.png" alt="Telegram" width="50" height="50"
								 class="rounded-circle border p-2"/>
						</a>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script setup>
	const marketingStore = useMarketingStore()

	const title = 'BurritoAI Community - Connect with AI & DeFi Enthusiasts'
	const description = 'Join the BurritoAI community across X, Discord, and Telegram. Stay updated on the latest announcements, connect with like-minded supporters, and help shape the future of AI-driven DeFi.'

	useHead({
		title,
		meta: [
			{name: 'description', content: description},
			{property: 'og:type', content: 'website'},
			{property: 'og:title', content: title},
			{property: 'og:description', content: description},
			{property: 'og:image', content: 'https://burritoai.finance/images/seal.svg'},
			{property: 'og:url', content: 'https://burritoai.finance/community'},
			{name: 'twitter:card', content: 'summary_large_image'},
			{name: 'twitter:title', content: title},
			{name: 'twitter:description', content: description},
			{name: 'twitter:image', content: 'https://burritoai.finance/images/seal.svg'},
			{name: 'twitter:site', content: '@burritoAIDeFi'},
			{
				name: 'keywords',
				content: 'BurritoAI community, AI DeFi, crypto community, Avalanche blockchain, decentralized finance, AI supporters, blockchain enthusiasts'
			}
		],
		link: [
			{rel: 'canonical', href: 'https://burritoai.finance/community'}
		]
	})

	definePageMeta({
		layout: 'burrito'
	})
</script>

<style scoped>
	/* Using only Bootstrap classes, minimal custom styling */
</style>

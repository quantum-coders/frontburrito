<template>
	<div class="block block-corporate bg-white">
		<div class="container">
			<div class="row flex-column-reverse flex-sm-row">
				<div class="col-12 col-sm-6">
					<h1 class="title text-center text-sm-start mt-5" style="color:#E3CBA6;">Simplifying crypto-AI markets</h1>
					<h2 class="subtitle purple mb-5 text-center text-sm-start">
						Enjoyable blockchain technology with IA, for the crypto-communitty
					</h2>

					<div class="features">
						<div class="row">
							<template v-for="(f, k) in featuresGrouped">
								<div class="col-6" v-for="feature in f">
									<article
										class="feature"
										@click="setFeature(parseInt(feature.index))"
										:class="{
											'is-active': selectedFeature === feature.index,
											'is-inactive': selectedFeature !== feature.index && selectedFeature !== -1
										}"
									>
										<component :is="feature.component" />
										{{ feature.text }}
										<span
											v-if="selectedFeature === feature.index"
											class="ms-auto"
										><i class="fa-fw fal fa-angle-down" /></span>
										<span v-else class="ms-auto"><i class="fa-fw fal fa-angle-right" /></span>
									</article>
								</div>

								<template v-for="feature in features">
									<transition-slide>
										<p
											class="text border-top pt-3"
											v-if="selectedFeature === feature.index && showText(k)"
										>{{ feature.description }}</p>
									</transition-slide>
								</template>
							</template>
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<img src="/giphy.gif" alt="">
					<div class="d-flex justify-content-center">
					<bpay-button-v2
									href="/staking-ia-crypto-finance"
									target="_blank"
									class="mt-5"
									style="color:#3E3C3E;"
								>
									<img src="/burritopng.png">
									Pre-sale Live!
								</bpay-button-v2>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import IconProject from '~/assets/images/icon-project.svg';
	import IconFund from '~/assets/images/icon-fund.svg';
	import IconCapital from '~/assets/images/icon-capital.svg';
	import IconFinancial from '~/assets/images/icon-financial.svg';
	import IconModeling from '~/assets/images/icon-modeling.svg';
	import IconCopy from '~/assets/images/icon-copy.svg';
	import IconStrategic from '~/assets/images/icon-strategic.svg';
	import IconCorporate from '~/assets/images/icon-corporate.svg';
	import IconDue from '~/assets/images/icon-due.svg';

	const features = [
		{
			index: 0,
			component: IconProject,
			text: 'Markets',
			description: 'Because it is super-vluable to generate global and efficient crypto+IA finance, prosperity may accelerate humanity, making sure you stay on budget and meet your financing goals.',
		},
		{
			index: 1,
			component: IconCorporate,
			text: 'Real AI with real crypto users',
			description: 'significant appeal to a broader audience that is interested in these technologies but is overwhelmed by AI and Blockchain complexity.',
		},
		{
			index: 2,
			component: IconCapital,
			text: 'Custom AI Listings',
			description: 'New and innovative AI+crypto services added. This structure not only encourages holding, but also regulates the use of AI resources for all the communitty.',
		},
		{
			index: 3,
			component: IconDue,
			text: 'Sustainable Financial Structuring',
			description: 'Contribute to the repos. Less work and work smarter with our unique tools with Financial NFTs.',
		},
		{
			index: 4,
			component: IconStrategic,
			text: 'Democratizing AI',
			description: 'We help each other to create decision-making tools for your strategic planning for the AI-compute paradigm.',
		},
		{
			index: 5,
			component: IconFinancial,
			text: 'Social media',
			description: 'Reach us in X at: (English) twitter.com/burritoaicrypto & twitter.com/burritoai',
		}
	];
	const selectedFeature = ref(-1);

	const setFeature = (index) => {

		if(selectedFeature.value === index) selectedFeature.value = -1;
		else selectedFeature.value = index;
	};

	const showText = (index) => {

		// if index is 0 and selectedFeature.index is 0 or 1, show
		// if index is 1 and selectedFeature.index is 2 or 3, show
		// if index is 2 and selectedFeature.index is 4 or 5, show
		// if index is 3 and selectedFeature.index is 6 or 7, show

		if(index === 0 && (selectedFeature.value === 0 || selectedFeature.value === 1)) return true;
		if(index === 1 && (selectedFeature.value === 2 || selectedFeature.value === 3)) return true;
		if(index === 2 && (selectedFeature.value === 4 || selectedFeature.value === 5)) return true;
		return index === 3 && (selectedFeature.value === 6 || selectedFeature.value === 7);

	};

	// group the icons in blocks of 2
	const featuresGrouped = computed(() => {
		const groups = [];
		let group = [];
		features.forEach((feature, i) => {
			group.push(feature);
			if(i % 2 === 1) {
				groups.push(group);
				group = [];
			}
		});
		if(group.length > 0) groups.push(group);
		return groups;
	});

</script>

<style lang="sass" scoped>
	.block
		padding: 5rem 0
		margin-bottom: 0rem
		min-height: 10vw
		overflow-x: clip

		.image
			width: 120%
			max-width: 120%
			left: 50%
			transform: translateX(-50%)
			margin-bottom: -2rem
			z-index: 0

			@media (min-width: $sm)
				max-width: 60vw
				width: 50vw
				position: absolute
				left: 50%
				top: 50%
				transform: translate(-50%, -50%)

		.text
			height: 150px
			margin-bottom: 0

			@media (min-width: $sm)
				height: 100px

		.features
			height: 400px

			z-index: 2

		.feature
			display: flex
			align-items: center
			gap: 1rem
			margin-bottom: 1rem
			cursor: pointer
			transition: 500ms all ease-in-out

			&.is-inactive
				filter: grayscale(1)
				opacity: 0.5

			:deep(svg)
				width: 32px
				height: 32px

				path
					fill: $purple !important
</style>
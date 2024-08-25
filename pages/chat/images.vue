<template>
	<div class="images-wrapper">
		<chat-header class="chat-header shadow-sm" />
		<div class="images-area">
			<div class="images-input">
				<input
					v-model="prompt"
					type="text"
					placeholder="What will your crazy mind come up with next?"
					@keyup.enter="sendPrompt"
				/>
				<chat-send-button @click="sendPrompt" />
			</div>
			<div class="images-gallery">
				<div class="scroll-wrapper pretty-scrolls">
					<div class="row">
						<!-- reverse-order -->
						<template v-for="i in images.slice().reverse()">
							<div class="col-12 col-sm-3">
								<article class="image">

									<!-- bootstrap loading -->
									<div v-if="!!i.loading" class="loading">
										<div class="spinner-border text-primary" role="status">
											<span class="visually-hidden">Loading...</span>
										</div>
									</div>

									<p>{{ i.prompt }}</p>
									<div class="image-wrapper">
										<div class="actions">
											<a class="delete" @click.prevent="deleteImage(i.id)">
												<icon name="material-symbols:delete-forever-sharp" />
											</a>
										</div>
										<img :src="i.url" :alt="i.prompt" />
									</div>
								</article>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	useHead({ title: 'Burrito AI - Uncensored Images' });

	const images = ref([]);

	const chatStore = useChatStore();
	const prompt = ref('');

	const sendPrompt = async () => {
		if(prompt.value) {

			const imageRes = await useBaseFetch(`/ai/image`, {
				method: 'POST',
				body: { prompt: prompt.value },
			});

			console.log('imageRes', imageRes);
			images.value.push(imageRes.data.value.data);

			prompt.value = '';
		}
	};

	const getUserImages = async () => {
		const { data } = await useBaseFetch('/users/me/images', {
			method: 'GET',
		});

		if(data.value && data.value.data) {
			images.value = data.value.data;
		}
	};

	const deleteImage = async (id) => {

		// find the image and put a loading to it
		const image = images.value.find((i) => i.id === id);

		if(image) image.loading = true;

		const { data } = await useBaseFetch(`/users/me/images/${ id }`, {
			method: 'DELETE',
		});

		if(data.value && data.value.data) {
			images.value = images.value.filter((i) => i.id !== id);
		}
	};

	onMounted(() => {
		// wait 5 seconds
		setTimeout(() => {
			getUserImages();
		}, 5000);
	});

</script>

<style lang="sass" scoped>

	.images-wrapper
		padding-top: 70px

		@media (min-width: $sm)
			padding-top: 0

	.images-wrapper,
	.images-area
		display: flex
		flex-grow: 1
		flex-direction: column

	.images-input
		margin: 1rem
		padding: 0.15rem
		display: flex
		align-items: center
		gap: 0.5rem
		border-radius: 100rem
		border: 2px solid $brand1
		transition: all 500ms ease-in-out
		box-shadow: 0 0.25em 0 $brand1

		&:hover,
		&:has(input:focus)
			border-color: $brand1

		input
			width: 100%
			border: 0
			font-size: 0.785rem
			outline: none
			box-sizing: border-box
			margin: 0 0 0 1rem
			background: transparent

	.images-gallery
		flex-grow: 1

		& > div
			padding: 0 2rem 1rem 2rem

			.image
				margin-bottom: 2rem
				user-select: none

				.loading
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					background: rgba($complement, 0.5)
					display: flex
					justify-content: center
					align-items: center
					z-index: 2

				.image-wrapper
					&:hover
						.actions
							display: flex

					.actions
						display: none
						padding: 1rem
						position: absolute
						top: 0
						right: 0
						justify-content: flex-end
						gap: 0.5rem
						z-index: 2

						.delete
							background: $brand1
							border-radius: 100rem
							padding: 0.5rem
							cursor: pointer
							color: $complement
							transition: all 500ms ease-in-out
							line-height: 1

							&:hover
								background: $complement
								color: $brand1

				p
					margin-bottom: 0.5rem
					//ellipsis
					overflow: hidden
					white-space: nowrap
					text-overflow: ellipsis

				img
					border-radius: 0.5rem
					width: 100%
</style>
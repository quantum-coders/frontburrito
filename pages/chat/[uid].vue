<template>
	<div class="chat-wrapper" v-if="chatStore.chat">
		<chat-header class="chat-header shadow-sm" />

		<main class="chat-content">
			<div class="chat-area">

				<div class="chat-info d-flex align-items-center justify-content-between">
					<div
						class="w-auto"
						v-html="$mdRenderer.render(chatStore.chat?.name)"
						contenteditable="true"
						spellcheck="false"
						@keydown.enter="saveChatName"
					/>
					<p class="small">{{ chatStore.chat?.uid }}</p>
				</div>

				<chat-queue class="flex-grow-1" />
				<div class="p-2">
					<chat-input class="mt-auto" />
				</div>
			</div>

			<aside class="chat-config">
				<div class="chat-inputs p-3">
					<div class="mb-3 form-group form-group-system">
						<label class="form-label" for="system-prompt">System Prompt</label>
						<textarea
							class="form-control"
							id="system-prompt"
							rows="4"
							v-model="chatStore.chat.system"
							placeholder="Enter system instructions here..."
							@blur="chatStore.updateChat({ system: chatStore.chat.system })"
						></textarea>
					</div>
					<div class="form-check form-switch mb-2">
						<input
							class="form-check-input"
							type="checkbox"
							id="web-search"
							v-model="webSearchEnabled"
							@change="updateWebSearch"
						>
						<label class="form-check-label fs-7" for="web-search">Enable WebSearch</label>
					</div>
					<div v-if="webSearchEnabled" class="mb-3">
						<div class="btn-group btn-group-sm w-100" role="group">
							<input
								type="radio"
								class="btn-check"
								name="searchType"
								id="normalSearch"
								value="normal"
								v-model="webSearchType"
								@change="updateSearchType"
								autocomplete="off"
							>
							<label class="btn btn-outline-primary" for="normalSearch">Normal</label>
							<input
								type="radio"
								class="btn-check"
								name="searchType"
								id="deepSearch"
								value="deep"
								v-model="webSearchType"
								@change="updateSearchType"
								autocomplete="off"
							>
							<label class="btn btn-outline-primary" for="deepSearch">Deep</label>
						</div>
					</div>
				</div>
				<div class="chat-stats">
					<h4 class="chat-stats-title">Chat Statistics</h4>
					<div class="statistic-chunk">
						<strong>Messages</strong>
						<span>{{ chatStore.chat.messageStatistics.count.toLocaleString('en-US') }}</span>
					</div>

					<div class="statistic-chunk">
						<strong>Created</strong>
						<span>{{ useTimeAgo(chatStore.chat.messageStatistics.created).value }}</span>
					</div>

					<div class="statistic-chunk">
						<strong>Last Activity</strong>
						<span>{{ useTimeAgo(chatStore.chat.messageStatistics.modified).value }}</span>
					</div>

					<div class="statistic-chunk">
						<strong>Token Usage</strong>
						<span>{{ chatStore.chat.tokensUsed.toLocaleString('en-US') }}</span>
					</div>

					<div class="statistic-chunk">
						<strong>Cost</strong>
						<span>${{ chatStore.chat.totalCost.toLocaleString('en-US') }}</span>
					</div>
				</div>
			</aside>
		</main>
	</div>
</template>

<script setup>
	import { useTimeAgo } from '@vueuse/core';

	const { $mdRenderer } = useNuxtApp();
	const { me } = useAuth();
	const authToken = localStorage.getItem('authToken');
	if(authToken) await me(authToken);

	const route = useRoute();
	const router = useRouter();
	const uid = route.params.uid;
	const chatStore = useChatStore();
	const editChatName = ref(false);

	const webSearchEnabled = ref(false);
	const webSearchType = ref('normal');

	if(!uid) {
		router.push('/');
	} else {
		await chatStore.getChat(uid);
		webSearchEnabled.value = chatStore.chat.metas?.webSearch?.enabled || false;
		webSearchType.value = chatStore.chat.metas?.webSearch?.type || 'normal';
	}

	const saveChatName = async (event) => {
		event.target.blur();
		chatStore.chat.name = event.target.innerText.trim();
		await chatStore.updateChat({ name: chatStore.chat.name });
	};

	const updateWebSearch = async () => {
		console.log('burrito---', webSearchEnabled.value);
		if(chatStore.chat.metas) {
			await chatStore.updateChat({
				metas: {
					...chatStore.chat.metas,
					webSearch: {
						...chatStore.chat.metas.webSearch,
						enabled: webSearchEnabled.value,
					},
				},
			});
		}
	};

	const updateSearchType = async () => {
		if(chatStore.chat.metas) {
			await chatStore.updateChat({
				metas: {
					...chatStore.chat.metas,
					webSearch: {
						...chatStore.chat.metas.webSearch,
						type: webSearchType.value,
					},
				},
			});
		}
	};

	watch(
		() => [ chatStore.chat?.messageStatistics.count, chatStore.chat?.name ],
		async ([ messageCount, chatName ]) => {
			if(chatStore.chat && messageCount >= 4 && (chatName === '' || chatName === 'New Chat')) {
				await generateChatName();
			}
		},
	);

	const generateChatName = async () => {
		const { data } = await useBaseFetch('/chats/generate-chat-name/' + chatStore.chat.uid, {
			method: 'POST',
		});

		if(data.value && data.value.data) {
			await chatStore.updateChatFrontend({ name: data.value.data.name });
		}
	};

	onMounted(async () => {
		if(chatStore.chat && chatStore.chat.messageStatistics.count > 2 && (chatStore.chat.name === '' || chatStore.chat.name === 'New Chat')) {
			await generateChatName();
		}
		await chatStore.getTokenUsage(uid);
	});
</script>

<style lang="sass" scoped>

	.btn-check:checked + .btn
		color: $complement !important

	.chat-wrapper
		display: flex
		flex-direction: column
		flex-grow: 1

		.chat-content
			display: flex
			top: 70px
			height: calc(100dvh - 70px)
			overflow: hidden

			@media (min-width: $sm)
				top: 0
				flex-grow: 1
				height: auto

			.chat-area
				display: flex
				flex-direction: column
				flex-grow: 1

			.chat-config
				min-width: 350px
				border-left: 1px solid rgba($brand1, 0.25)
				position: fixed
				background: $complement
				right: -100vw

				@media (min-width: $sm)
					position: relative
					background: transparent
					right: auto

				.form-group
					.form-label
						font-weight: bold
						color: $brand1
						margin-bottom: 0.25rem
						font-size: 0.75rem

				.form-control
					border: 2px solid $brand1
					border-radius: 0.5rem
					box-shadow: 0 0.5em 0 $brand1
					margin-bottom: 0.5em
					background: transparent

				.form-control, .btn-group
					font-size: 0.9rem

			.chat-info
				background: $brand1
				color: $complement
				padding: 0.25rem 0.5rem
				border-bottom: 1px solid rgba(0, 0, 0, 0.1)

				:deep(p)
					font-weight: bold
					margin-bottom: 0 !important

			.chat-stats
				border-top: 1px solid rgba(0, 0, 0, 0.1)
				padding-top: 1rem

				.chat-stats-title
					font-family: 'Chibold', sans-serif
					color: $brand1
					margin: 0 1rem
					margin-bottom: 0.25rem

				.statistic-chunk
					border-bottom: 1px solid rgba(0, 0, 0, 0.1)
					display: flex
					padding: 0.5rem
					align-items: center
					justify-content: space-between
					font-size: 0.85rem

					strong
						font-weight: bold
						color: $brand1
</style>
<template>
	<section class="section-dashboard">
		<template v-if="web3Store.initLoading">
			<layout-web3-loading />
		</template>
		<template v-else-if="web3Store.isConnected && !web3Store.initLoading">
			<div class="container my-5">
				<div class="d-flex justify-content-between align-items-center mb-4">
					<h2 class="title mb-0">My Awesome Chats</h2>
					<button class="btn btn-burrito d-flex align-items-center gap-2" @click="createNewChat">
						<icon name="ph:plus-circle" />
						New Chat
					</button>
				</div>
				<!-- Search bar -->
				<div class="mb-4">
					<div class="input-group input-group-search">
						<span class="input-group-text bg-light border-end-0">
							<icon name="mdi:magnify" />
						</span>
						<input
							type="text"
							class="form-control border-start-0 bg-light"
							placeholder="Search chats..."
							v-model="searchQuery"
						>
					</div>
				</div>
				<div v-if="filteredChats.length === 0 && !loading" class="alert alert-info text-center" role="alert">
					No chats found. Start a new conversation!
				</div>
				<div v-if="loading" class="d-flex justify-content-center">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
				<div v-else>
					<div class="selection d-flex justify-content-between align-items-center mb-3">
						<div class="form-check">
							<input
								class="form-check-input"
								type="checkbox"
								v-model="selectAll"
								@change="toggleSelectAll"
								id="selectAllChats"
							>
							<label class="form-check-label" for="selectAllChats">Select All</label>
						</div>
						<button v-if="selectedChats.length > 1" class="btn btn-danger" @click="openBulkDeleteModal">
							<icon name="ph:trash" class="me-2" />
							Delete Selected ({{ selectedChats.length }})
						</button>
					</div>
					<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						<div v-for="chat in filteredChats" :key="chat.id" class="col">
							<div class="card shadow-sm hover" @click="viewChat(chat.uid)">
								<div class="card-body d-flex flex-column">
									<div class="d-flex justify-content-between align-items-center mb-2">
										<div class="form-check" @click.stop>
											<input
												class="form-check-input" type="checkbox" :id="'chat' + chat.id"
												v-model="chat.selected" @change="updateSelectedChats"
											>
											<label class="form-check-label" :for="'chat' + chat.id"></label>
										</div>
										<div
											class="card-title text-truncate mb-0"
											v-html="$mdRenderer.render(chat.name)"
										/>
									</div>
									<p class="card-text d-flex align-items-center gap-2 text-muted small mb-2">
										<icon name="ph:user" />
										Created by: {{ accountTrimmed(chat.wallet) }}
									</p>
									<p class="card-text d-flex align-items-center gap-2 text-muted small mb-1">
										<icon name="ph:clock" />
										Last Modified {{ useTimeAgo(chat.modified).value }}
									</p>
									<div class="mt-auto d-flex justify-content-between align-items-center">
										<span class="badge bg-primary rounded-pill d-flex align-items-center gap-1">
											<icon name="ph:chat-circle-dots" />
											{{ chat?._count?.messages || 0 }} messages
										</span>
										<div class="btn-group" role="group" aria-label="Chat actions" @click.stop>
											<button
												type="button" class="btn btn-outline-secondary btn-sm" title="Download"
												@click="downloadChat(chat)"
											>
												<icon name="ph:download" />
											</button>
											<button
												type="button" class="btn btn-outline-danger btn-sm" title="Delete"
												@click="openDeleteModal(chat)"
											>
												<icon name="ph:trash" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<platform-dialog ref="chatModalRef" class="p-4">
				<template #default="{ close: closeDialog }">
					<a
						class="close-button position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center bg-light rounded-circle p-2 close-wrapper"
						@click.prevent="close"
					>
						<icon name="material-symbols:close" />
					</a>
					<div>
						<div class="d-flex justify-content-between align-items-center">
							<h5 class="d-flex align-items-center gap-2 fs-5 m-0">
								<icon name="ph:trash" />
								Delete Chat{{ selectedChats.length > 1 ? 's' : '' }}
							</h5>
						</div>
						<div class="p-4">
							<p class="mb-0 text-center">
								<icon name="ph:warning-circle" class="me-2 text-warning" />
								Are you sure you want to delete
								{{ selectedChats.length === 1 ? 'this chat' : `${ selectedChats.length } chats` }}?
							</p>
						</div>
						<div class="d-flex justify-content-center">
							<div class="d-flex flex-column align-items-center w-100">
								<!-- Progress info cuando está borrando en bulk -->
								<div v-if="!!isDeleting && selectedChats.length > 1" class="w-100 mb-3">
									<div class="d-flex justify-content-between mb-2">
										<small>Deleting chats...</small>
										<small>{{ deletedCount }} of {{ selectedChats.length }}</small>
									</div>
									<div class="progress">
										<div
											class="progress-bar progress-bar-striped progress-bar-animated"
											role="progressbar"
											:style="{ width: `${(deletedCount / selectedChats.length) * 100}%` }"
											:aria-valuenow="deletedCount"
											:aria-valuemin="0"
											:aria-valuemax="selectedChats.length"
										></div>
									</div>
								</div>
								<div class="d-flex gap-3">
									<button
										type="button"
										class="btn btn-secondary btn-with-icon"
										@click="closeDialog"
										:disabled="!!isDeleting"
									>
										<icon name="ph:x-circle" />
										Cancel
									</button>
									<button
										type="button"
										class="btn btn-danger btn-with-icon"
										@click="confirmDelete(closeDialog)"
										:disabled="!!isDeleting"
									>
										<span
											v-if="!!isDeleting && selectedChats.length === 1"
											class="spinner-border spinner-border-sm"
											role="status"
											aria-hidden="true"
										></span>
										<icon v-else name="ph:trash" />
										{{ !!isDeleting ? 'Deleting...' : 'Delete' }}
									</button>
								</div>
							</div>
						</div>
					</div>
				</template>
			</platform-dialog>
		</template>

		<template v-else>
			<platform-not-auth-action />
		</template>
	</section>
</template>

<script setup>
	definePageMeta({ layout: 'burrito' });
	const { successToast, errorToast } = usePrettyToast();

	import { useTimeAgo } from '@vueuse/core';

	const { $mdRenderer } = useNuxtApp();
	const web3Store = useWeb3Store();
	const currentAccount = web3Store.address;
	const deletedCount = ref(0);

	const router = useRouter();
	const { me } = useAuth();
	const loading = ref(true);
	const chatModalRef = ref(null);
	const chats = ref([]);
	const searchQuery = ref('');
	const selectedChats = ref([]);
	const selectAll = ref(false);
	const isDeleting = ref(false);
	const user = useAuthUser();

	const filteredChats = computed(() => {
		const query = searchQuery.value.toLowerCase();
		return chats.value.filter(chat =>
			chat.name.toLowerCase().includes(query) ||
			(chat.createdBy && chat.createdBy.toLowerCase().includes(query)),
		);
	});

	watch(searchQuery, (newVal) => {
		useMarketingStore().trackEvent('search_chats', { query: newVal });
	});

	const accountTrimmed = (account) => {
		return account.slice(0, 6) + '...' + account.slice(-4);
	};

	const fetchChats = async () => {
		loading.value = true;
		try {
			const { error, data } = await useBaseFetch('users/me/chats', {
				method: 'GET',
			});
			if(!error.value) {
				// if it is an object then it is a single chat if it is an array then it is multiple chats
				if(Array.isArray(data.value.data)) {
					chats.value = data.value.data.map(chat => ({ ...chat, selected: false }));
				} else {
					chats.value = [ data.value.data ];
				}
			}
		} catch(error) {
			console.error('Failed to fetch chats:', error);
		} finally {
			loading.value = false;
		}
	};

	const viewChat = (chatId) => {
		useMarketingStore().trackEvent('view_chat', { chat_id: chatId });
		router.push(`/chat/${ chatId }`);
	};

	const openDeleteModal = (chat) => {
		selectedChats.value = [ chat ];
		chatModalRef.value.openDialog();
	};

	const openBulkDeleteModal = () => {
		chatModalRef.value.openDialog();
	};

	const confirmDelete = async (closeDialog) => {
		isDeleting.value = true;
		deletedCount.value = 0;

		try {
			for(const chat of selectedChats.value) {
				const { data, error } = await useBaseFetch(`/users/me/chats/${ chat.id }`, {
					method: 'DELETE',
				});
				if(error.value?.data) {
					errorToast(error.value.data.message);

				}

				if(data.value?.data?.id === chat.id) {
					chats.value = chats.value.filter(c => c.id !== chat.id);
					deletedCount.value++;
				}
			}

			selectedChats.value = [];
			selectAll.value = false;
			closeDialog();
		} catch(error) {
			errorToast(error);
			console.error('Failed to delete chats:', error);
		} finally {
			isDeleting.value = false;
			deletedCount.value = 0;
		}
	};
	const downloadChat = async (chat, type = 'txt') => {

		if(useChatStore) {
			useMarketingStore().trackEvent('download_chat', { chat_id: chat.id, format: type });
			useChatStore().downloadChat(chat, type);
		}
	};
	const toggleSelectAll = () => {
		chats.value.forEach(chat => chat.selected = selectAll.value);
		updateSelectedChats();
	};

	const updateSelectedChats = () => {
		selectedChats.value = chats.value.filter(chat => chat.selected);
		selectAll.value = selectedChats.value.length === chats.value.length;
	};

	const createNewChat = () => {
		useMarketingStore().trackEvent('click_new_chat', {});
		router.push('/chat');
	};

	// watch currentAccount
	watch(currentAccount, (newVal, oldVal) => {
		console.log('currentAccount changed:', newVal, oldVal);

		if(newVal) {
			fetchChats();
		}
	});

	onMounted(async () => {
		const authToken = localStorage.getItem('authToken');
		if(authToken) await me(authToken);
		await fetchChats();
		useMarketingStore().trackEvent('view_chats_dashboard', {});

	});
</script>

<style lang="sass">
	body:has(.section-dashboard)
		padding-top: 5rem

		.primary-navigation
			display: none !important

	.card-title
		p
			margin-bottom: 0 !important
</style>

<style lang="sass" scoped>

	.close-button
		z-index: 1000

	.close-wrapper
		z-index: 1000

	.section-dashboard
		display: flex
		flex-direction: column
		flex-grow: 1
		padding-top: 71px

		@media (min-width: $sm)
			padding-top: 0

	.selection
		height: 38px

		.form-check
			// disable selection
			user-select: none

	.card
		border: 2px solid $primary
		box-shadow: 0 0 0 0 $primary !important
		transition: all 250ms ease-in-out
		top: 0
		cursor: pointer

		&:hover
			box-shadow: 0 0.5em 0 0 $primary !important
			top: -0.5em

	.title
		color: $primary
		font-family: 'Chibold', sans-serif

	.input-group-search
		.input-group-text
			border-width: 2px
			border-color: $primary
			padding-right: 0
			background: $complement
			box-shadow: 0 0.5em 0 0 $primary

		.form-control
			border-width: 2px
			border-color: $primary
			background: $complement
			box-shadow: 0 0.5em 0 0 $primary

	.please-connect
		display: flex
		flex-direction: column
		flex-grow: 1
		justify-content: center
		align-items: center
		padding: 5rem 0

		.connect
			text-align: center
			width: 300px
			padding: 1rem
			border: 2px solid $primary
			box-shadow: 0 1rem 0 0 $primary !important
			border-radius: 0.5rem

			p
				font-size: 2rem
				line-height: 1.1
				font-family: Chibold, sans-serif
				color: $brand1

			img
				margin-bottom: 1rem
				image-rendering: pixelated
				width: 44px * 2
</style>

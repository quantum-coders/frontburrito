<template>
	<chat-header class="chat-header shadow-sm" />
	<div class="container my-5">
		<div class="d-flex justify-content-between align-items-center mb-4">
			<h2 class="h2 mb-0">My Chats</h2>
			<button class="btn btn-primary btn-dark" @click="createNewChat">
				<Icon name="ph:plus-circle" class="me-2" />
				New Chat
			</button>
		</div>
		<!-- Search bar -->
		<div class="mb-4">
			<div class="input-group">
				<span class="input-group-text bg-light border-end-0">
					<Icon name="mdi:magnify" />
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
			<div class="d-flex justify-content-between align-items-center mb-3">
				<div class="form-check">
					<input
						class="form-check-input" type="checkbox" v-model="selectAll" @change="toggleSelectAll"
						id="selectAllChats"
					>
					<label class="form-check-label" for="selectAllChats">Select All</label>
				</div>
				<button v-if="selectedChats.length > 1" class="btn btn-danger" @click="openBulkDeleteModal">
					<Icon name="ph:trash" class="me-2" />
					Delete Selected ({{ selectedChats.length }})
				</button>
			</div>
			<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
				<div v-for="chat in filteredChats" :key="chat.id" class="col">
					<div class="card h-100 shadow-sm hover" @click="viewChat(chat.uid)">
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
							<p class="card-text text-muted small mb-2">
								<Icon name="ph:user" class="me-2" />
								Created by: {{ accountTrimmed(chat.wallet) }}
							</p>
							<p class="card-text text-muted small mb-3">
								<Icon name="ph:clock" class="me-2" />
								Last Modified {{ useTimeAgo(chat.modified).value }}
							</p>
							<div class="mt-auto d-flex justify-content-between align-items-center">
								<span class="badge bg-primary rounded-pill">
									<Icon name="ph:chat-circle-dots" class="me-2" />
									{{ chat?._count?.messages || 0 }} messages
								</span>
								<div class="btn-group" role="group" aria-label="Chat actions" @click.stop>
									<button
										type="button" class="btn btn-outline-secondary btn-sm" title="Download"
										@click="downloadChat(chat)"
									>
										<Icon name="ph:download" />
									</button>
									<!--									<button type="button" class="btn btn-outline-secondary btn-sm" title="View"
																				@click="viewChat(chat.uid)">
																			<Icon name="ph:eye"/>
																		</button>-->
									<button
										type="button" class="btn btn-outline-danger btn-sm" title="Delete"
										@click="openDeleteModal(chat)"
									>
										<Icon name="ph:trash" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<platform-modal ref="chatModalRef">
		<template #default="{ close: closeDialog }">
			<div class="modal-content">
				<div class="modal-header d-flex justify-content-between align-items-center">
					<h5 class="modal-title fs-5 m-0">
						<Icon name="ph:trash" class="me-2" />
						Delete Chat{{ selectedChats.length > 1 ? 's' : '' }}
					</h5>
					<button
						type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
						@click="closeDialog"
					></button>
				</div>
				<div class="modal-body py-4">
					<p class="mb-0 text-center">
						<Icon name="ph:warning-circle" class="me-2 text-warning" />
						Are you sure you want to delete
						{{ selectedChats.length === 1 ? 'this chat' : `${ selectedChats.length } chats` }}?
					</p>
				</div>
				<div class="modal-footer d-flex justify-content-center">
					<div class="d-flex gap-3">
						<button
							type="button" class="btn btn-secondary px-4 d-flex align-items-center"
							@click="closeDialog"
						>
							<Icon name="ph:x-circle" class="me-2" />
							Cancel
						</button>
						<button
							type="button" class="btn btn-danger px-4 d-flex align-items-center"
							@click="confirmDelete(closeDialog)" :disabled="isDeleting"
						>
							<span
								v-if="isDeleting" class="spinner-border spinner-border-sm me-2" role="status"
								aria-hidden="true"
							></span>
							<Icon v-else name="ph:trash" class="me-2" />
							{{ isDeleting ? 'Deleting...' : 'Delete' }}
						</button>
					</div>
				</div>
			</div>
		</template>
	</platform-modal>
</template>

<script setup lang="ts">
	import { useTimeAgo } from '@vueuse/core';

	const { $mdRenderer } = useNuxtApp();

	const router = useRouter();
	const { me } = useAuth();
	const loading = ref(true);
	const chatModalRef = ref(null);
	const chats = ref([]);
	const searchQuery = ref('');
	const selectedChats = ref([]);
	const selectAll = ref(false);
	const isDeleting = ref(false);

	const filteredChats = computed(() => {
		const query = searchQuery.value.toLowerCase();
		return chats.value.filter(chat =>
			chat.name.toLowerCase().includes(query) ||
			(chat.createdBy && chat.createdBy.toLowerCase().includes(query))
		);
	});


	const accountTrimmed = (account: string) => {
		return account.slice(0, 6) + '...' + account.slice(-4);
	};

	const fetchChats = async () => {
		loading.value = true;
		try {
			const { error, data } = await useBaseFetch('users/me/chats', {
				method: 'GET',
			});
			if (!error.value) {
				console.log("Chats: ", data.value.data)
				// if it is an object then it is a single chat if it is an array then it is multiple chats
				if (Array.isArray(data.value.data)) {
					chats.value = data.value.data.map(chat => ({ ...chat, selected: false }));
				} else {
					chats.value = [ data.value.data ];
				}
			}
		} catch (error) {
			console.error('Failed to fetch chats:', error);
		} finally {
			loading.value = false;
		}
	};

	const viewChat = (chatId: string) => {
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
		try {
			for (const chat of selectedChats.value) {
				await useBaseFetch(`/chats/${ chat.id }`, {
					method: 'DELETE',
				});
			}
			chats.value = chats.value.filter(chat => !selectedChats.value.includes(chat));
			selectedChats.value = [];
			selectAll.value = false;
			closeDialog();
		} catch (error) {
			console.error('Failed to delete chats:', error);
		} finally {
			isDeleting.value = false;
		}
	};

	const downloadChat = async (chat, type = 'txt') => {

		if (useChatStore) {
			useChatStore().downloadChat(chat, type);
		}
	}
	const toggleSelectAll = () => {
		chats.value.forEach(chat => chat.selected = selectAll.value);
		updateSelectedChats();
	};

	const updateSelectedChats = () => {
		selectedChats.value = chats.value.filter(chat => chat.selected);
		selectAll.value = selectedChats.value.length === chats.value.length;
	};

	const createNewChat = () => {
		router.push('/chat');
	};

	onMounted(async () => {
		const authToken = localStorage.getItem('authToken');
		if (authToken) await me(authToken);
		await fetchChats();
	});
</script>

<style lang="sass" scoped>
	.hover
		cursor: pointer
		transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out

		&:hover
			transform: translateY(-5px)
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important
</style>
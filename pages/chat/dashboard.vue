<template>
	<platform-header-wallet/>
	<div class="container my-5">
		<h2 class="h2 mb-4">My Chats</h2>
		<!-- Search bar -->
		<div class="mb-4">
			<div class="input-group">
        <span class="input-group-text bg-light border-end-0">
          <!-- <Icon name="ph:magnifying-glass" /> -->
        </span>
				<input
					type="text"
					class="form-control border-start-0 bg-light"
					placeholder="Search chats..."
					v-model="searchQuery"
				>
			</div>
		</div>
		<div v-if="chats.length === 0 && !loading" class="alert alert-info text-center" role="alert">
			No chats found. Start a new conversation!
		</div>
		<div v-if="loading" class="d-flex justify-content-center">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
			<div v-for="chat in chats" :key="chat.id" class="col">
				<NuxtLink :to="`/chat/${chat.uid}`" class="text-decoration-none">
					<div class="card h-100 shadow-sm hover">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title text-truncate mb-3">{{ chat.name || 'Untitled Chat' }}</h5>
							<p class="card-text text-muted small mb-2">
								<Icon name="ph:user" class="me-2"/>
								Created by: John Doe
							</p>
							<p class="card-text text-muted small mb-3">
								<Icon name="ph:clock" class="me-2"/>
								Last Modified {{ useTimeAgo(chat.modified).value }}
							</p>
							<div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="badge bg-primary rounded-pill">
                  <Icon name="ph:chat-circle-dots" class="me-2"/>
                  {{ chat?.messageCount || 0 }} messages
                </span>
								<div class="btn-group" role="group" aria-label="Chat actions">
									<button type="button" class="btn btn-outline-secondary btn-sm" title="Download">
										<Icon name="ph:download"/>
									</button>
									<button type="button" class="btn btn-outline-secondary btn-sm" title="View">
										<Icon name="ph:eye"/>
									</button>
									<button type="button" class="btn btn-outline-danger btn-sm" title="Delete">
										<Icon name="ph:trash"/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useTimeAgo} from '@vueuse/core';

const {me} = useAuth();
const authToken = localStorage.getItem('authToken');
if (authToken) await me(authToken);
const loading = ref(true);
const chats = ref([]);
const searchQuery = ref('');

const fetchChats = async () => {
	loading.value = true;
	const chatsResponse = await useBaseFetch('/chats', {
		method: 'GET',
	});

	if (chatsResponse.data.value) {
		chats.value = chatsResponse.data.value.data;
	}
	loading.value = false;
};

onMounted(fetchChats);
</script>

<style lang="sass" scoped>
.hover
	cursor: pointer
	transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out

	&:hover
		transform: translateY(-5px)
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important
</style>
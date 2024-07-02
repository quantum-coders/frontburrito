<template>
	<div class="chat-wrapper d-flex flex-column vh-100" v-if="chatStore.chat">
		<platform-header-wallet class="chat-header shadow-sm"/>
		<main class="chat-content flex-grow-1 overflow-hidden">
			<div class="container-fluid h-100">
				<div class="row h-100">
					<div class="col-md-9 d-flex flex-column">
						<div class="chat-info bg-light p-2 mb-2 rounded-3">
							<h2 class="h5 mb-1">{{ chatStore.chat?.name }}</h2>
							<p class="text-muted small mb-0">ID: {{ chatStore.chat?.uid}}</p>
						</div>
						<chat-queue class="flex-grow-1 overflow-auto mb-2"/>
						<chat-input class="mt-auto"/>
					</div>
					<aside class="col-md-3 chat-config bg-light p-3 border-start">
						<h3 class="h5 mb-3">Chat Configuration</h3>
						<div class="mb-3">
							<label class="form-label" for="system-prompt">System Prompt</label>
							<textarea
								class="form-control"
								id="system-prompt"
								rows="4"
								v-model="systemPrompt"
								placeholder="Enter system instructions here..."
							></textarea>
						</div>
						<div class="form-check form-switch mb-3">
							<input
								class="form-check-input"
								type="checkbox"
								id="web-search"
								v-model="webSearchEnabled"
							>
							<label class="form-check-label" for="web-search">Enable WebSearch</label>
						</div>
						<div v-if="webSearchEnabled" class="mb-3">
							<label class="form-label d-block">Search Type</label>
							<div class="btn-group w-100" role="group">
								<input
									type="radio"
									class="btn-check"
									name="searchType"
									id="normalSearch"
									value="normal"
									v-model="searchType"
									autocomplete="off"
								>
								<label class="btn btn-outline-primary" for="normalSearch">Normal</label>
								<input
									type="radio"
									class="btn-check"
									name="searchType"
									id="deepSearch"
									value="deep"
									v-model="searchType"
									autocomplete="off"
								>
								<label class="btn btn-outline-primary" for="deepSearch">Deep</label>
							</div>
						</div>
						<div class="chat-stats mt-4">
							<h4 class="h6 mb-2">Chat Statistics</h4>
							<ul class="list-unstyled small">
								<li><strong>Messages:</strong> {{chatStore.chat.messages.length }} </li>
								<li><strong>Created:</strong> {{ useTimeAgo(chatStore.chat.created).value }}</li>
								<li><strong>Last Activity:</strong> {{ useTimeAgo(chatStore.chat.modified).value }}</li>
							</ul>
						</div>
					</aside>
				</div>
			</div>
		</main>
		<footer class="chat-footer bg-light py-2 text-center">
			<p class="small text-muted mb-0">© {{ new Date().getFullYear() }} Burrito AI. All rights reserved.</p>
		</footer>
	</div>
</template>

<script setup>
import {useTimeAgo} from "@vueuse/core";
const systemPrompt = ref('');
const {me} = useAuth();
const authToken = localStorage.getItem('authToken');
if (authToken) await me(authToken);
const webSearchEnabled = ref(false);
const searchType = ref('normal');
const route = useRoute();
const router = useRouter();
const uid = route.params.uid;
const chatStore = useChatStore()

if (!uid) {
	router.push('/');
} else {
	await chatStore.getChat(uid);
}
onMounted(async () => {
	if(chatStore.chat && (chatStore.chat.name === '' || chatStore.chat.name === 'New Chat')) {
		await useBaseFetch('/chats/generate-chat-name/' + uid, {
			method: 'POST',
		});
	}
});


</script>

<style lang="sass" scoped>
.chat-wrapper
	background-color: #f8f9fa

.chat-content
	background-color: #ffffff

.chat-config
	.form-control, .btn-group
		font-size: 0.9rem

.chat-info
	border-left: 4px solid #007bff

.chat-stats
	border-top: 1px solid rgba(0, 0, 0, 0.1)
	padding-top: 1rem

@media (max-width: 767.98px)
	.chat-config
		border-left: none
		border-top: 1px solid rgba(0, 0, 0, 0.1)
</style>
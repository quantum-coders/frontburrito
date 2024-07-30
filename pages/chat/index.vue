<template>
	<div class="chat-wrapper">
		<chat-header class="border-bottom" />
		<platform-header-wallet />
		<template v-if="!!useCryptoStore().currentAccount">
			<main class="chat-content">

				<div class="container">
					<div class="chat-experience">
						<chat-queue class="flex-grow-1" />
						<chat-input class="m-2" />
					</div>

					<aside class="chat-config">
						<!-- input for system prompt -->
						<div class="chat-config-item">
							<label class="form-label" for="system-prompt">System Prompt</label>
							<textarea class="form-control" id="system-prompt" rows="5"></textarea>
						</div>

					</aside>
				</div>
			</main>
			<footer class="chat-footer">
			</footer>
		</template>
	</div>
</template>

<script setup>
	const { me } = useAuth();
	const authToken = localStorage.getItem('authToken');
	if(authToken) await me(authToken);
	const user = useAuthUser();
	const router = useRouter();

	if(!!user.value) {
		const chatRes = await useBaseFetch('/users/me/chats', {
			method: 'POST',
		});

		if(chatRes.data.value) {
			router.push(`/chat/${ chatRes.data.value.data.uid }`);
		}
	}
</script>

<style lang="sass" scoped>

	.chat-wrapper
		display: flex
		flex-direction: column
		min-height: 100vh

	.chat-header
		padding: 0.5rem
		border-bottom: 1px solid rgba($brand1, 0.25)

		.logo
			height: 40px

	.chat-content
		flex: 1
		display: flex
		align-items: stretch

		.container
			display: flex
			flex: 1
			align-items: stretch

		.chat-experience
			flex: 1
			display: flex
			flex-direction: column

		.chat-config
			width: 300px
			padding: 1rem
			border-left: 1px solid rgba($brand1, 0.25)

	.chat-footer
		border-top: 1px solid rgba($brand1, 0.25)
		padding: 1rem

</style>
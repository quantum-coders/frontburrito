<template>
	<div class="chat-wrapper">
		<header class="chat-header bg-light border-bottom">
			<nav class="navbar navbar-expand-lg navbar-light">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						<img class="logo" src="/images/logo.svg" alt="">
					</a>
					<chat-nav-bar class="ms-auto" />
				</div>
			</nav>
		</header>
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
	</div>
</template>

<script setup>
	definePageMeta({ middleware: 'auth' });
	const user = useAuthUser();
	const route = useRoute();
	const router = useRouter();
	const uid = route.params.uid;
	const chatStore = useChatStore();

	if(!uid) {
		router.push('/');
	} else {
		await chatStore.getChat(uid);
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
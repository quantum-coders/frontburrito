<template>
	<div class="chat-wrapper" v-if="web3Store.isConnected">
	</div>
	<platform-not-auth-action v-else/>
</template>

<script setup>
	definePageMeta({layout: 'burrito'});

	const {me} = useAuth();
	const authToken = localStorage.getItem('authToken');
	if (authToken) await me(authToken);
	const web3Store = useWeb3Store();

	const user = useAuthUser();
	const router = useRouter();

	if (!!user.value) {
		const chatRes = await useBaseFetch('/users/me/chats', {
			method: 'POST',
		});

		if (chatRes.data.value) {
			router.push(`/chat/${chatRes.data.value.data.uid}`);
		}
	} else {
		console.log("Not authenticated....")
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

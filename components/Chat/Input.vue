<template>
	<div class="chat-input">
		<input v-model="message" type="text" placeholder="Write literally anything..." @keyup.enter="sendMessage"/>
		<chat-send-button @click="sendMessage"/>
	</div>
</template>

<script setup>
	const chatStore = useChatStore();
	const message = ref('');

	const sendMessage = async () => {
		if (message.value) {
			chatStore.sendMessage(message.value, saveMessage);
			await nextTick();
			chatStore.scrollToBottom();
			chatStore.increaseMessageStatistics();
			message.value = '';
		}
	};

	const saveMessage = async (message) => {
		chatStore.increaseMessageStatistics();
	};
</script>

<style lang="sass" scoped>

	.chat-input
		padding: 0.5rem
		display: flex
		align-items: center
		gap: 0.5rem
		border-radius: 100rem
		border: 2px solid $brand1
		transition: all 500ms ease-in-out
		box-shadow: 0 0.5em 0 $brand1
		margin-bottom: 0.5em

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

			@media (min-width: $sm)
				font-size: 1rem

</style>

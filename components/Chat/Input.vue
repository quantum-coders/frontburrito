<template>
	<div class="chat-input">
		<input v-model="message" type="text" placeholder="Write literally anything..." />
		<chat-send-button @click="sendMessage" />
	</div>
</template>

<script setup>
	const chatStore = useChatStore();
	const message = ref('');

	const sendMessage = () => {
		if(message.value) {
			chatStore.sendMessage(message.value);
			message.value = '';
		}
	}

</script>

<style lang="sass" scoped>

	.chat-input
		padding: 0.5rem
		display: flex
		align-items: center
		gap: 0.5rem
		border-radius: 100rem
		border: 1px solid rgba($brand1, 0.25)
		transition: all 500ms ease-in-out

		&:hover,
		&:has(input:focus)
			border-color: $brand1

		input
			width: 100%
			border: 0
			font-size: 1rem
			outline: none
			box-sizing: border-box
			margin: 0 0 0 1rem

</style>
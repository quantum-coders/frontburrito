<template>
	<div class="chat-queue">
		<div class="scroll-wrapper">
			<template v-for="message in chatStore.chat.messages">
				<article class="message message-user" v-if="message.type === 'user'">
					<div class="avatar"></div>
					<div class="message-content">
						<div>{{ message.content }}</div>
					</div>
				</article>

				<article class="message message-ai" v-else>
					<div class="avatar"></div>
					<div class="message-content">
						<div>{{ message.content }}</div>
					</div>
				</article>
			</template>
		</div>
	</div>
</template>

<script setup>
	const chatStore = useChatStore();
</script>

<style lang="sass" scoped>

	.scroll-wrapper
		padding: 1rem 1rem 1rem 0
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		overflow-y: auto
		display: flex
		flex-direction: column

	.chat-queue
		padding: 1rem

		.message
			border-radius: 0.5rem
			padding: 1rem
			margin-bottom: 1rem
			display: flex
			gap: 1rem
			align-items: flex-start

			.avatar
				width: 30px
				min-width: 30px
				max-width: 30px
				aspect-ratio: 1
				background: white
				border-radius: 100%

			.message-content
				padding-top: 3px

				p:last-child
					margin: 0

			&.message-ai
				background: rgba($brand2, 0.5)
				align-self: flex-start

			&.message-user
				background: rgba($brand1, 0.5)
				align-self: flex-end
				flex-direction: row-reverse
</style>
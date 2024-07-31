<template>
	<div class="chat-queue">
		<div class="scroll-wrapper pretty-scrolls" v-if="!!chatStore.chat">
			<div class="p-2">

				<template v-for="message in chatStore.chat.messages">
					<div class="message-wrapper">
						<article class="message message-user" v-if="message.type === 'user'">
							<avatar
								:size="30"
								class="avatar"
								:seed="useCryptoStore().currenAccount"
								:colors="['#FFD700', '#FF6347', '#FF4500', '#FF8C00', '#FFA07A']"
								variant="pixel"
							/>
							<div class="message-content">
								<div v-html="$mdRenderer.render(message.content)" />
							</div>
						</article>

						<article class="message message-ai" v-else>
							<avatar
								:size="35"
								class="avatar"
								seed="AI"
								variant="pixel"
							/>
							<div class="message-content">
								<div v-html="$mdRenderer.render(message.content)" />
							</div>
						</article>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
	const { $mdRenderer } = useNuxtApp();
	import Avatar from 'vue-boring-avatars';
	const chatStore = useChatStore();
</script>

<style lang="sass" scoped>

	.scroll-wrapper
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

		.message-wrapper
			display: flex
			margin: 0 auto 1rem
			max-width: 1000px

			&:has(.message-user)
				justify-content: flex-end


		.message
			border-radius: 0.5rem
			padding: 1rem
			display: flex
			gap: 1rem
			align-items: flex-start
			max-width: 80%

			.avatar
				width: 30px
				min-width: 30px
				max-width: 30px
				aspect-ratio: 1
				border-radius: 100%

			.message-content
				padding-top: 3px

				:deep(p:last-child)
					margin-bottom: 0

			&.message-ai
				background: rgba($brand2, 0.5)
				align-self: flex-start

			&.message-user
				background: rgba($brand1, 0.5)
				align-self: flex-end
				flex-direction: row-reverse
</style>
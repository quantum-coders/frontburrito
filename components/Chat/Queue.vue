<template>
	<div class="chat-queue">
		<div class="scroll-wrapper pretty-scrolls" v-if="!!chatStore.chat">
			<div class="p-2">
				<template v-for="(message, index) in chatStore.chat.messages">
					<div class="message-wrapper">
						<article class="message" :class="message.type === 'user' ? 'message-user' : 'message-ai'">
							<avatar
								:size="30"
								class="avatar"
								:seed="message.type === 'user' ? useCryptoStore().currenAccount : 'AI'"
								:colors="['#FFD700', '#FF6347', '#FF4500', '#FF8C00', '#FFA07A']"
								variant="pixel"
							/>
							<div class="message-content">

								<div class="content-wrapper">
									<div class="message-actions">
										<div
											:class="message.type === 'user' ? 'action-buttons-user' : 'action-buttons'">
											<button
												class="btn btn-sm btn-light action-btn"
												@click="copyMessage(message.content, index, 'markdown')"
												:title="copied[index]?.type === 'markdown' ? 'Markdown copied!' : 'Copy markdown'"
											>
												<Icon
													:name="copied[index]?.type === 'markdown' ? 'ph:check-bold' : 'ph:code'"/>
											</button>
											<button
												class="btn btn-sm btn-light action-btn"
												@click="copyMessage(getRenderedText(message.content), index, 'text')"
												:title="copied[index]?.type === 'text' ? 'Text copied!' : 'Copy text'"
											>
												<Icon
													:name="copied[index]?.type === 'text' ? 'ph:check-bold' : 'ph:copy'"/>
											</button>
											<div class="dropdown">
												<button
													class="btn btn-sm btn-light action-btn"
													type="button"
													data-bs-toggle="dropdown"
													aria-expanded="false"
												>
													<Icon name="ph:dots-three-vertical"/>
												</button>
												<ul class="dropdown-menu dropdown-menu-end">
													<li>
														<button class="dropdown-item" @click="downloadMessage(message)">
															<Icon name="ph:download" class="me-2"/>
															Download
														</button>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class="rendered-content" v-html="renderContent(message.content)"/>
								</div>
							</div>
						</article>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script setup>
	const {$mdRenderer} = useNuxtApp();
	import Avatar from 'vue-boring-avatars';
	import hljs from 'highlight.js';

	const chatStore = useChatStore();
	const copied = ref({});

	const renderContent = (content) => {
		const html = $mdRenderer.render(content);
		const temp = document.createElement('div');
		temp.innerHTML = html;

		// Process all code blocks
		temp.querySelectorAll('pre code').forEach((block) => {
			const language = block.className.replace('language-', '');
			if (language) {
				const highlighted = hljs.highlight(block.textContent, {
					language,
					ignoreIllegals: true
				}).value;
				block.innerHTML = highlighted;
				block.className += ' hljs';

				// Add copy button and language label to code block
				const wrapper = document.createElement('div');
				wrapper.className = 'code-block-wrapper';

				// Create container for language label and copy button
				const headerContainer = document.createElement('div');
				headerContainer.className = 'code-header';

				const langLabel = document.createElement('div');
				langLabel.className = 'code-language-label';
				langLabel.textContent = language;

				const copyBtn = document.createElement('button');
				copyBtn.className = 'btn btn-sm btn-dark code-copy-btn';
				// Cambiamos el ícono a un Nuxt Icon
				copyBtn.innerHTML = '<span class="">Copy</span>';
				copyBtn.onclick = () => copyMessage(block.textContent, null, 'code');

				headerContainer.appendChild(langLabel);
				headerContainer.appendChild(copyBtn);

				const pre = block.parentElement;
				pre.parentElement.insertBefore(wrapper, pre);
				wrapper.appendChild(headerContainer);
				wrapper.appendChild(pre);
			}
		});

		return temp.innerHTML;
	};

	const getRenderedText = (markdown) => {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = $mdRenderer.render(markdown);
		return tempDiv.textContent || tempDiv.innerText || '';
	};

	const copyMessage = async (content, index, type) => {
		try {
			await navigator.clipboard.writeText(content);
			if (index !== null) {
				copied.value[index] = {type};
				setTimeout(() => {
					delete copied.value[index];
				}, 2000);
			}
		} catch (err) {
			console.error('Error copying:', err);
		}
	};


	const downloadMessage = (message) => {
		const blob = new Blob([message.content], {type: 'text/markdown'});
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'message.md';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	};

	onMounted(() => {
		chatStore.scrollToBottom();
	});
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
			box-sizing: border-box
			overflow: visible
			// Cambiado de 'hidden' a 'visible'
			border-radius: 0.5rem
			padding: 0.5rem
			display: flex
			gap: 1rem
			align-items: flex-start
			max-width: 100%
			position: relative

			@media (min-width: $sm)
				max-width: 80%
				padding: 1rem

			.avatar
				width: 30px
				min-width: 30px
				max-width: 30px
				aspect-ratio: 1
				border-radius: 100%

			.message-content
				box-sizing: border-box
				padding-top: 3px
				padding-right: 2rem
				font-size: 0.8rem
				width: 100%
				position: relative
				overflow: visible
				// Aseguramos que sea 'visible'

				.message-actions
					position: absolute
					top: 0.5rem
					right: 0.5rem
					opacity: 0
					transition: opacity 0.2s ease
					z-index: 2

					.action-buttons,
					.action-buttons-user
						display: flex
						flex-direction: row
						gap: 0.25rem

					.action-btn
						padding: 0.25rem
						display: flex
						align-items: center
						justify-content: center

						.icon
							width: 0.875rem
							height: 0.875rem

				&:hover .message-actions
					opacity: 1

				.content-wrapper
					position: relative
					width: 100%
					padding: 0.5rem

					.rendered-content
						word-break: break-word
						// Evita overflow por textos largos

						:deep(.code-block-wrapper)
							position: relative
							margin: 1rem 0

							.code-header
								display: flex
								justify-content: space-between
								align-items: center
								padding: 0.5rem
								background: rgba(0, 0, 0, 0.8)
								border-radius: 0.5rem 0.5rem 0 0

							.code-language-label
								background: rgba(0, 0, 0, 0.6)
								color: white
								padding: 0.25rem 0.5rem
								border-radius: 0.25rem
								font-size: 0.75rem

							.code-copy-btn
								padding: 0.25rem 0.5rem
								font-size: 0.75rem

							pre
								margin: 0
								padding: 1rem
								border-radius: 0 0 0.5rem 0.5rem
								background: rgba(0, 0, 0, 0.8)
								overflow-x: auto

								code
									font-family: monospace
									font-size: 0.9rem
									line-height: 1.4

				:deep(p:last-child)
					margin-bottom: 0

			&.message-ai
				border-radius: 0 0.5rem 0.5rem 0.5rem
				background: rgba($brand2, 0.5)
				align-self: flex-start
				box-shadow: 0 0.5em 0 $brand2

				.message-content .message-actions
					top: 0.5rem
					right: 0.5rem

			&.message-user
				border-radius: 0.5rem 0 0.5rem 0.5rem
				background: rgba($brand1, 0.5)
				align-self: flex-end
				flex-direction: row-reverse
				box-shadow: 0 0.5em 0 $brand1

				.message-content .message-actions
					top: 0.5rem
					left: 0.5rem
					right: auto

				.message-content
					padding-right: 2rem
					padding-left: 3px

	:deep(.dropdown-menu)
		position: absolute
		// Asegura posicionamiento correcto
		font-size: 0.875rem
		min-width: 8rem
		z-index: 1000
		// Aumenta 'z-index' para que esté encima

		.dropdown-item
			display: flex
			align-items: center
			padding: 0.375rem 0.75rem

	// Ajustes para dispositivos móviles
	@media (max-width: 576px)
		.message-content .message-actions
			top: 0.25rem
			right: 0.25rem

			.action-buttons,
			.action-buttons-user
				flex-direction: column
				align-items: flex-end

			.action-btn
				padding: 0.15rem

				.icon
					width: 0.75rem
					height: 0.75rem

		.message-user .message-content .message-actions
			top: 0.25rem
			left: 0.25rem
			right: auto

			.action-buttons,
			.action-buttons-user
				flex-direction: column
				align-items: flex-start

		.message
			padding: 0.5rem
			overflow-x: visible
		// Cambiado a 'visible' para mostrar el menú

		.message-content
			padding-right: 1.5rem
			padding-left: 1.5rem
			overflow-x: visible
	// Asegura que el menú no se oculte
</style>>

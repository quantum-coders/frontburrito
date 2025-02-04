<template>
	<div class="chat-queue">
		<div class="scroll-wrapper pretty-scrolls" v-if="!!chatStore.chat">
			<div class="p-2">
				<template v-for="(message, index) in chatStore.chat.messages" :key="index">
					<div class="message-wrapper">
						<article
							class="message"
							:class="message.type === 'user' ? 'message-user' : 'message-ai'"
						>
							<avatar
								:size="30"
								class="avatar"
								:seed="message.type === 'user' ? useCryptoStore().currenAccount : 'AI'"
								:colors="['#FFD700', '#FF6347', '#FF4500', '#FF8C00', '#FFA07A']"
								variant="pixel"
							/>
							<div class="message-container">
								<chat-message-actions
									:type="message.type"
									:message-content="message.content"
									:rendered-content="getRenderedText(message.content)"
									@download="downloadMessage(message)"
								/>
								<div class="message-content">
									<div v-if="message.reasoning" class="reasoning-block">
										<div class="reasoning-title">Reasoning</div>
										<blockquote>{{ message.reasoning }}</blockquote>
									</div>
									<div
										class="rendered-content"
										v-html="renderContent(message.content)"
									/>
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
	import Avatar from 'vue-boring-avatars';
	import hljs from 'highlight.js';

	const {$mdRenderer} = useNuxtApp();
	const chatStore = useChatStore();

	const renderContent = (content) => {
		const html = $mdRenderer.render(content);
		const temp = document.createElement('div');
		temp.innerHTML = html;

		// Procesar todos los bloques de código
		temp.querySelectorAll('pre code').forEach((block) => {
			const language = block.className.replace('language-', '');
			if (language) {
				const highlighted = hljs.highlight(block.textContent, {
					language,
					ignoreIllegals: true,
				}).value;
				block.innerHTML = highlighted;
				block.className += ' hljs';

				// Agregar botón de copia y etiqueta de lenguaje al bloque de código
				const wrapper = document.createElement('div');
				wrapper.className = 'code-block-wrapper';

				const headerContainer = document.createElement('div');
				headerContainer.className = 'code-header';

				const langLabel = document.createElement('div');
				langLabel.className = 'code-language-label';
				langLabel.textContent = language;

				const copyBtn = document.createElement('button');
				copyBtn.className = 'btn btn-sm btn-dark code-copy-btn';
				copyBtn.innerHTML = '<span>Copy</span>';
				// Agregar el código a copiar como atributo de datos
				copyBtn.setAttribute('data-code', block.textContent);

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
		const chatQueue = document.querySelector('.chat-queue');
		if (chatQueue) {
			chatQueue.addEventListener('click', async (event) => {
				const target = event.target.closest('.code-copy-btn');
				if (target) {
					const codeToCopy = target.getAttribute('data-code');
					try {
						await navigator.clipboard.writeText(codeToCopy);
						console.log('Código copiado al portapapeles');
					} catch (err) {
						console.error('Error al copiar:', err);
					}
				}
			});
		}
	});

</script>

<style lang="sass" scoped>
	.message-container
		position: relative
		width: 100%

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

				.rendered-content
					word-break: break-word

					:deep(.code-block-wrapper)
						position: relative
						margin: 1rem 0
						border: 1px solid #333
						border-radius: 0.5rem
						overflow: hidden

						.code-header
							display: flex
							justify-content: space-between
							align-items: center
							padding: 0.5rem
							background: #333

							.code-language-label
								background: #e1e1e8
								color: #333
								padding: 0.25rem 0.5rem
								border-radius: 0.25rem
								font-size: 0.75rem

							.code-copy-btn
								padding: 0.25rem 0.5rem
								font-size: 0.75rem
								cursor: pointer

						pre
							margin: 0
							padding: 1rem
							background: #282c34
							color: #abb2bf
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

				.message-content
					top: 0.5rem
					right: 0.5rem

			&.message-user
				border-radius: 0.5rem 0 0.5rem 0.5rem
				background: rgba($brand1, 0.5)
				align-self: flex-end
				flex-direction: row-reverse
				box-shadow: 0 0.5em 0 $brand1

				.message-content
					top: 0.5rem
					left: 0.5rem
					right: auto
					padding-right: 2rem
					padding-left: 3px

	:deep(.dropdown-menu)
		position: absolute
		font-size: 0.875rem
		min-width: 8rem
		z-index: 1000

		.dropdown-item
			display: flex
			align-items: center
			padding: 0.375rem 0.75rem

	@media (max-width: 576px)
		.message-content
			top: 0.25rem
			right: 0.25rem

			.action-btn
				padding: 0.15rem

				.icon
					width: 0.75rem
					height: 0.75rem

		.message-user .message-content
			top: 0.25rem
			left: 0.25rem
			right: auto

		.message
			padding: 0.5rem
			overflow-x: visible

		.message-content
			padding-right: 1.5rem
			padding-left: 1.5rem
			overflow-x: visible
</style>
<style lang="scss">
	.reasoning-block {
		margin-top: 0.5rem;
		padding: 0.5rem 1rem;
		margin-bottom: 0.5rem;
		background-color: #f3f3f3;
		border-radius: 0.25rem;
		color: #333;

		blockquote {
			margin: 0; /* Para quitar márgenes extras en blockquote */
			font-size: 0.8rem;
			font-style: italic;
		}
	}

	.reasoning-title{
		font-weight: bold;
		margin-bottom: 0.25rem;
	}
</style>

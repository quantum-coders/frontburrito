import { defineStore } from 'pinia';

export const useChatStore = defineStore('chatStore', () => {

	const chat = ref(null);

	const getChat = async (uid) => {
		const chatRes = await useBaseFetch(`/users/me/chats/${ uid }`);

		if(chatRes.data.value) {
			chat.value = chatRes.data.value.data;
		}
	};

	const sendMessage = async (message, callback = null) => {
		const messageRes = await useBaseFetch(`/users/me/chats/${ chat.value.uid }/messages`, {
			method: 'POST',
			body: { message },
		});

		if(messageRes.data.value) {
			chat.value?.messages.push(messageRes.data.value.data);

			const token = localStorage.getItem('authToken');
			const aiRes = await fetch(`${ useRuntimeConfig().public.baseURL }/ai/message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${ token }`,
				},
				body: JSON.stringify({
					model: 'burrito-8x7b',
					temperature: 1,
					idChat: chat.value.id,
					prompt: message,
				}),
			});

			if(aiRes.ok) {

				// add an empty message to chat with type "assistant"
				chat.value.messages.push({
					type: 'assistant',
					content: '',
				});

				const reader = aiRes.body.getReader();
				let chunks = '';

				return reader.read().then(async function processText({ done, value }) {
					if(done) {
						if(callback && typeof callback === 'function') {
							callback(chunks);
						}
						return chunks;
					}

					const textDecoder = new TextDecoder('utf-8');
					const chunk = textDecoder.decode(value);
					let lines = chunk.split(/\r?\n/);
					lines = lines.filter((line) => line !== '');
					lines = lines.map((line) => line.replace('data: ', ''));

					// iterate lines
					for(let i = 0; i < lines.length; i++) {
						if(lines[i] === '' || lines[i] === '[DONE]') continue;

						try {
							if(lines[i].startsWith('{')) {
								if(lines[i].includes('“')) {
									lines[i] = lines[i].replace(/“/g, '"');
								}
								const json = JSON.parse(lines[i]);

								if(typeof json.choices[0].delta.content === 'string') {
									chunks += json.choices[0].delta.content;

									// append chunk to content from last message
									chat.value.messages[chat.value.messages.length - 1].content += json.choices[0].delta.content;
									scrollToBottom();
								}
							}
						} catch(e) {
							console.log('error parsing json', lines[i]);
						}
					}
					return reader.read().then(processText);
				});
			}
		}
	};

	const downloadChat = async (chat, type = 'txt') => {
		const chatId = chat.uid;

		console.log(`Downloading chat: ${ chatId }, type: ${ type }`);
		try {
			const token = localStorage.getItem('authToken');
			const response = await fetch(`${ useRuntimeConfig().public.baseURL }/chats/${ chatId }/download?type=${ type }`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${ token }`,
				},
			});

			if(!response.ok) {
				throw new Error(`HTTP error! status: ${ response.status }`);
			}

			const blob = await response.blob();
			const filename = response.headers.get('Content-Disposition')
				? response.headers.get('Content-Disposition').split('filename=')[1].replace(/"/g, '')
				: `chat_${ chatId }.${ type }`;

			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch(error) {
			console.error('Error downloading chat:', error);
			alert('Error al descargar el chat. Por favor, inténtelo de nuevo más tarde.');
		}
	};

	const scrollToBottom = () => {
		// scroll to the bottom of #thread, animated
		const thread = document.querySelector('.chat-queue .scroll-wrapper');
		if(!thread) return;
		thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
	};

	const updateChat = async (updates) => {
		try {
			console.log('updating...');
			const updateRes = await useBaseFetch(`/users/me/chats/${ chat.value.uid }`, {
				method: 'PATCH',
				body: updates,
			});

			if(updateRes.data.value) {
				// Actualizar solo los campos modificados en el estado local
				Object.assign(chat.value, updateRes.data.value.data);
			}
		} catch(error) {
			console.error('Error updating chat:', error);
		}
	};

	const updateChatFrontend = async (updates) => {
		console.log('Before chat', chat.value);
		chat.value = { ...chat.value, ...updates };
		console.log('After chat', chat.value);
	};

	// increase messageStatistics.count
	const increaseMessageStatistics = async (messageStatistics) => {
		chat.value.messageStatistics.count += 1;
		await getTokenUsage(chat.value.uid);
	};

	const getTokenUsage = async (uid) => {
		// route chats/token-usage/:uid
		const res = await useBaseFetch(`/chats/token-usage/${ uid }`);
		if(!res.data.value) {
			console.error('Error getting token usage:', res.error.value);
			return;
		}
		chat.value.totalCost = res.data.value.data.totalCost;
		chat.value.tokensUsed = res.data.value.data.tokensUsed;
		return {
			totalCost: res.data.value.data.totalCost,
			tokensUsed: res.data.value.data.tokensUsed,
		};
	};

	return {
		getChat,
		getTokenUsage,
		updateChatFrontend,
		increaseMessageStatistics,
		updateChat,
		sendMessage,
		scrollToBottom,
		chat,
		downloadChat,
	};
});
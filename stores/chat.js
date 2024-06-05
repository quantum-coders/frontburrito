import { defineStore } from 'pinia';

export const useChatStore = defineStore('chatStore', () => {

	const chat = ref(null);

	const getChat = async (uid) => {
		const chatRes = await useBaseFetch(`/users/me/chats/${ uid }`);

		if(chatRes.data.value) {
			chat.value = chatRes.data.value.data;
		}
	}

	const sendMessage = async (message) => {
		const messageRes = await useBaseFetch(`/users/me/chats/${ chat.value.uid }/messages`, {
			method: 'POST',
			body: { message }
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
					prompt: message
				})
			});

			if(aiRes.ok) {

				// add an empty message to chat with type "assistant"
				chat.value.messages.push({
					type: 'assistant',
					content: ''
				});

				const reader = aiRes.body.getReader();
				let chunks = '';

				return reader.read().then(async function processText({ done, value }) {
					if(done) { return chunks; }

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
	}

	return {
		getChat,
		sendMessage,
		chat
	};
});
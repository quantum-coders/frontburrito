import {defineStore} from 'pinia';
import {v4 as uuidv4} from 'uuid';

export const useChatStore = defineStore('chatStore', () => {

	const chat = ref(null);
	const streamingLoading = ref(false);
	const abortController = ref(null);
	const currentRequestId = ref(null); // Añadido
	// Para administradores
	const adminModels = ref([]);

	const availableModels = ref([]);
	const loading = ref(false);
	const error = ref(null);

	const bulkAction = async (action, modelIds, payload = {}) => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch(`/admin/models/bulk-action`, {
				method: 'PATCH',
				body: {action, modelIds, ...payload}
			});
			if (response.data.value) {
				// Actualizar los modelos en la lista
				response.data.value.data.forEach(updatedModel => {
					const index = adminModels.value.findIndex(m => m.id === updatedModel.id);
					if (index !== -1) {
						adminModels.value[index] = updatedModel;
					}
				});
				return response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error performing bulk action:', e);
			throw e;
		} finally {
			loading.value = false;
		}
	};


	const getAvailableModels = async () => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch('/ai/models');
			if (response.data.value) {
				availableModels.value = response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error fetching available models:', e);
		} finally {
			loading.value = false;
		}
	};

	const getAllModels = async () => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch('/admin/models');
			if (response.data.value) {
				adminModels.value = response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error fetching all models:', e);
		} finally {
			loading.value = false;
		}
	};

	const getAllModelsActive = async () => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch('/admin/models/all');
			if (response.data.value) {
				adminModels.value = response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error fetching all models:', e);
		} finally {
			loading.value = false;
		}
	};

	const toggleSandbox = async (modelId) => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch(`/admin/models/${modelId}/sandbox`, {
				method: 'PATCH'
			});
			if (response.data.value) {
				// Actualizarlo en adminModels
				const index = adminModels.value.findIndex(m => m.id === modelId);
				if (index !== -1) {
					adminModels.value[index] = response.data.value.data;
				}
				return response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error toggling model sandbox status:', e);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const toggleModelVisibility = async (modelId) => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch(`/admin/models/${modelId}/visibility`, {
				method: 'PATCH'
			});
			if (response.data.value) {
				// Actualizar el modelo en la lista
				const index = adminModels.value.findIndex(m => m.id === modelId);
				if (index !== -1) {
					adminModels.value[index] = response.data.value.data;
				}
				return response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error toggling model visibility:', e);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const toggleModelFeatured = async (modelId) => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch(`/admin/models/${modelId}/featured`, {
				method: 'PATCH'
			});
			if (response.data.value) {
				const index = adminModels.value.findIndex(m => m.id === modelId);
				if (index !== -1) {
					adminModels.value[index] = response.data.value.data;
				}
				return response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error toggling model featured status:', e);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const updateModelPriority = async (modelId, priority) => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch(`/admin/models/${modelId}/priority`, {
				method: 'PATCH',
				body: {priority}
			});
			if (response.data.value) {
				const index = adminModels.value.findIndex(m => m.id === modelId);
				if (index !== -1) {
					adminModels.value[index] = response.data.value.data;
				}
				return response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error updating model priority:', e);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const updateModel = async (modelId, updateData) => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch(`/admin/models/${modelId}`, {
				method: 'PUT',
				body: updateData
			});
			if (response.data.value) {
				const index = adminModels.value.findIndex(m => m.id === modelId);
				if (index !== -1) {
					adminModels.value[index] = response.data.value.data;
				}
				return response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error updating model:', e);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const syncWithOpenRouter = async () => {
		loading.value = true;
		error.value = null;
		try {
			const response = await useBaseFetch('/admin/models/sync', {
				method: 'POST'
			});
			if (response.data.value) {
				// Actualizar la lista completa después de la sincronización
				await getAllModels();
				return response.data.value.data;
			}
		} catch (e) {
			error.value = e.message;
			console.error('Error syncing with OpenRouter:', e);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const getFeaturedModels = async () => {
		const featured = computed(() =>
			availableModels.value.filter(model => model.isFeatured)
		);
		return featured;
	};

	// Watch changes in models for real-time updates
	watch(adminModels, (newModels) => {
		// Actualizar también los modelos disponibles si es necesario
		const visibleModels = newModels.filter(m => m.isVisible && m.status === 'active');
		availableModels.value = visibleModels;
	});
	const getChat = async (uid) => {
		const chatRes = await useBaseFetch(`/users/me/chats/${uid}`);

		if (chatRes.data.value) {
			chat.value = chatRes.data.value.data;
		}
	};

	const sendMessage = async (message, callback = null) => {
		// create uuid
		try {
			abortController.value = new AbortController();
			streamingLoading.value = true;
			const uuid = uuidv4();
			const idRequest = uuidv4();
			currentRequestId.value = idRequest; // Asignamos el idRequest
			const assistantUidMessage = uuidv4();

			chat.value?.messages.push({
				type: 'user',
				content: message,
				uid: uuid
			});

			const token = localStorage.getItem('authToken');
			const aiRes = await fetch(`${useRuntimeConfig().public.baseURL}/ai/message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				signal: abortController.value.signal,
				body: JSON.stringify({
					model: chat.value.selectedModel.openrouterId,
					temperature: 1,
					idRequest: idRequest,
					idChat: chat.value.id,
					uidMessage: uuid,
					assistantUidMessage: assistantUidMessage,
					prompt: message,
				}),
			});

			if (aiRes.ok) {
				// add an empty message to chat with type "assistant"
				chat.value.messages.push({
					uid: assistantUidMessage,
					type: 'assistant',
					content: '',
				});

				const reader = aiRes.body.getReader();
				let chunks = '';

				return reader.read().then(async function processText({done, value}) {
					if (done) {
						if (callback && typeof callback === 'function') {
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
					for (let i = 0; i < lines.length; i++) {
						if (lines[i] === '' || lines[i] === '[DONE]') {
							streamingLoading.value = false;
							continue;

						}
						try {
							if (lines[i].startsWith('{')) {
								if (lines[i].includes('“')) {
									lines[i] = lines[i].replace(/“/g, '"');
								}
								const json = JSON.parse(lines[i]);

								if (typeof json.choices[0].delta.content === 'string') {
									chunks += json.choices[0].delta.content;

									// append chunk to content from last message
									chat.value.messages[chat.value.messages.length - 1].content += json.choices[0].delta.content;
									scrollToBottom();
								}
							}
						} catch (e) {
							console.log('error parsing json', lines[i]);
						}
					}
					return reader.read().then(processText);
				});
			}
		} catch (e) {
			console.error('Error sending message:', e);
		} finally {
		}
	};

	const stopStreaming = () => {
		if (abortController.value) {
			console.log('⏹️ [Frontend] Se ha llamado a stopStreaming. Abortando la solicitud.');
			abortController.value.abort(); // Abortamos el fetch en curso.
			streamingLoading.value = false;

			// Enviar solicitud de cancelación al backend
			const token = localStorage.getItem('authToken');
			fetch(`${useRuntimeConfig().public.baseURL}/ai/message/cancel`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({idRequest: currentRequestId.value}),
			});
		}
	};

	const downloadChat = async (chat, type = 'txt') => {
		const chatId = chat.uid;

		console.log(`Downloading chat: ${chatId}, type: ${type}`);
		try {
			const token = localStorage.getItem('authToken');
			const response = await fetch(`${useRuntimeConfig().public.baseURL}/chats/${chatId}/download?type=${type}`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blob = await response.blob();
			const filename = response.headers.get('Content-Disposition')
				? response.headers.get('Content-Disposition').split('filename=')[1].replace(/"/g, '')
				: `chat_${chatId}.${type}`;

			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Error downloading chat:', error);
			alert('Error al descargar el chat. Por favor, inténtelo de nuevo más tarde.');
		}
	};

	const scrollToBottom = () => {
		// scroll to the bottom of #thread, animated
		const thread = document.querySelector('.chat-queue .scroll-wrapper');
		if (!thread) return;
		thread.scrollTo({top: thread.scrollHeight, behavior: 'smooth'});
	};

	const updateChat = async (updates) => {
		try {
			console.log('updating...');
			const updateRes = await useBaseFetch(`/users/me/chats/${chat.value.uid}`, {
				method: 'PATCH',
				body: updates,
			});

			if (updateRes.data.value) {
				Object.assign(chat.value, updateRes.data.value.data);
			}
		} catch (error) {
			console.error('Error updating chat:', error);
		}
	};

	const updateChatFrontend = (updates) => {
		console.log('Before chat', chat.value);
		chat.value = {...chat.value, ...updates};
		console.log('After chat', chat.value);
	};

	const updateChatModel = async (modelId) => {
		try {
			console.log('Updating chat model...');
			const updateRes = await useBaseFetch(`/users/me/chats/${chat.value.uid}/model`, {
				method: 'PATCH',
				body: {idModel: modelId},
			});

			if (updateRes.data.value) {
				// Actualizar el modelo seleccionado en el estado local
				const selectedModel = availableModels.value.find(model => model.id === modelId);
				updateChatFrontend({selectedModel});
			}
		} catch (error) {
			console.error('Error updating chat model:', error);
		}
	};

	// increase messageStatistics.count
	const increaseMessageStatistics = async (messageStatistics) => {
		chat.value.messageStatistics.count += 1;
		await getTokenUsage(chat.value.uid);
	};

	const getTokenUsage = async (uid) => {
		// route chats/token-usage/:uid
		const res = await useBaseFetch(`/chats/token-usage/${uid}`);
		if (!res.data.value) {
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
		stopStreaming,
		getTokenUsage,
		updateChatFrontend,
		increaseMessageStatistics,
		updateChat,
		streamingLoading,
		sendMessage,
		scrollToBottom,
		chat,
		downloadChat,
		adminModels,
		getAllModels,
		getAvailableModels,
		toggleModelVisibility,
		toggleModelFeatured,
		updateModelPriority,
		loading,
		error,
		getAllModelsActive,
		toggleSandbox,
		updateChatModel,
		updateModel,
		syncWithOpenRouter,
		getFeaturedModels,
		bulkAction,

	};
});

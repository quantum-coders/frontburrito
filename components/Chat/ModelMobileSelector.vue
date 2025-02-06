<template>
	<header class="chat-header navbar navbar-expand-lg p-2">
		<div
			class="logo-container navbar-brand d-flex align-items-center"
			@click="router.push('/')"
		>

			<img src="/images/logo.svg" alt="Logo" class="logo" />
		</div>

		<div class="model-selector-container ms-auto d-flex align-items-center">
			<div class="model-selector" :class="{ 'open': isOpen }">
				<div class="selector-header" @click="isOpen = !isOpen">
					<div class="selector-current">
						<span class="current-model">{{ currentModelName }}</span>
						<span v-if="chatStore.loading" class="loading-text">Loading models...</span>
					</div>
					<div class="selector-arrow" :class="{ 'open': isOpen }">▼</div>
				</div>

				<div class="dropdown-content" :class="{ 'show': isOpen }">
					<div class="search-container" @click.stop>
						<input
							v-model="searchQuery"
							type="text"
							placeholder="Search models..."
							class="search-input"
							@click="isOpen = true"
						/>
					</div>

					<div v-if="filteredFeaturedModels.length" class="model-section">
						<div class="model-category-label">Featured Models</div>
						<div class="model-options">
							<div
								v-for="model in filteredFeaturedModels"
								:key="model.id"
								class="model-option"
								:class="{ 'active': chatStore.chat?.selectedModel?.id === model.id }"
								@click="selectModelAndClose(model)"
							>
								<div class="model-header">
									<span class="model-name">{{ model.name }}</span>
									<span class="model-badge featured">Featured</span>
								</div>
								<div class="model-details">
									<small class="text-muted">
										{{ formatTokens(model.contextLength) }} • ${{ model.inputCost }}/1K tokens
									</small>
								</div>
							</div>
						</div>
					</div>

					<div v-if="filteredRegularModels.length" class="model-section">
						<div class="model-category-label">Available Models</div>
						<div class="model-options">
							<div
								v-for="model in filteredRegularModels"
								:key="model.id"
								class="model-option"
								:class="{ 'active': chatStore.chat?.selectedModel?.id === model.id }"
								@click="selectModelAndClose(model)"
							>
								<div class="model-header">
									<span class="model-name">{{ model.name }}</span>
								</div>
								<div class="model-details">
									<small class="text-muted">
										{{ formatTokens(model.contextLength) }} • ${{ model.inputCost }}/1K tokens
									</small>
								</div>
							</div>
						</div>
					</div>

					<div v-if="!filteredFeaturedModels.length && !filteredRegularModels.length" class="no-results">
						No models found matching "{{ searchQuery }}"
					</div>
				</div>
			</div>
		</div>

		<chat-stats-mobile />
	</header>
</template>

<script setup>
	const chatStore = useChatStore();
	const isOpen = ref(false);
	const searchQuery = ref('');
	const router = useRouter();
	// Computed property for current model name
	const currentModelName = computed(() =>
		chatStore.chat?.selectedModel?.name || 'Select Model',
	);
	const isMenuOpen = ref(false);
	// Filter models based on search query
	const filteredFeaturedModels = computed(() => {
		const models = chatStore.adminModels?.filter(model => model.isFeatured) || [];
		if(!searchQuery.value) return models;
		return models.filter(model =>
			model.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
		);
	});

	const filteredRegularModels = computed(() => {
		const models = chatStore.adminModels?.filter(model => !model.isFeatured) || [];
		if(!searchQuery.value) return models;
		return models.filter(model =>
			model.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
		);
	});

	const selectModelAndClose = async (model) => {
		await chatStore.updateChatModel(model.id);
		isOpen.value = false;
		searchQuery.value = '';
	};

	const formatTokens = (tokens) => {
		if(!tokens) return '0 tokens';
		if(tokens >= 1000) {
			return `${ (tokens / 1000).toFixed(0) }K tokens`;
		}
		return `${ tokens } tokens`;
	};

	// Close dropdown when clicking outside
	const handleClickOutside = (event) => {
		if(!event.target.closest('.model-selector')) {
			isOpen.value = false;
		}
	};

	onMounted(() => {
		chatStore.getAllModels();
		document.addEventListener('click', handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<style scoped lang="scss">
	/*
	  Estilos generales para el header (navbar) con logo y selector.
	  Ajusta las distancias, colores o tipos de fuente a tu gusto.
	*/

	/* Usamos .navbar + .chat-header para que sea un estilo de AppBar / Nav */
	.chat-header {
		background-size: cover;
		background: url("/images/background-texture.png") repeat;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		/*
		  Si lo deseas "fixed" en la parte superior:
		  position: fixed;
		  top: 0;
		  left: 0;
		  right: 0;
		  z-index: 10000;
		*/
	}

	/* LOGO */
	.logo-container {
		display: flex;
		align-items: center;

		.logo {
			max-height: 40px; /* Ajusta el tamaño del logo */
			width: auto;
		}
	}

	/* CONTENEDOR PARA EL SELECTOR DE MODELOS (DERECHA) */
	.model-selector-container {
		display: flex;
		align-items: center;
	}

	/* MODEL SELECTOR - LÓGICA DEL DROPDOWN */
	.model-selector {
		position: relative;
		width: 100%;
		max-width: 300px; /* Ajusta el ancho máximo deseado */
	}

	/* HEADER DEL SELECTOR (lo que ves antes del dropdown) */
	.selector-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.6rem 1rem;
		border: 2px solid rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		cursor: pointer;
		background: #fff;
		transition: all 0.2s ease;

		&:hover {
			border-color: #000;
		}
	}

	.selector-current {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.current-model {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.loading-text {
		font-size: 0.8rem;
		color: #666;
	}

	/* Flecha (▼) */
	.selector-arrow {
		font-size: 0.8rem;
		transition: transform 0.2s ease;

		&.open {
			transform: rotate(180deg);
		}
	}

	/* CONTENIDO DEL DROPDOWN */
	.dropdown-content {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		right: 0;
		background: #fff;
		border: 2px solid rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		display: none;
		z-index: 2000; /* asegúrate de que aparezca sobre otros elementos */
		max-height: 400px;
		overflow-y: auto;

		&.show {
			display: block;
		}
	}

	/* BARRA DE BÚSQUEDA DENTRO DEL DROPDOWN */
	.search-container {
		padding: 0.5rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.search-input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
		font-size: 0.9rem;
		outline: none;

		&:focus {
			border-color: #000;
		}
	}

	/* SECCIONES DE MODELOS */
	.model-section {
		padding: 0.5rem;

		& + .model-section {
			border-top: 1px solid rgba(0, 0, 0, 0.1);
		}
	}

	.model-category-label {
		font-size: 0.8rem;
		opacity: 0.75;
		margin-bottom: 0.5rem;
		padding: 0 0.5rem;
	}

	/* LISTADO DE OPCIONES */
	.model-options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.model-option {
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 0.5rem;
		transition: background 0.2s ease;

		&:hover {
			background: rgba(0, 0, 0, 0.05);
		}

		&.active {
			background: rgba(0, 0, 0, 0.1);
		}
	}

	.model-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.model-name {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.model-badge {
		font-size: 0.7rem;
		padding: 0.2rem 0.5rem;
		border-radius: 1rem;
		background: #000;
		color: #fff;
	}

	/* DETALLES DEL MODELO (TOKENS, PRECIOS, ETC.) */
	.model-details {
		margin-top: 0.25rem;
		font-size: 0.8rem;
		color: #666;
	}

	/* CUANDO NO SE ENCUENTRAN RESULTADOS */
	.no-results {
		padding: 1rem;
		text-align: center;
		color: #666;
		font-size: 0.9rem;
	}

	/* OPTIMIZACIÓN PARA MÓVILES */
	.chat-header {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap; /* evita que salte de línea */
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

</style>

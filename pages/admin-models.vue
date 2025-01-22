<template>
	<div class="container-fluid py-4">
		<div class="row mb-4 align-items-center">
			<div class="col">
				<h2 class="h3 mb-0">AI Models Management</h2>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-primary d-flex align-items-center gap-2"
					@click="syncModels"
					:disabled="loading"
				>
					<Icon name="material-symbols:sync"/>
					Sync with OpenRouter
					<div v-if="loading" class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</button>
			</div>
		</div>

		<div class="row g-3 mb-4">
			<div class="col-md-6">
				<div class="input-group">
          <span class="input-group-text bg-white">
            <Icon name="material-symbols:search"/>
          </span>
					<input
						type="text"
						class="form-control"
						v-model="searchTerm"
						placeholder="Search models..."
					/>
				</div>
			</div>
			<div class="col-md-6">
				<div class="btn-group w-100">
					<button
						v-for="filter in filters"
						:key="filter.value"
						class="btn"
						:class="[activeFilter === filter.value ? 'btn-primary' : 'btn-outline-primary']"
						@click="activeFilter = filter.value"
					>
						{{ filter.label }}
					</button>
				</div>
			</div>
		</div>

		<div class="row mb-4">
			<div class="col">
				<div class="d-flex gap-2">
					<select class="form-select" v-model="selectedAction" style="min-width: 200px;">
						<option value="" disabled>Select Bulk Action</option>
						<option value="toggleVisibility">Toggle Visibility</option>
						<option value="toggleFeatured">Toggle Featured</option>
						<option value="updatePriority">Update Priority</option>
						<option value="updateStatus">Update Status</option>
					</select>

					<div v-if="selectedAction === 'updatePriority'">
						<input
							type="number"
							class="form-control"
							v-model.number="priorityValue"
							placeholder="Priority"
							style="width: 120px;"
						/>
					</div>

					<div v-if="selectedAction === 'updateStatus'">
						<select class="form-select" v-model="statusValue" style="width: 120px;">
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>

					<button
						class="btn btn-outline-primary"
						@click="performBulkAction"
						:disabled="selectedModels.length === 0 || !selectedAction"
					>
						Apply
					</button>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="table-responsive">
				<table class="table table-hover align-middle mb-0">
					<thead class="table-light">
					<tr>
						<th>
							<input type="checkbox" @change="toggleSelectAll" v-model="selectAll"/>
						</th>
						<th>Model</th>
						<th>Type</th>
						<th>Pricing (per 1 token)</th>
						<th>Status</th>
						<th>Priority</th>
						<th>Visibility</th>
						<th>Featured</th>
						<th>Sandbox</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					<tr
						v-for="model in filteredModels"
						:key="model.id"
						:class="{ 'table-secondary': model.status === 'inactive' }"
					>
						<td>
							<input type="checkbox" :value="model.id" v-model="selectedModels"/>
						</td>
						<td>
							<div>
								<h6 class="mb-0">{{ model.name }}</h6>
								<small class="text-muted d-block container-sm" style="max-width: 300px;">
  <span v-if="!expandedDescriptions[model.id]">
    {{ truncateText(model.description, 50) }}
  </span>
  <span v-else>
    {{ model.description }}
  </span>
  <button class="btn btn-outline-dark btn-sm" @click="expandedDescriptions[model.id] = !expandedDescriptions[model.id]">
    {{ expandedDescriptions[model.id] ? 'See less' : 'See more' }}
  </button>
</small>
							</div>
						</td>
						<td>
                <span class="badge" :class="getModelTypeBadgeClass(model.modelType)">
                  {{ model.modelType }}
                </span>
						</td>
						<td>
							<span class="row row-cols-2 small">
								<div>
									<span class="fw-bold">Input (OR):</span>
									<div><span class="math-inline">{{ model.openrouterInputCost }}</span></div>
								</div>
								<div>
									<span class="fw-bold">Output (OR):</span>
									<div><span class="math-inline">{{ model.openrouterOutputCost }}</span></div>
								</div>
								<div>
									<span class="fw-bold">Input (Final):</span>
									<div><span class="math-inline">{{ model.inputCost }}</span></div>
								</div>
								<div>
									<span class="fw-bold">Output (Final):</span>
									<div><span class="math-inline">{{ model.outputCost }}</span></div>
								</div>
								<div>
									<span class="fw-bold">Profit Input:</span>
									<div>
										${{ (model.inputCost - model.openrouterInputCost).toFixed(6) }}
									</div>
								</div>
								<div>
									<span class="fw-bold">Profit Output:</span>
									<div><span class="math-inline">{{
											(model.outputCost - model.openrouterOutputCost).toFixed(6)
										}}</span></div>
								</div>
							</span>
						</td>
						<td>
							<div class="form-check form-switch">
								<input
									class="form-check-input"
									type="checkbox"
									:id="'status-' + model.id"
									:checked="model.status === 'active'"
									@change="toggleStatus(model)"
								/>
							</div>
						</td>
						<td>
							<div class="input-group input-group-sm">
								<button
									class="btn btn-outline-secondary"
									@click="updatePriority(model, -1)"
									:disabled="loading"
								>
									<Icon name="material-symbols:remove"/>
								</button>
								<input
									type="number"
									class="form-control text-center"
									style="max-width: 70px"
									v-model.number="model.priority"
									@change="updatePriority(model, 0)"
								/>
								<button
									class="btn btn-outline-secondary"
									@click="updatePriority(model, 1)"
									:disabled="loading"
								>
									<Icon name="material-symbols:add"/>
								</button>
							</div>
						</td>
						<td>
							<div class="form-check form-switch">
								<input
									class="form-check-input"
									type="checkbox"
									:id="'visibility-' + model.id"
									:checked="model.isVisible"
									@change="toggleVisibility(model)"
									:disabled="model.status === 'inactive'"
								/>
							</div>
						</td>
						<td>
							<div class="form-check form-switch">
								<input
									class="form-check-input"
									type="checkbox"
									:id="'featured-' + model.id"
									:checked="model.isFeatured"
									@change="toggleFeatured(model)"
									:disabled="!model.isVisible || model.status === 'inactive'"
								/>
							</div>
						</td>
						<td>
							<div class="form-check">
								<input
									class="form-check-input"
									type="checkbox"
									:id="'sandbox-' + model.id"
									:checked="model.sandbox"
									@change="toggleSandbox(model)"
								/>
							</div>
						</td>
						<td>
							<div class="btn-group btn-group-sm">
								<button class="btn btn-outline-primary" @click="openEditModal(model)">
									<Icon name="material-symbols:edit"/>
								</button>
								<button class="btn btn-outline-info" @click="openDetailsModal(model)">
									<Icon name="material-symbols:info"/>
								</button>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>

		<PlatformModal ref="editModalRef">
			<template #default="{ close }">
				<div class="p-3" v-if="editingModel">
					<h5 class="mb-4">Edit Model</h5>
					<form @submit.prevent="saveModel" class="needs-validation">
						<div class="mb-3">
							<label class="form-label">Name</label>
							<input type="text" class="form-control" v-model="editingModel.name" required/>
						</div>
						<div class="mb-3">
							<label class="form-label">Description</label>
							<textarea class="form-control" v-model="editingModel.description" rows="3"></textarea>
						</div>
						<div class="row g-3 mb-3">
							<div class="col-md-6">
								<label class="form-label">Input Cost</label>
								<div class="input-group">
									<span class="input-group-text"></span>
									<input
										type="number"
										step="0.000001"
										class="form-control"
										v-model="editingModel.inputCost"
										required
									/>
								</div>
							</div>
							<div class="col-md-6">
								<label class="form-label">Output Cost</label>
								<div class="input-group">
									<span class="input-group-text">$</span>
									<input
										type="number"
										step="0.000001"
										class="form-control"
										v-model="editingModel.outputCost"
										required
									/>
								</div>
							</div>
						</div>
						<div class="row g-3">
							<div class="col-md-4">
								<label class="form-label">Max Output</label>
								<input
									type="number"
									class="form-control"
									v-model="editingModel.maxOutput"
									required
								/>
							</div>
							<div class="col-md-4">
								<label class="form-label">Latency (ms)</label>
								<input
									type="number"
									step="0.01"
									class="form-control"
									v-model="editingModel.latency"
									required
								/>
							</div>
							<div class="col-md-4">
								<label class="form-label">Throughput</label>
								<input
									type="number"
									step="0.01"
									class="form-control"
									v-model="editingModel.throughput"
									required
								/>
							</div>
						</div>
					</form>

					<div class="d-flex justify-content-end gap-2 mt-3">
						<button type="button" class="btn btn-secondary" @click="close()">
							Cancel
						</button>
						<button type="button" class="btn btn-primary" @click="saveModel" :disabled="loading">
							Save Changes
						</button>
					</div>
				</div>
			</template>
		</PlatformModal>

		<PlatformModal ref="detailsModalRef">
			<template #default="{ close }">
				<div class="p-3">
					<h5 class="mb-4">Model Details</h5>

					<div v-if="selectedModel" class="model-details">
						<div class="card mb-3">
							<div class="card-header">
								<h6 class="mb-0">Basic Information</h6>
							</div>
							<div class="card-body">
								<dl class="row mb-0">
									<dt class="col-sm-4">Model ID</dt>
									<dd class="col-sm-8">{{ selectedModel.id }}</dd>
									<dt class="col-sm-4">Name</dt>
									<dd class="col-sm-8">{{ selectedModel.name }}</dd>
									<dt class="col-sm-4">Description</dt>
									<dd class="col-sm-8">{{ selectedModel.description }}</dd>
									<dt class="col-sm-4">OpenRouter ID</dt>
									<dd class="col-sm-8">{{ selectedModel.openrouterId }}</dd>
									<dt class="col-sm-4">Context Length</dt>
									<dd class="col-sm-8">{{ selectedModel.contextLength }}</dd>
									<dt class="col-sm-4">Model Type</dt>
									<dd class="col-sm-8">{{ selectedModel.modelType }}</dd>
									<dt class="col-sm-4">Max Output</dt>
									<dd class="col-sm-8">{{ selectedModel.maxOutput }}</dd>
									<dt class="col-sm-4">Latency</dt>
									<dd class="col-sm-8">{{ selectedModel.latency }}</dd>
									<dt class="col-sm-4">Throughput</dt>
									<dd class="col-sm-8">{{ selectedModel.throughput }}</dd>
									<dt class="col-sm-4">Status</dt>
									<dd class="col-sm-8">{{ selectedModel.status }}</dd>
									<dt class="col-sm-4">Created</dt>
									<dd class="col-sm-8">
										{{ new Date(selectedModel.created).toLocaleString() }}
									</dd>
									<dt class="col-sm-4">Modified</dt>
									<dd class="col-sm-8">
										{{ new Date(selectedModel.modified).toLocaleString() }}
									</dd>
									<dt class="col-sm-4">Sandbox</dt>
									<dd class="col-sm-8">{{ selectedModel.sandbox ? 'Yes' : 'No' }}</dd>
								</dl>
							</div>
						</div>

						<div class="card mb-3">
							<div class="card-header">
								<h6 class="mb-0">Pricing Information</h6>
							</div>
							<div class="card-body">
								<dl class="row mb-0">
									<dt class="col-sm-4">OpenRouter Input Cost</dt>
									<dd class="col-sm-8">
										${{ selectedModel.openrouterInputCost }}/1k tokens
									</dd>
									<dt class="col-sm-4">OpenRouter Output Cost</dt>
									<dd class="col-sm-8">
										${{ selectedModel.openrouterOutputCost }}/1k tokens
									</dd>
									<dt class="col-sm-4">Final Input Cost</dt>
									<dd class="col-sm-8">
										${{ selectedModel.inputCost }}/1k tokens
									</dd>
									<dt class="col-sm-4">Final Output Cost</dt>
									<dd class="col-sm-8">
										${{ selectedModel.outputCost }}/1k tokens
									</dd>
									<dt class="col-sm-4">Profit Input</dt>
									<dd class="col-sm-8">
										${
										(selectedModel.inputCost - selectedModel.openrouterInputCost).toFixed(6)
										}/1k tokens
									</dd>
									<dt class="col-sm-4">Profit Output</dt>
									<dd class="col-sm-8">
										${
										(selectedModel.outputCost - selectedModel.openrouterOutputCost).toFixed(6)
										}/1k tokens
									</dd>
								</dl>
							</div>
						</div>

						<div class="card">
							<div class="card-header">
								<h6 class="mb-0">Model Architecture</h6>
							</div>
							<div class="card-body">
                <pre class="bg-light p-3 rounded">
<code>{{ JSON.stringify(selectedModel.modelArchitecture, null, 2) }}</code>
                </pre>
							</div>
						</div>
					</div>

					<div class="d-flex justify-content-end mt-3">
						<button type="button" class="btn btn-secondary" @click="close()">
							Close
						</button>
					</div>
				</div>
			</template>
		</PlatformModal>
	</div>
</template>

<script setup>
	import {storeToRefs} from 'pinia';

	definePageMeta({
		layout: 'burrito',
	});

	// Store
	const chatStore = useChatStore();
	const {adminModels, loading, error} = storeToRefs(chatStore);
	const expandedDescriptions = ref({});
	// Refs para los modales
	const editModalRef = ref(null);
	const detailsModalRef = ref(null);

	// Estados locales
	const searchTerm = ref('');
	const activeFilter = ref('all');
	const editingModel = ref(null);
	const selectedModel = ref(null);
	const selectedModels = ref([]);
	const selectAll = ref(false);
	const selectedAction = ref('');
	const priorityValue = ref(null);
	const statusValue = ref('active');

	// Filtros
	const filters = [
		{label: 'All Models', value: 'all'},
		{label: 'Active', value: 'active'},
		{label: 'Visible', value: 'visible'},
		{label: 'Featured', value: 'featured'},
		{label: 'Inactive', value: 'inactive'},
	];

	/*
	   Computed para filtrar y ordenar modelos
	*/
	const filteredModels = computed(() => {
		let models = adminModels.value;

		models.forEach(model => {
			expandedDescriptions.value[model.id] = true;
		});

		// Filtro por búsqueda
		if (searchTerm.value) {
			const search = searchTerm.value.toLowerCase();
			models = models.filter(
				(model) =>
					model.name.toLowerCase().includes(search) ||
					model.description?.toLowerCase().includes(search)
			);
		}

		// Filtro por estado
		switch (activeFilter.value) {
			case 'active':
				models = models.filter((m) => m.status === 'active');
				break;
			case 'visible':
				models = models.filter((m) => m.isVisible);
				break;
			case 'featured':
				models = models.filter((m) => m.isFeatured);
				break;
			case 'inactive':
				models = models.filter((m) => m.status === 'inactive');
				break;
		}

		// Orden por prioridad descendente, luego alfabético
		return [...models].sort((a, b) => {
			if (a.priority !== b.priority) return b.priority - a.priority;
			return a.name.localeCompare(b.name);
		});
	});

	/*
	   onMounted:
	   1. Validamos si es Admin.
	   2. Si es Admin, cargamos los modelos.
	   3. Si NO, redireccionamos.
	*/
	onMounted(async () => {
		try {
			const response = await useBaseFetch('/admin/check');
			if (response.data.value && response.data.value.message === 'Allowed') {
				// Usuario con acceso administrador
				await chatStore.getAllModelsActive();
			} else {
				// Si no es Admin, redirecciona
				navigateTo('/not-allowed');
			}
		} catch (error) {
			console.error('Error checking admin access:', error);
			// Redirecciona si falla el check
			navigateTo('/not-allowed');
		}
	});

	/*
	   Función para sincronizar con OpenRouter
	*/
	const syncModels = async () => {
		try {
			await chatStore.syncWithOpenRouter();
			await chatStore.getAllModels();
		} catch (e) {
			console.error('Error syncing models:', e);
		}
	};

	/*
	   Sandbox
	*/
	const toggleSandbox = async (model) => {
		try {
			await chatStore.toggleSandbox(model.id);
		} catch (e) {
			console.error('Error toggling sandbox:', e);
		}
	};

	/*
	   Visibilidad
	*/
	const toggleVisibility = async (model) => {
		try {
			await chatStore.toggleModelVisibility(model.id);
		} catch (e) {
			console.error('Error toggling visibility:', e);
		}
	};

	/*
	   Destacado
	*/
	const toggleFeatured = async (model) => {
		try {
			await chatStore.toggleModelFeatured(model.id);
		} catch (e) {
			console.error('Error toggling featured status:', e);
		}
	};

	/*
	   Actualizar prioridad
	*/
	const updatePriority = async (model, change) => {
		try {
			const newPriority = change === 0 ? model.priority : model.priority + change;
			if (newPriority < 0) return; // Evitar valores negativos
			await chatStore.updateModelPriority(model.id, newPriority);
		} catch (e) {
			console.error('Error updating priority:', e);
		}
	};

	/*
	   Cambiar estatus (active/inactive)
	*/
	const toggleStatus = async (model) => {
		try {
			const newStatus = model.status === 'active' ? 'inactive' : 'active';
			await chatStore.updateModel(model.id, {status: newStatus});
		} catch (e) {
			console.error('Error toggling status:', e);
		}
	};

	/*
	   Abrir Modal de Edición
	   En lugar de showEditModal.value = true,
	   usamos ref y método openDialog() de platform-modal
	*/
	const openEditModal = (model) => {
		editingModel.value = {...model};
		editModalRef.value.openDialog(); // <<--- Abre el modal
	};

	/*
	   Abrir Modal de Detalles
	*/
	const openDetailsModal = (model) => {
		selectedModel.value = {...model};
		detailsModalRef.value.openDialog(); // <<--- Abre el modal
	};

	/*
	   Guardar cambios
	   (Se cierra el modal programáticamente al terminar)
	*/
	const saveModel = async () => {
		try {
			if (!editingModel.value) return;

			await chatStore.updateModel(editingModel.value.id, {
				name: editingModel.value.name,
				description: editingModel.value.description,
				inputCost: editingModel.value.inputCost,
				outputCost: editingModel.value.outputCost,
				maxOutput: editingModel.value.maxOutput,
				latency: editingModel.value.latency,
				throughput: editingModel.value.throughput,
			});

			// Cerrar modal
			editModalRef.value.closeDialog();
			editingModel.value = null;
		} catch (e) {
			console.error('Error saving model:', e);
		}
	};

	/*
	   Clase para el badge según el tipo de modelo
	*/
	const getModelTypeBadgeClass = (type) => {
		const classes = {
			'text->text': 'bg-primary',
			'text->image': 'bg-success',
			'image->text': 'bg-info',
			code: 'bg-warning text-dark',
		};
		return classes[type] || 'bg-secondary';
	};

	/*
	   Truncar texto largo
	*/
	const truncateText = (text, length) => {
		if (!text) return '';
		return text.length > length ? `${text.substring(0, length)}...` : text;
	};

	/*
	   Seleccionar/Deseleccionar todos
	*/
	const toggleSelectAll = () => {
		// No invertimos manualmente, Vue ya hace selectAll.value = true/false
		selectedModels.value = selectAll.value
			? filteredModels.value.map((model) => model.id)
			: [];
	};
	/*
	   Acción masiva (Bulk action)
	*/
	const performBulkAction = async () => {
		if (selectedModels.value.length === 0 || !selectedAction.value) return;

		let payload = {};
		switch (selectedAction.value) {
			case 'toggleVisibility': {
				const areMostModelsVisible =
					selectedModels.value.reduce((acc, modelId) => {
						const model = adminModels.value.find((m) => m.id === modelId);
						return acc + (model.isVisible ? 1 : 0);
					}, 0) > selectedModels.value.length / 2;
				payload = {isVisible: !areMostModelsVisible};
				break;
			}
			case 'toggleFeatured': {
				const areMostModelsFeatured =
					selectedModels.value.reduce((acc, modelId) => {
						const model = adminModels.value.find((m) => m.id === modelId);
						return acc + (model.isFeatured ? 1 : 0);
					}, 0) > selectedModels.value.length / 2;
				payload = {isFeatured: !areMostModelsFeatured};
				break;
			}
			case 'updatePriority':
				payload = {priority: priorityValue.value};
				break;
			case 'updateStatus':
				payload = {status: statusValue.value};
				break;
		}

		try {
			await chatStore.bulkAction(selectedAction.value, selectedModels.value, payload);
			await chatStore.getAllModels();

			// Reset
			selectedModels.value = [];
			selectAll.value = false;
			selectedAction.value = '';
			priorityValue.value = null;
			statusValue.value = 'active';
		} catch (e) {
			console.error('Error performing bulk action:', e);
		}
	};
</script>

<style scoped>
	/* Estilos opcionales si los necesitas */
</style>

<script setup lang="ts">

// Funding calculator
const amount = ref(0)
const selectedCurrency = ref('USD')
const currencies = ['USD', 'AVAX']

const getExchangeRate = () => {
	// Implementar lógica para obtener el tipo de cambio actual
	return 1 // Placeholder
}

const exchangeRate = computed(() => getExchangeRate())

const usdValue = computed(() => {
	if (selectedCurrency.value === 'USD') {
		return amount.value
	} else {
		return amount.value * exchangeRate.value
	}
})

const handleSubmit = () => {
	// Implementar lógica para manejar el envío del formulario
	console.log('Amount to fund:', amount.value, selectedCurrency.value)
	console.log('Value in USD:', usdValue.value)
}

// Dashboard
const activeTab = ref('funding')
const balanceTransactions = ref([])
const modelUsages = ref([])
const currentBalance = ref(0)

// Funciones para obtener datos (a implementar)
const fetchBalanceTransactions = async () => {
	// Implementar lógica para obtener las transacciones de balance
}

const fetchModelUsages = async () => {
	// Implementar lógica para obtener el uso de modelos
}

const fetchCurrentBalance = async () => {
	// Implementar lógica para obtener el balance actual
}

onMounted(async () => {
	await fetchCurrentBalance()
	await fetchBalanceTransactions()
	await fetchModelUsages()
})
</script>

<template>
	<div class="dashboard-container">
		<div class="card shadow-lg">
			<div class="card-body">
				<h2 class="card-title text-center mb-4">User Dashboard</h2>

				<div class="mb-4">
					<h4>Current Balance: ${{ currentBalance.toFixed(8) }}</h4>
				</div>

				<ul class="nav nav-tabs mb-3">
					<li class="nav-item">
						<a class="nav-link" :class="{ active: activeTab === 'funding' }"
						   @click.prevent="activeTab = 'funding'" href="#">
							Funding
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" :class="{ active: activeTab === 'payments' }"
						   @click.prevent="activeTab = 'payments'" href="#">
							Payment History
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" :class="{ active: activeTab === 'usage' }"
						   @click.prevent="activeTab = 'usage'" href="#">
							Token Usage
						</a>
					</li>
				</ul>

				<div v-if="activeTab === 'funding'" class="tab-content">
					<h3 class="mb-3">Funding Calculator</h3>
					<form @submit.prevent="handleSubmit">
						<div class="mb-3">
							<label for="amount" class="form-label">Amount to Fund</label>
							<div class="input-group">
								<input
									type="number"
									class="form-control"
									id="amount"
									v-model="amount"
									min="0"
									step="0.01"
									required
								>
								<select
									class="form-select"
									v-model="selectedCurrency"
								>
									<option v-for="currency in currencies" :key="currency" :value="currency">
										{{ currency }}
									</option>
								</select>
							</div>
						</div>
						<div class="mb-4">
							<label class="form-label">Value in USD</label>
							<div class="input-group">
								<span class="input-group-text">$</span>
								<input
									type="text"
									class="form-control"
									:value="usdValue.toFixed(2)"
									readonly
								>
							</div>
						</div>
						<button type="submit" class="btn btn-primary w-100">Fund</button>
					</form>
				</div>

				<div v-if="activeTab === 'payments'" class="tab-content">
					<h3 class="mb-3">Payment History</h3>
					<div class="table-responsive">
						<table class="table table-striped">
							<thead>
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Type</th>
								<th>Description</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="transaction in balanceTransactions" :key="transaction.id">
								<td>{{ new Date(transaction.created).toLocaleString() }}</td>
								<td>{{ transaction.amount }}</td>
								<td>{{ transaction.type }}</td>
								<td>{{ transaction.description }}</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div v-if="activeTab === 'usage'" class="tab-content">
					<h3 class="mb-3">Token Usage</h3>
					<div class="table-responsive">
						<table class="table table-striped">
							<thead>
							<tr>
								<th>Date</th>
								<th>Model</th>
								<th>Tokens Used</th>
								<th>Cost</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="usage in modelUsages" :key="usage.id">
								<td>{{ new Date(usage.created).toLocaleString() }}</td>
								<td>{{ usage.aiModel.name }}</td>
								<td>{{ usage.tokensUsed }}</td>
								<td>{{ usage.cost }}</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="sass">
.dashboard-container
	max-width: 800px
	margin: 2rem auto

.card
	border-radius: 1rem
	overflow: hidden

.card-title
	color: #333
	font-weight: bold

.nav-tabs
	border-bottom: 2px solid #dee2e6

.nav-link
	color: #495057
	cursor: pointer

	&.active
		color: #007bff
		border-bottom: 2px solid #007bff

.tab-content
	padding-top: 1rem

.table
	th, td
		vertical-align: middle

.form-control, .form-select, .btn
	border-radius: 0.5rem

.btn-primary
	background-color: #007bff
	border-color: #007bff
	font-weight: bold
	transition: all 0.3s ease

	&:hover
		background-color: #0056b3
		border-color: #0056b3
		transform: translateY(-2px)
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

.input-group-text
	background-color: #f8f9fa
	color: #495057
	font-weight: bold

@media (max-width: 576px)
	.table-responsive
		font-size: 0.9rem
</style>
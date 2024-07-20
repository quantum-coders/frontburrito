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
				<h2 class="card-title text-center mb-4">
					<Icon name="mdi:account-circle" class="me-2"/>
					User Dashboard
				</h2>

				<div class="mb-4 p-3 bg-light rounded">
					<h4 class="mb-0">
						<Icon name="mdi:wallet" class="me-2"/>
						Current Balance:
						<span class="fw-bold text-primary">${{ currentBalance.toFixed(8) }}</span>
					</h4>
				</div>

				<ul class="nav nav-pills mb-4 justify-content-center">
					<li class="nav-item">
						<a class="nav-link" :class="{ active: activeTab === 'funding' }"
						   @click.prevent="activeTab = 'funding'" href="#">
							<Icon name="mdi:cash-plus" class="me-1"/>
							Funding
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" :class="{ active: activeTab === 'payments' }"
						   @click.prevent="activeTab = 'payments'" href="#">
							<Icon name="mdi:history" class="me-1"/>
							Payment History
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" :class="{ active: activeTab === 'usage' }"
						   @click.prevent="activeTab = 'usage'" href="#">
							<Icon name="mdi:chart-bar" class="me-1"/>
							Token Usage
						</a>
					</li>
				</ul>

				<div v-if="activeTab === 'funding'" class="tab-content">
					<h3 class="mb-3">
						<Icon name="mdi:calculator" class="me-2"/>
						Funding Calculator
					</h3>
					<form @submit.prevent="handleSubmit">
						<div class="mb-3">
							<label for="amount" class="form-label">Amount to Fund</label>
							<div class="input-group">
                <span class="input-group-text">
                  <Icon name="mdi:currency-usd"/>
                </span>
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
						<button type="submit" class="btn btn-primary w-100">
							<Icon name="mdi:cash-plus" class="me-2"/>
							Fund Account
						</button>
					</form>
				</div>

				<div v-if="activeTab === 'payments'" class="tab-content">
					<h3 class="mb-3">
						<Icon name="mdi:history" class="me-2"/>
						Payment History
					</h3>
					<div class="table-responsive">
						<table class="table table-hover">
							<thead class="table-light">
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Type</th>
								<th>Description</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="transaction in balanceTransactions" :key="transaction.id">
								<td>
									<Icon name="mdi:calendar" class="me-1"/>
									{{ new Date(transaction.created).toLocaleString() }}
								</td>
								<td>
									<Icon name="mdi:currency-usd" class="me-1"/>
									{{ transaction.amount }}
								</td>
								<td>
                    <span
	                    :class="{'text-success': transaction.type === 'credit', 'text-danger': transaction.type === 'debit'}">
                      <Icon :name="transaction.type === 'credit' ? 'mdi:arrow-up-bold' : 'mdi:arrow-down-bold'"
                            class="me-1"/>
                      {{ transaction.type }}
                    </span>
								</td>
								<td>{{ transaction.description }}</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div v-if="activeTab === 'usage'" class="tab-content">
					<h3 class="mb-3">
						<Icon name="mdi:chart-bar" class="me-2"/>
						Token Usage
					</h3>
					<div class="table-responsive">
						<table class="table table-hover">
							<thead class="table-light">
							<tr>
								<th>Date</th>
								<th>Model</th>
								<th>Tokens Used</th>
								<th>Cost</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="usage in modelUsages" :key="usage.id">
								<td>
									<Icon name="mdi:calendar" class="me-1"/>
									{{ new Date(usage.created).toLocaleString() }}
								</td>
								<td>
									<Icon name="mdi:robot" class="me-1"/>
									{{ usage.aiModel.name }}
								</td>
								<td>
									<Icon name="mdi:counter" class="me-1"/>
									{{ usage.tokensUsed }}
								</td>
								<td>
									<Icon name="mdi:currency-usd" class="me-1"/>
									{{ usage.cost }}
								</td>
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
	transition: box-shadow 0.3s ease

	&:hover
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1)

.nav-pills
	.nav-link
		transition: all 0.3s ease

		&:hover
			transform: translateY(-2px)

.table
	th, td
		vertical-align: middle

@media (max-width: 576px)
	.table-responsive
		font-size: 0.9rem
</style>
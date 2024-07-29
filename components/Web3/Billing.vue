<template>
	<div class="dashboard-container">
		<div class="card shadow-lg">
			<div class="card-body">
				<h2 class="card-title text-center mb-4">
					<Icon name="mdi:account-circle" class="me-2"/>
					User Dashboard
				</h2>

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
				</ul>

				<div v-if="activeTab === 'funding'" class="tab-content">
					<h3 class="mb-3">
						<Icon name="mdi:calculator" class="me-2"/>
						Funding Calculator
					</h3>
					<p class="text-center">
						<Icon name="mdi:currency-usd" class="me-1"/>
						Current AVAX Price: ${{ exchangeRate.toFixed(2) }}
					</p>
					<form @submit.prevent="handleSubmit">
						<div class="mb-3">
							<label for="amount" class="form-label">Amount to Fund</label>
							<div class="input-group">
                <span class="input-group-text">
                  <Icon name="mdi:currency-usd"/>
                </span>
								<input type="number" class="form-control" id="amount" v-model="amount" min="0"
								       step="0.01" required/>
								<select class="form-select" v-model="selectedCurrency">
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
								<input type="text" class="form-control" :value="usdValue.toFixed(2)" readonly/>
							</div>
						</div>
						<div v-if="messageForUser" class="alert alert-info">
							{{ messageForUser }}
						</div>
						<button type="submit" class="btn btn-primary w-100" :disabled="loadingState">
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
								<th>AVAX Amount</th>
								<th>USDT Amount</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="transaction in paymentHistory" :key="transaction.timestamp">
								<td>
									<Icon name="mdi:calendar" class="me-1"/>
									{{ new Date(transaction.timestamp).toLocaleString() }}
								</td>
								<td>
									<Icon name="mdi:currency-usd" class="me-1"/>
									{{ transaction.avaxAmount }} AVAX
								</td>
								<td>
									{{ transaction.usdtAmount }} USDT
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

<script setup>

const {successToast, errorToast} = usePrettyToast();

const amount = ref(0);
const selectedCurrency = ref('USD');
const currencies = ['USD', 'AVAX'];
const activeTab = ref('funding');
const paymentHistory = ref([]);
const loadingState = ref(false);
const cryptoStore = useCryptoStore();
const messageForUser = ref('');
const getExchangeRate = async () => {
	try {
		return await cryptoStore.getAvaxPrice();
	} catch (error) {
		console.error('Error fetching exchange rate:', error);
		return 0;
	}
};

const syncBalances = async () => {
	/// route = '/synchronize-payment-history'
	const {data } = await useBaseFetch('/web3/synchronize-payment-history');
	console.log("SYNC BALANCES: ", data.value.data);
};

const exchangeRate = ref(0);

onMounted(async () => {
	exchangeRate.value = await getExchangeRate();
	await syncBalances();
	await fetchPaymentHistory();
});

const usdValue = computed(() => {
	if (selectedCurrency.value === 'USD') {
		return amount.value;
	} else {
		return amount.value * exchangeRate.value;
	}
});


const handleSubmit = async () => {
	loadingState.value = true;
	messageForUser.value = '';
	try {
		const {data} = await useBaseFetch(`/web3/build-record-payment-transaction/${cryptoStore.currentAccount}`, {
			method: 'POST',
			body: {
				avaxAmount: selectedCurrency.value === 'AVAX' ? amount.value : 0,
				usdtAmount: selectedCurrency.value === 'USD' ? usdValue.value : 0
			}
		});

		if (data.value.data) {
			const recordPaymentTx = data.value.data
			console.log("RECORD TX_: ", recordPaymentTx);
			const signedTx = await cryptoStore.globalProvider.getSigner().sendTransaction(recordPaymentTx);
			const tx1 = await signedTx.wait(3);
			console.log("TX1: ", tx1);
			if (tx1.status == 1) {
				/// obtain the amount in USD
				const amountInUSD = selectedCurrency.value === 'USD' ? amount.value : amount.value * exchangeRate.value;
				successToast(`Funding of ${amount.value} ${selectedCurrency.value} successful!`);
				messageForUser.value = `Funded account with ${amountInUSD.toFixed(2)} USD, if you don't see the transaction, please wait a few seconds and refresh the page.`
			} else {
				errorToast(`Error funding account: ${tx1}`);
			}
			await fetchPaymentHistory();
		} else {
			throw new Error('Error building record payment transaction');
		}
	} catch (error) {
		errorToast(`Error funding account: ${error.message}`);
	} finally {
		loadingState.value = false;
		messageForUser.value = '';
		await syncBalances();
	}
};

const fetchPaymentHistory = async () => {
	try {
		const {data} = await useBaseFetch(`/web3/payment-history/${cryptoStore.currentAccount}`, {
			method: 'GET'
		});

		if (data.value.data) {
			paymentHistory.value = data.value.data;
		} else {
			throw new Error('Error fetching payment history');
		}
	} catch (error) {
		console.error('Error fetching payment history:', error);
	}
};
</script>

<style scoped>
.dashboard-container {
	max-width: 900px;
	margin: 0 auto;
	padding: 20px;
}

.card {
	border-radius: 10px;
}

.card-title {
	font-size: 1.5rem;
	font-weight: bold;
}

.nav-pills .nav-link {
	cursor: pointer;
}

.nav-pills .nav-link.active {
	background-color: #007bff;
	color: white;
}

.table-responsive {
	margin-top: 20px;
}

.table-hover tbody tr:hover {
	background-color: #f1f1f1;
}
</style>

<template>
	<div class="dashboard-container">
		<a class="close" @click.prevent="close">
			<icon name="material-symbols:close"/>
		</a>

		<div class="card-title">
			<div class="burrito-wrapper">
				<img class="burrito" src="/images/elegant-burrito.png" alt="">
			</div>
			<h5 class="mb-0">User Dashboard</h5>

			<ul class="nav nav-pills justify-content-center">
				<li class="nav-item">
					<a
						href="#"
						class="nav-link"
						:class="{ active: activeTab === 'funding' }"
						@click.prevent="activeTab = 'funding'"
					>
						<icon name="mdi:cash-plus" class="me-1"/>
						Funding
					</a>
				</li>
				<li class="nav-item">
					<a
						href="#"
						class="nav-link"
						:class="{ active: activeTab === 'payments' }"
						@click.prevent="activeTab = 'payments'"
					>
						<icon name="mdi:history" class="me-1"/>
						History
					</a>
				</li>
			</ul>
		</div>

		<div v-if="activeTab === 'funding'" class="tab-content tab-funding">
			<form @submit.prevent="handleSubmit">
				<div class="p-3">
					<div class="d-flex align-items-center justify-content-between">
						<p class="text-center">
							<icon name="mdi:currency-usd"/>
							Current AVAX Price: ${{ exchangeRate.toFixed(2) }} USD
						</p>
					</div>

					<div class="mb-3">
						<label for="amount" class="form-label">
							Amount to Fund
							<small class="text-muted">(Minimum fund amount is 13 USD)</small>
						</label>
						<div class="input-group">
							<span class="input-group-text">
								<icon name="mdi:currency-usd"/>
							</span>
							<input
								type="number" class="form-control" id="amount" v-model="amount" min="0"
								step="0.01" required
							/>
							<select class="form-select" v-model="selectedCurrency">
								<option v-for="currency in currencies" :key="currency" :value="currency">
									{{ currency }}
								</option>
							</select>
						</div>
						<small class="text-muted flex-grow-1 ms-2">
							{{ parseFloat(cryptoStore.avaxBalance || 0).toFixed(4) }} AVAX
							{{ parseFloat(cryptoStore.usdtBalance || 0).toFixed(4) }} USDT
						</small>
						<small
							class="text-danger"
							v-if="selectedCurrency === 'USD' && parseFloat(cryptoStore.usdtBalance || 0) < amount"
						>
							Insufficient balance
						</small>
						<small
							class="text-danger"
							v-else-if="selectedCurrency === 'AVAX' && parseFloat(cryptoStore.avaxBalance || 0) < amount"
						>
							Insufficient balance
						</small>
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
				</div>
				<button type="submit" class="btn btn-burrito w-100" :disabled="loadingState">
					<icon name="mdi:cash-plus" class="me-2"/>
					Fund Account
				</button>
			</form>
		</div>

		<div v-if="activeTab === 'payments'" class="tab-content p-3">
			<h5 class="mb-3">
				<icon name="mdi:history"/>
				Payment History
			</h5>
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
							<icon name="mdi:calendar" class="me-1"/>
							{{ new Date(transaction.timestamp).toLocaleString() }}
						</td>
						<td>
							<icon name="mdi:currency-usd" class="me-1"/>
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
</template>

<script setup>

	const {successToast, errorToast} = usePrettyToast();

	const props = defineProps({
		close: {
			type: Function,
			default: () => {
			},
		},
	});

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
		try {
			const {data} = await useBaseFetch('/web3/synchronize-payment-history');
			// console.log('SYNC BALANCES: ', data.value.data);
		} catch (error) {
			console.error('Error syncing balances:', error);
		}
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
					usdtAmount: selectedCurrency.value === 'USD' ? usdValue.value : 0,
				},
			});

			if (data.value.data) {
				const recordPaymentTx = data.value.data;
				console.log('RECORD TX_: ', recordPaymentTx);
				const signedTx = await cryptoStore.globalProvider.getSigner().sendTransaction(recordPaymentTx);
				const tx1 = await signedTx.wait(3);
				console.log('TX1: ', tx1);
				if (tx1.status == 1) {
					/// obtain the amount in USD
					const amountInUSD = selectedCurrency.value === 'USD' ? amount.value : amount.value * exchangeRate.value;
					successToast(`Funding of ${amount.value} ${selectedCurrency.value} successful!`);
					messageForUser.value = `Funded account with ${amountInUSD.toFixed(2)} USD, if you don't see the transaction, please wait a few seconds and refresh the page.`;
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
				method: 'GET',
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

<style lang="sass" scoped>
	.dashboard-container
		width: 900px
		max-width: 100%
		margin: 0 auto

		.close
			color: $complement
			width: 2rem
			aspect-ratio: 1
			display: flex
			justify-content: center
			align-items: center
			position: absolute
			right: -0.75rem
			top: -0.75rem
			border-radius: 0.25rem
			background: $brand1
			cursor: pointer
			z-index: 2

	.card-title
		border-bottom: 1px solid rgba($brand1, 0.25)
		display: flex
		flex-direction: column

		@media (min-width: $sm)
			flex-direction: row
			align-items: center
			justify-content: space-between
			padding: 1rem 1rem 1rem 0

		h5
			font-family: Chibold, sans-serif
			font-size: 2rem
			color: $brand1
			padding-left: 80px

		.burrito-wrapper
			position: absolute
			overflow: hidden
			width: 80px
			height: 95px
			top: -18px

			@media (min-width: $sm)
				top: auto
				bottom: 0

			.burrito
				image-rendering: pixelated
				position: absolute
				top: 0
				width: 80px

	.nav-pills
		border-top: 1px solid rgba($brand1, 0.25)
		justify-content: stretch !important

		@media (min-width: $sm)
			border-top: 0

		.nav-item
			flex-basis: 50%
			text-align: center

			.nav-link
				cursor: pointer
				font-size: 0.875rem
				border-radius: 0

				@media (min-width: $sm)
					font-size: 1rem
					border-radius: 0.25rem

	.nav-pills .nav-link.active
		background-color: $brand1
		color: white

	.table-responsive
		margin-top: 20px

	.table-hover tbody tr:hover
		background-color: #f1f1f1

	.input-group
		width: auto

		.input-group-text, .form-control, .form-select
			border-color: $brand1
			border-width: 2px
			box-shadow: 0 0.5em 0 $brand1
			margin-bottom: 0.5em

	.tab-funding
		.btn-burrito
			font-family: 'Chibold', sans-serif
			font-size: 1.5rem
			padding: 0.5rem 0
			border: 0
			border-top: 2px solid $brand1
			border-radius: 0 0 0.25rem 0.25rem

			&:hover
				background: $brand2
				color: white
</style>

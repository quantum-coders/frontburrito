<template>
	<div class="container mt-5">
		<h1 class="text-center mb-4">Staking & DefiBilling Analytics</h1>

		<div class="row mb-4">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header bg-success text-white">
						<h5 class="mb-0">DefiBilling Stats</h5>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-md-4 mb-3">
								<div class="card h-100 border-success">
									<div
										class="card-body d-flex flex-column justify-content-center align-items-center">
										<h6 class="card-title text-success">AVAX Balance</h6>
										<p class="card-text display-4" v-if="defiBillingStats">
											{{ defiBillingStats.avaxBalance }}
										</p>
									</div>
								</div>
							</div>
							<div class="col-md-4 mb-3">
								<div class="card h-100 border-success">
									<div
										class="card-body d-flex flex-column justify-content-center align-items-center">
										<h6 class="card-title text-success">USDT Balance</h6>
										<p class="card-text display-4" v-if="defiBillingStats">
											{{ defiBillingStats.usdtBalance }}
										</p>
									</div>
								</div>
							</div>
							<div class="col-md-4 mb-3">
								<div class="card h-100 border-success">
									<div
										class="card-body d-flex flex-column justify-content-center align-items-center">
										<h6 class="card-title text-success">Minimum Deposit (USD)</h6>
										<p class="card-text display-4" v-if="defiBillingStats">
											{{ defiBillingStats.minDepositUsd }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script setup>
	import {useDateFormat} from '@vueuse/core';


	const defiBillingStats = ref(null);
	const defiBillingUserStats = ref(null);
	const defiBillingPaymentHistory = ref([]);
	const userAddress = ref('0x1234567890abcdef1234567890abcdef12345678');

	const formatTimestamp = (timestamp) => {
		return useDateFormat(timestamp, 'YYYY-MM-DD HH:mm:ss').value;
	};

	const fetchData = async (endpoint, options = {}) => {
		const {data, error} = await useBaseFetch(endpoint, options);
		if (error.value) {
			console.error(`Error fetching ${endpoint}:`, error.value);
			return null;
		}
		return data.value.data;
	};

	onMounted(async () => {
		defiBillingStats.value = await fetchData('/analytics/defibilling-stats');
		defiBillingUserStats.value = await fetchData(`/analytics/defibilling/user/${userAddress.value}/stats`);
		defiBillingPaymentHistory.value = await fetchData(`/analytics/defibilling/user/${userAddress.value}/payments`);
	});
</script>

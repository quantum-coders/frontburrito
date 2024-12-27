<template>
	<div class="container mt-5">
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<button
					class="nav-link"
					:class="{ active: topTab === 'staking' }"
					@click="topTab = 'staking'"
				>
					Staking Analytics
				</button>
			</li>
			<li class="nav-item">
				<button
					class="nav-link"
					:class="{ active: topTab === 'defi' }"
					@click="topTab = 'defi'"
				>
					Defi Billing
				</button>
			</li>
		</ul>

		<div class="tab-content" id="mainTabsContent">
			<div
				class="tab-pane fade"
				:class="{ 'show active': topTab === 'staking' }"
				id="stakingAnalytics"
				role="tabpanel"
			>
				<h1 class="text-center mb-4">Staking Analytics</h1>
				<div class="row mb-4">
					<div class="col-md-12">
						<div class="card">
							<div class="card-header bg-primary text-white">
								<h5 class="mb-0">Staking Metrics Snapshots</h5>
							</div>
							<div class="card-body">
								<ul class="nav nav-tabs" id="metricsTab" role="tablist">
									<li class="nav-item" role="presentation">
										<button
											class="nav-link"
											:class="{ active: activeTab === 'staking' }"
											id="staking-tab"
											@click="activeTab = 'staking'"
											type="button"
											role="tab"
											aria-controls="staking"
											:aria-selected="activeTab === 'staking'"
										>
											Staking
										</button>
									</li>
									<li class="nav-item" role="presentation">
										<button
											class="nav-link"
											:class="{ active: activeTab === 'tvl' }"
											id="tvl-tab"
											@click="activeTab = 'tvl'"
											type="button"
											role="tab"
											aria-controls="tvl"
											:aria-selected="activeTab === 'tvl'"
										>
											TVL History
										</button>
									</li>
									<li class="nav-item" role="presentation">
										<button
											class="nav-link"
											:class="{ active: activeTab === 'apr' }"
											id="apr-tab"
											@click="activeTab = 'apr'"
											type="button"
											role="tab"
											aria-controls="apr"
											:aria-selected="activeTab === 'apr'"
										>
											APR History
										</button>
									</li>
								</ul>
								<div class="tab-content" id="metricsTabContent">
									<div
										class="tab-pane fade"
										:class="{ 'show active': activeTab === 'staking' }"
										id="staking"
										role="tabpanel"
										aria-labelledby="staking-tab"
									>
										<div class="row mb-4" v-if="activeTab === 'staking'">
											<div class="col-md-12">
												<div class="card">
													<div class="card-header bg-primary text-white">
														<h5 class="mb-0">Staking Stats</h5>
													</div>
													<div class="card-body">
														<div class="row">
															<div class="col-md-4 mb-3">
																<div class="card h-100 border-primary">
																	<div
																		class="card-body d-flex flex-column justify-content-center align-items-center"
																	>
																		<h6 class="card-title text-primary">
																			Total Staked
																		</h6>
																		<p
																			class="card-text display-4"
																			v-if="stakingStats"
																		>
																			{{ stakingStats.totalStaked }}
																		</p>
																	</div>
																</div>
															</div>
															<div class="col-md-4 mb-3">
																<div class="card h-100 border-primary">
																	<div
																		class="card-body d-flex flex-column justify-content-center align-items-center"
																	>
																		<h6 class="card-title text-primary">
																			Total Stakers
																		</h6>
																		<p
																			class="card-text display-4"
																			v-if="stakingStats"
																		>
																			{{ stakingStats.totalStakers }}
																		</p>
																	</div>
																</div>
															</div>
															<div class="col-md-4 mb-3">
																<div class="card h-100 border-primary">
																	<div
																		class="card-body d-flex flex-column justify-content-center align-items-center"
																	>
																		<h6 class="card-title text-primary">TVL</h6>
																		<p
																			class="card-text display-4"
																			v-if="stakingStats"
																		>
																			{{ stakingStats.tvl }}
																		</p>
																	</div>
																</div>
															</div>
															<div class="col-md-4 mb-3">
																<div class="card h-100 border-primary">
																	<div
																		class="card-body d-flex flex-column justify-content-center align-items-center"
																	>
																		<h6 class="card-title text-primary">
																			Monthly APR
																		</h6>
																		<p
																			class="card-text display-4"
																			v-if="stakingStats"
																		>
																			{{ stakingStats.monthlyAPR }}
																		</p>
																	</div>
																</div>
															</div>
															<div class="col-md-4 mb-3">
																<div class="card h-100 border-primary">
																	<div
																		class="card-body d-flex flex-column justify-content-center align-items-center"
																	>
																		<h6 class="card-title text-primary">
																			Annual APR
																		</h6>
																		<p
																			class="card-text display-4"
																			v-if="stakingStats"
																		>
																			{{ stakingStats.annualAPR }}
																		</p>
																	</div>
																</div>
															</div>
															<div class="col-md-4 mb-3">
																<div class="card h-100 border-primary">
																	<div
																		class="card-body d-flex flex-column justify-content-center align-items-center"
																	>
																		<h6 class="card-title text-primary">
																			Available Rewards
																		</h6>
																		<p
																			class="card-text display-4"
																			v-if="stakingStats"
																		>
																			{{ stakingStats.availableRewards }}
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div class="row mb-4" v-if="activeTab === 'staking'">
											<div class="col-md-12">
												<div class="card">
													<div class="card-header bg-primary text-white">
														<h5 class="mb-0">Stakers</h5>
													</div>
													<div class="card-body">
														<table class="table table-striped table-hover">
															<thead class="table-primary">
															<tr>
																<th scope="col">Wallet Address</th>
																<th scope="col">Currently Staked</th>
															</tr>
															</thead>
															<tbody>
															<tr
																v-for="staker in stakers"
																:key="staker.walletAddress"
															>
																<td>
																	<a
																		:href="`https://snowtrace.io/address/${staker.walletAddress}`"
																		target="_blank"
																	>
																		{{ staker.walletAddress }}
																	</a>
																</td>
																<td>{{ staker.currentlyStaked }}</td>
															</tr>
															<tr v-if="stakers.length === 0">
																<td colspan="2" class="text-center">
																	No data available
																</td>
															</tr>
															</tbody>
														</table>
														<nav aria-label="Page navigation">
															<ul class="pagination justify-content-center">
																<li
																	class="page-item"
																	:class="{ disabled: currentPage === 1 }"
																>
																	<a
																		class="page-link"
																		href="#"
																		@click.prevent="changePage(currentPage - 1)"
																	>Previous</a
																	>
																</li>
																<li
																	v-for="page in totalPages"
																	:key="page"
																	class="page-item"
																	:class="{ active: currentPage === page }"
																>
																	<a
																		class="page-link"
																		href="#"
																		@click.prevent="changePage(page)"
																	>{{ page }}</a
																	>
																</li>
																<li
																	class="page-item"
																	:class="{ disabled: currentPage === totalPages }"
																>
																	<a
																		class="page-link"
																		href="#"
																		@click.prevent="changePage(currentPage + 1)"
																	>Next</a
																	>
																</li>
															</ul>
														</nav>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										class="tab-pane fade"
										:class="{ 'show active': activeTab === 'tvl' }"
										id="tvl"
										role="tabpanel"
										aria-labelledby="tvl-tab"
										v-if="activeTab === 'tvl'"
									>
										<table class="table table-striped table-hover mt-3">
											<thead class="table-primary">
											<tr>
												<th scope="col">Timestamp</th>
												<th scope="col">TVL</th>
											</tr>
											</thead>
											<tbody>
											<tr
												v-for="item in stakingMetrics.tvlHistory"
												:key="item.timestamp"
											>
												<td>{{ formatTimestamp(item.timestamp) }}</td>
												<td>{{ item.tvl }}</td>
											</tr>
											<tr v-if="stakingMetrics.tvlHistory.length === 0">
												<td colspan="2" class="text-center">
													No data available
												</td>
											</tr>
											</tbody>
										</table>
									</div>
									<div
										class="tab-pane fade"
										:class="{ 'show active': activeTab === 'apr' }"
										id="apr"
										role="tabpanel"
										aria-labelledby="apr-tab"
										v-else-if="activeTab === 'apr'"
									>
										<table class="table table-striped table-hover mt-3">
											<thead class="table-primary">
											<tr>
												<th scope="col">Timestamp</th>
												<th scope="col">Monthly APR</th>
												<th scope="col">Annual APR</th>
											</tr>
											</thead>
											<tbody>
											<tr
												v-for="item in stakingMetrics.aprHistory"
												:key="item.timestamp"
											>
												<td>{{ formatTimestamp(item.timestamp) }}</td>
												<td>{{ item.monthlyAPR }}</td>
												<td>{{ item.annualAPR }}</td>
											</tr>
											<tr v-if="stakingMetrics.aprHistory.length === 0">
												<td colspan="3" class="text-center">
													No data available
												</td>
											</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-4">
					<div class="col-md-12">
						<div class="card">
							<div class="card-header bg-primary text-white">
								<h5 class="mb-0">
									Staking Snapshots (Limit: 24, Offset: 0)
								</h5>
							</div>
							<div class="card-body">
								<table class="table table-striped table-hover">
									<thead class="table-primary">
									<tr>
										<th scope="col">ID</th>
										<th scope="col">Timestamp</th>
										<th scope="col">Total Staked</th>
										<th scope="col">Total Stakers</th>
										<th scope="col">Monthly APR</th>
										<th scope="col">Annual APR</th>
										<th scope="col">TVL</th>
										<th scope="col">Available Rewards</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="snapshot in stakingSnapshots" :key="snapshot.id">
										<td>{{ snapshot.id }}</td>
										<td>{{ formatTimestamp(snapshot.timestamp) }}</td>
										<td>{{ snapshot.totalStaked }}</td>
										<td>{{ snapshot.totalStakers }}</td>
										<td>{{ snapshot.monthlyAPR }}</td>
										<td>{{ snapshot.annualAPR }}</td>
										<td>{{ snapshot.tvl }}</td>
										<td>{{ snapshot.availableRewards }}</td>
									</tr>
									<tr v-if="stakingSnapshots.length === 0">
										<td colspan="8" class="text-center">
											No data available
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-4">
					<div class="col-md-12">
						<div class="card">
							<div class="card-header bg-primary text-white">
								<h5 class="mb-0">Create Manual Snapshot</h5>
							</div>
							<div class="card-body">
								<button
									class="btn btn-primary"
									@click="createManualSnapshot"
									:disabled="loadingSnapshot"
								>
                  <span
					  v-if="loadingSnapshot"
					  class="spinner-border spinner-border-sm"
					  role="status"
					  aria-hidden="true"
				  ></span>
									<span v-else>Create Snapshot</span>
								</button>
								<div
									v-if="snapshotCreationResult"
									class="mt-3 alert"
									:class="snapshotCreationResult.success ? 'alert-success' : 'alert-danger'"
								>
									{{ snapshotCreationResult.message }}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-4">
					<div class="col-md-12">
						<div class="card">
							<div class="card-header bg-primary text-white">
								<h5 class="mb-0">Process Historical Data</h5>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-md-4 mb-3">
										<label for="fromBlock" class="form-label">From Block</label>
										<input
											type="number"
											class="form-control"
											id="fromBlock"
											v-model="fromBlock"
										/>
									</div>
									<div class="col-md-4 mb-3">
										<label for="toBlock" class="form-label">To Block</label>
										<input
											type="number"
											class="form-control"
											id="toBlock"
											v-model="toBlock"
										/>
									</div>
									<div class="col-md-4 mb-3 d-flex align-items-end">
										<button
											class="btn btn-primary"
											@click="processHistoricalData"
											:disabled="loadingHistorical"
										>
                      <span
						  v-if="loadingHistorical"
						  class="spinner-border spinner-border-sm"
						  role="status"
						  aria-hidden="true"
					  ></span>
											<span v-else>Process Data</span>
										</button>
									</div>
								</div>
								<div
									v-if="historicalDataResult"
									class="mt-3 alert"
									:class="historicalDataResult.success ? 'alert-success' : 'alert-danger'"
								>
									{{ historicalDataResult.message }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="tab-pane fade"
				:class="{ 'show active': topTab === 'defi' }"
				id="defiBilling"
				role="tabpanel"
			>
				<h1 class="text-center mb-4">Defi Billing</h1>
				<web3-defi-stats/>
			</div>
		</div>
	</div>
</template>


<script setup>
	import {useDateFormat} from '@vueuse/core';

	const stakingStats = ref(null);
	const stakers = ref([]);
	const stakingMetrics = ref({tvlHistory: [], aprHistory: []});
	const userAnalytics = ref({});
	const userTransactions = ref([]);
	const topTab = ref('staking');
	const stakingSnapshots = ref([]);
	const loadingSnapshot = ref(false);
	const snapshotCreationResult = ref(null);
	const activeTab = ref('tvl');

	// Paginación
	const currentPage = ref(1);
	const pageSize = ref(10); // Puedes ajustar el tamaño de la página
	const totalPages = ref(1);

	// Historial
	const fromBlock = ref(null);
	const toBlock = ref(null);
	const loadingHistorical = ref(false);
	const historicalDataResult = ref(null);

	// Utilizando useBaseFetch directamente
	const fetchData = async (endpoint, options = {}) => {
		const {data, error} = await useBaseFetch(endpoint, options);
		if (error.value) {
			console.error(`Error fetching ${endpoint}:`, error.value);
			return null;
		}
		return data.value.data;
	};

	onMounted(async () => {
		stakingStats.value = await fetchData('/analytics/staking-stats');
		// Carga inicial de stakers con paginación
		await fetchStakers();
		stakingMetrics.value = await fetchData('/analytics/staking-metrics?startDate=2024-01-01&endDate=2024-12-31');
		userAnalytics.value = await fetchData('/analytics/user/0x1234567890abcdef1234567890abcdef12345678');
		userTransactions.value = await fetchData('/analytics/user/0x1234567890abcdef1234567890abcdef12345678/transactions?limit=10&offset=0&type=stake');
		stakingSnapshots.value = await fetchData('/analytics/snapshots?limit=24&offset=0');
	});

	const createManualSnapshot = async () => {
		loadingSnapshot.value = true;
		snapshotCreationResult.value = null;

		const {data, error} = await useBaseFetch('/analytics/snapshots/create', {
			method: 'POST',
		});

		if (error.value) {
			snapshotCreationResult.value = {success: false, message: error.value.message || 'Error creating snapshot'};
		} else {
			snapshotCreationResult.value = {success: true, message: 'Snapshot created successfully'};
			stakingSnapshots.value = await fetchData('/analytics/snapshots?limit=24&offset=0');
		}

		loadingSnapshot.value = false;
	};

	const formatTimestamp = (timestamp) => {
		return useDateFormat(timestamp, 'YYYY-MM-DD HH:mm:ss').value;
	};

	// Función para cargar stakers con paginación
	const fetchStakers = async () => {
		const response = await fetchData(`/analytics/all-stakers?page=${currentPage.value}&limit=${pageSize.value}`);
		if (response) {
			stakers.value = response.stakers;
			totalPages.value = response.totalPages;
		}
	};

	// Función para cambiar de página
	const changePage = async (page) => {
		if (page >= 1 && page <= totalPages.value) {
			currentPage.value = page;
			await fetchStakers();
		}
	};

	// Función para procesar datos históricos
	const processHistoricalData = async () => {
		loadingHistorical.value = true;
		historicalDataResult.value = null;

		const {data, error} = await useBaseFetch('/analytics/process-historical', {
			method: 'POST',
			body: {
				fromBlock: fromBlock.value,
				toBlock: toBlock.value
			}
		});

		if (error.value) {
			historicalDataResult.value = {
				success: false,
				message: error.value.message || 'Error processing historical data'
			};
		} else {
			historicalDataResult.value = {success: true, message: 'Historical data processed successfully'};
		}

		loadingHistorical.value = false;
	};
</script>

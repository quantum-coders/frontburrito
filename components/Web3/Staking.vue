<template>
	<div class="staking-dashboard position-relative p-4">
		<!-- Close Button -->
		<a class="close position-absolute top-0 end-2 m-6" @click.prevent="close">
			<icon name="material-symbols:close"/>
		</a>

		<!-- Main Title -->
		<h2 class="text-center mb-4">BurritoAI Staking Hub</h2>

		<div :data-loading="loadingState">
			<!-- Main Navigation Tabs -->
			<ul class="nav nav-pills nav-fill bg-light rounded p-3 mb-4">
				<li class="nav-item">
					<a
						class="nav-link d-flex align-items-center justify-content-center gap-2"
						:class="{ active: activeTab === 'dashboard' }"
						@click.prevent="changeToTab('dashboard')"
						href="#"
					>
						<icon name="mdi:view-dashboard"/>
						<span>Dashboard</span>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link d-flex align-items-center justify-content-center gap-2"
						:class="{ active: activeTab === 'active' }"
						@click.prevent="changeToTab('active')"
						href="#"
					>
						<icon name="mdi:fire"/>
						<span>Active Stakes</span>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link d-flex align-items-center justify-content-center gap-2"
						:class="{ active: activeTab === 'history' }"
						@click.prevent="changeToTab('history')"
						href="#"
					>
						<icon name="mdi:history"/>
						<span>Staking History</span>
					</a>
				</li>
			</ul>

			<!-- Dashboard Content -->
			<div v-if="activeTab === 'dashboard'" class="tab-content">
				<!-- Dashboard Metrics -->
				<div class="row mb-4" :class="isMobile ? 'gap-1' : ''">
					<div class="col-md-4">
						<div class="card zoom-card border-0 shadow-sm text-center h-100">
							<div class="card-body d-flex flex-column justify-content-center"
							>
								<icon name="mdi:account-cash" class="mb-2 icon-size"
									  :class="{ 'text-center w-100': isMobile }"/>
								<p class="card-text fs-5 fw-bold mb-0">Your Stake</p>
								<p class="fs-4 fw-bold">
									{{ userStaked?.toLocaleString(undefined, {maximumFractionDigits: 2}) }} Burrito AI
									Tokens
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card zoom-card border-0 shadow-sm text-center h-100">
							<div class="card-body d-flex flex-column justify-content-center">
								<icon name="mdi:wallet" class="mb-2 icon-size"
									  :class="{ 'text-center w-100': isMobile }"/>
								<p class="card-text fs-5 fw-bold mb-0">Available</p>
								<p class="fs-4 fw-bold">
									{{
										useWeb3Store().balances.burrito.toLocaleString(undefined, {maximumFractionDigits: 2})
									}} Burrito AI Tokens
								</p>
							</div>
						</div>
					</div>
					<!-- Rewards Card -->
					<div class="col-md-4">
						<div class="card zoom-card border-0 shadow-sm text-center h-100">
							<div class="card-body d-flex flex-column justify-content-center position-relative">
								<icon name="mdi:gift" class="mb-2 icon-size"
									  :class="{ 'text-center w-100': isMobile }"/>
								<p class="card-text fs-5 fw-bold mb-0">Rewards</p>
								<p class="fs-4 fw-bold">
									{{
										(parseFloat(rewardsEarned) + parseFloat(realTimeEarnings)).toFixed(16)
									}} Burrito AI Tokens
								</p>

								<!-- Real-Time Earnings Display -->
								<div class="mt-2">
									<span class="text-muted">Earnings in Real Time:</span>
									<span class="fw-bold real-time-earnings">
                    +{{ realTimeEarnings.toFixed(16) }} Burrito AI Tokens
                  </span>
								</div>

								<button
									@click="handleClaimRewards"
									class="btn btn-success w-100 mt-3"
									:disabled="!isRewardsClaimable"
								>
									<icon name="mdi:cash-plus" class="me-1"/>
									<span>Claim Rewards</span>
								</button>
								<p v-if="nextClaimableDate" class="mt-3 text-muted small">
									Next claimable date: {{ nextClaimableDate.toLocaleDateString() }}
								</p>
							</div>
						</div>
					</div>

				</div>

				<!-- Staking Form Card -->
				<div class="card border-0 shadow-sm">
					<div class="card-body">
						<h5 class="card-title d-flex align-items-center gap-2 mb-4">
							<icon name="mdi:rocket-launch"/>
							<span>Stake BurritoAI Tokens</span>
						</h5>

						<div class="mb-4">
							<label for="stakeAmount" class="form-label">Amount to Stake</label>
							<div class="input-group">
                <span class="input-group-text">
                  <icon name="cryptocurrency:Burrito AI Tokens"/>
                </span>
								<input
									type="number"
									class="form-control"
									id="stakeAmount"
									v-model="amountToStake"
									@input="updateStakeAmount(Number($event.target.value))"
									:max="maxStakeAmount"
									min="1"
									step="1"
								/>
							</div>
							<div class="mt-1">
								<small class="text-muted">
									Available: {{
										useWeb3Store().balances.burrito.toLocaleString(undefined, {maximumFractionDigits: 2})
									}} Burrito AI Tokens
								</small>
								<small
									class="text-danger d-block"
									v-if="amountToStake > useWeb3Store().balances.burrito"
								>
									Insufficient balance
								</small>
							</div>
						</div>

						<div class="mb-4">
							<label for="stakeDuration" class="form-label">Stake Duration (days)</label>
							<input
								type="number"
								class="form-control"
								id="stakeDuration"
								v-model="stakeDuration"
								min="30"
								step="1"
							/>
						</div>

						<div class="bg-light p-3 rounded mb-4">
							<div class="d-flex align-items-center gap-2 mb-2">
								<icon name="mdi:chart-line"/>
								<span>
                  Annual Percentage Yield:
                  <span class="fw-bold">{{ annualPercentageYield }}%</span>
                </span>
							</div>
						</div>

						<div class="bg-light p-3 rounded mb-4" v-if="stakingStatus">
							<div class="d-flex align-items-center gap-2">
								<icon name="mdi:information-outline"/>
								<span>{{ stakingStatus }}</span>
							</div>
						</div>

						<div class="d-grid gap-3">
							<button
								@click="handleApprove(amountToStake)"
								class="btn btn-warning"
								:disabled="amountToStake <= 0 || loadingState || isApproved"
							>
								<div
									v-if="loadingState"
									class="d-flex align-items-center justify-content-center gap-2"
								>
									<ui-spinner/>
									<span>Approving...</span>
								</div>
								<div
									v-else
									class="d-flex align-items-center justify-content-center gap-2"
								>
									<icon name="mdi:check"/>
									<span>Approve</span>
								</div>
							</button>

							<button
								@click="handleStake"
								class="btn btn-primary"
								:disabled="!isApproved || loadingState"
							>
								<div
									v-if="loadingState"
									class="d-flex align-items-center justify-content-center gap-2"
								>
									<ui-spinner/>
									<span>Loading...</span>
								</div>
								<div
									v-else
									class="d-flex align-items-center justify-content-center gap-2"
								>
									<icon name="mdi:rocket-launch"/>
									<span>Stake Now</span>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Active Stakes Content -->
			<div v-if="activeTab === 'active'" class="tab-content">
				<div class="card border-0 shadow-sm">
					<div class="card-body">
						<h5 class="card-title d-flex align-items-center gap-2 mb-4">
							<icon name="mdi:fire"/>
							<span>Active Stakes</span>
						</h5>
						<div class="table-responsive">
							<table class="table table-hover mb-0">
								<thead class="table-light">
								<tr>
									<th>Amount</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Rewards Earned</th>
								</tr>
								</thead>
								<tbody>
								<tr v-for="stake in activeStakes" :key="stake.id">
									<td>
										{{ stake.amount.toLocaleString(undefined, {maximumFractionDigits: 2}) }} Burrito
										AI Tokens
									</td>
									<td>{{ new Date(stake.startDate).toLocaleDateString() }}</td>
									<td>{{ new Date(stake.endDate).toLocaleDateString() }}</td>
									<td>
										{{ stake.rewards.toLocaleString(undefined, {maximumFractionDigits: 2}) }}
										Burrito AI Tokens
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<!-- Staking History Content -->
			<div v-if="activeTab === 'history'" class="tab-content">
				<div class="card border-0 shadow-sm">
					<div class="card-body">
						<h5 class="card-title d-flex align-items-center gap-2 mb-4">
							<icon name="mdi:history"/>
							<span>Staking History</span>
						</h5>
						<div class="table-responsive">
							<table class="table table-hover mb-0">
								<thead class="table-light">
								<tr>
									<th>Amount</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Rewards</th>
									<th>Status</th>
								</tr>
								</thead>
								<tbody>
								<tr v-for="stake in stakingHistory" :key="stake.id">
									<td>
										{{ stake.amount.toLocaleString(undefined, {maximumFractionDigits: 2}) }} Burrito
										AI Tokens
									</td>
									<td>{{ new Date(stake.startDate).toLocaleDateString() }}</td>
									<td>{{ new Date(stake.endDate).toLocaleDateString() }}</td>
									<td>
										{{ stake.rewards.toLocaleString(undefined, {maximumFractionDigits: 2}) }}
										Burrito AI Tokens
									</td>
									<td>
                      <span
						  :class="{
                          'badge bg-success': stake.status === 'Completed',
                          'badge bg-warning': stake.status === 'Active',
                        }"
					  >
                        <icon name="mdi:check-circle" class="me-1"/>
                        <span>{{ stake.status }}</span>
                      </span>
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

</template>

<script setup>
	const {isMobile} = useDevice();
	const {successToast, errorToast} = usePrettyToast();
	const userStaked = ref(0);
	const rewardsEarned = ref(0);
	const annualPercentageYield = ref(0);
	const web3Store = useWeb3Store();
	const activeStakes = ref([]);
	const stakingHistory = ref([]);
	// Staking interface
	const amountToStake = ref(0);
	const activeTab = ref('dashboard');
	const stakeDuration = ref(30);
	const stakingStatus = ref(null);
	const loadingState = ref(false);
	const isApproved = ref(false);
	const isRewardsClaimable = ref(false);
	const nextClaimableDate = ref(null);
	const realTimeEarnings = ref(0);

	const props = defineProps({
		close: {
			type: Function,
			default: () => {
			},
		},
	});

	const maxStakeAmount = computed(() => {
		return useWeb3Store().balances.burrito;
	});
	const updateStakeAmount = (stakeAmount) => {
		if (isNaN(stakeAmount)) {
			stakeAmount = 0;
		}
		amountToStake.value = stakeAmount;
	};

	onMounted(async () => {
		await runStakingChecks();
		startEarningsTimer();
	});

	const runStakingChecks = async () => {
		await web3Store.refreshBalances();
		await getStakedBalance();
		await getAnnualPercentageYield();
		await getRewardsEarned();
		await getActiveStakes();
		await getStakingHistory();
	};
	const handleApprove = async (amount) => {
		loadingState.value = true;
		stakingStatus.value = 'Approving tokens...';
		const {error, data} = await useBaseFetch(
			`/web3/build-approval-transaction/${web3Store.address}`,
			{
				method: 'POST',
				body: {amount, contract: 'staking'},
			}
		);

		if (!error.value?.data) {
			const approveTx = data.value.data;

			try {
				console.log("Debugging Signer ", web3Store.provider);
				const signedTx = await web3Store.provider.getSigner().sendTransaction(approveTx);
				await signedTx.wait();
				successToast(`Approval of ${amount} Burrito AI Tokens successful!`);
				isApproved.value = true;
			} catch (error) {
				console.error('Error approving tokens:', error);
				errorToast(`Error approving ${amount} Burrito AI Tokens!`);
				isApproved.value = false;
				throw error;
			} finally {
				stakingStatus.value = 'Approval process finished';
				loadingState.value = false;
			}
		} else {
			console.error('Error building approval transaction:', error.value);
			stakingStatus.value = 'Approval failed';
			isApproved.value = false;
			loadingState.value = false;
			throw error.value;
		}
	};

	const getAnnualPercentageYield = async () => {
		const {error, data} = await useBaseFetch('/web3/annual-apr', {method: 'GET'});
		if (!error.value?.data) {
			annualPercentageYield.value = data.value.data;
		} else {
			console.error('Error fetching annual percentage yield:', error.value);
		}
	};

	const getRewardsEarned = async () => {
		const {error, data} = await useBaseFetch(
			`/web3/calculate-reward/${web3Store.address}`,
			{method: 'GET'}
		);
		if (!error.value?.data) {
			rewardsEarned.value = parseFloat(data.value.data) || 0;
		} else {
			console.error('Error fetching rewards earned:', error.value);
		}
	};

	const handleStake = async () => {
		loadingState.value = true;
		const amount = amountToStake.value;

		const {error, data} = await useBaseFetch(
			`/web3/build-stake-transaction/${web3Store.address}`,
			{
				method: 'POST',
				body: {amount, duration: stakeDuration.value},
			}
		);

		if (!error.value?.data) {
			const stakeTx = data.value.data;
			try {
				stakingStatus.value = 'Staking tokens...';
				const signedTx = await web3Store.provider.getSigner().sendTransaction(stakeTx);
				await signedTx.wait();
				successToast(`Staking of ${amount} Burrito AI Tokens successful!`);
			} catch (error) {
				console.error('Error staking tokens:', error);
				errorToast('An error occurred during staking.');
				stakingStatus.value = 'Staking failed';
			} finally {
				loadingState.value = false;
				stakingStatus.value = 'Staking process finished';
				await runStakingChecks();
			}
		} else {
			console.error('Error building stake transaction:', error.value);
			errorToast(`Error staking ${amount} Burrito AI Tokens!`);
			stakingStatus.value = 'Staking failed';
			loadingState.value = false;
		}
	};

	const getActiveStakes = async () => {
		const {error, data} = await useBaseFetch(
			`/web3/active-stakes/${web3Store.address}`,
			{
				method: 'GET',
			}
		);

		if (!error.value?.data) {
			activeStakes.value = data.value.data;
		} else {
			console.error('Error fetching active stakes:', error.value);
		}
	};

	const getStakedBalance = async () => {
		const {error, data} = await useBaseFetch(`/web3/stake/${web3Store.address}`, {
			method: 'GET',
		});
		if (!error.value?.data) {
			console.info('Staked balance:', data.value.data);
			userStaked.value = parseFloat(data.value.data?.amount) || 0;
		} else {
			console.error('Error fetching staked balance:', error.value);
		}

		await checkRewardsClaimable();
	};

	const getStakingHistory = async () => {
		const {error, data} = await useBaseFetch(
			`/web3/staking-history/${web3Store.address}`,
			{
				method: 'GET',
			}
		);
		if (!error.value?.data) {
			stakingHistory.value = data.value.data;
		} else {
			console.error('Error fetching staking history:', error.value);
		}
	};

	const handleClaimRewards = async () => {
		const {error, data} = await useBaseFetch(
			`/web3/build-unstake-transaction/${web3Store.address}`,
			{
				method: 'POST',
			}
		);

		if (!error.value?.data) {
			const unstakeTx = data.value.data;

			try {
				const txResponse = await web3Store.provider.getSigner().sendTransaction(unstakeTx);
				await txResponse.wait();
				successToast('Claim rewards successful!');
			} catch (error) {
				console.error('Error claiming rewards:', error);
				errorToast('Error claiming rewards.');
			} finally {
				await runStakingChecks();

			}
		} else {
			console.error('Error building unstake transaction:', error.value);
		}
	};

	const changeToTab = async (tab) => {
		activeTab.value = tab;
		switch (tab) {
			case 'dashboard':
				await getStakedBalance();
				break;
			case 'active':
				await getActiveStakes();
				break;
			case 'history':
				await getStakingHistory();
				break;
		}
	};

	const checkRewardsClaimable = async () => {
		const {error, data} = await useBaseFetch(
			`/web3/active-stakes/${web3Store.address}`,
			{
				method: 'GET',
			}
		);

		if (!error.value?.data) {
			const activeStakesData = data.value.data;
			if (activeStakesData.length > 0) {
				const currentTimestamp = Math.floor(Date.now() / 1000);
				const claimableStake = activeStakesData.find(
					(stake) => new Date(stake.endDate).getTime() / 1000 <= currentTimestamp
				);
				isRewardsClaimable.value = !!claimableStake;

				if (claimableStake) {
					nextClaimableDate.value = null;
				} else {
					nextClaimableDate.value = new Date(
						Math.min(...activeStakesData.map((stake) => new Date(stake.endDate).getTime()))
					);
				}
			} else {
				isRewardsClaimable.value = false;
				nextClaimableDate.value = null;
			}
		} else {
			console.error('Error checking if rewards are claimable:', error.value);
			isRewardsClaimable.value = false;
			nextClaimableDate.value = null;
		}
	};

	const startEarningsTimer = () => {
		const earningsPerSecond = computed(() => {
			// Calculate earnings per second based on the staked amount
			return (userStaked.value * (annualPercentageYield.value / 100)) / (365 * 24 * 60 * 60);
		});

		setInterval(() => {
			realTimeEarnings.value += earningsPerSecond.value / 10; // Adjust for 100ms intervals
			realTimeEarnings.value = parseFloat(realTimeEarnings.value.toFixed(16));
		}, 100); // Update every 100 milliseconds
	};
</script>

<style scoped lang="sass">
	.staking-dashboard
		width: 100%
		padding: 1rem

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

		.zoom-card
			transition: transform 0.3s ease, box-shadow 0.3s ease

			&:hover
				transform: scale(1.05)
				box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1)

		.icon-size
			font-size: 2rem

		.real-time-earnings
			position: relative
			color: #28a745
			animation: pulse 2s infinite

		@keyframes pulse
			0%
				transform: scale(1)
			50%
				transform: scale(1.05)
			100%
				transform: scale(1)

		.table
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)

		[data-loading="true"]
			opacity: 0.5
			pointer-events: none
</style>

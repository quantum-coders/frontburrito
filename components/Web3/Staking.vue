<template>
	<div class="staking-dashboard">
		<div :data-loading="loadingState">
			<div class="d-flex align-items-center justify-content-between mb-3 p-3">
				<h5 class="mb-0">BurritoAI Staking Hub</h5>
				<ul class="nav nav-pills justify-content-center">
					<li class="nav-item">
						<a
							class="nav-link" :class="{ active: activeTab === 'dashboard' }"
							@click.prevent="changeToTab('dashboard')" href="#"
						>
							<icon name="mdi:view-dashboard" class="me-1" />
							Dashboard
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link" :class="{ active: activeTab === 'active' }"
							@click.prevent="changeToTab('active')" href="#"
						>
							<icon name="mdi:fire" class="me-1" />
							Active Stakes
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link" :class="{ active: activeTab === 'history' }"
							@click.prevent="changeToTab('history')" href="#"
						>
							<icon name="mdi:history" class="me-1" />
							Staking History
						</a>
					</li>
				</ul>
			</div>

			<div v-if="activeTab === 'dashboard'">
				<div class="d-flex flex-wrap justify-content-between g-4 mb-3">
					<div class="flex-fill p-2 col-12 col-md-6 col-lg-3">
						<div class="card h-100 border-0 shadow-sm crypto-card">
							<div class="card-body">
								<h5 class="card-title">
									<icon name="mdi:account-cash" />
									Your Stake
								</h5>
								<p class="card-text fs-4 fw-bold">{{ userStaked?.toLocaleString() }} Burrito AI
									Tokens</p>
							</div>
						</div>
					</div>
					<div class="flex-fill p-2 col-12 col-md-6 col-lg-3">
						<div class="card h-100 border-0 shadow-sm crypto-card">
							<div class="card-body">
								<h5 class="card-title">
									<icon name="mdi:wallet" />
									Available to Stake
								</h5>
								<p class="card-text fs-4 fw-bold">{{ useCryptoStore().burritoBalance }} Burrito AI
									Tokens</p>
							</div>
						</div>
					</div>
					<div class="flex-fill p-2 col-12 col-md-6 col-lg-3">
						<div class="card h-100 border-0 shadow-sm crypto-card">
							<div class="card-body">
								<h5 class="card-title">
									<icon name="mdi:gift" />
									Rewards Earned
								</h5>
								<p class="card-text fs-4 fw-bold">{{ rewardsEarned?.toLocaleString() }} Burrito AI
									Tokens</p>
								<button
									@click="handleClaimRewards" class="btn btn-success w-100 mt-3"
									:disabled="!isRewardsClaimable"
								>
									<icon name="mdi:cash-plus" />
									Claim Rewards
								</button>
								<p v-if="nextClaimableDate" class="mt-3 text-muted">
									Next claimable date: {{ nextClaimableDate.toLocaleDateString() }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="activeTab === 'dashboard'">
				<div class="card border-0 shadow crypto-card">
					<div class="card-body">
						<h5 class="card-title">
							<icon name="mdi:rocket-launch" />
							Stake BurritoAI Tokens
						</h5>
						<div class="mb-4">
							<label for="stakeAmount" class="form-label">Amount to Stake</label>
							<div class="input-group">
								<span class="input-group-text">
									<icon name="cryptocurrency:Burrito AI Tokens" />
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
							<small class="text-muted">Available: {{ useCryptoStore().burritoBalance }} Burrito AI Tokens</small>
							<small class="text-danger" v-if="amountToStake > useCryptoStore().burritoBalance">
								Insufficient balance
							</small>
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
						<div class="mb-4 bg-light p-3 rounded">
							<p class="mb-1">
								<icon name="mdi:chart-line" />
								Annual Percentage Yield: <span class="fw-bold">{{ annualPercentageYield }}%</span>
							</p>
							<p class="mb-1">
								<icon name="mdi:cash" />
								Estimated Annual Rewards:
								<span class="fw-bold">{{ estimatedRewards.toFixed(2) }} Burrito AI Tokens</span>
							</p>
						</div>
						<div class="mb-4 bg-light p-3 rounded" v-if="stakingStatus">
							<p class="mb-1">
								<icon name="mdi:information-outline" />
								{{ stakingStatus }}
							</p>
						</div>
						<button
							@click="handleApprove(amountToStake)" class="btn btn-warning w-100 mb-3"
							:disabled="amountToStake <= 0 || loadingState || isApproved"
						>
							<div v-if="loadingState">
								<ui-spinner />
								Approving...
							</div>
							<div v-else>
								<icon name="mdi:check" />
								Approve
							</div>
						</button>
						<button
							@click="handleStake" class="btn btn-primary w-100"
							:disabled="!isApproved || loadingState"
						>
							<div v-if="loadingState">
								<ui-spinner />
								Loading...
							</div>
							<div v-else>
								<icon name="mdi:rocket-launch" />
								Stake Now
							</div>
						</button>
					</div>
				</div>
			</div>

			<div v-if="activeTab === 'active'">
				<h5 class="mb-3">
					<icon name="mdi:fire" />
					Active Stakes
				</h5>
				<div class="table-responsive">
					<table class="table table-hover">
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
								<td>{{ stake.amount }} Burrito AI Tokens</td>
								<td>{{ new Date(stake.startDate).toLocaleDateString() }}</td>
								<td>{{ new Date(stake.endDate).toLocaleDateString() }}</td>
								<td>{{ stake.rewards }} Burrito AI Tokens</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div v-if="activeTab === 'history'">
				<h5 class="mb-3">
					<icon name="mdi:history" />
					Staking History
				</h5>
				<div class="table-responsive">
					<table class="table table-hover">
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
								<td>{{ stake.amount }} Burrito AI Tokens</td>
								<td>{{ new Date(stake.startDate).toLocaleDateString() }}</td>
								<td>{{ new Date(stake.endDate).toLocaleDateString() }}</td>
								<td>{{ stake.rewards }} Burrito AI Tokens</td>
								<td>
									<span
										:class="{'badge bg-success': stake.status === 'Completed', 'badge bg-warning': stake.status === 'Active'}"
									>
										<icon name="mdi:check-circle" class="me-1" />
										{{ stake.status }}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const { successToast, errorToast } = usePrettyToast();
	const totalStaked = ref(0);
	const userStaked = ref(0);
	const availableToStake = ref(); // Example value
	const rewardsEarned = ref(0);
	const annualPercentageYield = ref(0);
	const cryptoStore = useCryptoStore();
	const activeStakes = ref([]);
	const stakingHistory = ref([]);
	// Staking interface
	const amountToStake = ref(0);
	const stakePercentage = ref(0);
	const activeTab = ref('dashboard');
	const stakeDuration = ref(30);
	const stakingStatus = ref(null);
	const loadingState = ref(false);
	const maxStakeAmount = computed(() => availableToStake.value);
	const isApproved = ref(false);
	const isRewardsClaimable = ref(false);
	const nextClaimableDate = ref(null);

	const updateStakeAmount = (stakeAmount) => {
		amountToStake.value = stakeAmount;
		stakePercentage.value = (stakeAmount / maxStakeAmount.value) * 100;
	};

	const estimatedRewards = computed(() => {
		return (amountToStake.value * annualPercentageYield.value) / 100;
	});

	onMounted(async () => {
		await getStakedBalance();
		await getAnnualPercentageYield();
		await getRewardsEarned();
		await getActiveStakes();
		await getStakingHistory();
	});

	const handleApprove = async (amount) => {
		loadingState.value = true; // Set loading state to true
		stakingStatus.value = 'Approving tokens...';
		const { error, data } = await useBaseFetch(`/web3/build-approval-transaction/${ cryptoStore.currentAccount }`, {
			method: 'POST',
			body: { amount, contract: 'staking' },
		});

		if(!error.value?.data) {
			const approveTx = data.value.data;

			try {
				const signedTx = await cryptoStore.globalProvider.getSigner().sendTransaction(approveTx);
				await signedTx.wait();
				successToast(`Approval of ${ amount } Burrito AI Tokens successful!`);
				isApproved.value = true; // Set isApproved to true after successful approval
			} catch(error) {
				console.error('Error approving tokens:', error);
				errorToast(`Error approving ${ amount } Burrito AI Tokens!`);
				isApproved.value = false; // Reset isApproved in case of error
				throw error;
			} finally {
				stakingStatus.value = 'Approval process finished';
				loadingState.value = false; // Set loading state to false
			}
		} else {
			console.error('Error building approval transaction:', error.value);
			stakingStatus.value = 'Approval failed';
			isApproved.value = false; // Reset isApproved in case of error
			loadingState.value = false; // Set loading state to false
			throw error.value;
		}
	};

	const getAnnualPercentageYield = async () => {
		const { error, data } = await useBaseFetch('/web3/annual-apr', { method: 'GET' });
		if(!error.value?.data) {
			annualPercentageYield.value = data.value.data;
		} else {
			console.error('Error fetching annual percentage yield:', error.value);
		}
	};

	const getRewardsEarned = async () => {
		const {
			error,
			data,
		} = await useBaseFetch(`/web3/calculate-reward/${ cryptoStore.currentAccount }`, { method: 'GET' });
		if(!error.value?.data) {
			rewardsEarned.value = data.value.data;
		} else {
			console.error('Error fetching rewards earned:', error.value);
		}
	};

	const handleStake = async () => {
		loadingState.value = true; // Set loading state to true
		const amount = amountToStake.value;

		const { error, data } = await useBaseFetch(`/web3/build-stake-transaction/${ cryptoStore.currentAccount }`, {
			method: 'POST',
			body: { amount, duration: stakeDuration.value },
		});

		if(!error.value?.data) {
			const stakeTx = data.value.data;
			try {
				stakingStatus.value = 'Staking tokens...';
				const signedTx = await cryptoStore.globalProvider.getSigner().sendTransaction(stakeTx);
				await signedTx.wait();
				successToast(`Staking of ${ amount } Burrito AI Tokens successful!`);
				await getStakedBalance();
			} catch(error) {
				console.error('Error staking tokens:', error);
				if(error.code === 'CALL_EXCEPTION') {
					if(error.message.includes('Insufficient funds')) {
						errorToast('Insufficient funds for staking.');
					} else {
						errorToast('Staking failed. Please try again later.');
					}
				} else {
					errorToast('An error occurred during staking.');
				}
				stakingStatus.value = 'Staking failed';
			} finally {
				loadingState.value = false; // Set loading state to false
				stakingStatus.value = 'Staking process finished';
			}
		} else {
			console.error('Error building stake transaction:', error.value);
			errorToast(`Error staking ${ amount } Burrito AI Tokens!`);
			stakingStatus.value = 'Staking failed';
			loadingState.value = false; // Set loading state to false
		}
	};

	const getActiveStakes = async () => {
		const { error, data } = await useBaseFetch(`/web3/active-stakes/${ cryptoStore.currentAccount }`, {
			method: 'GET',
		});

		if(!error.value?.data) {
			activeStakes.value = data.value.data;
		} else {
			console.error('Error fetching active stakes:', error.value);
		}
	};

	const getStakedBalance = async () => {
		const { error, data } = await useBaseFetch(`/web3/stake/${ cryptoStore.currentAccount }`, {
			method: 'GET',
		});

		if(!error.value?.data) {
			userStaked.value = data.value.data.amount;
		} else {
			console.error('Error fetching staked balance:', error.value);
		}

		await checkRewardsClaimable();
	};

	const getStakingHistory = async () => {
		const { error, data } = await useBaseFetch(`/web3/staking-history/${ cryptoStore.currentAccount }`, {
			method: 'GET',
		});
		if(!error.value?.data) {
			stakingHistory.value = data.value.data;
		} else {
			console.error('Error fetching staking history:', error.value);
		}
	};

	const handleClaimRewards = async () => {
		const { error, data } = await useBaseFetch(`/web3/build-unstake-transaction/${ cryptoStore.currentAccount }`, {
			method: 'POST',
		});

		if(!error.value?.data) {
			const unstakeTx = data.value.data;

			try {
				const txResponse = await cryptoStore.globalProvider.getSigner().sendTransaction(unstakeTx);
				await txResponse.wait();
				console.log('Claim rewards successful!');
			} catch(error) {
				console.error('Error claiming rewards:', error);
			}
		} else {
			console.error('Error building unstake transaction:', error.value);
		}
	};

	const changeToTab = async (tab) => {
		switch(tab) {
			case 'dashboard':
				activeTab.value = 'dashboard';
				await getStakedBalance();
				break;
			case 'active':
				activeTab.value = 'active';
				await getActiveStakes();
				break;
			case 'history':
				activeTab.value = 'history';
				await getStakingHistory();
				break;

		}
	};

	const checkRewardsClaimable = async () => {
		const { error, data } = await useBaseFetch(`/web3/active-stakes/${ cryptoStore.currentAccount }`, {
			method: 'GET',
		});

		if(!error.value?.data) {
			const activeStakesData = data.value.data;
			if(activeStakesData.length > 0) {
				const currentTimestamp = Math.floor(Date.now() / 1000);
				const claimableStake = activeStakesData.find(stake => new Date(stake.endDate).getTime() / 1000 <= currentTimestamp);
				isRewardsClaimable.value = !!claimableStake;

				if(claimableStake) {
					nextClaimableDate.value = null;
				} else {
					nextClaimableDate.value = new Date(Math.min(...activeStakesData.map(stake => new Date(stake.endDate).getTime())));
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

</script>

<style scoped lang="sass">
	.staking-dashboard
		background-color: #f8f9fa
		max-width: 100%
		width: 1000px

		.crypto-card
			transition: transform 0.3s ease, box-shadow 0.3s ease

			&:hover
				transform: translateY(-5px)
				box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1)

		.table
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)

		.container
			opacity: 1
			transition: opacity 0.3s ease

			&[data-loading="true"]
				opacity: 0.5
				pointer-events: none
</style>

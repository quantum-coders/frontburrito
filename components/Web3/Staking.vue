<script setup lang="ts">

// Staking data
const totalStaked = ref(1000000)
const userStaked = ref(5000)
const availableToStake = ref(2000)
const rewardsEarned = ref(250)
const annualPercentageYield = ref(12)

// Staking interface
const amountToStake = ref(0)
const stakePercentage = ref(0)
const activeTab = ref('dashboard')

const maxStakeAmount = computed(() => availableToStake.value)

const updateStakeAmount = (value: number) => {
	amountToStake.value = value
	stakePercentage.value = (value / maxStakeAmount.value) * 100
}

const updateStakePercentage = (value: number) => {
	stakePercentage.value = value
	amountToStake.value = (value / 100) * maxStakeAmount.value
}

const estimatedRewards = computed(() => {
	return (amountToStake.value * annualPercentageYield.value) / 100
})

const handleStake = () => {
	// Implement staking logic here
	console.log(`Staking ${amountToStake.value} BurritoAI Tokens`)
}

// Mock data for active stakes and history
const activeStakes = ref([
	{id: 1, amount: 1000, startDate: '2023-06-01', endDate: '2024-06-01', rewards: 120},
	{id: 2, amount: 2000, startDate: '2023-07-15', endDate: '2024-07-15', rewards: 180},
])

const stakingHistory = ref([
	{id: 1, amount: 500, startDate: '2023-01-01', endDate: '2023-07-01', rewards: 30, status: 'Completed'},
	{id: 2, amount: 1000, startDate: '2023-03-15', endDate: '2023-09-15', rewards: 60, status: 'Completed'},
	{id: 3, amount: 1500, startDate: '2023-05-01', endDate: '2023-11-01', rewards: 90, status: 'Completed'},
])
</script>

<template>
	<div class="staking-dashboard">
		<div class="container py-5">
			<h1 class="text-center mb-5">BurritoAI Staking Dashboard</h1>

			<ul class="nav nav-tabs mb-4">
				<li class="nav-item">
					<a class="nav-link" :class="{ active: activeTab === 'dashboard' }"
					   @click.prevent="activeTab = 'dashboard'" href="#">Dashboard</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" :class="{ active: activeTab === 'active' }"
					   @click.prevent="activeTab = 'active'" href="#">Active Stakes</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" :class="{ active: activeTab === 'history' }"
					   @click.prevent="activeTab = 'history'" href="#">Staking History</a>
				</li>
			</ul>

			<div v-if="activeTab === 'dashboard'">
				<div class="row g-4 mb-5">
					<div class="col-md-6 col-lg-3">
						<div class="card h-100 bg-primary text-white">
							<div class="card-body">
								<h5 class="card-title">Total Staked</h5>
								<p class="card-text fs-4">{{ totalStaked.toLocaleString() }} BAI</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="card h-100 bg-success text-white">
							<div class="card-body">
								<h5 class="card-title">Your Stake</h5>
								<p class="card-text fs-4">{{ userStaked.toLocaleString() }} BAI</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="card h-100 bg-info text-white">
							<div class="card-body">
								<h5 class="card-title">Available to Stake</h5>
								<p class="card-text fs-4">{{ availableToStake.toLocaleString() }} BAI</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-3">
						<div class="card h-100 bg-warning text-white">
							<div class="card-body">
								<h5 class="card-title">Rewards Earned</h5>
								<p class="card-text fs-4">{{ rewardsEarned.toLocaleString() }} BAI</p>
							</div>
						</div>
					</div>
				</div>

				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Stake BurritoAI Tokens</h5>
						<div class="mb-4">
							<label for="stakeAmount" class="form-label">Amount to Stake</label>
							<input
								type="number"
								class="form-control"
								id="stakeAmount"
								v-model="amountToStake"
								@input="updateStakeAmount(Number($event.target.value))"
								:max="maxStakeAmount"
								min="0"
								step="1"
							>
						</div>
						<div class="mb-4">
							<label for="stakePercentage" class="form-label">Percentage of Available Tokens</label>
							<input
								type="range"
								class="form-range"
								id="stakePercentage"
								v-model="stakePercentage"
								@input="updateStakePercentage(Number($event.target.value))"
								min="0"
								max="100"
								step="1"
							>
							<div class="d-flex justify-content-between">
								<span>0%</span>
								<span>{{ stakePercentage.toFixed(0) }}%</span>
								<span>100%</span>
							</div>
						</div>
						<div class="mb-4">
							<p class="mb-1">Annual Percentage Yield: {{ annualPercentageYield }}%</p>
							<p class="mb-1">Estimated Annual Rewards: {{ estimatedRewards.toFixed(2) }} BAI</p>
						</div>
						<button @click="handleStake" class="btn btn-primary w-100">Stake Now</button>
					</div>
				</div>
			</div>

			<div v-if="activeTab === 'active'">
				<h2 class="mb-4">Active Stakes</h2>
				<div class="table-responsive">
					<table class="table table-hover">
						<thead class="table-light">
						<tr>
							<th>Amount</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Rewards Earned</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="stake in activeStakes" :key="stake.id">
							<td>{{ stake.amount }} BAI</td>
							<td>{{ new Date(stake.startDate).toLocaleDateString() }}</td>
							<td>{{ new Date(stake.endDate).toLocaleDateString() }}</td>
							<td>{{ stake.rewards }} BAI</td>
							<td>
								<button class="btn btn-sm btn-outline-primary me-2">Extend</button>
								<button class="btn btn-sm btn-outline-danger">Unstake</button>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div v-if="activeTab === 'history'">
				<h2 class="mb-4">Staking History</h2>
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
							<td>{{ stake.amount }} BAI</td>
							<td>{{ new Date(stake.startDate).toLocaleDateString() }}</td>
							<td>{{ new Date(stake.endDate).toLocaleDateString() }}</td>
							<td>{{ stake.rewards }} BAI</td>
							<td>
								<span class="badge bg-success">{{ stake.status }}</span>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="sass">
.staking-dashboard
	background-color: #f8f9fa

.nav-tabs .nav-link
	color: #495057

	&:hover
		border-color: transparent

.nav-tabs .nav-link.active
	color: #007bff
	font-weight: bold

.card
	transition: transform 0.3s ease, box-shadow 0.3s ease

	&:hover
		transform: translateY(-5px)
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1)

.btn-primary
	transition: all 0.3s ease

	&:hover
		transform: translateY(-2px)
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

.table
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)
</style>
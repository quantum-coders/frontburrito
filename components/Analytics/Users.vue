<template>
	<div class="container mt-4">
		<h2>Database Statistics</h2>

		<div v-if="loading" class="text-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div v-else-if="error" class="alert alert-danger">
			{{ error }}
		</div>
		<div v-else>
			<table class="table table-striped">
				<thead>
				<tr>
					<th>Metric</th>
					<th>Value</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>Total Users</td>
					<td>{{ databaseSnapshot.totalUsers }}</td>
				</tr>
				<tr>
					<td>Active Users</td>
					<td>{{ databaseSnapshot.activeUsers }}</td>
				</tr>
				<tr>
					<td>Users with Wallet</td>
					<td>{{ databaseSnapshot.usersWithWallet }}</td>
				</tr>
				<tr>
					<td>Total (Messages)</td>
					<td>{{ databaseSnapshot.totalTransactions }}</td>
				</tr>
				<tr>
					<td>Total AVAX Volume</td>
					<td>{{ databaseSnapshot.totalAvaxVolume }}</td>
				</tr>
				<tr>
					<td>Total USDT Volume</td>
					<td>{{ databaseSnapshot.totalUsdtVolume }}</td>
				</tr>
				<tr>
					<td>Total Cost</td>
					<td>{{ databaseSnapshot.totalCost }}</td>
				</tr>
				</tbody>
			</table>

			<h3 class="mt-4">User Snapshots</h3>
			<div class="table-responsive">
				<table class="table table-striped">
					<thead>
					<tr>
						<th>ID</th>
						<th>Login</th>
						<th>Wallet</th>
						<th>Last Activity</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="user in databaseSnapshot.userSnapshots" :key="user.id">
						<td>{{ user.id }}</td>
						<td>{{ user.login }}</td>
						<td>{{ user.wallet }}</td>
						<td>{{ formatDate(user.lastActivity) }}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>

	const loading = ref(true);
	const error = ref(null);
	const databaseSnapshot = ref({});

	onMounted(async () => {
		try {
			const response = await useBaseFetch('/analytics/all-stats');
			console.log("Value of response: ", response);
			if (response.error.value) {
				throw new Error(response.error.message || 'Failed to fetch data');
			}

			if (response.data.value.data && response.data.value) {
				console.log("Value of response.data: ", response.data.value);
				databaseSnapshot.value = response.data.value.data.databaseSnapshot;
			} else {
				throw new Error('Invalid response format: databaseSnapshot not found');
			}

		} catch (err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	});

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleString(); // Formato de fecha y hora local
	}
</script>

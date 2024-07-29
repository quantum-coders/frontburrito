<template>
  <div class="mt-4">
    <h3>Register Payment</h3>
    <form @submit.prevent="registerPayment">
      <div class="mb-3">
        <label for="avaxAmount" class="form-label">AVAX Amount</label>
        <input type="number" class="form-control" id="avaxAmount" v-model="avaxAmount" required>
      </div>
      <div class="mb-3">
        <label for="usdtAmount" class="form-label">USDT Amount</label>
        <input type="number" class="form-control" id="usdtAmount" v-model="usdtAmount" required>
      </div>
      <button type="submit" class="btn btn-primary">Register Payment</button>
    </form>
    <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>
  </div>
</template>

<script setup>

const avaxAmount = ref(0);
const usdtAmount = ref(0);
const message = ref('');

const cryptoStore = useCryptoStore();

const registerPayment = async () => {
  try {
    const { data, error } = await useBaseFetch(`/web3/build-record-payment-transaction/${cryptoStore.currentAccount}`, {
      method: 'POST',
      body: { avaxAmount: avaxAmount.value, usdtAmount: usdtAmount.value },
    });

    if (error) {
      message.value = 'Error registering payment: ' + error.message;
    } else {
      message.value = 'Payment registered successfully';
    }
  } catch (error) {
    message.value = 'Error registering payment: ' + error.message;
  }
};
</script>

<style scoped>
.mt-4 {
  margin-top: 1.5rem;
}
</style>

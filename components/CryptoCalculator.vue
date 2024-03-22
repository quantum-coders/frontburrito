<template>
    <div class="container py-5 bg-white">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <!-- Mensaje de carga -->
              <div v-if="loading" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>
              <!-- Formulario de calculadora -->
              <div v-else>
                <form @submit.prevent="calculateCrypto">
                  <div class="mb-3">
                    <label for="cryptoAmount" class="form-label">Cantidad</label>
                    <input type="number" class="form-control" id="cryptoAmount" v-model="amount" placeholder="Ingresa la cantidad">
                  </div>
                  <div class="mb-3">
                    <label for="cryptoCurrency" class="form-label">Criptomoneda</label>
                    <select class="form-select" id="cryptoCurrency" v-model="currency">
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <!-- Agrega más opciones según sea necesario -->
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary">Calcular</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const loading = ref(false)
  const amount = ref(0)
  const currency = ref('BTC')
  
  const calculateCrypto = () => {
    // Aquí iría la lógica para calcular la compra de la criptomoneda
    console.log(`Calculando ${amount.value} de ${currency.value}`)
  }
  </script>
  
  <style scoped>
  /* Aquí podrías añadir estilos personalizados si es necesario */
  </style>
  
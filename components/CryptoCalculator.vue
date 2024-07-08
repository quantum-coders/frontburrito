<template>
  <div class="container py-5 bg-white">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h1 class="staking-title">burritoAI Staking-AI<br>(*under construction*)</h1>
          <p class="staking-description">This index is calculated with with AI for the longevity of the AI powered witha cost-staker-adquisition-risk APY.</p>
          <bpay-button-v2
									class="mb-4 btn-sm btn-terms"
									target="_blank"
									to="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf65645a42609f6b44e2ec158a3dc2b6cfc97093f"
									style="color:white"
								>
									Get burritoAI
								</bpay-button-v2>
        </div>

        <div class="card staking-card">
          <div class="card-body">
            <h3 class="text-center purple mb-4">Lock burritoAI to get vburritoAI</h3>
            <!-- Mensaje de carga -->
            <div v-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <!-- Formulario de staking -->
            <div v-else>
              <form @submit.prevent="calculateStaking">
                <div class="mb-3">
                  <label for="burritoAmount" class="form-label">Add burritoAI</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <img src="/images/burrito-IA-finance-logo.png" width="40" height="40" alt="BurritoAI" />
                    </span>
                    <input type="number" class="form-control" id="burritoAmount" v-model="amount" placeholder="0">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="stakingDuration" class="form-label">Add burritoAI</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <img src="/images/burrito-IA-finance-logo.png" width="40" height="40" alt="BurritoAI" />
                    </span>
                    <input type="number" class="form-control" id="stakingDuration" v-model="duration" placeholder="Weeks">
                </div>
                </div>
                <div class="my-4">
                  <div class="row">
                    <div class="col-4">
                      <div class="text-center h4">$burritoAI to be locked</div>
                      <div class="text-center">conect wallet</div>
                    </div>
                    <div class="col-4">
                      <div class="text-center h4">Factor</div>
                      <div class="text-center">conect wallet</div>
                    </div>
                    <div class="col-4">
                      <div class="text-center h4">Duration</div>
                      <div class="text-center">conect wallet</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="text-center h4">Unstake on</div>
                      <div class="text-center">NaN</div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <button disabled type="submit" class="btn btn-primary btn-round">Lock burritoAI</button>
                </div>
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
const duration = ref(0)

const calculateStaking = () => {
  // Aquí iría la lógica para bloquear los fondos y calcular el staking
  // console.log(`Staking ${amount.value} burritoAI for ${duration.value} weeks`)
}
</script>

<style scoped>
.staking-title {
  color: #D75D41; /* Color similar al de PancakeSwap */
  margin-bottom: 0.5rem;
}

.staking-description {
  color: #D75D41; /* Color similar al de PancakeSwap */
  margin-bottom: 1rem;
}

.staking-card {
  border-radius: 20px; /* Bordes redondeados como en la imagen */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
}
.h3 {
  color:#D75D41;
}
.btn-terms {
  padding: 0.5rem 1rem; /* Ajusta el padding para hacer el botón más pequeño */
  font-size: 0.8rem; /* Reduce el tamaño de la fuente */
  margin-bottom: 0.5rem; /* Ajuste opcional del margen si es necesario */
  /* Otros estilos que ya tienes para btn-terms */
  color: white; /* Asegurándonos de que el color y otros estilos se mantengan */
}
.btn-round {
  border-radius: 9999px; /* Hace el botón completamente redondo */
  padding: 0.5rem 1.5rem; /* Ajusta el padding para asegurar que el botón tenga una forma más circular */
  /* Asegúrate de que el padding horizontal sea suficiente para el texto dentro del botón */
}
/* Aquí podrías añadir estilos personalizados si es necesario */
/* Asegúrate de que el path de la imagen y los colores sean correctos */
</style>

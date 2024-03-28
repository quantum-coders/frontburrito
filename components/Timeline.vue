<template>
    <section id="timeline" class="py-5">
      <div class="container">
        <h2 class="text-center mb-5" style="color:#fcfcfc"><strong><u>How it works</u></strong></h2>
        <div class="timeline">
          <div v-for="(item, index) in years" :key="index" class="row align-items-center timeline-item">
            <!-- Year text on the left -->
            <div class="col-md-4 d-flex justify-content-md-end justify-content-center align-items-center mb-3 mb-md-0">
              <h2 class="text-white text-center text-md-right">{{ item.year }}</h2>
            </div>
  
            <!-- Timeline icon in the middle -->
            <div class="col-md-1 d-flex justify-content-center align-items-center mb-3 mb-md-0">
              <div class="timeline-icon" :style="{ backgroundColor: item.iconColor }">
                <!-- Icon or point for timeline -->
              </div>
            </div>
  
            <!-- Text content on the right -->
            <div class="col-md-7 d-flex align-items-center mt-2">
              <p class="m-0 text-white subtitle">{{ item.txt }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  
  // Script para manejar los datos de la línea de tiempo
  const years = ref([
    {
      iconColor: '#C8B255', // Ajustado para Bootstrap
      year: 'Starts with a computer',
      txt: 'Proof of Stake blockchains have validators that create, propose or vote on blocks to be added to the blockchain. These validators are needed to run robust hardware that is online 24/7 with multiple security features. We are a professional validator that never sleeps so you can stake with peace of mind.'
    },
    {
      iconColor: '#C8B255', // Ajustado para Bootstrap
      year: 'Become a crypto owner',
      txt: 'Not only are our validator node and our sentinel node globally distributed, our equipment is too! This ensures that we have 24-hour coverage of our validation nodes. We can immediately monitor and address any issues that arise.'
    },
    {
      iconColor: '#C8B255', // Ajustado para Bootstrap
      year: 'Always Safe',
      txt: 'We have deep roots in the crypto space. Our founder co-founded one of the largest mining groups in the world. We, stakefish, are here to make similar contributions to POS blockchains.'
    },
    {
      iconColor: '#C8B255', // Ajustado para Bootstrap
      year: 'Always Safe',
      txt: 'We do not compromise on security. We prefer to take a conservative approach to our infrastructure rather than strive for efficiency.'
    },
    {
      iconColor: '#C8B255', // Ajustado para Bootstrap
      year: 'Stake easily',
      txt: 'Learn from these videos in easy steps to earn crypto-interest.'
    }
  ]);
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos específicos para personalizar tu línea de tiempo */
  .timeline {
    position: relative;
    padding-left: 50px;
    list-style: none;
  }
  
  .timeline-item {
    margin-bottom: 20px;
    position: relative;
  }
  
  .timeline-icon {
  width: 30px; /* Tamaño del ícono, ajusta según necesidad */
  height: 30px; /* Tamaño del ícono, ajusta según necesidad */
  border-radius: 70%;
  /* Estilos adicionales para los íconos */
}
  
  .timeline-content {
    margin-left: 30px;
    background: #E3CBA6;
    padding: 20px;
    border-radius: 4px;
    /* Personaliza según necesidad */
  }
  </style>
  
<template>
    <div class="tokenomics">
      <div class="container py-5">
        <h2 class="text-center mb-5">BurritoIA Tokenomics</h2>
  
        <div class="row g-4">
          <!-- Inicio de la visualización de Tokenomics -->
          <div class="col-12 col-md-6 col-lg-4" v-for="element in tokenomicsData" :key="element.title">
            <div class="card">
              <img :src="element.image" class="card-img-top" :alt="element.title">
              <div class="card-body">
                <h5 class="card-title">{{ element.title }}</h5>
                <p class="card-text">{{ element.description }}</p>
              </div>
              <div class="card-footer text-muted">
                {{ element.footer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tokenomicsData = ref([
    {
      title: 'Total Supply',
      description: 'Suministro total de 300,000,000 BurritoIA tokens.',
      footer: 'Suministro total: 300,000,000',
      image: 'https://source.unsplash.com/featured/?Meme' // Reemplazar con la imagen correspondiente
    },
    {
      title: 'Staking Rewards',
      description: '18% dedicado a recompensas por staking para fomentar la participación y seguridad en la red.',
      footer: 'Staking Rewards: 54,000,000 BurritoIA',
      image: 'https://source.unsplash.com/featured/?Futuristic&Technology' // Reemplazar con la imagen correspondiente
    },
    {
      title: 'Liquidity Operations',
      description: 'Operaciones de liquidez para asegurar un mercado fluido y accesible.',
      footer: 'Liquidity Operations: 30,000,000 BurritoIA',
      image: 'https://source.unsplash.com/featured/?Art&Artificial&intelligence' // Reemplazar con la imagen correspondiente
    },
    // Agregar más elementos según sea necesario...
  ]);
  
  </script>
  
  <style scoped>
  .tokenomics {
    background-color: #f8f9fa;
    padding: 2rem 0;
  }
  
  .card-footer {
    font-size: 0.9rem;
  }
  
  /* Aquí puedes agregar estilos adicionales según sea necesario */
  </style>
  
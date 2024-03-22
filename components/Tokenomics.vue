<template>
    <div class="tokenomics">
      <div class="container py-5">
        <h2 class="text-center mb-5">BurritoIA Tokenomics</h2>
  
        <div class="row g-4">
          <!-- Inicio de la visualización de Tokenomics -->
          <div class="col-12 col-md-6 col-lg-4" v-for="element in tokenomicsData" :key="element.title">
            <div class="card-footer text-muted">
                <h3 class="subtitle" style="color: #3E3C3E;">{{ element.footer }}
              </h3>
              </div>
            <div class="card">
              <img :src="element.image" class="card-img-top" :alt="element.title">
              <div class="card-body">
                <h5 class="card-title">{{ element.title }}</h5>
                <p class="card-text">{{ element.description }}</p>
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
    image: 'https://source.unsplash.com/featured/?Futuristic' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Staking Rewards',
    description: '18% dedicado a recompensas por staking para fomentar la participación y seguridad en la red.',
    footer: 'Staking Rewards: 54,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?DeFi' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Liquidity Operations',
    description: 'Operaciones de liquidez para asegurar un mercado fluido y accesible.',
    footer: 'Liquidity Operations: 30,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?Blockchain' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Development and DevOps',
    description: '7% asignado al desarrollo y operaciones de DevOps en ciberseguridad de blockchain.',
    footer: 'Development: 21,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?pattern' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Community Incentives',
    description: '11% reservado para incentivos a la comunidad, incluyendo airdrops.',
    footer: 'Community Incentives: 33,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?cyberpunk' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Institutional Collaboration',
    description: 'Colaboraciones institucionales para la expansión y adopción de BurritoIA.',
    footer: 'Institutional Collaboration: 21,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?Ethereum' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Founding Team',
    description: 'Equipo fundador con un vesting de 12 meses para asegurar el compromiso a largo plazo.',
    footer: 'Founding Team: 30,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?abstract' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Initial Public Sale',
    description: 'La venta pública inicial representa la principal vía de distribución de tokens.',
    footer: 'Initial Public Sale: 111,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?Occult' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Inflation Model',
    description: 'Modelo de inflación diseñado para sostener el crecimiento del ecosistema BurritoIA.',
    footer: '1% monthly first year, 0.5% thereafter',
    image: 'https://source.unsplash.com/featured/?Utopia' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Token Burn Mechanism',
    description: 'Mecanismo de quema para reducir el suministro total y aumentar la escasez del token.',
    footer: '1% per transaction, 50% of fees',
    image: 'https://source.unsplash.com/featured/?Bitcoin' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Transaction Fees',
    description: 'Tarifas por transacción diseñadas para recompensar a los holders y soportar el desarrollo.',
    footer: '5% to holders, 3% to development, 2% to liquidity',
    image: 'https://source.unsplash.com/featured/?Cryptomining' // Reemplazar con la imagen correspondiente
  }
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
  
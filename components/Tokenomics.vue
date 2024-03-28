<template>
    <div class="tokenomics">
      <div class="container py-5">
        <h2 class="text-center mb-5" style="color:#E3CBA6;">BurritoIA Tokenomics</h2>
  
        <div class="row g-4">
          <!-- Inicio de la visualización de Tokenomics -->
          <div class="col-12 col-md-6 col-lg-4" v-for="element in tokenomicsData" :key="element.title">
            <!-- <div class="card-footer text-muted">
                <h3 class="subtitle" style="color: #3E3C3E;">{{ element.footer }}
              </h3>
            </div> -->
              <div class="card">
                <div class="image-container">
                    <img :src="element.image" class="card-img-top image-filter" :alt="element.title" />
                  </div>
                <div class="card-body">
                  <h5 class="card-title" style="color: #3E3C3E;">{{ element.title }}</h5>
                  <p class="card-text">{{ element.description }}</p>
                </div>
                <div class="card-footer text-muted">
                  <h3 class="subtitle" style="color: #3E3C3E;">{{ element.footer }}</h3>
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
    image: 'https://source.unsplash.com/featured/?Future&city' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Staking Rewards',
    description: '18% dedicado a recompensas por staking para fomentar la participación y seguridad en la red.',
    footer: 'Staking Rewards: 54,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?stocks' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Liquidity Operations',
    description: 'Operaciones de liquidez para asegurar un mercado fluido y accesible.',
    footer: 'Liquidity Operations: 30,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?bank' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Development and DevOps',
    description: '7% asignado al desarrollo y operaciones de DevOps en ciberseguridad de blockchain.',
    footer: 'Development: 21,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?pattern&abstract' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Community Incentives',
    description: '11% reservado para incentivos a la comunidad, incluyendo airdrops.',
    footer: 'Community Incentives: 33,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?growth' // Reemplazar con la imagen correspondiente
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
    image: 'https://source.unsplash.com/featured/?friends' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Initial Public Sale',
    description: 'La venta pública inicial representa la principal vía de distribución de tokens.',
    footer: 'Initial Public Sale: 111,000,000 BurritoIA',
    image: 'https://source.unsplash.com/featured/?crowd' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Inflation Model',
    description: 'Modelo de inflación diseñado para sostener el crecimiento del ecosistema BurritoIA.',
    footer: '1% monthly first year, 0.5% thereafter',
    image: 'https://source.unsplash.com/featured/?Chart' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Token Burn Mechanism',
    description: 'Mecanismo de quema para reducir el suministro total y aumentar la escasez del token.',
    footer: '1% per transaction, 50% of fees',
    image: 'https://source.unsplash.com/featured/?gold' // Reemplazar con la imagen correspondiente
  },
  {
    title: 'Transaction Fees',
    description: 'Tarifas por transacción diseñadas para recompensar a los holders y soportar el desarrollo.',
    footer: '5% to holders, 3% to development, 2% to liquidity',
    image: 'https://source.unsplash.com/featured/?tax' // Reemplazar con la imagen correspondiente
  }
]);
  
  </script>
  
  <style scoped>
  .tokenomics {
    background-color: #f8f9fa;
    padding: 2rem 0;
  }
  
  .card {
    transition: transform 0.5s ease;
    background: linear-gradient(90deg, rgba(200,178,85,1) 0%, rgba(227,203,166,1) 23%);
  }
  
  .card:hover {
    transform: translateY(-10px);
  }
  
  .card-footer {
    font-size: 0.9rem;
  }
  
  .image-container {
  position: relative;
  display: inline-block; /* Asegura que el contenedor tenga dimensiones */
  border-radius: 20px; /* Bordes redondeados */
  overflow: hidden; /* Importante para respetar los bordes redondeados con el pseudo-elemento */
  }

  .image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(90deg, rgba(200,178,85,0.6) 0%, rgba(227,203,166,0.6) 23%, rgba(207,204,187,0.2) 100%);
    z-index: 0; /* Podría necesitar ajuste dependiendo de la estructura de tu HTML */
  }

  .card-img-top {
    height: 333px;
    object-fit: cover;
    width: 100%; /* Asegura que la imagen cubra completamente el contenedor */
    position: relative;
    z-index: 1; /* La imagen debe estar por encima del pseudo-elemento */
  }
  </style>
  
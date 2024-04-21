<template>
    <div class="background-image-container">
      <div class="container py-5">

        <div class="row mt-4 mb-8">
          <div class="col-12">
            <div class="full-width-section" style="color: transparent;">
              <!-- Contenido de la nueva sección -->
              <!-- <h5 class="card-title text-white title mb-8"><u>Know more ∴ Know the Future</u></h5> -->
                <div class="list-unstyled">
                  <button class="btn-list-item mt-3 mb-8 title" aria-label="Servicio 1">
                    <i class="bi bi-check-circle-fill" style="color:#F09F33;"></i> Crypto AI investing portfolio data from 2024. All chains
                  </button>
                  <button class="btn-list-item mt-3 mb-8 title" aria-label="Servicio 2">
                    <i class="bi bi-check-circle-fill"></i> Uncensored AI
                  </button>
                  <!-- <button class="btn-list-item mt-3 mb-8 title" aria-label="Servicio 3">
                    <i class="bi bi-check-circle-fill"></i> Deep search custom data, upload your data.
                  </button> -->
                </div>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- Card de Servicios -->
          <div class="col-md-6">
            <div class="h-100" style="color: transparent;">
              <div class="card-body">
                <h3 class="card-title text-white mb-5"><strong>The begining of the Neural-Internet</strong></h3>
                <!-- <div class="list-unstyled">
                  <button class="btn-list-item" aria-label="Servicio 1">
                    <i class="bi bi-check-circle-fill"></i> Crypto AI investing portfolio data from 2024. All chains
                  </button>
                  <button class="btn-list-item" aria-label="Servicio 2">
                    <i class="bi bi-check-circle-fill"></i> Airdrops and new gems with meme power narrative
                  </button>
                  <button class="btn-list-item" aria-label="Servicio 3">
                    <i class="bi bi-check-circle-fill"></i> Deep search cutom data, upload.
                  </button>
                </div> -->
                <div class="blockad">
                  <img src="https://source.unsplash.com/featured/?Futuristic&Archillect&IA" alt="Connection" class="mx-auto d-block image-filter"/>
                </div>
              </div>
            </div>
          </div>
          <!-- Card de Machine Learning -->
          <div class="col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title purple mb-7">Resources Links</h3>
                <div class="list-unstyled">
                  <a class="btn-list-item subtitle mt-3 mb-8" href="https://github.com/tinygrad/tinygrad" target="_blank" aria-label="Servicio 1">
                    <i class="bi bi-check-circle-fill"></i> TinyGrad
                  </a>
                  <a class="btn-list-item subtitle mt-3 mb-8" href="https://github.com/langchain-ai/langchain" target="_blank" aria-label="Servicio 2">
                    <i class="bi bi-check-circle-fill"></i> LangChain
                  </a>
                  <a class="btn-list-item subtitle mt-3 mb-8" href="https://github.com/Significant-Gravitas/AutoGPT" target="_blank" aria-label="Servicio 3">
                    <i class="bi bi-check-circle-fill"></i> AutoGPT
                  </a>
                  <a class="btn-list-item subtitle mt-3 mb-8" href="https://en.wikipedia.org/wiki/Language_model" target="_blank" aria-label="Servicio 3">
                    <i class="bi bi-check-circle-fill"></i> GPT info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>
  
  <script setup>
  // Importa aquí cualquier script necesario
  </script>
  
 <style scoped>
.blockad {
  position: relative;
  display: inline-block; /* O 'block' dependiendo de tus necesidades de layout */
}

.blockad::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px; /* Asegura que el pseudo-elemento tenga los bordes redondeados */
  background-image: linear-gradient(90deg, rgba(200,178,85,0.2) 0%, rgba(227,203,166,0.3) 23%, rgba(207,204,187,0.2) 100%);
  z-index: 1;
}

.image-filter {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 20px; /* Bordes redondeados en la imagen */
  position: relative;
  z-index: 0;
}

 .background-image-container img {
  border-radius: 20px; /* Aplica bordes redondeados a todas las imágenes dentro de .background-image-container */
}
.background-image-container {
  background-image: linear-gradient(90deg, rgba(200,178,85,0.35) 0%, rgba(227,203,166,0.7) 23%, rgba(207,204,187,0.5) 100%),  url('https://source.unsplash.com/featured/?Future&Archillect');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.container {
  max-width: 90%; /* Ajusta el ancho máximo del contenedor para permitir que el contenido ocupe más espacio */
}
.card {
  background: linear-gradient(90deg, rgba(207,204,187,1) 0%, rgba(207,204,187,1) 95%, rgba(215,93,65,1) 100%);
  border: none;
  border-radius: 20px; /* Bordes redondeados */
  margin: 0;
}

.btn-list-item {
  display: block;
  background-color: #D75D41;
  border: none;
  color: #F09F33;
  text-align: left;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  text-decoration: none; /* Elimina el subrayado de los enlaces */
}

.btn-list-item:hover {
  background-color: rgba(227,203,166,0.8);
  cursor: pointer;
}

.full-width-section {
  /* background: #fff; Ajusta según tu diseño */
  padding: 20px;
  box-shadow: 0 4px 5px #F09F33; /* Sombra opcional para resaltar la sección */
  border-radius: 20px; /* Consistente con el estilo de las cards */
}
</style>


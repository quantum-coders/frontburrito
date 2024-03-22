<template>
    <div class="background-image-container">
      <div class="container py-5">
        <div class="row g-4">
          <!-- Card de Servicios -->
          <div class="col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Servicios</h5>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="bi bi-check-circle-fill"></i> Servicio 1
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle-fill"></i> Servicio 2
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle-fill"></i> Servicio 3
                  </li>
                  <!-- Agrega más ítems según sea necesario -->
                </ul>
              </div>
            </div>
          </div>
          <!-- Card de Machine Learning -->
          <div class="col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Machine Learning</h5>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="bi bi-gear-fill"></i> ML 1
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-gear-fill"></i> ML 2
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-gear-fill"></i> ML 3
                  </li>
                  <!-- Agrega más ítems según sea necesario -->
                </ul>
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
  .background-image-container {
    background-image: url('https://source.unsplash.com/featured/?Futuristic&Archillect'); /* Asegúrate de cambiar esta ruta a tu imagen de fondo */
    background-size: cover;
    background-position: center;
    min-height: 100vh; /* Ajusta la altura según sea necesario */
  }
  
  /* Ajustes responsivos y estilos adicionales según sea necesario */
  </style>
  
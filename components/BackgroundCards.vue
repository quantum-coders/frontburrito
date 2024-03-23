<template>
    <div class="background-image-container">
      <div class="container py-5">
        <div class="row g-4">
          <!-- Card de Servicios -->
          <div class="col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Servicios</h5>
                <div class="list-unstyled">
                  <button class="btn-list-item" aria-label="Servicio 1">
                    <i class="bi bi-check-circle-fill"></i> Servicio 1
                  </button>
                  <button class="btn-list-item" aria-label="Servicio 2">
                    <i class="bi bi-check-circle-fill"></i> Servicio 2
                  </button>
                  <button class="btn-list-item" aria-label="Servicio 3">
                    <i class="bi bi-check-circle-fill"></i> Servicio 3
                  </button>
                  <!-- Agrega más ítems según sea necesario -->
                </div>
              </div>
            </div>
          </div>
          <!-- Card de Machine Learning -->
          <div class="col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Machine Learning</h5>
                <div class="list-unstyled">
                  <button class="btn-list-item" aria-label="Servicio 1">
                    <i class="bi bi-check-circle-fill"></i> Servicio 1
                  </button>
                  <button class="btn-list-item" aria-label="Servicio 2">
                    <i class="bi bi-check-circle-fill"></i> Servicio 2
                  </button>
                  <button class="btn-list-item" aria-label="Servicio 3">
                    <i class="bi bi-check-circle-fill"></i> Servicio 3
                  </button>
                  <!-- Agrega más ítems según sea necesario -->
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
.background-image-container {
  background-image: url('https://source.unsplash.com/featured/?Futuristic&Archillect');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.card {
  background: linear-gradient(90deg, rgba(200,178,85,1) 0%, rgba(227,203,166,1) 100%);
  border: none;
  border-radius: 20px; /* Bordes redondeados */
}

.btn-list-item {
  background-color: #E3CBA6; /* Color de fondo de los botones */
  border: none;
  color: #3E3C3E; /* Color del texto */
  text-align: left;
  width: 100%;
  padding: 10px 15px; /* Ajusta el padding para más espacio */
  margin-bottom: 5px; /* Espacio entre botones */
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre el ícono y el texto */
  border-radius: 10px; /* Bordes redondeados para los botones */
  transition: background-color 0.3s ease;
}

.btn-list-item:hover {
  background-color: rgba(227,203,166,0.8); /* Efecto al pasar el mouse */
  cursor: pointer;
}
</style>


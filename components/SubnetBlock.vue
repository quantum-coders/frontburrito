<template>
	<div class="block block-subnet bg-white">
	  <div class="container">
		<br><br><br>
		<!-- Sección de introducción -->
		<div class="row align-items-center flex-row-reverse">
		  <div class="col col-12 col-sm-6">
			<div>
			  <img src="/crypto_gem_burritoAI.gif"/>
			</div>
		  </div>
		  <div class="col col-12 col-sm-6">
			<div class="content text-center text-sm-start d-sm-inline-block">
			  <h2 class="title mb-3" style="color:#E3CBA6;">Multi-AI Index + Fun!</h2>
			  <h3 class="subtitle purple mb-4">$BurritoIA is building an
				Multichain AI index financial data and to offer
				tokenized real-world machine learning.</h3>
			  <p class="text-center">
				<nuxt-link class="text" to="https://traderjoexyz.com/avalanche/trade" target="_blank">See
				  <strong><u>BurritoIA</u></strong> contract on-chain
				</nuxt-link>
			  </p>
			</div>
		  </div>
		</div>
  
		<!-- Imagen central que conecta hacia abajo -->
		<div class="image-connection">
		  <img src="/defi_burrito.png" alt="Connection" class="mx-auto d-block" />
		</div>
  
		<!-- Sección de Mecanismos de Staking y Recompensas -->
		<div class="row align-items-center mt-5">
		  <div class="col col-12 col-sm-6">
			<div>
			  <img src="/ui3.png" class="mx-auto d-block" alt="Staking and Rewards"/>
			</div>
		  </div>
		  <div class="col col-12 col-sm-6">
			<div class="content text-center text-sm-start d-sm-inline-block">
			  <h2 class="subtitle purple mb-4">Staking Mechanisms & Rewards</h2>
			  <p>
				Staking Requirements: Users must stake a fixed amount of BurritoIA to access different AI embeds. This structure encourages holding and regulates the use of AI resources to prevent abuse.
			  </p>
			  <p>
				Reward Structure: For precise answers and tutorials, for example, 1000 BurritoIA is required to access, with rewards ranging from 555 to 900 BurritoIA upon task completion, encouraging active participation and learning.
			  </p>
			  <p>
				Significant Contributions: For high-impact tasks like contributions to repositories, the staking requirement remains 1000 BurritoIA, but the reward significantly rises to 90,000 BurritoIA, incentivizing quality contributions and commitment to the project.
			  </p>
			</div>
		  </div>
		</div>
  
		<!-- Otra imagen central que conecta hacia abajo -->
		<div class="image-connection">
		  <img src="/defi_burritodos.png" alt="More Connection" class="mx-auto d-block" />
		</div>
		<div class="image-connection">
		  <img src="/crypto_gem_burritoAI.gif" alt="Connection" class="mx-auto d-block" />
		</div>
  
		<!-- Agrega más secciones según la estructura proporcionada arriba, ajustando el contenido según tus necesidades -->
  
	  </div>
	</div>
  </template>
  
  <script setup>
  // Importa aquí cualquier script necesario
  </script>
  
  <style lang="sass" scoped>
	.animation
		padding: 87.5% 0 0 0
		position: relative

	iframe
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%

	.block
		padding: 5rem 0

		@media (min-width: $sm)
		padding: 0 0 10rem

	ul
		display: inline-block
	.button-app
		max-width: 80%
		margin-top: auto
	.image-connection img
		max-width: 100%
		height: auto
		padding: 50px 0 // Asegura espacio antes y después de la imagen para un flujo visual
		// Estilos para las imágenes de las secciones, asegurando que se adapten al contenedor
	.col img
		max-width: 100%
		height: auto
		margin-bottom: 2rem // Espacio debajo de las imágenes para separar del texto
	// Estilos para títulos y subtítulos para mantener coherencia visual
	.title
		color: #8A2BE2 // Cambia al color que prefieras
		font-size: 2rem
		font-weight: bold
		margin-bottom: 1rem
	.subtitle
		font-size: 1.5rem
		margin-bottom: 1.5rem
	// Estilos para el texto, para mejorar la legibilidad
	p
		font-size: 1rem
		line-height: 1.5
	// Asegura que los enlaces dentro del componente tengan un estilo distintivo
	.nuxt-link
		text-decoration: underline
</style>


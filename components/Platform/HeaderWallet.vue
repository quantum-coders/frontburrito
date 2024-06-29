<template>
	<header class="chat-header bg-light border-bottom">
		<nav class="navbar navbar-expand-lg navbar-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
					<img class="logo mb-1" src="/images/logo.svg" alt="">
					<platform-breadcumbs/>
				</a>
				<chat-nav-bar class="ms-auto"/>
			</div>
		</nav>
	</header>
</template>

<style lang="sass" scoped>
.chat-header
	padding: 0.5rem

	.logo
		height: 40px
</style>
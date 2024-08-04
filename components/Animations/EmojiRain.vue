<template>
	<div id="container">
		<div id="animate"></div>
	</div>
</template>

<script setup>
	import { onMounted, ref, watch } from 'vue';

	// Define props
	const props = defineProps({
		emojis: {
			type: Array,
			required: true,
		},
		speed: {
			type: Number,
			required: true,
		},
		density: {
			type: Number,
			required: true,
		},
		spawn: {
			type: Boolean,
			required: true,
		},
	});

	const circles = ref([]);

	// Function to create a new Circle and add it to the circles array
	function addCircle(delay, emoji) {
		setTimeout(() => {
			if(!props.spawn) return; // Check if spawning is allowed

			const fontSize = Math.random() * 20 + 20; // Random font size between 20px and 40px
			const blurAmount = Math.max(0, 2 - (fontSize - 20) / 10); // Calculate blur based on font size

			// Random x-position as a percentage of the container's width
			const xPercent = Math.random() * 100; // Range from 0 to 100%

			const circle = new Circle(
				xPercent, // Set initial x as percentage
				-Math.random() * 100, // Spawn outside the viewport
				emoji,
				{ x: -0.15 + Math.random() * 0.3, y: props.speed + Math.random() },
				Math.random() * 360, // Random initial rotation
				fontSize,
				blurAmount, // Pass blur amount
			);
			circles.value.push(circle);
		}, delay);
	}

	// Circle class to define individual emoji behavior
	class Circle {
		constructor(xPercent, y, emoji, velocity, rotation, fontSize, blurAmount) {
			this.xPercent = xPercent;
			this.y = y;
			this.emoji = emoji;
			this.velocity = velocity;
			this.rotation = rotation;
			this.fontSize = fontSize;
			this.blurAmount = blurAmount;
			this.element = document.createElement('span');
			this.element.style.display = 'block';
			this.element.style.opacity = 0;
			this.element.style.position = 'absolute';
			this.element.style.fontSize = `${ fontSize }px`;
			this.element.style.filter = `blur(${ blurAmount }px)`;
			this.element.innerHTML = emoji;
			document.getElementById('animate').appendChild(this.element);
		}

		update(containerHeight, containerWidth) {
			if(this.y > containerHeight + 100) {
				if(props.spawn) {
					this.y = -Math.random() * 100; // Reset to outside the viewport
					this.xPercent = Math.random() * 100; // Reset x-position as a percentage
					this.rotation = Math.random() * 360; // Reset rotation
				}
			}

			this.y += this.velocity.y;
			this.xPercent += (this.velocity.x / containerWidth) * 100; // Update x-percent
			this.rotation += 1; // Increment rotation for animation
			this.element.style.opacity = 1;

			// Calculate the x-position in pixels based on the container width
			const xPosition = (this.xPercent / 100) * containerWidth;
			this.element.style.transform = `translate3d(${ xPosition }px, ${ this.y }px, 0) rotate(${ this.rotation }deg)`;

			// Set the zIndex based on the fontSize
			this.element.style.zIndex = Math.floor(this.fontSize);
		}
	}

	// Initialize circles with specified positions and delays
	const initializeCircles = () => {
		circles.value = []; // Clear existing circles
		for(let i = 0; i < props.density; i++) {
			const randomEmoji = props.emojis[Math.floor(Math.random() * props.emojis.length)];
			addCircle(i * 150, randomEmoji);
		}
	};

	// Animation loop to update circle positions
	const animate = () => {
		const container = document.getElementById('container');
		const containerHeight = container.offsetHeight;
		const containerWidth = container.offsetWidth;

		circles.value.forEach(circle => circle.update(containerHeight, containerWidth));

		requestAnimationFrame(animate);
	};

	onMounted(() => {
		initializeCircles();
		animate();
	});

	watch(() => [ props.emojis, props.speed, props.density, props.spawn ], () => {
		if(props.spawn) {
			initializeCircles();
		}
	});
</script>

<style lang="sass" scoped>
	#container
		left: 0
		position: absolute
		width: 100%
		top: -100px
		height: calc(100% + 100px)

	#animate
		margin: 0 auto
		width: 100%
		overflow: visible
		position: relative
</style>

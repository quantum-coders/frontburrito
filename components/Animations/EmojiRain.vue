<template>
	<div id="container" ref="containerRef">
		<div id="animate" ref="animateRef"></div>
	</div>
</template>

<script setup>

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

	// We store references to the DOM elements
	const containerRef = ref(null);
	const animateRef = ref(null);

	const circles = ref([]);

	// We pass `animateRef.value` to the constructor instead of using document.getElementById
	class Circle {
		constructor(xPercent, y, emoji, velocity, rotation, fontSize, blurAmount, parentEl) {
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
			this.element.style.fontSize = `${fontSize}px`;
			this.element.style.filter = `blur(${blurAmount}px)`;
			this.element.innerHTML = emoji;

			// parentEl is basically animateRef.value
			parentEl.appendChild(this.element);
		}

		update(containerHeight, containerWidth) {
			// The rest of your existing logic...
			if (this.y > containerHeight + 100) {
				if (props.spawn) {
					this.y = -Math.random() * 100;
					this.xPercent = Math.random() * 100;
					this.rotation = Math.random() * 360;
				}
			}

			this.y += this.velocity.y;
			this.xPercent += (this.velocity.x / containerWidth) * 100;
			this.rotation += 1;
			this.element.style.opacity = 1;

			const xPosition = (this.xPercent / 100) * containerWidth;
			this.element.style.transform = `translate3d(${xPosition}px, ${this.y}px, 0) rotate(${this.rotation}deg)`;
			this.element.style.zIndex = Math.floor(this.fontSize);
		}
	}

	function addCircle(delay, emoji) {
		setTimeout(() => {
			if (!props.spawn) return;

			const fontSize = Math.random() * 20 + 20;
			const blurAmount = Math.max(0, 2 - (fontSize - 20) / 10);
			const xPercent = Math.random() * 100;

			// Pass animateRef.value as the 'parentEl'
			const circle = new Circle(
				xPercent,
				-Math.random() * 100,
				emoji,
				{x: -0.15 + Math.random() * 0.3, y: props.speed + Math.random()},
				Math.random() * 360,
				fontSize,
				blurAmount,
				animateRef.value
			);
			circles.value.push(circle);
		}, delay);
	}

	function initializeCircles() {
		circles.value = [];
		for (let i = 0; i < props.density; i++) {
			const randomEmoji = props.emojis[Math.floor(Math.random() * props.emojis.length)];
			addCircle(i * 150, randomEmoji);
		}
	}

	function animate() {
		// Use the containerRef for width/height
		const container = containerRef.value;
		if (!container) return; // sanity check
		const containerHeight = container.offsetHeight;
		const containerWidth = container.offsetWidth;

		circles.value.forEach(circle => circle.update(containerHeight, containerWidth));
		requestAnimationFrame(animate);
	}

	onMounted(() => {
		initializeCircles();
		animate();
	});

	watch(() => [props.emojis, props.speed, props.density, props.spawn], () => {
		if (props.spawn) {
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

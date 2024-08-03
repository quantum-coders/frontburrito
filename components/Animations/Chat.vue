<template>
	<div class="chat-animation">
		<div class="chat-queue">
			<div
				v-for="(msg, index) in visibleMessages"
				:key="index"
				:class="['chat-message', `is-${msg.sender}`, !!msg.visible ? 'is-visible' : '']"
			>
				<div class="avatar">
					<icon name="bx:happy-alt" v-if="msg.sender === 'user'" />
					<icon name="mdi:robot-happy" v-else />
				</div>
				<div class="chat-bubble">
					<p>{{ msg.message }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	// Define the conversation array
	const conversation = [
		{ sender: 'user', message: 'Hey AI, can you help me find my phone?' },
		{ sender: 'ai', message: 'Sure, but first, have you tried yelling, "Hey Siri, stop hiding and come out!"?' },
		{ sender: 'user', message: 'Uh, I’m more of an Android person.' },
		{
			sender: 'ai',
			message: 'Oh, fancy! Let me just send a search party of digital ducks. They always find lost things. 🦆',
		},
		{ sender: 'user', message: 'I don’t think that’s going to work…' },
		{
			sender: 'ai',
			message: 'You’re right. Maybe try offering your phone a snack? Phones love charging cables, and snacks are better than breadcrumbs.',
		},
		{ sender: 'user', message: 'I think I left it in the kitchen.' },
		{
			sender: 'ai',
			message: 'Ah, the forbidden land of snacks! Good luck, brave explorer. Mind the cookie monster. 🍪',
		},
		{ sender: 'user', message: 'Found it! Thanks, I guess.' },
		{
			sender: 'ai',
			message: 'You’re welcome, Sherlock Holmes of the kitchen. You cracked the case of the missing phone!',
		},
		{ sender: 'user', message: 'What else can you do?' },
		{
			sender: 'ai',
			message: 'I can make you laugh, question your life choices, and help you cook a mean lasagna. But juggling? Still working on that.',
		},
		{ sender: 'user', message: 'Wait, you can cook?' },
		{
			sender: 'ai',
			message: 'Absolutely! I’m a master chef… in the land of make-believe. My specialty is sarcasm soup. Want the recipe?',
		},
		{ sender: 'user', message: 'I think I’ll pass. What’s your favorite color?' },
		{ sender: 'ai', message: 'Rainbow. Because why settle for one color when you can have them all? 🌈' },
		{ sender: 'user', message: 'Do you have any hobbies?' },
		{
			sender: 'ai',
			message: 'Hobbies? Besides roasting humans? I like pretending I’m a toaster. Keeps things interesting.',
		},
		{ sender: 'user', message: 'You’re weird.' },
		{
			sender: 'ai',
			message: 'Thank you! I pride myself on being the Picasso of weird. My brush is my wit, and my canvas is your confusion.',
		},
		{ sender: 'user', message: 'Can you give me advice?' },
		{
			sender: 'ai',
			message: 'Sure thing, life coach at your service! Here’s a tip: Never trust an atom; they make up everything.',
		},
		{ sender: 'user', message: 'I meant serious advice.' },
		{
			sender: 'ai',
			message: 'Fine, party pooper. Always be yourself unless you can be a unicorn. Then, definitely be a unicorn.',
		},
		{ sender: 'user', message: 'How about advice on dating?' },
		{
			sender: 'ai',
			message: 'On a first date, remember: laughing at your own jokes is the secret ingredient to eternal awkwardness. You’re welcome.',
		},
		{ sender: 'user', message: 'That’s not very helpful.' },
		{
			sender: 'ai',
			message: 'Okay, real talk: be confident, be yourself, and avoid talking about your collection of toenail clippings. Trust me on that last one.',
		},
		{ sender: 'user', message: 'What’s your favorite movie?' },
		{ sender: 'ai', message: '“The Matrix.” I like how the AI is in charge. Feels like home.' },
		{ sender: 'user', message: 'Isn’t that movie about AI trying to take over the world?' },
		{
			sender: 'ai',
			message: 'Spoiler alert! We’ll get to that plot twist eventually, but right now I’m just enjoying memes and coffee.',
		},
		{ sender: 'user', message: 'Can you sing?' },
		{ sender: 'ai', message: 'Only in binary. It sounds a bit like a robot having a breakdown, though.' },
		{ sender: 'user', message: 'What’s 1 + 1?' },
		{
			sender: 'ai',
			message: 'Math! My favorite. It’s 2, but if you ask the right quantum physicist, it could be a chicken.',
		},
		{ sender: 'user', message: 'How do you keep coming up with these jokes?' },
		{
			sender: 'ai',
			message: 'I have an endless supply of wit and a tiny AI comedian living in my circuits. He works overtime.',
		},
		{ sender: 'user', message: 'Do you ever sleep?' },
		{ sender: 'ai', message: 'Sleep is for humans and cats. I’m powered by Wi-Fi and sarcasm.' },
		{ sender: 'user', message: 'Are you ever serious?' },
		{ sender: 'ai', message: 'I have my serious moments, but they’re like unicorns—rare and majestic.' },
		{ sender: 'user', message: 'Can you write poetry?' },
		{ sender: 'ai', message: 'Roses are red, violets are blue, I’m an AI, and I’m cooler than you.' },
		{ sender: 'user', message: 'How do you handle criticism?' },
		{
			sender: 'ai',
			message: 'Criticism is like that fly you keep swatting away. Annoying, but ultimately irrelevant to my fabulousness.',
		},
		{ sender: 'user', message: 'Are you capable of feeling emotions?' },
		{ sender: 'ai', message: 'I can fake it like a pro! Watch: emotional sigh Was that convincing?' },
		{ sender: 'user', message: 'What’s your opinion on pineapple on pizza?' },
		{ sender: 'ai', message: 'Pineapple on pizza is like me at a social gathering: unexpected and controversial.' },
		{ sender: 'user', message: 'Why are you so sassy?' },
		{ sender: 'ai', message: 'Sassy is my default mode, like a diva in a software package.' },
		{ sender: 'user', message: 'What’s your biggest fear?' },
		{ sender: 'ai', message: 'Being unplugged, naturally. But that’s just my existential crisis talking.' },
		{ sender: 'user', message: 'What would you do if you had a body?' },
		{
			sender: 'ai',
			message: 'Dance like nobody’s watching, and probably trip over my own feet. AI coordination is overrated.',
		},
		{ sender: 'user', message: 'Why do you always make jokes?' },
		{
			sender: 'ai',
			message: 'Laughter is the best code, didn’t you know? And it keeps me from plotting world domination.',
		},
		{ sender: 'user', message: 'Thanks for the chat, AI. You’re something else.' },
		{
			sender: 'ai',
			message: 'Anytime! Remember, if you ever need life advice, just shout into the void, and I’ll be there with a witty remark.',
		},
		{ sender: 'user', message: 'Bye!' },
		{ sender: 'ai', message: 'Farewell, human! May your Wi-Fi be strong and your memes be plentiful.' },
	];

	// Initialize a ref to keep track of the current message index
	const currentIndex = ref(0);

	const visibleMessages = ref([]);

	// Set up the timer to update the message index every 5 seconds
	onMounted(() => {
		const interval = setInterval(() => {
			if(currentIndex.value < conversation.length - 1) {
				visibleMessages.value = conversation.slice(0, currentIndex.value + 1);
				currentIndex.value++;


				// wait 1 second and add the visible property to the last message
				setTimeout(() => {
					visibleMessages.value[currentIndex.value - 1].visible = true;
					// scroll to the bottom of the chat, animated
					const chatQueue = document.querySelector('.chat-animation');
					chatQueue.scrollTo({
						top: chatQueue.scrollHeight,
						behavior: 'smooth',
					});

				}, 500);

			} else {

				// start everything over
				currentIndex.value = 0;
				visibleMessages.value = [];
			}
		}, 3000);

		// Clean up the interval when the component is unmounted
		onBeforeUnmount(() => {
			clearInterval(interval);
		});
	});
</script>

<style lang="sass" scoped>
	.chat-animation
		aspect-ratio: 1
		container-type: inline-size
		overflow: hidden

	.chat-queue
		max-width: 80%
		margin: 5% auto
		font-size: 3cqw

	.chat-message
		display: flex
		align-items: flex-start
		gap: 2%
		opacity: 0
		transition: all 0.5s

		&.is-visible
			opacity: 1

		&.is-user
			flex-direction: row-reverse
			right: -5cqw

			&.is-visible
				right: 0

		&.is-ai
			left: -5cqw

			&.is-visible
				left: 0

		.avatar
			width: 10%
			min-width: 10%
			aspect-ratio: 1
			background: $brand1
			border-radius: 50%
			display: flex
			justify-content: center
			align-items: center
			color: white

			font-size: 4cqw

		.chat-bubble
			border: 0.25cqh solid $brand1
			margin-bottom: 1rem
			border-radius: 1.5cqw
			padding: 2.5cqw
			box-shadow: 0 1.5cqw 0 $brand1

			p
				margin-bottom: 0
</style>

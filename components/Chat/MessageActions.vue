<template>
	<div
		class="d-flex"
		:class="{'justify-content-end': type === 'ai', 'justify-content-start': type === 'user'}"
	>
		<div class="btn-group">
			<button
				class="btn btn-outline-primary btn-xs"
				@click="handleCopy('markdown')"
				:title="isCopied?.type === 'markdown' ? 'Markdown copied!' : 'Copy markdown'"
			>
				<Icon
					:name="isCopied?.type === 'markdown' ? 'ph:check-bold' : 'ph:code'"
					class="opacity-75"
				/>
			</button>
			<button
				class="btn btn-outline-primary btn-xs"
				@click="handleCopy('text')"
				:title="isCopied?.type === 'text' ? 'Text copied!' : 'Copy text'"
			>
				<Icon
					:name="isCopied?.type === 'text' ? 'ph:check-bold' : 'ph:copy'"
					class="opacity-75"
				/>
			</button>
			<div class="btn-group">
				<button
					class="btn btn-outline-primary btn-xs dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<Icon name="ph:dots-three-vertical" class="opacity-75"/>
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
					<li>
						<button class="dropdown-item d-flex align-items-center" @click="$emit('download')">
							<Icon name="ph:download" class="me-2"/>
							Download
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		type: {
			type: String,
			required: true,
			validator: (value) => ['user', 'ai'].includes(value),
		},
		messageContent: {
			type: String,
			required: true,
		},
		renderedContent: {
			type: String,
			required: true,
		},
	});

	const emit = defineEmits(['download']);
	const isCopied = ref(null);

	const handleCopy = async (type) => {
		try {
			const content = type === 'markdown' ? props.messageContent : props.renderedContent;
			await navigator.clipboard.writeText(content);
			isCopied.value = {type};
			setTimeout(() => {
				isCopied.value = null;
			}, 2000);
		} catch (err) {
			console.error('Error copying:', err);
		}
	};
</script>

<style lang="scss" scoped>
	.btn-xs {
		padding: 0.25rem 0.4rem;
		font-size: 0.75rem;
		line-height: 1.5;
		border-radius: 0.2rem;
	}
</style>

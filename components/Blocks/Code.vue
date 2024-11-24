<!-- components/CodeBlock.vue -->
<template>
	<div class="code-block-wrapper">
		<div class="code-header">
			<span class="code-language-label">{{ language }}</span>
			<button
				class="code-copy-btn"
				@click="copyCode"
				:class="{ 'copied': isCopied }"
			>
				<span>{{ isCopied ? 'Copied!' : 'Copy' }}</span>
				<Icon :name="isCopied ? 'ph:check-bold' : 'ph:copy'"/>
			</button>
		</div>
		<pre class="code-pre"><code :class="`hljs language-${language}`" v-html="highlightedCode"></code></pre>
	</div>
</template>

<script setup>
	import hljs from 'highlight.js';

	const props = defineProps({
		code: {
			type: String,
			required: true
		},
		language: {
			type: String,
			default: 'plaintext'
		}
	});

	const isCopied = ref(false);

	const highlightedCode = computed(() => {
		try {
			return hljs.highlight(props.code, {
				language: props.language,
				ignoreIllegals: true
			}).value;
		} catch (e) {
			console.warn(`Failed to highlight ${props.language} code:`, e);
			return props.code;
		}
	});

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(props.code);
			isCopied.value = true;
			setTimeout(() => {
				isCopied.value = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	};
</script>

<style lang="scss">
	.code-block-wrapper {
		margin: 1.5rem 0;
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--bs-dark);
		border: 1px solid rgba(255, 255, 255, 0.1);

		.code-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.75rem 1rem;
			background: rgba(0, 0, 0, 0.3);
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);

			.code-language-label {
				font-size: 0.875rem;
				color: var(--bs-light);
				font-weight: 500;
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.code-copy-btn {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.5rem 1rem;
				font-size: 0.875rem;
				color: var(--bs-light);
				background: rgba(255, 255, 255, 0.1);
				border: none;
				border-radius: 0.25rem;
				cursor: pointer;
				transition: all 0.2s ease;

				&:hover {
					background: rgba(255, 255, 255, 0.15);
				}

				&.copied {
					background: var(--bs-success);
				}

				.icon {
					width: 1rem;
					height: 1rem;
				}
			}
		}

		.code-pre {
			margin: 0;
			padding: 1rem;
			overflow-x: auto;
			background: transparent;

			code {
				font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
				font-size: 0.875rem;
				line-height: 1.5;
			}
		}
	}
</style>

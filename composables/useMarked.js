import { marked } from 'marked';

export const useMarked = () => {
	const convertMarkdownToHtml = (markdown) => {
		return marked.parse(markdown);
	};

	return {
		convertMarkdownToHtml
	};
};

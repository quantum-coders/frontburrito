import MarkdownIt from 'markdown-it';

export default defineNuxtPlugin(() => {
  const md = new MarkdownIt({
    html: true, // Permitir HTML en el Markdown
    linkify: true, // Convertir URLs en enlaces
    typographer: true // Activar tipografía inteligente
  });

  return {
    provide: {
      mdRenderer: md
    }
  };
});
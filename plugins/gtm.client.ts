// plugins/gtm.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const GTM_ID = 'GTM-KSS5DT2L' // config.GTM_ID

  useHead({
    script: [
      {
        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`
      }
    ],
  })

  // Opcional: Helper para enviar eventos personalizados
  const gtm = {
    push: (event: object) => {
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push(event)
      }
    }
  }

  return {
    provide: {
      gtm
    }
  }
})

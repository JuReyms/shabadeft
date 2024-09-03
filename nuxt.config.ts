// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  pages: true,
  modules: ['vuetify-nuxt-module', 
    'nuxt-mdi', 
    ['@nuxtjs/google-fonts', {
    families: {
      Roboto: true,
    }
}]
],
  app: {
    //pageTransition: { name: 'page', mode: 'out-in' },

    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Shabadeft - Battle songs',
      meta: [
        { name: 'description', content: 'Shabadeft' },
        { name: 'type', content: 'website' },
        { name: 'robots', content: 'index,follow' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/manifest.json' },



      ],
    
    },
  } 
})
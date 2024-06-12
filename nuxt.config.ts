// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/supabase"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  // supabase: {
  //   redirectOptions: {
  //     login: '/login',
  //     callback: '/confirm',
  //     include: ['/', '/showFile'],
  //   }
  // }
})
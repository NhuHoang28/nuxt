import {defineNuxtConfig} from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    'bootstrap-vue-3/nuxt',
    '@vueuse/nuxt',
  ],
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '~/assets/css/global.css',
  ],
  meta: {
    title: process.env.APP_NAME || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.APP_NAME || ''},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/assets/logo.svg'},
    ],
  },
  components: [
    '~/components',
    '~/components/buttons',
    '~/components/headers',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/',
    },
  },
});

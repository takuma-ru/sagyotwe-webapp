import { defineNuxtConfig } from 'nuxt'
import { VitePWA } from 'vite-plugin-pwa'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  plugins: [
    { src: '/plugins/vue-swipe-modal.ts', mode: 'client' }
  ],

  app: {
    head: {
      title: 'さぎょツイ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '日々の作業日記を自動でツイートしてくれるサービス' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon_rounded.png' },
        { rel: 'apple-touch-icon', href: '/apple_touch_icon.png', size: '180x180' },
        { rel: 'mask-icon', color: '#FCFCF9', href: '/mask_icon.svg' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap'
        },
        {
          rel: 'manifest',
          dataNHead: '1',
          dataHid: 'manifest',
          href: 'manifest.webmanifest'
        }
      ]
    }
  },

  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        devOptions: {
          enabled: false
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
        },
        includeAssets: ['icon_rounded.png', 'apple_touch_icon.png', 'masked_icon.svg'],
        manifest: {
          lang: 'ja',
          name: 'さぎょツイ',
          short_name: 'さぎょツイ',
          description: '日々の作業日記を自動でツイートしてくれるサービス',
          start_url: '/',
          display: 'standalone',
          background_color: '#FCFCF9',
          theme_color: '#FCFCF9',
          icons: [
            {
              src: '/icons/icon_64.png',
              type: 'image/png',
              sizes: '64x64',
              purpose: 'any'
            },
            {
              src: '/icons/icon_120.png',
              type: 'image/png',
              sizes: '120x120',
              purpose: 'any'
            },
            {
              src: '/icons/icon_144.png',
              type: 'image/png',
              sizes: '144x144',
              purpose: 'any'
            },
            {
              src: '/icons/icon_152.png',
              type: 'image/png',
              sizes: '152x152',
              purpose: 'any'
            },
            {
              src: '/icons/icon_192.png',
              type: 'image/png',
              sizes: '192x192',
              purpose: 'any'
            },
            {
              src: '/icons/icon_384.png',
              type: 'image/png',
              sizes: '384x384',
              purpose: 'any'
            },
            {
              src: '/icons/icon_512.png',
              type: 'image/png',
              sizes: '512x512',
              purpose: 'any'
            }
          ]
        }
      })
    ]
  }
})

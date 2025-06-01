import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // put lazy loaded JavaScript and Wasm bundles in dist directory
    viteStaticCopy({
      targets: [
        { src: 'node_modules/@itk-wasm/image-io/dist/pipelines/*.{js,wasm,wasm.zst}', dest: 'pipelines' },
      ],
    }),
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: [
      '@itk-wasm/image-io'
    ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      // https://www.npmjs.com/package/vite-plugin-components
      ViteComponents({
        customComponentResolvers: [ElementPlusResolver()],
      }),
      // https://github.com/vbenjs/vite-plugin-style-import
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`
            }
          },
        ],
      }),
    ],
    base: mode === 'development' ? '/' : './',
    server: {
      port: 8888,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '/src'),
      },
    },
  })

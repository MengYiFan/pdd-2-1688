import App from './App'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import 'element-plus/theme-chalk/index.css'

import Clipboard from './directive/clipboard'

const app = createApp(App)

app.directive('clipboard', {
  mounted(el, binding) {
    new Clipboard(el, binding?.value?.text ?? 'Default Copy Value.')
  }
})

app.use(router).use(store).mount('#app')
import App from './App'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import 'element-plus/theme-chalk/index.css'
import Clipboard from './directives/clipboard/index'

const app = createApp(App)
app.directive('clipboard', Clipboard)
app.use(router).use(store).mount('#app')
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/fonts/fonts.css'
import './assets/icons/iconfont.css'
import App from './App.vue'
// import router from './router/index.js'

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
// app.use(router)
app.mount('#app')
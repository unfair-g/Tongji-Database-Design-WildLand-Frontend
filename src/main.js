import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/fonts/fonts.css'
import './assets/icons/iconfont.css'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import { loadFromSessionStorage } from '@/store/global';

const app = createApp(App)

loadFromSessionStorage();
app.use(ElementPlus)
app.use(router)
app.use(store)

store.dispatch('admin/initializeStore');

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import { createRouter, createWebHashHistory} from 'vue-router'
import HelloWorld from '../pages/HelloWorld.vue'
const routes = [
    {
        path: '/',
        name: 'welcome',
        component: HelloWorld
    },
    {
        path: '/home',
        name: 'about',
        component: () => import('../pages/HomePage.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
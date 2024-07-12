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
        name: 'home',
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/enter',
        component: () => import('../views/EnterView.vue')
    }

]
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router
import { createRouter, createWebHashHistory} from 'vue-router'
import HelloWorld from '../pages/HelloWorld.vue'
import ProductView from '@/views/ProductView.vue'
import ProductDetail from '@/views/ProductDetail.vue'

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
    }，
  {
    path: '/goods',
    name: 'ProductView',
    component: ProductView
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  }
]


]
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router

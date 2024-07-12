import { createRouter, createWebHashHistory } from 'vue-router'
import ProductView from '@/views/ProductView.vue'
import ProductDetail from '@/views/ProductDetail.vue'

const routes = [
  {
    path: '/',
    name: 'ProductView',
    component: ProductView
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

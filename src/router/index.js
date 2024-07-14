import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../pages/HelloWorld.vue'

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: HelloWorld
    },
    {
        path: '/administrator',
        component: () => import('../pages/AdministratorPage.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/HomePage.vue'),
        children: [
            {
                path: "",
                component: () => import('../views/HomeView.vue')
            },
            {
                path: "product",
                component: () => import('../views/ItemView.vue')
            },
            {
                path: "forum",
                component: () => import('../views/ForumView.vue')
            },
            {
                path: "campground",
                component: () => import('../views/CampgroundView.vue')
            },
            {
                path: "userspace",
                component: () => import('../views/UserSpaceView.vue')
            }
        ]
    },
    {
        path: '/enter',
        component: () => import('../views/EnterView.vue'),
        children: [
            {
                path: "login",
                component: () => import('../components/LogIn.vue')
            },
            {
                path: "enrollment",
                component: () => import('../components/UserEnroll.vue')
            }
        ]
    }
        component: () => import('../views/EnterView.vue')
    },
    {
        path: '/',
        name: 'ProductView',
        component: ProductView
      },
      {
        path: '/home/product/:id',
        name: 'ProductDetail',
        component: ProductDetail
      }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router

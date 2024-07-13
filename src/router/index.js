import { createRouter, createWebHashHistory} from 'vue-router'
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
            }
        ]
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

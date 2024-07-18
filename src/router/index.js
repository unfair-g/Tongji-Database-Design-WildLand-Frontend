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
        component: () => import('../pages/AdministratorPage.vue'),
        children: [
            {
                path: 'postaudit',
                name: 'PostAudit',
                component: () => import('../views/PostAudit.vue')
            },
            {
                path: 'postdetail',
                name: 'PostDetail',
                component: () => import('../views/PostDetail.vue')
            }
        ]
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
                component: () => import('../views/ItemView.vue'),
<<<<<<< Updated upstream
=======
                props: true
>>>>>>> Stashed changes
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
                component: () => import('../views/UserSpaceView.vue'),
                children: [
                    {
                        path: "order",
                        component: () => import('../views/LeaseView.vue')
                    }
                ]
            },
            {
                path: "flash",
                component: () => import('../views/FlashView.vue')
<<<<<<< Updated upstream
=======
            },
            {
                path: "campdetail/:campID",
                component: () => import('../views/CampDetailView.vue'),
                props: true
            },
            {
                path: "product/:productID",
                component: () => import('../views/ProductDetail.vue'),
                props: true
            },
            {
                path: "flash/:id",
                component: () => import('../views/FlashDetail.vue')
            },
            {
                path: 'product/:productID/order',
                component: () => import('../components/OrderView.vue'),
                props: true
            },
            {
                path:"userspace/order/:id",
                component: () => import('../components/OrderView.vue'),
                props: true
>>>>>>> Stashed changes
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
    },
    {
        path: '/home/product/:id',
        component: () => import('../views/ProductDetail.vue'),
    },
    {
        path: '/home/product/:id/order',
        component: () => import('../components/OrderView.vue')
    }
            },
            {
                path: 'findkey',
                component: () => import('../components/FindKey.vue')
            }
        ]
    }

]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router

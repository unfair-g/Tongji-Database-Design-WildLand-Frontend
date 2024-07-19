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
            },
            {
                path: 'reportreview',
                name: 'ReportReview',
                component: () => import('../views/ReportReview.vue')
            },
            {
                path: 'flashadd',
                name: 'FlashAdd',
                component: () => import('../views/FlashAdd.vue')
            },
            {
                path: 'flashaudit',
                name: 'FlashAudit',
                component: () => import('../views/FlashAudit.vue')
            },
            {
                path: 'tagaudit',
                name: 'TagAudit',
                component: () => import('../views/TagAudit.vue')
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
                props: true
            },
            {
                path: "forum",
                component: () => import('../views/ForumView.vue')
            },
            {
                path: "campground",
                
                children: [
                    {
                        path: "",
                        component: () => import('../views/CampgroundView.vue')
                    },
                    {
                        path: "/:campID",
                        component: () => import('../views/CampDetailView.vue'),
                        props: true
                    }
                ]
            },
            {
                path: "userspace",
                component: () => import('../views/UserSpaceView.vue'),
                children: [
                    {
                        path: "order",
                        component: () => import('../views/LeaseView.vue')
                    }，
                    {
                        path: '',
                        component: () => import('../views/PersonalCenterView.vue')
                    }
                ]
            },
            {
                path: "flash",
                component: () => import('../views/FlashView.vue')
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
            },
            {
                path: 'findkey',
                component: () => import('../components/FindKey.vue')
            }
        ]
    },
    {
        path: '/home/product/:id/order',
        component: () => import('../components/OrderView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router

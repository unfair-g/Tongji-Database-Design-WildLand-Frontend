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
                path: 'personalinformation',
                name: 'PersonalInformation',
                component: () => import('../views/PersonalInformation.vue')
            },
            {
                path: 'OutdoorGear',
                name: 'OutdoorGear',
                component: () => import('../views/OutdoorGear.vue')
            },
            {
                path: 'AdminCamp',
                name: 'AdminCamp',
                component: () => import('../views/AdminCamp.vue')
            },
            {
                path: 'GeekAudit',
                name: 'GeekAudit',
                component: () => import('../views/GeekAudit.vue')
            },
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
                path: 'post-report-detail/:id',
                name: 'PostReportDetail',
                component: () => import('../views/PostReportDetail.vue')
            },
            {
                path: 'comment-report-detail/:id',
                name: 'CommentReportDetail',
                component: () => import('../views/CommentReportDetail.vue')
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
                path: 'tagaudit/tagchange',
                name: 'TagChange',
                component: () => import('../views/TagChange.vue')
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
                path: '/home/product/edit/:productId',
                component: () => import('../views/AdminProductEdit.vue'),
                props: true
            },
            {
                path: "forum",
                component: () => import('../views/ForumView.vue'),
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
                    },
                    {
                        path: '',
                        component: () => import('../views/PersonalCenterView.vue')
                    },
                    {
                        path: "camporder",
                        component: () => import('../views/UserCampOrderListView.vue')
                    },
                    {
                        path: 'star',
                        component: () => import('../components/UserFavourites.vue')
                    }
                ]
            },
            {
                path: "flash",
                component: () => import('../views/FlashView.vue'),
                props: true
            },
            {
                path: "campdetail/:campID",
                component: () => import('../views/CampDetailView.vue'),
                props: true
            },
            {
                path: 'AdminCampEdit/:campID',
                component: () => import('../views/AdminCampEdit.vue'),
                props: true
            },
            {
                path: "campbooking/:campID",
                component: () => import('../views/CampBookingView.vue'),
                props: true
            },
            {
                path: "camporder",
                component: () => import('../views/CampOrderView.vue'),
                props: true
            },
            {
                path: "product/:productID",
                component: () => import('../views/ProductDetail.vue'),
                props: true
            },
            {
                path: "flash/:flashID",
                component: () => import('../views/FlashDetail.vue'),
                props: true
            },
            {
                path: 'product/:productID/order',
                component: () => import('../views/OrderView.vue'),
                props: true
            },
            {
                path: "userspace/order/:id",
                component: () => import('../views/OrderView.vue'),
                props: true
            },
            {
                path: "forum/post/:type/:postID",
                component: () => import('../views/postDetailView.vue'),
                props: route => ({ type: route.params.type, postID: route.params.postID })
            },
            {
                path: "forum/publish",
                component: () => import('../views/PublishAPost.vue'),
                props: route => ({ command: route.query.command }) // 通过query传递参数
            },
            {
                path: "userspace/camporder/:id",
                component: () => import('../views/CampOrderDetailView.vue'),
                props: true
            },
            {
                path: "forum/lease/:ldleitemspostID",
                component: () => import('../components/LdleitemsPost.vue'),
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
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router

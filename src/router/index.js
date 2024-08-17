import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../pages/HelloWorld.vue'
import { ElMessage } from 'element-plus'

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: HelloWorld
    },
    {
        path: '/administrator',
        component: () => import('../pages/AdministratorPage.vue'),
        meta: { requiresAuth: true },
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
                path: 'postdetail/:id', // 添加 :id 作为动态路由参数
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
                path: "flashaudit/:flashID",
                component: () => import('../views/FlashAdd.vue'),
                props: true
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
        meta: { requiresAuth: true },
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
                        path: "leaseorder",
                        component: () => import('../components/UserLeaseOrderList.vue')
                    },
                    {
                        path: 'star',
                        component: () => import('../components/UserFavourites.vue')
                    },
                    {
                        path: 'information',
                        component: () => import('../views/PersonalInformation.vue')
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
                props: route => ({
                    type: route.params.type,
                    postID: route.params.postID,
                })

            },
            {
                path: "forum/post/lease/:ldleitemsPostID",
                component: () => import('../components/LdleitemsPostDetail.vue'),
                props: true
            },
            {
                path: "userspace/camporder/:id",
                component: () => import('../views/CampOrderDetailView.vue'),
                props: true
            },
            {
                path: `userspace/leaseorder/:ldleitemsPostId`,
                component: () => import('../views/PostOrderView.vue'),
                props: true
            },
            {
                path: `userspace/:userId`,
                component: () => import('../views/OtherUserSpace.vue'),
                props: true
            },
            {
                path: `searchFlash`,
                component: () => import('../views/SearchFlash.vue'),
                props: true
            },
            {
                path: `searchFlash`,
                component: () => import('../views/SearchFlash.vue'),
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
                name: 'Login',
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

router.beforeEach((to, from, next) => {

    const isLogin = sessionStorage.getItem('state');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 需要登录的路由
        if (!isLogin) {
            // 未登录用户
            next({ name: 'Login' }); // 重定向到登录页面
            ElMessage.error('请先登录！');
        } else {
            next(); // 允许访问
        }
    } else {
        next(); // 不需要登录的路由，允许访问
    }
});

export default router

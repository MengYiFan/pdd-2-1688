import {
  createRouter,
  RouteRecordRaw,
  NavigationGuardNext,
  createWebHistory,
  RouteLocationNormalized
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      type: 'Index'
    },
    component: () => import('@/pages/index/index')
  },
  {
    path: '/parse/excel',
    name: 'parseExcel',
    component: () => import('@/pages/parseExcel/index')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    next()
  }
)

export default router
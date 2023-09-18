import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

// createRouter 创建路由实力
// 配置history模式
// 1.history模式：createWebHistory 不带#
// 2.hash模式：createWebHashHistory 地址栏带#
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/loginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/articleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/articleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/userProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/userAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/userPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  // 如果没有token 访问非登录页拦截
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router

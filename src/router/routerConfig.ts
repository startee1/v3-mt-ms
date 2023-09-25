import {  RouteRecordRaw } from "vue-router";
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Login/Register.vue'


export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  // {
  //   path: '/403',
  //   name: '403',
  //   component: () => import('@/views/Error/403.vue')
  // },
  // {
  //   path: '/:pathMath(.*)*',
  //   component: () => import('@/views/Error/404.vue')
  // }
]

export const dynamicRouter = [
  {
    path: '/admin',
    fullpath: '/admin',
    name: 'admin',
    meta: {
      title: '数据管理',
      icon: 'icon-admin',
      target: '',
      permission: 'admin',
      keepAlive: true
    },
    children: [],
  }
]
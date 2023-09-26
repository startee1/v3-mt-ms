import type{ RouteRecordRaw } from "vue-router";
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

export const generator = (routerMap:Array<RouteRecordRaw>, parent: string = '') => { 
  return routerMap.map(item => {
    let modules = import.meta.glob('../views/**/*.vue')
    item.component =  modules[`../views/${item.componentPath}.vue`]
    // item.component = () => import(`./views/${item.componentPath}.vue`)
    // item.component = () => require.ensure([], (require) => require(`${item.componentPath}`))
      // .catch(() => import('@/views/Error/404.vue'))

    const currentRouter:RouteRecordRaw = {
      name: item.name,
      path: item.path,
      meta: item.meta,
      component: item.component,
      redirect: '',
      children: [],
    }
    item.redirect && (currentRouter.redirect = item.redirect)
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children)
    }
    return currentRouter
  })
}


export const dynamicRouter:Array<RouteRecordRaw> = [
  {
    path: '/dataShow',
    fullpath: '/dataShow',
    name: 'dataShow',
    componentPath: 'DataShow/DataShow',
    meta: {
      title: '数据内容',
      permission: 'admin',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: []
  },
  // {
  //   path: '/admin',
  //   fullpath: '/admin',
  //   name: 'admin',
  //   meta: {
  //     title: '数据管理',
  //     icon: 'icon-admin',
  //     target: '',
  //     permission: 'admin',
  //     keepAlive: true
  //   },
  //   children: [],
  // }
]

export let generatorRoute = generator(dynamicRouter)

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

export const generator = (routerMap:Array<RouteRecordRaw>) => { 
  return routerMap.map(item => {
    let modules = import.meta.glob('../views/**/*.vue')
    item.component =  modules[`../views/${item.componentPath}.vue`]

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

const children = [
  {
    path: 'dataShow',
    fullpath: 'dataShow',
    name: 'dataShow',
    componentPath: 'DataShow/DataShow',
    meta: {
      title: '数据内容',
      permission: '管理员',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: []
  },
  {
    path: 'userinfo',
    fullpath: 'userinfo',
    componentPath: 'UserInfo/UserInfo',
    name: 'userinfo',
    meta: {
      title: '用户信息',
      permission: '*',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: []
  },
  {
    path: 'admin/user',
    fullpath: 'admin/user',
    name: 'AdminUser',
    meta: {
      title: '账户管理',
      permission: '管理员',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: [
      {
        path: 'list',
        fullpath: 'list',
        name: 'AdminUserList',
        redirect: '',
        componentPath: 'AdminUser/AdminUserList',
        meta: {
          title: '用户列表',
          icon: 'goods',
          target: '',
          permission: '管理员',
          keepAlive: true
        },
      },
    ]
  },
  {
    path: 'admin/shop',
    fullpath: 'admin/shop',
    name: 'AdminShop',
    meta: {
      title: '商铺详情',
      permission: '管理员',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: [
      {
        path: 'comment',
        fullpath: 'comment',
        name: 'AdminShopComment',
        redirect: '',
        componentPath: 'AdminShop/AdminShopComment',
        meta: {
          title: '商铺评论',
          icon: 'goods',
          target: '',
          permission: '管理员',
          keepAlive: true
        },
      },
      {
        path: 'order',
        fullpath: 'order',
        name: 'AdminShopOrder',
        redirect: '',
        componentPath: 'AdminShop/AdminShopOrder',
        meta: {
          title: '商铺订单',
          icon: 'goods',
          target: '',
          permission: '管理员',
          keepAlive: true
        },
      },
    ]
  },
  {
    path: 'goods',
    fullpath: 'goods',
    name: 'goods',
    redirect: '/list',
    meta: {
      title: '商品管理',
      icon: 'goods',
      target: '',
      permission: '商铺',
      keepAlive: true
    },
    children: [
      {
        path: 'add',
        fullpath: 'add',
        name: 'GoodsAdd',
        redirect: '',
        componentPath: 'Goods/GoodsAdd',
        meta: {
          title: '添加商品',
          icon: 'goods',
          target: '',
          permission: '商铺',
          keepAlive: true
        },
      },
      {
        path: 'info',
        fullpath: 'info',
        name: 'GoodsInfo',
        redirect: '',
        componentPath: 'Goods/GoodsInfo',
        meta: {
          title: '商品详情',
          icon: 'goods',
          target: '',
          hidden: true,
          permission: '商铺',
          keepAlive: true
        },
      },
      {
        path: 'list',
        fullpath: 'list',
        name: 'GoodsList',
        redirect: '',
        componentPath: 'Goods/GoodsList',
        meta: {
          title: '商品列表',
          icon: 'goods',
          target: '',
          permission: '商铺',
          keepAlive: true
        },
      },
    ],
  },
  {
    path: 'shop',
    fullpath: 'shop',
    name: 'shop',
    meta: {
      title: '商铺管理',
      permission: '商铺',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: [
      {
        path: 'info',
        fullpath: 'info',
        name: 'ShopInfo',
        redirect: '',
        componentPath: 'Shop/ShopInfo',
        meta: {
          title: '商铺信息',
          icon: 'goods',
          target: '',
          permission: '商铺',
          keepAlive: true
        },
      },
      {
        path: 'comment',
        fullpath: 'comment',
        name: 'ShopComment',
        redirect: '',
        componentPath: 'Shop/ShopComment',
        meta: {
          title: '商铺评论',
          icon: 'goods',
          target: '',
          permission: '商铺',
          keepAlive: true
        },
      },
      {
        path: 'order',
        fullpath: 'order',
        name: 'ShopOrder',
        redirect: '',
        componentPath: 'Shop/ShopOrder',
        meta: {
          title: '商铺订单',
          icon: 'goods',
          target: '',
          permission: '商铺',
          keepAlive: true
        },
      },
    ]
  },
  {
    path: 'menu',
    fullpath: 'menu',
    name: 'menu',
    componentPath: 'Menu/Menu',
    meta: {
      title: '菜单管理',
      permission: '商铺',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: []
  },
  {
    path: 'settings',
    fullpath: 'settings',
    name: 'settings',
    meta: {
      title: '设置',
      permission: '管理员',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children: [
      {
        path: 'foodtype',
        fullpath: 'foodtype',
        name: 'FoodType',
        redirect: '',
        componentPath: 'AdminSettings/FoodType',
        meta: {
          title: '食品分类',
          icon: 'goods',
          target: '',
          permission: '管理员',
          keepAlive: true
        },
      },
    ]
  },
]


export const dynamicRouter:Array<RouteRecordRaw> = [
  {
    path: '/mg',
    fullpath: '/mg',
    name: 'mg',
    componentPath: 'Layout/Layout',
    meta: {
      title: '虚构的',
      permission: '管理员',
      icon: '#',
      keepAlive: true,
      keepRoute: true
    },
    children
  },

]

export let generatorRoute = generator(dynamicRouter)


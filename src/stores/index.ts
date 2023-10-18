import { defineStore } from 'pinia'
import { IRouteMenu, IRouteNav } from '@/types'
import { useRouter } from "vue-router";
import type{ RouteRecordRaw, RouteRecordName } from "vue-router";
import router from '@/router';
 
export const useUserStateStore = defineStore('userState', () => {
  const userInfo = reactive({
    username: '',
    password: '',
    uid: '',
    power: '*',
  })

  const Login = (argUsername: string, argPassword: string, argUid: string = '12312') => {
    userInfo.username = argUsername
    userInfo.password = argPassword
    userInfo.uid = argUid
    console.log(argUsername, argPassword, argUsername == '111' && argPassword == '123456')
    if (argUsername == '111' && argPassword == '123456') userInfo.power = '管理员'
    if (argUsername == '222' && argPassword == '123456') userInfo.power = '商铺'
    window.sessionStorage.setItem('uid', argUid)
    if (userInfo.power == '管理员' || userInfo.power == '*') router.push({name: 'dataShow'})
    else if (userInfo.power == '商铺') router.push({name: 'ShopInfo'})
  }
  const Logoff = () => {
    userInfo.username = ''
    userInfo.password = ''
    userInfo.uid = ''
    window.sessionStorage.removeItem('uid')
    window.location.reload()
  }
  const getUserInfo = () => {
    return {username: userInfo.username, password: userInfo.password}
  }
  const setPower = (power:string) => {
    userInfo.power = power
  }
  const getPower = () => {
    return userInfo.power
  }
  return { Login, Logoff, getUserInfo, setPower, getPower, userInfo }
})

export const useRouteMenuStore = defineStore('routeMenu', () => {
  const routeMenu = ref<IRouteMenu[]>([])
  const menuOpen = ref<string>('')
  const getRouteMenu = () => routeMenu.value
  const generatorRouteMenu = (route:RouteRecordRaw[], power: string = '*', pre: string = '') => {
    const menu:IRouteMenu[] = []
    route = route.filter(r => !r.meta?.hidden && (power === '*' || r.meta?.permission === '*' || r.meta?.permission === power))
    if (pre) pre += '/'
    for (let i = 0; i < route.length; i++) {
      menu[i] = {
        title: route[i].meta?.title as string || '#',
        icon: route[i].meta?.icon as string || '#',
        path: pre + route[i].path || '',
        fullpath: route[i].fullpath || ''
      }
      if (route[i].children) {
        menu[i].children = generatorRouteMenu(route[i].children!, power, pre + route[i].path || '') || {}
      }
    }
    return menu
  }
  const generator = (route:RouteRecordRaw[],power: string = '*') => {
    routeMenu.value = generatorRouteMenu(route, power)
  }
  const setMenuOpen = (m:string) => menuOpen.value = m
  const getMenuOpen = () => menuOpen.value
  return {
    getRouteMenu,
    generator,
    getMenuOpen,
    setMenuOpen,
  }
})

export const useRouteNavStore = defineStore('routeNav', () => {
  const routeNav = ref<Array<IRouteNav>>([])
  const add = (item:IRouteNav) => {
    let check = 1
    for (let i = 0; i < routeNav.value.length; i++) {
      if (routeNav.value[i].path == item.path && routeNav.value[i].name == item.name && routeNav.value[i].title == item.title) {
        check = 0
      }
    }
    if (check) routeNav.value.push(item)
  }
  const remove = (item:IRouteNav) => {
    routeNav.value = routeNav.value.filter(r => {
      let check = true
      if (r.path == item.path && r.name == item.name && r.title == item.title) {
        check = false
      }
      return check
    })
  }
  const clear = () => {
    routeNav.value = []
  }

  return { routeNav, add, remove, clear  }
})

export const useNotKeepAliveStore = defineStore('keepAliveCache', () => {
  const excludes = ref<Array<RouteRecordName>>([]);
  // 添加不缓存的界面
  const setExcludes = (item: RouteRecordName) => {
    excludes.value.push(item)
  }
  // 全部页面不缓存
  const setAllExcludes = (item: RouteRecordName[]) => {
    excludes.value = item
  }
  // 以下页面将会变得缓存
  const removeExcludes = (item: RouteRecordName[]) => {
    excludes.value = excludes.value.filter(v => {
      let check = false
      for (let i = 0; i < item.length; i++) {
        if (item[i] === v) {
          check = true
          break
        }
      }
      return !check
    })
  }
  return { excludes, setExcludes, setAllExcludes, removeExcludes }
})
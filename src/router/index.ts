import { createRouter, createWebHistory } from "vue-router";
import { constantRouterMap, generatorRoute } from './routerConfig'
import { useUserStateStore, useRouteMenuStore, useRouteNavStore, useNotKeepAliveStore } from '@/stores'

const generatorRouteMenu = () => {
  const routeMenu = useRouteMenuStore()
  const userState = useUserStateStore()
  const power = userState.getPower()
  routeMenu.generator(generatorRoute,power)
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRouterMap, ...generatorRoute]
});

const whitePath = ['login','register']

router.beforeEach((to, from, next) => {
  const routeNavStore = useRouteNavStore()
  const notKeepAliveCache = useNotKeepAliveStore()
  generatorRouteMenu()
  if (to.name && !whitePath.includes(to.name as string) && !window.sessionStorage.getItem('uid')) {
    next({ name: 'login' })
  } else if (to.name && to.name == 'login' && window.sessionStorage.getItem('uid')) {
    next({ name: 'dataShow' })
  } else {
    notKeepAliveCache.removeExcludes([to.name!])
    routeNavStore.add({path: to.fullPath, name: to.name || '', title: to.meta.title as string})
    next()
  }
})

export default router;


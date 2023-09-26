import { createRouter, createWebHistory } from "vue-router";
import { constantRouterMap, generatorRoute } from './routerConfig'
import { useUserStateStore } from '@/stores'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRouterMap, ...generatorRoute]
});

const whitePath = ['login','register']

router.beforeEach((to, from, next) => {
  if (to.name && !whitePath.includes(to.name) && !window.sessionStorage.getItem('uid')) {
    next({ name: 'login' })
  } else if (to.name && to.name == 'login' && window.sessionStorage.getItem('uid')) {
    next({ name: 'dataShow' })
  } else {
    next()
  }
})

export default router;


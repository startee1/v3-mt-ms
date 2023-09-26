import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { constantRouterMap, generatorRoute } from './routerConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRouterMap, ...generatorRoute]
});

export default router;


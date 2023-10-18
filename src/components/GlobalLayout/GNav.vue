<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { RouteRecordName } from 'vue-router';
import { useRouteNavStore, useNotKeepAliveStore } from '@/stores'
import type { IRouteNav } from '@/types'


const routeNavStore = useRouteNavStore() // 监听路由改变
const notKeepAliveCache = useNotKeepAliveStore() // 去除缓存
const route = useRoute()
const router = useRouter()

const routePathThis = ref<RouteRecordName>('')
const routeThis = ref<IRouteNav>({title: '',name: '',path: ''})
// 清除单个导航通知
const deleteRouteVisile = ref<boolean>(false)
// 清除全部导航通知
const clearRouteVisile = ref<boolean>(false)
// 清除单个导航事件弹窗
const deleteRoute = (item:IRouteNav) => {
  routeThis.value = item
  deleteRouteVisile.value = true
}
// 清除 store 里的该路由
const removeRoute = () => {
  routeNavStore.remove(routeThis.value)
  notKeepAliveCache.setExcludes(routeThis.value.name!)
  deleteRouteVisile.value = false
}
// 跳转路由
const jumpTo = (item:IRouteNav) => {
  router.push({name: item.name})
}
// 清除全部导航事件
const clearRoute = () => {
  let nameArr:RouteRecordName[] = []
  for (let i = 0; i < routeNavStore.routeNav.length; i++) {
    nameArr.push(routeNavStore.routeNav[i].name!)
  }
  routeNavStore.clear()
  notKeepAliveCache.setAllExcludes(nameArr)
  clearRouteVisile.value = false
}
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    routePathThis.value = newValue.fullPath
  },
  { immediate: true }
)
</script>

<template>
  <div class="nav">
    <div class="nav-left">
      <el-popover trigger="hover" content="回到首页">
        <template #reference>
          <div class="nav-left-item"><el-icon><i-ep-house/></el-icon></div>
        </template>
      </el-popover>
    </div>
    <div class="nav-mid">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <div v-for="item in routeNavStore.routeNav" :key="item.path" class="scrollbar-demo-item" :class="{'routeThis': item.path === routePathThis}" @click="jumpTo(item)">
            {{ item.title }}
            <el-icon  class="icon" @click.stop="deleteRoute(item)"><i-ep-circle-close-filled /></el-icon>
          </div>
        </div>
      </el-scrollbar>
      <el-dialog v-model="deleteRouteVisile" title="通知" width="300">
        <div>是否清除该页面路由 [ {{routeThis.title}} ] ？</div>
        <div style="color: red">！若页面正在使用则仍保留 <br/>！页面清除缓存 <br/>！该行为不可撤回<br/></div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="removeRoute">确认</el-button>
            <el-button @click="deleteRouteVisile = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="nav-right">
      <el-popover trigger="hover" content="清空导航">
        <template #reference>
          <div class="nav-right-item" @click="clearRouteVisile = true"><el-icon><i-ep-delete/></el-icon></div>
        </template>
      </el-popover>
      <el-dialog v-model="clearRouteVisile" title="通知" width="300">
        <div>是否清空导航栏？</div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="clearRoute">确认</el-button>
            <el-button @click="clearRouteVisile = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
.nav {
  border-bottom: 1px solid rgb(220,223,230);
  display: flex;
}
.nav-mid {
  flex: 1;
}
.nav-left-item,.nav-mid-item,.nav-right-item {
  padding: 5px 10px;
}
.nav-left-item:hover,.nav-mid-item:hover,.nav-right-item:hover {
  opacity: 0.8;
  cursor: pointer;
}
.nav-left-item {
  border-right: 1px solid rgb(220,223,230);
}
.nav-mid-item { 
  border-right: 1px solid rgb(220,223,230);
}
.nav-right-item {
  border-left: 1px solid rgb(220,223,230);
}
.scrollbar-flex-content {
  display: flex;
  width: 200px;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  border-right: 1px solid rgb(220,223,230);
}

.scrollbar-demo-item:hover {
  opacity: 0.6;
  cursor: pointer;
}
.icon {
  display: none;
  margin-left: 10px;
}
.scrollbar-demo-item:hover .icon {
  display: flex;
}
.routeThis {
  background-color: rgb(151, 168, 229);
}
.dark .routeThis {
  background-color: rgb(84, 114, 223);

}
</style>
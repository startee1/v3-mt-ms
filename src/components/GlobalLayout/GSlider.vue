<script setup lang="ts">
import { useRouteMenuStore } from '@/stores'
import type { IRouteMenu } from '@/types'
import { useRouter,useRoute } from 'vue-router'
const routeMenu = useRouteMenuStore() 
const props = defineProps<{ isCollapse: boolean, headerHeight: number }>()
const menuList = ref<IRouteMenu[]>([])
const router = useRouter()
const route = useRoute()
const menuActive = ref<string>('')


onMounted(() => {
  menuList.value = routeMenu.getRouteMenu() || []
  menuActive.value = route.path
})
const jumpTo = (key: string) => {
  router.push({ path: key })
}

</script>

<template>
  <div>
    <el-menu 
      :default-active="menuActive" 
      class="el-menu-vertical-demo" 
      :collapse="props.isCollapse" 
      unique-opened	
      style="height: 100%;"
      @select="jumpTo"
    >
      <el-menu-item index="1x" :style="{ height: props.headerHeight + 'px', justifyContent: 'center',borderBottom: '1px solid rgb(220,223,230)' }">
        <el-icon v-if="props.isCollapse"><i-ep-setting /></el-icon>
        <div v-else>首页</div>
      </el-menu-item>
      <template v-for="menu in menuList" :key="menu.path">
        <el-menu-item v-if="menu.children?.length == 0" :key="menu.path" :index="menu.path">
          <el-icon><i-ep-setting /></el-icon>
          <template #title>{{ menu.title }}</template>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path" :show-timeout="10000" :hide-timeout="2000">
          <template #title>
            <el-icon><i-ep-setting /></el-icon>
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item v-for="child in menu.children" :key="child.path" :index="child.path">{{ child.title }}</el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
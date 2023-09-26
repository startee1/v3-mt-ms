<script setup lang="ts">

const testName = ref(['123','34543'])
const routeName = ref<string>('')
// 清除单个导航通知
const deleteRouteVisile = ref<boolean>(false)
// 清除全部导航通知
const clearRouteVisile = ref<boolean>(false)
// 清除单个导航事件
const deleteRoute = (item: string) => {
  routeName.value = item
  deleteRouteVisile.value = true
}
// 清除全部导航事件
const clearRoute = () => {
  clearRouteVisile.value = true
}
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
          <div v-for="item in 10" :key="item" class="scrollbar-demo-item">
            {{ item }}
            <el-icon  class="icon" @click="deleteRoute(item)"><i-ep-circle-close-filled /></el-icon>
          </div>
        </div>
      </el-scrollbar>
      <el-dialog v-model="deleteRouteVisile" title="通知" width="300">
        <div>是否清空导航栏 [ {{routeName}} ] ？</div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="deleteRouteVisile = false">确认</el-button>
            <el-button @click="deleteRouteVisile = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="nav-right">
      <el-popover trigger="hover" content="清空导航">
        <template #reference>
          <div class="nav-right-item" @click="clearRoute"><el-icon><i-ep-delete/></el-icon></div>
        </template>
      </el-popover>
      <el-dialog v-model="clearRouteVisile" title="通知" width="300">
        <div>是否清空导航栏？</div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="clearRouteVisile = false">确认</el-button>
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
</style>
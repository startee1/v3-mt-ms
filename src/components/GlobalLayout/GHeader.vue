<script setup lang="ts">
import { useUserStateStore } from '@/stores'
const userState = useUserStateStore()
const props = defineProps<{height: number}>()
const emits = defineEmits<{onHandleMenu: []}>()
const logOff = () => {
  userState.Logoff()
}
</script>

<template>
  <div :style="{height: props.height+'px'}" class="header">
    <div @click="emits('onHandleMenu')" class="menu"><el-icon><i-ep-fold /></el-icon></div>
    <div class="exit" @click="logOff">退出</div>
  </div>
</template>

<style scoped>
.header {
  border-bottom: 1px solid rgb(220,223,230);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.menu:hover {
  cursor: pointer;
}
.exit:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
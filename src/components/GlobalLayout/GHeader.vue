<script setup lang="ts">

const props = defineProps<{height: number}>()
const emits = defineEmits<{onHandleMenu: []}>()
</script>

<template>
  <div :style="{height: props.height+'px'}" class="header">
    <div @click="emits('onHandleMenu')" class="menu"><el-icon><i-ep-fold /></el-icon></div>
  </div>
</template>

<style scoped>
.header {
  border-bottom: 1px solid rgb(220,223,230);
  box-sizing: border-box;
  padding: 20px;
}
.menu:hover {
  cursor: pointer;
}
</style>
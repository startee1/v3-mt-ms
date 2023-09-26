<script setup lang="ts">

const props = defineProps<{isCollapse: boolean}>()
</script>

<template>
  <div>
    <el-menu
     default-active="2"
     class="el-menu-vertical-demo"
     :collapse="props.isCollapse"
     style="height: 100%;"
   >
     <el-menu-item index="1">
       <el-icon><i-ep-setting /></el-icon>
       <template #title>Navigator Four</template>
     </el-menu-item>
   </el-menu>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
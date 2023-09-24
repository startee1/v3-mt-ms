<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const size= ref(20)
const isDark = useDark()
const toggleDark = useToggle(isDark)
const toggleTheme = () => {
  toggleDark()
}
</script>

<template>
  <div class="fix">
    <div class="button" @click="toggleTheme">
      <el-icon  v-if="!isDark" :size="size"><i-ep-sunny /></el-icon>
      <el-icon  v-if="isDark" :size="size" color="#fff"><i-ep-moon /></el-icon>
    </div>
    <div class="button">
      <el-icon :size="size" v-if="!isDark"><i-ep-notebook /></el-icon>
      <el-icon :size="size"  v-if="isDark" color="#fff"><i-ep-notebook /></el-icon>
    </div>
  </div>
</template>

<style scoped>
.fix {
  position: fixed;
  z-index: 99999;
  right: -90px;
  bottom: 30px;
  width: 100px;
  transition: all 0.2s linear;
}
.fix:hover {
  right: -40px;
  bottom: 30px;
  cursor: pointer;
}
.button {
  width: 40px;
  height: 40px;
  background-color: rgb(183, 183, 183);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  opacity: 0.8;
  transition: all 0.2s linear;
}
.button:hover {
  opacity: 1;
}
</style>
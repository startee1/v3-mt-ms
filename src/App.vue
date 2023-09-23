<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>my class</div>
  <div><el-button @click="toggleDark()">my button</el-button></div>
</template>

<style scoped>

</style>

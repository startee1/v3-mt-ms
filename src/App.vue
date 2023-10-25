<script setup lang="ts">
import Fix from '@/views/Fix/Fix.vue'
import { RouterView } from 'vue-router'

const LogsShow = ref(false)

const onHandleButton = (type:string, value: any):void => {
  if (type === 'Logs') {
    LogsShow.value = value
  }
}
</script>

<template>
  <Fix @handleButton="onHandleButton"/>
  <router-view/>
</template>

<style scoped>

</style>

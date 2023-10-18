<script setup lang="ts">
import Fix from '@/views/Fix/Fix.vue'
import Logs from '@/views/Logs/Logs.vue'
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
  <Logs :LogsShow="LogsShow" @closeLogs="onHandleButton"/>
  <router-view/>
</template>

<style scoped>

</style>

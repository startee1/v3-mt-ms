<script setup lang="ts">
import Fix from '@/views/Fix/Fix.vue'
import Logs from '@/views/Logs/Logs.vue'

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
</template>

<style scoped>

</style>

<script setup lang="ts">
import GoodsTable from './children/GoodsTable.vue';
const props = withDefaults(defineProps<{visible: boolean,id: number}>(),{
  visible: false
})
const emits = defineEmits(['update:visible'])
let { visible } = toRefs(props)
const handleClose = () => {
  emits('update:visible', false)
}
</script>

<template>
  <div>
    <el-dialog v-model="visible" title="信息" @close="handleClose">
      <GoodsTable />
    </el-dialog>
  </div>
</template>
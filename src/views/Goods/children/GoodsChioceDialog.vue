<script lang="ts" setup>
// interface PropsType {
//   visible: boolean
// }

// const props = withDefaults(defineProps<PropsType>(),{
//   visible: false
// })

const props = defineProps<{
  visible: boolean
}>()

const emits = defineEmits<{
  close: []
}>()


const { visible } = toRefs(props)

const handleClose = () => {
  // emits('close')
}
</script>

<template>
  <el-dialog
    v-model="visible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emits('close')">返回</el-button>
        <el-button type="primary" @click="emits('close')">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

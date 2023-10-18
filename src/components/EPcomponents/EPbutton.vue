<script setup lang="ts">
interface IProps{
  text?: string
  urlName?: string
  type?: '' | 'primary'
  marginRight?: number
  marginLeft?: number
  marginTop?: number
  marginBottom?: number
}

const props = withDefaults(defineProps<IProps>(), {
  urlName: '',
  type: '',
  marginRight: 0,
  marginLeft: 0,
  marginTop: 0,
  marginBottom: 0,
})
const emits = defineEmits<{
  handlerClick: []
}>()

onMounted(() => {
})
</script>

<template>
  <el-button 
    @click="emits('handlerClick')" 
    :type="props.type"
    :style="{
      marginRight: props.marginRight + 'px',
      marginLeft: props.marginLeft + 'px',
      marginTop: props.marginTop + 'px',
      marginBottom: props.marginBottom + 'px',
      }"
  >
  {{ props.text }}
  </el-button>
</template>
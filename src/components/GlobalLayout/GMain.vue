<script setup lang="ts">

</script>

<template>
  <div class="main">
    <slot/>
  </div>
</template>

<style scoped>
.main {
  background-color: #fff;
  padding: 15px;
  height: 100%;
  box-sizing: border-box;
}
.dark .main {
  background-color: rgb(24,24,24);
}
</style>
<template>
  <div class="table">
    <div class="top"><slot  name="header"></slot></div>
    <div class="main"><slot name="main"></slot></div>
    <div class="bottom"><slot name="bottom"></slot></div>
  </div>
</template>

<style scoped>
.table {
  height: 100%;
  display: grid;
  grid-row-gap: 10px;
  grid-template-rows: auto 1fr auto;
}
.bottom {
  background: red;
}
</style>
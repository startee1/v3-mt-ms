<script setup lang="ts">
import GHeader from './GHeader.vue';
import GNav from './GNav.vue';
import GMain from './GMain.vue';
import GSlider from './GSlider.vue';

const isCollapse = ref<boolean>(true)

const onChangeMenu = () => {
  isCollapse.value = !isCollapse.value
}

</script>

<template>
  <div class="layout" style="height: 100vh;display: flex;">
    <GSlider :isCollapse="isCollapse"/>
    <section style="flex: 1;display: flex;flex-direction: column;height: 100vh;">
      <aside>
        <GHeader :height="60" @on-handle-menu="onChangeMenu"/>
        <GNav />
      </aside>
      <main style="flex:1">
        <GMain>
          <template #default>
            <slot/>
          </template>
        </GMain>
      </main>
    </section>
  </div>
</template>

<style scoped>

</style>
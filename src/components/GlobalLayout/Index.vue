<script setup lang="ts">
import GHeader from './GHeader.vue';
import GNav from './GNav.vue';
import GMain from './GMain.vue';
import GSlider from './GSlider.vue';

const isCollapse = ref<boolean>(false)
const headerHeight = 60
const onChangeMenu = () => {
  isCollapse.value = !isCollapse.value
}

</script>

<template>
  <div class="layout" style="height: 100vh;display: flex;">
    <GSlider :isCollapse="isCollapse" :headerHeight="headerHeight"/>
    <section style="flex: 1;display: flex;flex-direction: column;height: 100vh;">
      <aside>
        <GHeader :height="headerHeight" @on-handle-menu="onChangeMenu"/>
        <GNav />
      </aside>
      <main style="flex:1;padding: 15px;overflow: hidden;" class="bg-grey">
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
main {
  flex:1;
  padding: 15px;
  overflow: hidden;
  background-color: var(--g-background-color);
}
.dark main {
  background-color: #606060;
}
</style>
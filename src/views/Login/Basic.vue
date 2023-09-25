<script setup lang="ts">
import Rain from './Rain.vue'
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute()
const props = defineProps<{title: string}>()
</script>

<template>
  <div class="basic">
    <Rain/>
    <main>
      <nav>
        <div class="link" :class="{'this_link': route.name == 'login'}"><router-link :to="{ name: 'login' }">登录</router-link></div>
        <div class="division">|</div>
        <div class="link" :class="{'this_link': route.name == 'register'}"><router-link :to="{ name: 'register' }">注册</router-link></div>
      </nav>
      <section class="info">
        <div class="title" v-if="props.title.length > 0">{{ props.title }}</div>
        <el-divider>输入信息</el-divider>
        <slot></slot>
      </section>
    </main>
  </div>
</template>

<style scoped>
.basic {
  width: 100%;
  height: 100vh;
}
main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 600px;
  width: 98%;
  max-width: 600px;
  color: white;
}
main nav {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.division {
  width: 60px;
  text-align: center;
}
.link a {
  transition: all 0.2s linear;
  color: #fff;
}
.link a:hover {
  cursor: pointer;
  color: rgb(129, 129, 216);
}
.this_link a {
  color: rgb(129, 129, 216);
}
.info {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.1s linear;
}
.info:hover {
  background-color: #fff;
  color: #333;
}
.title {
  font-size: 32px;
}
</style>
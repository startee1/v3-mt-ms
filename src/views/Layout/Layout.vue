<script setup lang="ts">
import GlobalLayout from '@/components/GlobalLayout/Index.vue'
import { useNotKeepAliveStore } from '@/stores'
declare type MatchPattern = string | RegExp | (string | RegExp)[]; 

const notKeepAliceCache = useNotKeepAliveStore()
const c = notKeepAliceCache.excludes as MatchPattern
</script>

<template>
  <div>
    <GlobalLayout>
      <template #default>
        <router-view class="box" v-slot={Component}>
          <keep-alive :exclude="c">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
    </GlobalLayout>
  </div>
</template>


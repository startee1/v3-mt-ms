<script setup lang="ts">
import GlobalLayout from '@/components/GlobalLayout/Index.vue'
import { useNotKeepAliveStore } from '@/stores'

const notKeepAliceCache = useNotKeepAliveStore()
</script>

<template>
  <div>
    <GlobalLayout>
      <template #default>
        <router-view class="box" v-slot={Component}>
          <keep-alive :exclude="notKeepAliceCache.excludes">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
    </GlobalLayout>
  </div>
</template>


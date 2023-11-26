<script setup lang="ts">
import { inject, onMounted } from 'vue'

import { useConfigStore } from '@/stores/config'

import { keyImageUrl } from '@/util/keys.js'

const config = useConfigStore()

const imageUrl = inject(keyImageUrl)!

// setInterval(() => {
//   // console.log(Math.random() * 100);
//   image.next()
// }, 3000)
</script>

<template>
  <div class="z-illustration" :class="{ 'z-illustration-moible': config.isMobile }">
    <el-image :src="imageUrl" fit="cover">
      <template #placeholder>
        <span class="el-image-slot">老大哥在看着你</span>
      </template>
      <template #error>
        <span class="el-image-slot">老大哥在看着你</span>
      </template>
    </el-image>

    <!-- <el-skeleton style="width: 100%; height: 100%;" :loading="true" animated>
      <template #template>
        <el-skeleton-item variant="text" style="width: 100%; height: 100%;" />
      </template>
      <template #default>
        <el-image :src="image.current" fit="cover">
        <template #placeholder>
          <span class="el-image-slot">老大哥在看着你</span>
        </template>
        <template #error>
          <span class="el-image-slot">老大哥在看着你</span>
        </template>
      </el-image>
      </template>
    </el-skeleton> -->
  </div>
</template>

<style scoped>
.z-illustration {
  width: 50vh;
  height: 50vh;
  margin-bottom: 1rem;
}

.z-illustration-moible {
  width: 80vw;
  height: 80vw;
}

.el-image {
  width: 100%;
  height: 100%;
}

.el-image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid var(--dark-theme-color-w3);
  border-radius: 2px;
  color: var(--dark-theme-color-w3);
  font-size: 30px;
}
</style>

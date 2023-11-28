<script setup lang="ts">
import { inject } from 'vue'

import { keyImageUrl } from '@/util/keys.js'

const imageUrl = inject(keyImageUrl)!
</script>

<template>
  <div class="z-illustration">
    <el-image class="el-image" :src="imageUrl" fit="cover">
      <template #placeholder>
        <span class="el-image-slot">let death like autumn leaves</span>
      </template>
      <template #error>
        <span class="el-image-slot">let death like autumn leaves</span>
      </template>
    </el-image>
  </div>
</template>

<style scoped>
.z-illustration {
  width: 50vh;
  height: 50vh;
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
  border-radius: 2px;
  font-size: 1rem;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useImageStore } from '@/stores/db'

const image = useImageStore()

// setInterval(() => {
//   // console.log(Math.random() * 100);
//   image.next()
// }, 3000)
</script>

<template>
  <div class="z-illustration">
    <el-image :src="image.current" fit="cover">
      <template #placeholder>
        <span class="el-image-slot">老大哥在看着你</span>
      </template>
      <template #error>
        <span class="el-image-slot">老大哥在看着你</span>
      </template>
    </el-image>
  </div>
</template>

<style scoped>
.z-illustration {
  width: 50vh;
  height: 50vh;
  margin-bottom: 11px;
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

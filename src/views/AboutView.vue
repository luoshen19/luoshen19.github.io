<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const currentDate = new Date().toDateString()
</script>

<template>
  <div class="about">
    <el-skeleton style="width: 100%; height: 100%" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="text" style="width: 100%; height: 100%" />
      </template>
    </el-skeleton>
  </div>
</template>

<style>
.about {
  width: 500px;
  height: 500px;
}
</style>

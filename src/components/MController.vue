<!-- 移动端组件 功能: [控制音乐播放 | 进度条] -->
<script setup lang="ts">
import ZProgressBar from '@/components/ZProgressBar.vue'
import ZController from '@/components/ZController.vue'
import { DirectionEnum } from '@/enums/directionEnum'
</script>

<template>
  <div class="m-controller">
    <ZProgressBar :position="DirectionEnum.DOWN" distance="0.4rem" size="0.7rem" />
    <ZController />
  </div>
</template>

<style scoped>
.m-controller {
  width: 100%;
}
</style>

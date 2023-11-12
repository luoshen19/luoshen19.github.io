<script setup lang="ts">
import { ref } from 'vue'
import { useAudioMetaStore } from '@/stores/audio'
import { CommonUtils } from '@/util/commonUtils'

const audioMeta = useAudioMetaStore()
const sliderRef = ref<HTMLDivElement>()

function getProgress(event: MouseEvent) {
  const sliderWidth = sliderRef.value!.offsetWidth
  const offsetX = event.offsetX
  audioMeta.sliderPos = offsetX / sliderWidth
}
</script>

<template>
  <div class="z-progress-bar">
    <!-- 时间 -->
    <div class="progress-time">
      <div class="time-content">{{ CommonUtils.toFormatTime(audioMeta.currentTime) }}</div>
      <div class="time-content">{{ CommonUtils.toFormatTime(audioMeta.duration) }}</div>
    </div>
    <!-- 时间进度条 -->
    <div class="progressbar">
      <div ref="sliderRef" class="slider" @click.self="getProgress">
        <div class="slider-rail"></div>
        <div
          class="slider-track"
          :style="{ width: CommonUtils.toPercentage(audioMeta.currentTime, audioMeta.duration) }"
        ></div>
        <div
          class="slider-handle"
          :style="{ left: CommonUtils.toPercentage(audioMeta.currentTime, audioMeta.duration) }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.z-progress-bar {
  width: 100%;
}

.progress-time {
  width: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
}

.time-content {
  font-size: 1rem;
}

.progressbar {
  margin-top: 10px;
}

.slider {
  position: relative;
  height: 12px;
  padding: 5px 0;
  width: 100%;
  border-radius: 6px;
  touch-action: none;
  box-sizing: border-box;
}

.slider-rail {
  position: absolute;
  width: 100%;
  background-color: var(--dark-theme-color-b2);
  height: 2px;
  border-radius: 6px;
}

.slider-track {
  position: absolute;
  left: 0;
  height: 2px;
  border-radius: 6px;
  background-color: var(--dark-theme-color-w3);
}

.slider-handle {
  position: absolute;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  margin-top: -5px;
  border-radius: 50%;
  border: 2px solid var(--dark-theme-color-w3);
  background-color: var(--dark-theme-color-w3);
  touch-action: pan-x;
  box-shadow: none;
}
</style>

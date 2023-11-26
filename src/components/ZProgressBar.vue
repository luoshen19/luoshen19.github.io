<script setup lang="ts">
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue'

import { useAudioMetaStore } from '@/stores/audio'

import { keyCurrentTime, keyDuration } from '@/util/keys.js'
import { CommonUtils } from '@/util/commonUtils'

import { DirectionEnum } from '@/enums/directionEnum'

const currentTime = inject(keyCurrentTime)
const duration = inject(keyDuration)

const audioMeta = useAudioMetaStore()
const sliderRef = ref<HTMLDivElement>()

const sliderX = computed(() => {
  if (dragging.value) {
    return (draggingPct.value * 100).toFixed(2) + '%'
  } else {
    return CommonUtils.toPercentage(currentTime?.value, duration?.value)
  }
})

export interface TimeDisplayMode {
  position?: DirectionEnum
  distance?: string
  size?: string
}

withDefaults(defineProps<TimeDisplayMode>(), {
  position: DirectionEnum.UP,
  distance: '10px',
  size: '1rem'
})

function getProgress(event: MouseEvent) {
  const sliderWidth = sliderRef.value!.offsetWidth
  const offsetX = event.offsetX
  audioMeta.sliderPos = offsetX / sliderWidth
}

let dragging = ref(false)
let draggingPct = ref(0)

function onMouseDown(event: MouseEvent) {
  dragging.value = true
  const rect = sliderRef.value!.getBoundingClientRect()
  draggingPct.value = (event.clientX - rect.left) / rect.width
}

function onMouseMove(event: MouseEvent) {
  if (dragging.value) {
    const rect = sliderRef.value!.getBoundingClientRect()
    let tmp = (event.clientX - rect.left) / rect.width
    if (tmp < 0) tmp = 0
    if (tmp > 1) tmp = 1
    draggingPct.value = tmp
  }
}

function onMouseUp() {
  if (dragging.value) {
    currentTime!.value = duration!.value * draggingPct.value
    dragging.value = false
  }
}

function onTouchStart(event: TouchEvent) {
  dragging.value = true
  const rect = sliderRef.value!.getBoundingClientRect()
  draggingPct.value = (event.touches[0].clientX - rect.left) / rect.width
}

function onTouchMove(event: TouchEvent) {
  if (dragging.value) {
    const rect = sliderRef.value!.getBoundingClientRect()
    let tmp = (event.touches[0].clientX - rect.left) / rect.width
    if (tmp < 0) tmp = 0
    if (tmp > 1) tmp = 1
    draggingPct.value = tmp
  }
}

function onTouchEnd() {
  if (dragging.value) {
    currentTime!.value = duration!.value * draggingPct.value
    dragging.value = false
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('touchmove', onTouchMove)
  window.addEventListener('touchend', onTouchEnd)
})
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <div class="z-progress-bar">
    <!-- 时间 -->
    <div
      class="progress-time"
      :style="`margin-bottom: ${distance}; font-size: ${size};`"
      v-show="position === DirectionEnum.UP"
    >
      <div>{{ CommonUtils.toFormatTime(currentTime) }}</div>
      <div>{{ CommonUtils.toFormatTime(duration) }}</div>
    </div>

    <!-- 时间进度条 -->
    <div class="progressbar">
      <div
        ref="sliderRef"
        class="slider"
        @click.self="getProgress"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="slider-rail"></div>
        <div class="slider-track" :style="{ width: `${sliderX}` }"></div>
        <div class="slider-handle" :style="{ left: `${sliderX}` }"></div>
      </div>
    </div>

    <!-- 时间 -->
    <div
      class="progress-time"
      :style="`margin-top: ${distance}; font-size: ${size};`"
      v-show="position === DirectionEnum.DOWN"
    >
      <div class="time-content">{{ CommonUtils.toFormatTime(currentTime) }}</div>
      <div class="time-content">{{ CommonUtils.toFormatTime(duration) }}</div>
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
  background-color: var(--color-border);
  height: 2px;
}

.slider-track {
  position: absolute;
  left: 0;
  height: 2px;
  background-color: var(--color-text);
}

.slider-handle {
  position: absolute;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  margin-top: -5px;
  border-radius: 50%;
  border: 2px solid var(--color-text);
  background-color: var(--color-heading);
  touch-action: pan-x;
  box-shadow: none;
}
</style>

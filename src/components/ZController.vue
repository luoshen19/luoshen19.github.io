<script setup lang="ts">
import { ref } from 'vue'
import { useAudioMetaStore } from '@/stores/audio'
import SvgIcon from './SvgIcon.vue'

const audioMeta = useAudioMetaStore()

const colorHover = '#fdfdfd'
const colorDefault = '#c6c9ce'

const previousColor = ref(colorDefault)
const playColor = ref(colorDefault)
const nextColor = ref(colorDefault)

console.log(previousColor.value)
</script>

<template>
  <div class="z-controller">
    <!-- 播放控制 -->
    <div class="play-controller">
      <button
        class="play-btn"
        @click="$emit('handlePrevious')"
        @mouseover="() => (previousColor = colorHover)"
        @mouseout="() => (previousColor = colorDefault)"
      >
        <SvgIcon name="previous" :color="previousColor" />
      </button>

      <button
        class="play-btn"
        @click="$emit('handlePlay')"
        @mouseover="() => (playColor = colorHover)"
        @mouseout="() => (playColor = colorDefault)"
      >
        <SvgIcon name="play" v-show="audioMeta.paused" :color="playColor" />
        <SvgIcon name="pause" v-show="!audioMeta.paused" :color="playColor" />
      </button>

      <button
        class="play-btn"
        @click="$emit('handleNext')"
        @mouseover="() => (nextColor = colorHover)"
        @mouseout="() => (nextColor = colorDefault)"
      >
        <SvgIcon name="next" :color="nextColor" />
      </button>

      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.z-controller {
  width: 100%;
}

.play-controller {
  display: flex;
  justify-content: space-between;
}

/* btn 默认样式去除 */
.play-btn {
  width: 37px;
  height: 37px;
  appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
}
</style>

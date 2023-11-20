  <!-- 移动端组件 功能: [控制音乐播放 | 进度条] -->
<script setup lang="ts">
import ZProgressBar from '@/components/ZProgressBar.vue'
import SvgIcon from './SvgIcon.vue'
import { inject } from 'vue'
import { useAudioMetaStore } from '@/stores/audio'
import { audioOperateKey } from '@/util/keys.js'
import { DirectionEnum } from '@/enums/directionEnum'

const audioMeta = useAudioMetaStore()
const audioOperate = inject(audioOperateKey)!
</script>

<template>
  <div class="z-controller">
    <ZProgressBar :position="DirectionEnum.DOWN" distance="7px" size="0.7rem" />

    <!-- 播放控制 -->
    <div class="play-controller">
      <span></span>
      <span></span>

      <button class="play-btn" @click="audioOperate.handlePrevious">
        <SvgIcon name="previous" />
      </button>

      <button class="play-btn" @click="audioOperate.handlePlay">
        <SvgIcon name="play" v-show="audioMeta.paused" />
        <SvgIcon name="pause" v-show="!audioMeta.paused" />
      </button>

      <button class="play-btn" @click="audioOperate.handleNext">
        <SvgIcon name="next" />
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
  margin-top: 20px;
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

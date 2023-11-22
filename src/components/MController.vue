<!-- 移动端组件 功能: [控制音乐播放 | 进度条] -->
<script setup lang="ts">
import ZProgressBar from '@/components/ZProgressBar.vue'
import SvgIcon from './SvgIcon.vue'

import { inject, ref } from 'vue'

import { useMusicStore } from '@/stores/db'
import { useAudioMetaStore } from '@/stores/audio'
import { usePlayConfigStore } from '@/stores/config'

import { audioOperateKey, keyLikeMisicList } from '@/util/keys.js'
import { DirectionEnum } from '@/enums/directionEnum'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'


const audioOperate = inject(audioOperateKey)!

const music = useMusicStore()
const playConfig = usePlayConfigStore()
const audioMeta = useAudioMetaStore()
// 初始化 ==========================================
playConfig.init()
// 初始化 ==========================================
const likeMisicList = ref<number[]>(JSON.parse(localStorage.getItem(keyLikeMisicList) ?? '[]'))

function likeEvent() {
  // 存在取消
  if (likeMisicList.value.includes(music.index)) {
    likeMisicList.value = likeMisicList.value.filter((it) => it !== music.index)
  } else {
    likeMisicList.value.push(music.index)
  }
  localStorage.setItem(keyLikeMisicList, JSON.stringify(likeMisicList.value))
}
</script>

<template>
  <div class="z-controller">
    <div class="menu">
      <button class="menu-btn">
        <SvgIcon name="play-list" color="var(--color-heading)" />
      </button>

      <button class="menu-btn" @click="likeEvent">
        <SvgIcon
          name="like"
          color="var(--color-heading)"
          v-show="!likeMisicList.includes(music.index)"
        />
        <!-- 爱心的颜色是初音发带的颜色 -->
        <SvgIcon
          name="like-fill"
          color="#F52154"
          hover-color="#F52154"
          v-show="likeMisicList.includes(music.index)"
        />
      </button>

      <button class="menu-btn" @click="playConfig.updatePlayStrategy">
        <SvgIcon name="repeat" color="var(--color-heading)" v-show="playConfig.playStrategy == PlayStrategyEnum.REPEAT" />
        <SvgIcon name="repeat-one" color="var(--color-heading)" v-show="playConfig.playStrategy == PlayStrategyEnum.REPEAT_ONE" />
        <SvgIcon name="shuffle" color="var(--color-heading)" v-show="playConfig.playStrategy == PlayStrategyEnum.SHUFFLE" />
      </button>
    </div>

    <ZProgressBar :position="DirectionEnum.DOWN" distance="0.4rem" size="0.7rem" />

    <!-- 播放控制 -->
    <div class="play-controller">
      <button class="controller-btn controller-btn-previous" @click="audioOperate.handlePrevious">
        <SvgIcon name="next_v2" color="var(--color-heading)" />
      </button>

      <button class="controller-btn controller-btn-play" @click="audioOperate.handlePlay">
        <SvgIcon name="play_v2" color="var(--color-heading)" v-show="audioMeta.paused" />
        <SvgIcon name="pause_v2" color="var(--color-heading)" v-show="!audioMeta.paused" />
      </button>

      <button class="controller-btn" @click="audioOperate.handleNext">
        <SvgIcon name="next_v2" color="var(--color-heading)" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.z-controller {
  width: 100%;
}

.menu {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.menu-btn {
  width: 1.3rem;
  height: 1.3rem;
}

.play-controller {
  display: flex;
  justify-content: center;
  align-items: center;
}

.controller-btn {
  width: 1.5rem;
  height: 1.5rem;
}

.controller-btn-previous {
  transform: rotate(180deg);
}

.controller-btn-play {
  width: 1.7rem;
  height: 1.7rem;
  margin-left: 3rem;
  margin-right: 3rem;
}
</style>

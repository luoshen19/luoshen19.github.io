<!-- 移动端组件 功能: [控制音乐播放 | 进度条] -->
<script setup lang="ts">
import ZProgressBar from '@/components/ZProgressBar.vue'
import ZController from '@/components/ZController.vue'
import SvgIcon from './SvgIcon.vue'

import { ref } from 'vue'

import { usePlayerStore } from '@/stores/player'

import { keyLikeMisicList } from '@/util/keys.js'
import { DirectionEnum } from '@/enums/directionEnum'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

const player = usePlayerStore()

const likeMisicList = ref<number[]>(JSON.parse(localStorage.getItem(keyLikeMisicList) ?? '[]'))

function likeEvent() {
  // 存在取消
  if (likeMisicList.value.includes(player.musicIndex)) {
    likeMisicList.value = likeMisicList.value.filter((it) => it !== player.musicIndex)
  } else {
    likeMisicList.value.push(player.musicIndex)
  }
  localStorage.setItem(keyLikeMisicList, JSON.stringify(likeMisicList.value))
}
</script>

<template>
  <div class="m-controller">
    <div class="menu">
      <button class="menu-btn">
        <SvgIcon name="play-list" color="var(--color-heading)" />
      </button>

      <button class="menu-btn" @click="likeEvent">
        <SvgIcon
          name="like"
          color="var(--color-heading)"
          v-show="!likeMisicList.includes(player.musicIndex)"
        />
        <!-- 爱心的颜色是初音发带的颜色 -->
        <SvgIcon
          name="like-fill"
          color="#F52154"
          hover-color="#F52154"
          v-show="likeMisicList.includes(player.musicIndex)"
        />
      </button>

      <button class="menu-btn" @click="player.updatePlayStrategy">
        <SvgIcon
          name="repeat"
          color="var(--color-heading)"
          v-show="player.playStrategy == PlayStrategyEnum.REPEAT"
        />
        <SvgIcon
          name="repeat-one"
          color="var(--color-heading)"
          v-show="player.playStrategy == PlayStrategyEnum.REPEAT_ONE"
        />
        <SvgIcon
          name="shuffle"
          color="var(--color-heading)"
          v-show="player.playStrategy == PlayStrategyEnum.SHUFFLE"
        />
      </button>
    </div>

    <ZProgressBar :position="DirectionEnum.DOWN" distance="0.4rem" size="0.7rem" />
    <!-- 播放控制 -->
    <ZController />
  </div>
</template>

<style scoped>
.m-controller {
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
</style>

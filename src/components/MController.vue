<!-- 移动端组件 功能: [控制音乐播放 | 进度条] -->
<script setup lang="ts">
import ZProgressBar from '@/components/ZProgressBar.vue'
import SvgIcon from './SvgIcon.vue'

import { inject, ref } from 'vue'

import { useResourceStore } from '@/stores/db'
import { usePlayerStore } from '@/stores/player'

import { useGetNextMusicIndex } from '@/use/audio'
import { useGetMusicUrl } from '@/use/resourceUrl'

import {
  keyMusicUrl,
  keyPlaying,
  keyLikeMisicList
} from '@/util/keys.js'
import { DirectionEnum } from '@/enums/directionEnum'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

const musicUrl = inject(keyMusicUrl)!
const playing = inject(keyPlaying)

const resource = useResourceStore()
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

function handleNextEvent() {
  const tmpIndex = useGetNextMusicIndex(
    player.musicIndex,
    resource.musicList.length,
    player.playStrategy
  )
  musicUrl.value = useGetMusicUrl(resource.musicList[tmpIndex])
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
    <div class="play-controller">
      <button class="controller-btn controller-btn-previous" @click="console.log('provious')">
        <SvgIcon name="next_v2" color="var(--color-heading)" />
      </button>

      <button class="controller-btn controller-btn-play" @click="playing = !playing">
        <SvgIcon name="play_v2" color="var(--color-heading)" v-show="!playing" />
        <SvgIcon name="pause_v2" color="var(--color-heading)" v-show="playing" />
      </button>

      <button class="controller-btn" @click="handleNextEvent">
        <SvgIcon name="next_v2" color="var(--color-heading)" />
      </button>
    </div>
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

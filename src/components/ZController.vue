<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

import { inject, watch } from 'vue'

import { useResourceStore } from '@/stores/db'
import { usePlayerStore } from '@/stores/player'

import { useGetMusicUrl, useGetNextMusicIndex, useGetPreviousMusicIndex } from '@/use/musicRes'

import { keyMusicUrl, keyPlaying, keyEnded, keyLargeScreen } from '@/util/keys.js'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

const musicUrl = inject(keyMusicUrl)!
const playing = inject(keyPlaying)!
const ended = inject(keyEnded)!
const largeScreen = inject(keyLargeScreen)

const resource = useResourceStore()
const player = usePlayerStore()

watch(ended, (isEnded) => {
  if (!isEnded) return
  if (player.playStrategy == PlayStrategyEnum.REPEAT_ONE) {
    // playing.value = !playing.value
  } else {
    handleNextEvent()
  }
})

function handlePreviousEvent() {
  player.musicIndex = useGetPreviousMusicIndex(
    player.musicIndex,
    resource.musicList.length,
    player.playStrategy
  )
  musicUrl.value = useGetMusicUrl(resource.musicList[player.musicIndex])
}

function handleNextEvent() {
  player.musicIndex = useGetNextMusicIndex(
    player.musicIndex,
    resource.musicList.length,
    player.playStrategy
  )
  musicUrl.value = useGetMusicUrl(resource.musicList[player.musicIndex])
}
</script>

<template>
  <!-- 播放控制 -->
  <div class="z-controller" :class="{ 'z-controller-mobile': !largeScreen }">
    <button class="btn rotate180" @click="handlePreviousEvent">
      <SvgIcon name="next_v2" color="var(--color-heading)" />
    </button>

    <button
      class="btn"
      :class="{ 'controller-btn-play-mobile': !largeScreen }"
      @click="playing = !playing"
    >
      <SvgIcon name="play_v2" color="var(--color-heading)" v-show="!playing" />
      <SvgIcon name="pause_v2" color="var(--color-heading)" v-show="playing" />
    </button>

    <button class="btn" @click="handleNextEvent">
      <SvgIcon name="next_v2" color="var(--color-heading)" />
    </button>

    <button class="btn" @click="player.updatePlayStrategy" v-show="largeScreen">
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

    <span v-show="largeScreen"></span>
    <span v-show="largeScreen"></span>
    <span v-show="largeScreen"></span>
  </div>
</template>

<style scoped>
.z-controller {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.z-controller-mobile {
  justify-content: center;
}

.btn {
  width: 1.5rem;
  height: 1.5rem;
}

.controller-btn-play-mobile {
  width: 1.7rem;
  height: 1.7rem;
  margin-left: 3rem;
  margin-right: 3rem;
}
</style>

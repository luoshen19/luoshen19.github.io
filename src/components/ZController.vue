<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

import { inject } from 'vue'

import { useConfigStore } from '@/stores/config'
import { useResourceStore } from '@/stores/db'
import { usePlayerStore } from '@/stores/player'

import { useGetNextMusicIndex } from '@/use/audio'
import { useGetMusicUrl } from '@/use/resourceUrl'

import { keyMusicUrl, keyPlaying } from '@/util/keys.js'

const musicUrl = inject(keyMusicUrl)!
const playing = inject(keyPlaying)

const config = useConfigStore()
const resource = useResourceStore()
const player = usePlayerStore()

function handlePreviousEvent() {

}

function handleNextEvent() {
  player.musicIndex = useGetNextMusicIndex(
    player.musicIndex,
    resource.musicList.length,
    player.playStrategy,
    player.musicIndexHistory
  )
  musicUrl.value = useGetMusicUrl(resource.musicList[player.musicIndex])

  player.musicIndexHistory = player.musicIndexHistory.filter((it) => it !== player.musicIndex)
  player.musicIndexHistory.push(player.musicIndex)
}
</script>

<template>
  <!-- 播放控制 -->
  <div class="z-controller" :class="{ 'z-controller-mobile': config.isMobile }">
    <button class="controller-btn controller-btn-previous" @click="handlePreviousEvent">
      <SvgIcon name="next_v2" color="var(--color-heading)" />
    </button>

    <button class="controller-btn controller-btn-play" @click="playing = !playing">
      <SvgIcon name="play_v2" color="var(--color-heading)" v-show="!playing" />
      <SvgIcon name="pause_v2" color="var(--color-heading)" v-show="playing" />
    </button>

    <button class="controller-btn" @click="handleNextEvent">
      <SvgIcon name="next_v2" color="var(--color-heading)" />
    </button>

    <span v-show="!config.isMobile"></span>
    <span v-show="!config.isMobile"></span>
    <span v-show="!config.isMobile"></span>
    <span v-show="!config.isMobile"></span>
  </div>
</template>

<style scoped>
.z-controller {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.z-controller-moible {
  justify-content: center;
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

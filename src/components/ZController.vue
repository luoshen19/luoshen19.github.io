<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

import { inject } from 'vue'

import { useResourceStore } from '@/stores/db'
import { usePlayerStore } from '@/stores/player'

import { useGetNextMusicIndex } from '@/use/audio'
import { useGetMusicUrl } from '@/use/resourceUrl'

import { keyMusicUrl, keyPlaying } from '@/util/keys.js'


const musicUrl = inject(keyMusicUrl)!
const playing = inject(keyPlaying)

const resource = useResourceStore()
const player = usePlayerStore()

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
    <!-- 播放控制 -->
    <div class="z-controller">
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
</template>

<style scoped>
.z-controller {
  width: 100%;
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

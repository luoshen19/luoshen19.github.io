<script setup lang="ts">
import { inject, watch } from 'vue'
import ZIllustration from '@/components/ZIllustration.vue'
import ZController from '@/components/ZController.vue'
import ZCatalog from '@/components/ZCatalog.vue'
import ZProgressBar from '@/components/ZProgressBar.vue'

import { useMusicStore } from '@/stores/db'
import { useAudioMetaStore } from '@/stores/audio'
import { audioKey } from '@/util/keys.js'

const audioRef = inject(audioKey)!
const music = useMusicStore()
const audioMeta = useAudioMetaStore()

watch(
  () => audioMeta.sliderPos,
  (sliderPos) => {
    console.log(sliderPos)
    audioRef.value!.currentTime = parseFloat((audioRef.value!.duration * sliderPos).toFixed(2))
    audioMeta.currentTime = audioRef.value!.duration * sliderPos
  }
)

// 播放
function handlePlay() {
  if (audioRef.value!.paused) {
    audioRef.value!.play()
  } else {
    audioRef.value!.pause()
  }
  audioMeta.paused = !audioMeta.paused
}
// 上一首
function handlePrevious() {
  switchMusic(() => music.previous())
}
// 下一首
function handleNext() {
  switchMusic(() => music.next())
}
// 切歌
function handleSwitch(musicIndex: number) {
  switchMusic(() => {
    music.change(musicIndex)
  })
}

function switchMusic(callback: () => void) {
  audioRef.value!.pause()
  callback()
  // 监听音频可以开始播放的事件
  audioRef.value!.addEventListener('canplay', function () {
    // 开始播放音频
    audioRef.value!.play()
    audioMeta.paused = false
  })
  // 重新加载音频
  audioRef.value!.load()
}
</script>

<template>
    <div class="main-1">
      <ZIllustration />
      <ZProgressBar class="main-bottom" />
    </div>
    <div class="main-2"></div>
    <div class="main-3">
      <ZCatalog @handleSwitch="handleSwitch" />
      <ZController
        class="main-bottom"
        @handle-previous="handlePrevious"
        @handle-play="handlePlay"
        @handle-next="handleNext"
      />
    </div>
    <div class="main-4"></div>
</template>

<style scoped>
/* ================main布局============== */
.main-1 {
  width: 50vh;
  position: relative;
}

.main-2 {
  flex: 1;
}

.main-3 {
  width: 50vh;
  position: relative;
}

.main-4 {
  flex: 2;
}
/* ================main布局============== */

.main-bottom {
  position: absolute;
  bottom: 0;
}
</style>

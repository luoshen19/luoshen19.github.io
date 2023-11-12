<script setup lang="ts">
import { ref, watch } from 'vue'

import ZIllustration from '@/components/ZIllustration.vue'
import ZController from '@/components/ZController.vue'
import ZCatalog from '@/components/ZCatalog.vue'
import ZProgressBar from '@/components/ZProgressBar.vue'
import { db } from '@/api/githubApi'
import { useMusicStore, useImageStore } from '@/stores/db'
import { useAudioMetaStore } from '@/stores/audio'

const music = useMusicStore()
const image = useImageStore()
const audioMeta = useAudioMetaStore()
db().then((resp) => {
  music.init(resp.musicList)
  image.init(resp.imageList)
})

const audioRef = ref<HTMLAudioElement>()

watch(
  () => audioMeta.sliderPos,
  (sliderPos) => {
    console.log(sliderPos)
    audioRef.value!.currentTime = parseFloat((audioRef.value!.duration * sliderPos).toFixed(2))
    audioMeta.currentTime = audioRef.value!.duration * sliderPos
  }
)

// 当音频的元数据加载完成时触发
function loadedmetadataEvent() {
  audioMeta.currentTime = audioRef.value!.currentTime
  audioMeta.duration = audioRef.value!.duration
}
// 当音频的播放位置发生变化时触发
function timeupdateEvent() {
  // 更新当前播放时间
  audioMeta.currentTime = audioRef.value!.currentTime
}
// 一首歌播放结束时触发
function endedEvent() {
  console.log('111')

  handleNext()
}

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
  <header></header>
  <main>
    <!-- controls 显示面板 -->
    <audio
      ref="audioRef"
      :src="music.current"
      @loadedmetadata="loadedmetadataEvent"
      @timeupdate="timeupdateEvent"
      @ended="endedEvent"
    ></audio>
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
  </main>
  <footer></footer>
</template>

<style scoped>
/* ================整体布局============== */
header {
  height: 15%;
  padding-top: 1%;
  padding-bottom: 2%;
}

main {
  height: 75%;
  display: flex;
}

footer {
  height: 10%;
}
/* ================整体布局============== */

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

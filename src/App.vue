<script setup lang="ts">
import ZCorner from '@/components/ZCorner.vue'

import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

import { useMusicStore, useImageStore } from '@/stores/db'
import { useAudioMetaStore } from '@/stores/audio'
import { useConfigStore } from '@/stores/config'

import { audioKey, audioOperateKey } from './util/keys.js'
import { getResource } from '@/api/githubApi'

const audioRef = ref<HTMLAudioElement>()
provide(audioKey, audioRef)

const music = useMusicStore()
const image = useImageStore()
const config = useConfigStore()
const audioMeta = useAudioMetaStore()
// 马上更新一次设备
config.updateDevice()

getResource().then((resp) => {
  music.init(resp.musicList)
  image.init(resp.imageList)
})

// audio 事件 =====================
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
  handleNext()
}
// audio 事件 =====================

// audio 操作 =====================
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

provide(audioOperateKey, {
  handlePlay: handlePlay,
  handlePrevious: handlePrevious,
  handleNext: handleNext,
  handleSwitch: handleSwitch
})
// audio 操作 =====================

// 路由 ===========================
const router = useRouter()

function pushIndex() {
  router.push('/')
}

function pushAbout() {
  router.push('/about')
}
// 路由 ===========================

window.addEventListener('resize', () => {
  config.updateDevice()
})
</script>

<template>
  <!-- controls 显示面板 -->
  <audio
    ref="audioRef"
    :src="music.current"
    @loadedmetadata="loadedmetadataEvent"
    @timeupdate="timeupdateEvent"
    @ended="endedEvent"
  ></audio>

  <header v-show="!config.isMoible">
    <h1 @click="pushIndex">纳西妲图书馆</h1>
    <el-space :size="10">
      <span @click="pushAbout">关于</span>
    </el-space>
  </header>

  <main :class="{ 'main-moible': config.isMoible }">
    <RouterView></RouterView>
  </main>

  <footer v-show="!config.isMoible"></footer>

  <ZCorner v-show="!config.isMoible" class="z-corner"></ZCorner>
</template>

<style scoped>
/* ================整体布局============== */
body {
  position: relative;
}

header {
  height: 15%;
  padding-top: 2%;
  padding-bottom: 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

main {
  height: 75%;
  display: flex;
}

.main-moible {
  width: 100vw;
  height: 100vh;
}

footer {
  height: 10%;
}

.z-corner {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
/* ================整体布局============== */

h1 {
  font-size: 2rem;
  font-weight: 700;
}

span {
  font-size: 1.3rem;
  font-weight: 500;
}
</style>

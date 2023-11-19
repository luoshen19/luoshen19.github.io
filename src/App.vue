<script setup lang="ts">
import ZCorner from '@/components/ZCorner.vue'
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore, useImageStore } from '@/stores/db'
import { useAudioMetaStore } from '@/stores/audio'
import { audioKey, audioOperateKey } from './util/keys.js'
import { db } from '@/api/githubApi'

const audioRef = ref<HTMLAudioElement>()
provide(audioKey, audioRef)

const music = useMusicStore()
const image = useImageStore()
db().then((resp) => {
  music.init(resp.musicList)
  image.init(resp.imageList)
})

const audioMeta = useAudioMetaStore()

function changeTheme() {
  // document.body.setAttribute("theme-mode", "dark");
  document.body.style.backgroundColor = 'red'
}

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
  console.log('1111')

  // handleNext()
}

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

// 路由 ===========================
const router = useRouter()

function pushIndex() {
  router.push('/')
}

function pushAbout() {
  router.push('/about')
}
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
  <header>
    <h1 @click="pushIndex">纳西妲图书馆</h1>
    <el-space :size="10">
      <span @click="pushAbout">关于</span>
    </el-space>
  </header>
  <main>
    <RouterView></RouterView>
  </main>
  <footer></footer>
  <ZCorner class="z-corner"></ZCorner>
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

footer {
  height: 10%;
}

.z-corner {
  position: fixed;
  bottom: 10%;
  right: 10%;
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
<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore, useImageStore } from '@/stores/db'
import { useAudioMetaStore } from '@/stores/audio'
import { audioKey } from './util/keys.js'
import { db } from '@/api/githubApi'

const audioRef = ref<HTMLAudioElement>()
provide(audioKey, audioRef);

const music = useMusicStore()
const image = useImageStore()
db().then((resp) => {
  music.init(resp.musicList)
  image.init(resp.imageList)
})

const audioMeta = useAudioMetaStore()

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
  console.log("1111");
  
  // handleNext()
}

// 路由 ===========================
const router = useRouter()

function pushIndex() {
  router.push("/")
}

function pushAbout() {
  router.push("/about")
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
</template>

<style scoped>
/* ================整体布局============== */
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

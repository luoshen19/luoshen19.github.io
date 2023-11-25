<script setup lang="ts">
import ZCorner from '@/components/ZCorner.vue'

import { ref, provide, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { useResourceStore } from '@/stores/db'
import { useConfigStore } from '@/stores/config'
import { usePlayerStore } from '@/stores/player'

import { useMediaControls, useGetCurrentMusicIndex } from '@/use/audio'
import { useGetMusicUrl, useGetImageUrl } from '@/use/resourceUrl'

import { 
  keyMusicUrl, keyPlaying, keyCurrentTime, keyDuration, keyPlayStrategy,
  keyImageUrl
 } from '@/util/keys.js'
import { getResource } from '@/api/githubApi'

import {
  PlayStrategyEnum,
  str2PlayStrategyEnum
} from '@/enums/playStrategyEnum'

// =========================================

const resourse = useResourceStore()
const player = usePlayerStore()

const audioRef = ref<HTMLAudioElement>()
const musicUrl = ref<string>('')
const imageUrl = ref<string>('')

onBeforeMount(() => {
  getResource()
    .then((resp) => {
      resourse.musicList = resp.musicList
      resourse.imageList = resp.imageList
    })
    .then(() => {
      player.musicIndex = useGetCurrentMusicIndex(resourse.musicList.length)
      musicUrl.value = useGetMusicUrl(resourse.musicList[player.musicIndex])

      player.imageIndex = Math.floor(Math.random() * resourse.imageList.length)
      imageUrl.value = useGetImageUrl(resourse.imageList[player.imageIndex])
    })

  const tmpPlayStrategy = localStorage.getItem(keyPlayStrategy)
  if (tmpPlayStrategy) {
    player.playStrategy = str2PlayStrategyEnum(tmpPlayStrategy)
  } else {
    localStorage.setItem(keyPlayStrategy, PlayStrategyEnum.DEFAULT)
  }
})

const config = useConfigStore()
// 马上更新一次设备
config.updateDevice()

const { playing, currentTime, duration } = useMediaControls(audioRef, musicUrl)
keyMusicUrl
// 依赖注入 =================================
provide(keyMusicUrl, musicUrl)
provide(keyPlaying, playing)
provide(keyCurrentTime, currentTime)
provide(keyDuration, duration)

provide(keyImageUrl, imageUrl)
// 依赖注入 =================================

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
  <audio ref="audioRef"></audio>

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
@/use/audio
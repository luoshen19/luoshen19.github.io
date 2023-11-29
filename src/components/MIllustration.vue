<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import SvgIcon from './SvgIcon.vue'

import { useResourceStore } from '@/stores/db'
import { usePlayerStore } from '@/stores/player'

import { keyLikeMisicList, keyImageUrl, keyAlbumId } from '@/util/keys.js'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

import { useGetImageUrl, useGetNextImageIndex } from '@/use/imageRes'

const imageUrl = inject(keyImageUrl)!

const player = usePlayerStore()
const resource = useResourceStore()

const likeMisicList = ref<number[]>(JSON.parse(localStorage.getItem(keyLikeMisicList) ?? '[]'))
const isShowAlbum = ref(false)
const albumLeaveTime = ref(0)
const albumShowStatus = ref<boolean[]>([])
// 条目出入场时间间隔
const interval = 50

function likeEvent() {
  // 存在取消
  if (likeMisicList.value.includes(player.musicIndex)) {
    likeMisicList.value = likeMisicList.value.filter((it) => it !== player.musicIndex)
  } else {
    likeMisicList.value.push(player.musicIndex)
  }
  localStorage.setItem(keyLikeMisicList, JSON.stringify(likeMisicList.value))
}

function switchAlbum(albumId: string) {
  player.albumId = albumId
  resource.update(albumId)
  localStorage.setItem(keyAlbumId, albumId)

  // TODO 自动更新 目前 手动更新图片
  imageUrl.value = useGetImageUrl(resource.imageList[useGetNextImageIndex(player.imageIndex, resource.musicList.length)])
}

function showAlbum() {
  isShowAlbum.value = !isShowAlbum.value
  albumLeaveTime.value = resource.albumList!.length * interval * 2
  let delay = 0
  resource.albumList!.forEach((item, index) => {
    setTimeout(() => {
      if (isShowAlbum.value) {
        albumShowStatus.value[index] = isShowAlbum.value
      } else {
        albumShowStatus.value[resource.albumList!.length - index - 1] = isShowAlbum.value
      }
    }, delay)
    delay += interval
  })
}
</script>

<template>
  <div class="z-illustration">
    <div class="menu">
      <button class="menu-btn rotate180" @click="showAlbum">
        <SvgIcon name="arrow-up" color="var(--color-heading)" />
      </button>

      <button class="menu-btn rotate90">
        <SvgIcon name="dots-three" color="var(--color-heading)" />
      </button>
    </div>

    <div class="illustration">
      <el-image
        :src="imageUrl"
        fit="cover"
        :class="{ 'el-image-blur': isShowAlbum }"
        style="transition: all 0.5s ease"
      >
        <template #placeholder>
          <span class="el-image-slot">let death like autumn leaves</span>
        </template>
        <template #error>
          <span class="el-image-slot">let death like autumn leaves</span>
        </template>
      </el-image>
      <transition name="fade" :duration="{ enter: 0, leave: albumLeaveTime }">
        <el-scrollbar v-show="isShowAlbum">
          <TransitionGroup name="album">
            <p
              v-for="(item, index) in resource.albumList"
              v-show="albumShowStatus[index]"
              :key="item.id"
              class="scrollbar-item"
              :class="{ current: item.id === player.albumId }"
              @click="switchAlbum(item.id)"
            >
              {{ '#  ' + item.name }}
            </p>
          </TransitionGroup>
        </el-scrollbar>
      </transition>
    </div>

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
  </div>
</template>

<style scoped>
.z-illustration {
  width: 80vw;
  margin-bottom: 1.5rem;
}

.illustration {
  position: relative;
  width: 100%;
  height: 80vw;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  overflow: hidden; /* 隐藏溢出内容 */
}

.el-image {
  position: absolute;
  width: 100%;
  height: 100%;
}

.el-image-blur {
  filter: blur(2px);
}

.el-image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  font-size: 1rem;
}

.el-scrollbar {
  transition: all 0.5s ease;
}

/* 
  ElementUI 隐藏滚动条 
  参考文章 https://huaweicloud.csdn.net/63a563a3b878a5454594626e.html
*/
:deep(.el-scrollbar__bar.is-vertical) {
  width: 0 !important;
}
:deep(.el-scrollbar__bar.is-horizontal) {
  height: 0 !important;
}

.scrollbar-item {
  font-size: 1.3rem;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
  padding-left: 5px;
  background-color: var(--color-border);
  opacity: 1;
}

.scrollbar-item:hover {
  color: var(--color-heading);
  background-color: var(--color-border-hover);
}

.current {
  color: var(--color-heading);
  background-color: var(--color-border-hover);
}

.menu {
  display: flex;
  justify-content: space-between;
}

.menu-btn {
  width: 1.3rem;
  height: 1.3rem;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.album-enter-active,
.album-leave-active {
  transition: all 0.5s ease;
}
.album-enter-from,
.album-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

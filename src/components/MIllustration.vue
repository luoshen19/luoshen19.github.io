<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import SvgIcon from './SvgIcon.vue'

import { useResourceStore } from '@/stores/db'
import { usePlayerStore } from '@/stores/player'

import { keyLikeMisicList, keyImageUrl, keyAlbumId } from '@/util/keys.js'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

const imageUrl = inject(keyImageUrl)!

const player = usePlayerStore()
const resource = useResourceStore()

const likeMisicList = ref<number[]>(JSON.parse(localStorage.getItem(keyLikeMisicList) ?? '[]'))
const isShowAlbum = ref(false)

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
}
</script>

<template>
  <div class="z-illustration">
    <div class="menu">
      <button class="menu-btn rotate180" @click="isShowAlbum = !isShowAlbum">
        <SvgIcon name="arrow-up" color="var(--color-heading)" />
      </button>

      <button class="menu-btn rotate90">
        <SvgIcon name="dots-three" color="var(--color-heading)" />
      </button>
    </div>

    <div class="illustration">
      <el-image :src="imageUrl" fit="cover" :class="{ 'el-image-blur': isShowAlbum }">
        <template #placeholder>
          <span class="el-image-slot">let death like autumn leaves</span>
        </template>
        <template #error>
          <span class="el-image-slot">let death like autumn leaves</span>
        </template>
      </el-image>

      <el-scrollbar v-show="isShowAlbum">
        <p
          v-for="(item, index) in resource.album"
          :key="index"
          class="scrollbar-item"
          :class="{ current: index === player.musicIndex }"
          @click="switchAlbum(item.id)"
        >
          {{ '#  ' + item.name }}
        </p>
      </el-scrollbar>
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
  filter: opacity(80%) blur(2px);
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

.scrollbar-item {
  font-size: 1.3rem;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
  padding-left: 5px;
  background: var(--color-background-mute);
  background-color: rgba(255, 255, 255, .5);
  opacity: 1;
}

.scrollbar-item:hover {
  color: var(--color-heading);
}

.menu {
  display: flex;
  justify-content: space-between;
}

.menu-btn {
  width: 1.3rem;
  height: 1.3rem;
}
</style>

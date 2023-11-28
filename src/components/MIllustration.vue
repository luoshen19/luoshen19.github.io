<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import SvgIcon from './SvgIcon.vue'

import { usePlayerStore } from '@/stores/player'

import { keyLikeMisicList, keyImageUrl } from '@/util/keys.js'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

const imageUrl = inject(keyImageUrl)!

const player = usePlayerStore()

const likeMisicList = ref<number[]>(JSON.parse(localStorage.getItem(keyLikeMisicList) ?? '[]'))

function showAlbum() {}

function likeEvent() {
  // 存在取消
  if (likeMisicList.value.includes(player.musicIndex)) {
    likeMisicList.value = likeMisicList.value.filter((it) => it !== player.musicIndex)
  } else {
    likeMisicList.value.push(player.musicIndex)
  }
  localStorage.setItem(keyLikeMisicList, JSON.stringify(likeMisicList.value))
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

    <el-image :src="imageUrl" fit="cover">
      <template #placeholder>
        <span class="el-image-slot">let death like autumn leaves</span>
      </template>
      <template #error>
        <span class="el-image-slot">let death like autumn leaves</span>
      </template>
    </el-image>

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

.el-image {
  width: 100%;
  height: 80vw;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

.el-image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid var(--dark-theme-color-w3);
  border-radius: 2px;
  color: var(--dark-theme-color-w3);
  font-size: 1rem;
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

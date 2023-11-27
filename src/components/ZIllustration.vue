<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import SvgIcon from './SvgIcon.vue'

import { usePlayerStore } from '@/stores/player'

import { keyLikeMisicList, keyImageUrl, keyLargeScreen } from '@/util/keys.js'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

const imageUrl = inject(keyImageUrl)!
const largeScreen = inject(keyLargeScreen)

const player = usePlayerStore()

const likeMisicList = ref<number[]>(JSON.parse(localStorage.getItem(keyLikeMisicList) ?? '[]'))

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
  <div :class="{ 'z-illustration': largeScreen, 'z-illustration-mobile': !largeScreen }">
    <div class="menu" v-show="!largeScreen">
      <button class="menu-btn rotate180">
        <SvgIcon 
        name="arrow-up" 
        color="var(--color-heading)"
         />
      </button>

      <button class="menu-btn rotate90">
        <SvgIcon
          name="dots-three"
          color="var(--color-heading)"
        />
      </button>
    </div>

    <el-image
      :class="{ 'el-image-umobile': largeScreen, 'el-image-mobile': !largeScreen }"
      :src="imageUrl"
      fit="cover"
    >
      <template #placeholder>
        <span class="el-image-slot">老大哥在看着你</span>
      </template>
      <template #error>
        <span class="el-image-slot">老大哥在看着你</span>
      </template>
    </el-image>

    <div class="menu" v-show="!largeScreen">
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
  width: 50vh;
  height: 50vh;
}

.z-illustration-mobile {
  width: 80vw;
  margin-bottom: 1.5rem;
}

.el-image-umobile {
  width: 100%;
  height: 100%;
}

.el-image-mobile {
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
  font-size: 30px;
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

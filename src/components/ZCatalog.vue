<script setup lang="ts">
import { inject } from 'vue'

import { useResourceStore } from '@/stores/db'
import { usePlayerStore } from '@/stores/player'

import { useGetMusicUrl } from '@/use/musicRes'

import { keyMusicUrl } from '@/util/keys.js'

const musicUrl = inject(keyMusicUrl)!

const resource = useResourceStore()
const player = usePlayerStore()

const d = 'up'
const oldScrollTop = 0

const scroll = ({ scrollTop }: { scrollTop: number }) => {
  // console.log(scrollTop + "");
}

function handleSwitchEvent(index: number) {
  player.musicIndex = index
  musicUrl.value = useGetMusicUrl(resource.musicList[index])
}
</script>

<template>
  <div class="z-catalog">
    <el-scrollbar @scroll="scroll">
      <p
        v-for="(item, index) in resource.musicList"
        :key="index"
        class="scrollbar-item"
        :class="{ current: index === player.musicIndex }"
        @click="handleSwitchEvent(index)"
      >
        {{ '#  ' + item.substring(0, item.lastIndexOf('.')).replace(/_/g, ' ') }}
      </p>
    </el-scrollbar>

    <div class="container-scrollbar"></div>
  </div>
</template>

<style scoped>
.z-catalog {
  width: 50vh;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* ===================整体布局==================== */

.el-scrollbar {
  flex: 4;
  position: relative;
  height: 100%;
}

.container-scrollbar {
  flex: 1;
  height: 100%;
  /* background: rgb(163, 229, 156); */
}
/* ===================整体布局==================== */

/* .el-scrollbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-image: linear-gradient(to bottom, var(--color-background), #0000);
  pointer-events: none;
}

.el-scrollbar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-image: linear-gradient(to top, var(--color-background), #0000);
  pointer-events: none;
} */

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
  border-radius: 3px;
}

.scrollbar-item:hover {
  color: var(--color-heading);
}

.current {
  color: var(--color-heading);
  background: var(--color-background-soft);
}
</style>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

import { inject } from 'vue'

import { injectTheme, funUpdateTheme } from '@/util/keys'
import { ThemeEnum } from '@/enums/themeEnum'

const theme = inject(injectTheme)
const updateTheme = inject(funUpdateTheme)
</script>

<template>
  <div class="z-corner">
    <div class="theme" @click="updateTheme">
      <span class="theme-svg" v-show="theme === ThemeEnum.DARK">
        <SvgIcon name="moon" />
      </span>
      <span class="theme-svg" v-show="theme === ThemeEnum.LIGHT">
        <SvgIcon name="sun" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.theme {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-background-mute);

  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.theme:hover {
  border-color: var(--color-border-hover);
}

.theme-svg {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
}
</style>

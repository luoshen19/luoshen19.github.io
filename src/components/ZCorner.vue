<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
import { ThemeEnum } from '@/config/themeEnum'

function switchTheme() {
  let currentTheme = localStorage.getItem('theme') ?? ThemeEnum.DEFAULT
  currentTheme = (currentTheme === ThemeEnum.DARK) ? ThemeEnum.LIGHT : ThemeEnum.DARK
  document.documentElement.setAttribute('theme-mode', currentTheme)
  localStorage.setItem('theme', currentTheme)
}
</script>

<template>
  <div class="z-corner">
    <div class="theme" @click="switchTheme"><SvgIcon name="sun" /></div>
  </div>
</template>

<style scoped>
.theme {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-background-mute);
}

.theme:hover {
  border: 2px solid var(--color-border-hover);
}

/* .el-button {
  border: 2px solid var(--color-background-soft);
  background: var(--color-text);
} */
</style>

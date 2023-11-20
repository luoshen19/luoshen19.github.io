<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from './SvgIcon.vue'
import { ThemeEnum } from '@/enums/themeEnum'

let currentTheme = ref(localStorage.getItem('theme') ?? ThemeEnum.DEFAULT)

function switchTheme() {
  currentTheme.value = currentTheme.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
  document.documentElement.setAttribute('theme-mode', currentTheme.value)
  localStorage.setItem('theme', currentTheme.value)
}
</script>

<template>
  <div class="z-corner">
    <div class="theme" @click="switchTheme">
      <span class="theme-svg" v-show="currentTheme === ThemeEnum.DARK">
        <SvgIcon name="moon" />
      </span>
      <span class="theme-svg" v-show="currentTheme === ThemeEnum.LIGHT">
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

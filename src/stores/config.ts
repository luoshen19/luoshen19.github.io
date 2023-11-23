import { ref } from 'vue'
import { defineStore } from 'pinia'

import { keyPlayStrategy } from '@/util/keys'
import { PlayStrategyEnum, str2PlayStrategyEnum, getNextPlayStrategyEnum } from '@/enums/playStrategyEnum'

export const useConfigStore = defineStore('config', () => {
  const isMoible = ref(false)

  function init() {
    updateDevice()
  }

  function updateDevice() {
    isMoible.value = window.matchMedia('(max-width: 768px)').matches
  }

  return { isMoible, init, updateDevice }
})

export const usePlayConfigStore = defineStore('playConfig', () => {

  const musicIndex = ref(0)
  const imageIndex = ref(0)
  const baseURL4Music = import.meta.env.VITE_RESOURCE_URL + '/music/'

  const playStrategy = ref(PlayStrategyEnum.REPEAT)

  function init() {
    const tmp = localStorage.getItem(keyPlayStrategy)
    if (tmp) {
      playStrategy.value = str2PlayStrategyEnum(tmp)
    } else {
      localStorage.setItem(keyPlayStrategy, PlayStrategyEnum.REPEAT)
    }
  }

  function updatePlayStrategy() {
    const tmp = getNextPlayStrategyEnum(playStrategy.value)
    playStrategy.value = tmp,
    localStorage.setItem(keyPlayStrategy, tmp)
  }

  return { 
    playStrategy, init, updatePlayStrategy,
    musicIndex,
    imageIndex
  }
})

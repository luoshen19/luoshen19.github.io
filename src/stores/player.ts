import { ref } from 'vue'
import { defineStore } from 'pinia'

import { keyPlayStrategy } from '@/util/keys'
import { PlayStrategyEnum, getNextPlayStrategyEnum } from '@/enums/playStrategyEnum'

export const usePlayerStore = defineStore('player', () => {
  const playStrategy = ref(PlayStrategyEnum.DEFAULT)
  const musicIndex = ref(0)
  const imageIndex = ref(0)
  const musicIndexHistory = ref<number[]>([])

  function updatePlayStrategy() {
    const tmp = getNextPlayStrategyEnum(playStrategy.value)
    ;(playStrategy.value = tmp), localStorage.setItem(keyPlayStrategy, tmp)
  }

  return {
    playStrategy,
    updatePlayStrategy,
    musicIndex,
    imageIndex,
    musicIndexHistory
  }
})

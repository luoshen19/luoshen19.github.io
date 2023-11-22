import type { InjectionKey, Ref } from 'vue'

export const audioKey = Symbol() as InjectionKey<Ref<HTMLAudioElement | undefined>>

export const audioOperateKey = Symbol() as InjectionKey<{
  handlePlay: () => void
  handlePrevious: () => void
  handleNext: () => void
  handleSwitch: (musicIndex: number) => void
}>


// localStorage key ==========================================
export const keyPlayStrategy = "playStrategy"
export const keyLikeMisicList = 'likeMisicList'
// localStorage key ==========================================
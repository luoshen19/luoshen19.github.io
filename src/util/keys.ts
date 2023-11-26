import type { InjectionKey, Ref } from 'vue'

// export const audioKey = Symbol() as InjectionKey<Ref<HTMLAudioElement | undefined>>

// export const audioOperateKey = Symbol() as InjectionKey<{
//   handlePlay: () => void
//   handlePrevious: () => void
//   handleNext: () => void
//   handleSwitch: (musicIndex: number) => void
// }>

export const keyMusicUrl = Symbol() as InjectionKey<Ref<String>>
export const keyPlaying = Symbol() as InjectionKey<Ref<boolean>>
export const keyCurrentTime = Symbol() as InjectionKey<Ref<number>>
export const keyDuration = Symbol() as InjectionKey<Ref<number>>
export const keyEnded = Symbol() as InjectionKey<Ref<boolean>>

export const keyImageUrl = Symbol() as InjectionKey<Ref<String>>

// localStorage key ==========================================
export const keyPlayStrategy = 'playStrategy'
export const keyLikeMisicList = 'likeMisicList'
export const keyMusicIndex = 'keyMusicIndex'
// localStorage key ==========================================

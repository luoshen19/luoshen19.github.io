import type { InjectionKey, Ref } from 'vue'

// inject key ==========================================
export const keyMusicUrl = Symbol() as InjectionKey<Ref<String>>
export const keyPlaying = Symbol() as InjectionKey<Ref<boolean>>
export const keyCurrentTime = Symbol() as InjectionKey<Ref<number>>
export const keyDuration = Symbol() as InjectionKey<Ref<number>>
export const keyEnded = Symbol() as InjectionKey<Ref<boolean>>

export const keyImageUrl = Symbol() as InjectionKey<Ref<String>>

export const keyLargeScreen = Symbol() as InjectionKey<Ref<boolean>>

// localStorage key ==========================================
export const keyPlayStrategy = 'playStrategy'
export const keyLikeMisicList = 'likeMisicList'
export const keyMusicIndex = 'keyMusicIndex'

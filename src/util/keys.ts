import type { InjectionKey, Ref } from 'vue'

export const audioKey = Symbol() as InjectionKey<Ref<HTMLAudioElement | undefined>>
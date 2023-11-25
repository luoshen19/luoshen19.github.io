import { ref, watch, toValue, type Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

import { keyMusicIndex } from '@/util/keys'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

export function useMediaControls(target: Ref<HTMLAudioElement | undefined>, source: Ref<string>) {
  let first = true

  const playing = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)

  /**
   * 相当于初始化
   * 在audio标签渲染后，将source挂到audio上
   * 触发到这个监听器
   */
  watch(target, (target) => {
    const el = toValue(target)
    if (!el) {
      console.log('target is null')
      return
    }
    el.src = toValue(source)
    el.load()
  })

  watch(source, (source) => {
    const el = toValue(target)
    if (!el) {
      console.log('target is null')
      return
    }
    el.src = toValue(source)
    el.load()
    if (first) {
      first = false
      return
    }
    el.play()
  })

  watch(playing, (isPlaying) => {
    const el = toValue(target)
    if (!el) {
      console.log('target is null')
      return
    }
    isPlaying ? el.play() : el.pause()
  })

  useEventListener(target, 'pause', () => (playing.value = false))
  useEventListener(target, 'play', () => (playing.value = true))
  useEventListener(target, 'loadedmetadata', () => (duration.value = toValue(target)!.duration))
  useEventListener(target, 'timeupdate', () => (currentTime.value = toValue(target)!.currentTime))
  // useEventListener(target, 'ended', () => ended.value = true)

  return { playing, currentTime, duration }
}

export function useGetCurrentMusicIndex(len: number): number {
  const tmp = localStorage.getItem(keyMusicIndex)
  if (tmp) {
    return parseInt(tmp)
  } else {
    return Math.floor(Math.random() * len)
  }
}

export function useGetNextMusicIndex(
  currentIndex: number,
  len: number,
  playStrategy: PlayStrategyEnum,
  history: number[]
) {
  if (playStrategy == PlayStrategyEnum.REPEAT) {
    return (currentIndex + len + 1) % len
  } else if (playStrategy == PlayStrategyEnum.REPEAT_ONE) {
    return currentIndex
  } else {
    let next = Math.floor(Math.random() * len)
    while (currentIndex == next) {
      next = Math.floor(Math.random() * len)
    }
    return next
  }
}

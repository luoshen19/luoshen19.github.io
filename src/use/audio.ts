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
    const index = Math.floor(Math.random() * len)
    localStorage.setItem(keyMusicIndex, index.toString())
    return index
  }
}

export function useGetPreviousMusicIndex(
  currentIndex: number,
  len: number,
  playStrategy: PlayStrategyEnum
) {
  let index: number
  if (playStrategy == PlayStrategyEnum.REPEAT || playStrategy == PlayStrategyEnum.REPEAT_ONE) {
    index = (currentIndex + len - 1) % len
  } else {
    index = Math.floor(Math.random() * len)
    while (currentIndex == index) {
      index = Math.floor(Math.random() * len)
    }
  }
  localStorage.setItem(keyMusicIndex, index.toString())
  return index
}

export function useGetNextMusicIndex(
  currentIndex: number,
  len: number,
  playStrategy: PlayStrategyEnum
) {
  let index: number
  if (playStrategy == PlayStrategyEnum.REPEAT || playStrategy == PlayStrategyEnum.REPEAT_ONE) {
    index = (currentIndex + len + 1) % len
  } else {
    index = Math.floor(Math.random() * len)
    while (currentIndex == index) {
      index = Math.floor(Math.random() * len)
    }
  }
  localStorage.setItem(keyMusicIndex, index.toString())
  return index
}

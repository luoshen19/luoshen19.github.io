import { keyMusicIndex } from '@/util/keys'
import { PlayStrategyEnum } from '@/enums/playStrategyEnum'

export function useGetMusicUrl(name: string): string {
  return import.meta.env.VITE_RESOURCE_URL + '/music/' + name
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
    while (currentIndex == index && len > 1) {
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
    while (currentIndex == index && len > 1) {
      index = Math.floor(Math.random() * len)
    }
  }
  localStorage.setItem(keyMusicIndex, index.toString())
  return index
}

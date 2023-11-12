import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioMetaStore = defineStore('audioMeta', () => {
  const paused = ref(true)
  const currentTime = ref(0)
  const duration = ref(0)

  // 进度滑块位置 只有点击进度条的时候才改变这个值
  const sliderPos = ref(0)

  return { paused, currentTime, duration, sliderPos }
})

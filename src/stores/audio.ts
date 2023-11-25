import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioMetaStore = defineStore('audioMeta', () => {
  // 进度滑块位置 只有点击进度条的时候才改变这个值
  const sliderPos = ref(0)

  return { sliderPos }
})

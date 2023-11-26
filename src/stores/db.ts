import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResourceStore = defineStore('resource', () => {
  // 音乐文件列表 eg. 残酷天使的行动纲领.mp3
  const musicList = ref<string[]>([])
  // 前景图片文件列表 eg. nahida01.jpg
  const imageList = ref<string[]>([])
  // 背景图片文件列表 eg. bg_nahida01.jpg
  const bgList = ref<string[]>([])

  return { musicList, imageList, bgList }
})

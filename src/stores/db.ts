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

export const useMusicStore = defineStore('music', () => {
  const index = ref(0)
  const current = ref<string>()
  const list = ref<string[]>([])
  const baseURL4Music = import.meta.env.VITE_RESOURCE_URL + '/music/'

  // 初始化
  function init(musicList: string[]) {
    list.value = musicList
    // Math.random() [0,1) 取模取 数组长度 - 1 正好抵消
    index.value = Math.floor(Math.random() * list.value.length)
    current.value = baseURL4Music + list.value[index.value]
  }
  // 上一条目
  function previous() {
    index.value = (index.value + list.value.length - 1) % list.value.length
    current.value = baseURL4Music + list.value[index.value]
  }
  // 下一条目
  function next() {
    index.value = (index.value + list.value.length + 1) % list.value.length
    current.value = baseURL4Music + list.value[index.value]
  }
  // 随机条目
  function random() {
    index.value = Math.floor(Math.random() * list.value.length)
    current.value = baseURL4Music + list.value[index.value]
  }
  function change(musicIndex: number) {
    index.value = musicIndex
    current.value = baseURL4Music + list.value[index.value]
  }

  return { index, current, list, init, previous, next, random, change }
})

export const useImageStore = defineStore('image', () => {
  const index = ref(0)
  const current = ref<string>()
  const list = ref<string[]>([])
  const baseURL4Image = import.meta.env.VITE_RESOURCE_URL + '/image/'

  // 初始化
  function init(musicList: string[]) {
    list.value = musicList
    // Math.random() [0,1) 取模取 数组长度 - 1 正好抵消
    index.value = Math.floor(Math.random() * list.value.length)
    current.value = baseURL4Image + list.value[index.value]
  }
  // 上一条目
  function previous() {
    index.value = (index.value + list.value.length + 1) % list.value.length
    current.value = baseURL4Image + list.value[index.value]
  }
  // 下一条目
  function next() {
    index.value = (index.value + list.value.length - 1) % list.value.length
    current.value = baseURL4Image + list.value[index.value]
  }
  // 随机条目
  function random() {
    index.value = Math.floor(Math.random() * list.value.length)
    current.value = baseURL4Image + list.value[index.value]
  }

  return { current, list, init, previous, next, random }
})

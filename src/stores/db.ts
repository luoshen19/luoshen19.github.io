import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResourceStore = defineStore('resource', () => {
  // 所有数据
  const db = ref<any>()
  // 专辑(歌单)
  const album = ref<NAlbum[]>()
  // 音乐文件列表 eg. 残酷天使的行动纲领.mp3
  const musicList = ref<string[]>([])
  // 前景图片文件列表 eg. nahida01.jpg
  const imageList = ref<string[]>([])
  // 背景图片文件列表 eg. bg_nahida01.jpg
  const backgroundList = ref<string[]>([])

  function update(id: string) {
    musicList.value = db.value[id].musicList
    imageList.value = db.value[id].imageList
    backgroundList.value = db.value[id].backgroundList
  }

  return { db, album, musicList, imageList, backgroundList, update }
})

export class NAlbum {
  public id: string
  public name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const isMoible = ref(false)

  function updateDevice() {
    isMoible.value = window.matchMedia('(max-width: 768px)').matches
  }

  return { isMoible, updateDevice }
})

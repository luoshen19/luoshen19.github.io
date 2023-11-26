import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const isMobile = ref(false)

  function init() {
    updateDevice()
  }

  function updateDevice() {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches
  }

  return { isMobile, init, updateDevice }
})

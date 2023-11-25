import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'

// 主题
const currentTheme = localStorage.getItem('theme')
if (currentTheme != null) {
  document.documentElement.setAttribute('theme-mode', currentTheme)
}

const app = createApp(App)

app.config.globalProperties.isMoible = window.matchMedia('(max-width: 768px)').matches

app.use(createPinia())
app.use(router)

app.mount('#app')

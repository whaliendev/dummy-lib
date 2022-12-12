import 'normalize.css'

import 'tdesign-vue-next/es/style/index.css'

import './styles/index.scss'

import { createApp } from 'vue'
import './permission'
import App from './App.vue'
import router from '@/router/index'
import { store } from '@/store/index'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

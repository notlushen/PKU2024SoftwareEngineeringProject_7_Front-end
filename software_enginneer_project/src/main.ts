

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "element-plus/dist/index.css"
import Message from '@/utils/Message.js'
import Request from '@/utils/Request.js'

const app = createApp(App)
app.use(router)
app.config.globalProperties.Message=Message;
app.mount('#app')

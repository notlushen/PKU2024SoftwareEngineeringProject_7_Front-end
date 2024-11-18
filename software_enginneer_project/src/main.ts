
import VueCookies from 'vue-cookies'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "element-plus/dist/index.css"
import Message from '@/utils/Message'
import Request from '@/utils/Request'
import store from "@/store"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Dialog from '@/components/Dialog.vue'
import EditMarkdown from '@/components/editMarkdown.vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
app.config.globalProperties.VueCookies=VueCookies
app.config.globalProperties.globalInfo={

}
app.config.globalProperties.Message=Message;
app.config.globalProperties.Request=Request;
app.component("Dialog",Dialog)

app.component("EditMarkdown",Dialog)
app.mount('#app')

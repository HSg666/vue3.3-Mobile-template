import './style.css'
import './common.scss' // 公共样式
import 'virtual:windi.css' // 引入便捷css库
import '@/polyfill/polyfill' // 安装web兼容低版本浏览器插件

import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import { pinia } from './store'
import { nutuiPlugins } from './plugins/nutui' // 按需导入的NutUI组件函数

createApp(App).use(pinia).use(router).use(nutuiPlugins).mount('#app')

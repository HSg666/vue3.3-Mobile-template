import './style.css'
import './common.scss' // 公共样式
import 'virtual:windi.css' // 引入便捷css库
import '@/polyfill/polyfill' // 安装web兼容低版本浏览器插件
// 移动端适配
import 'lib-flexible/flexible.js'
// 引入全局样式
import '@/assets/scss/index.scss'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router' // 封装的路由
import { pinia } from './store' // 封装的模块化pinia store
import { nutuiPlugins } from './plugins/nutui' // 按需导入的NutUI组件函数

createApp(App).use(pinia).use(router).use(nutuiPlugins).mount('#app')

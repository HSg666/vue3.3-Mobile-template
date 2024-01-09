import 'virtual:windi.css' // 引入便捷css库
import '@/polyfill/polyfill' // 安装web兼容低版本浏览器插件
// 移动端适配
import 'lib-flexible/flexible.js'
// 引入全局样式
import '@/assets/scss/index.scss'

// 引入阿里云字体图标css
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

// 引入阿里巴巴普惠体 2.0字体
import '@/assets/iconfont/font/font.css'

// 这是移动端控制台调试工具，需要调试就打开,不用就注释
// import '@/utils/vconsole.ts'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router' // 封装的路由
import { pinia } from './store' // 封装的模块化pinia store
import { nutuiPlugins } from './plugins/nutui' // 按需导入的NutUI组件函数

createApp(App).use(pinia).use(router).use(nutuiPlugins).mount('#app')

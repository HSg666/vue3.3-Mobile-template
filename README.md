# 技术栈： Vue 3.3 / TS 5.2 / Vite5.0 / Pinia2.1.7 / router4.2.5 
# 环境： Node:16.20.1    pnpm:8.14.0
# 代码管理工具：sourceTree

# 命令
```js
cd learn-vite    // 切换
pnpm i           // 装依赖
pnpm start       // 启动
pnpm run build   // 打包
```
准备打包上线时请看搭建二期的 <a href="#requestURL">新增环境变量  优化请求地址</a>，检查完配置后再执行pnpm run build 打包

这个项目有什么东西呢？
# 搭建一期

## 1、务必装上安装pnpm 
没装的看这篇文章  https://blog.csdn.net/Steven_Son/article/details/135151622 
## 2、新增 .nvmrc
每次切换项目都手动切换 node 版本
## 3、CSS预处理器用的是SCSS
## 4、公共样式表
common.scss  需要初始化全局样式可以在此文件编辑
## 5、autoprefiexer 自动增加css浏览器兼容前缀
## 6、windicss  第三方便捷性css库
## 7、封装Antd / Vant-ui按需导入 
## 8、pinia 封装统一管理存储库 
## 9、router 封装 
## 10、配置路径别名 alias
示例：@/store   只要在src下的都能这样简写
## 11、polyfill web项目兼容低版本浏览器插件
core-js 和 @vitejs/plugin-legacy
## 12、prettier + eslint 配置了代码规范插件
## 13、husky + lint-staged  git提交规范
## 14、browserslist 配置了浏览器兼容性


### 备份
#### package.json

去掉模块化

```js
 "type": "module",
```

### git commit 提交规范

- feat：新功能（feature）
- fix/to：修复 bug，可以是 QA 发现的 BUG，也可以是研发自己发现的 
- fix：产生 diff 并自动修复此问题。适合于一次提交直接修复问题
- to：只产生 diff 不自动修复此问题。适合于多次提交。最终修复问题提交时使用 fix
- docs：文档（documentation）。
- style：格式（不影响代码运行的变动）【比如说加注释就是这个？】
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）。
- perf：优化相关，比如提升性能、体验。
- test：增加测试。
- chore：构建过程或辅助工具的变动。
- revert：回滚到上一个版本。
- merge：代码合并。
- sync：同步主线或分支的 Bug。

参考文章：https://blog.csdn.net/qq_17335549/article/details/128480583

# 搭建二期
## 1、新增axios并封装,还新增了自定义请求错误处理函数，请求类
## 2、封装api列表  apiList   
封装的axios配合api接口使用模板

(1)、先把接口添加进接口列表
```js
export const APIs = {
	GET_SHOPLIST: '/h5/getShopList', // 获取商品列表
}
```
(2)、页面使用
```js
// account.vue
import AxiosRequestError from '@/service/error' // 引入自定义错误处理函数
import $api from '@/service/webRequest' // 封装好的axios请求函数
import { APIs } from '@/service/apiList' // 接口列表

// 二选一即可

// async await 写法
const getShop = async () => {
	try {
		const res = await $api.getShopList()
		console.dir(res, 'res')
	} catch (error: AxiosRequestError) {
		console.dir(error, 'error')
	}
}

// 原生Primise  .then  .catch
$api.get(APIs.GET_SHOPLIST)
	.then(() => {})
	.catch((err: AxiosRequestError) => {
		console.dir(err, 'err')
})

```
(3)、用console.dir可以捕获到详细的错误信息，还能看到我们封装的错误处理函数

data: undefined,  // 接口返回值为undefined

isServerError: false, // 是否为服务器出错

isUnAuthorized: false, // 是否已通过鉴权，也就是常见的登录状态
## <a id="requestURL">3、新增环境变量  优化请求地址</a>
测试和正式环境地址在 global/env.ts 中配置
```js
// 正式环境
export const PROD_ENV = {
	SERVER_URL: 'http://192.168.1.193:8090/', // 服务器地址
	IS_DEV: 'false', // 是否为测试环境
}

// 测试环境
export const DEV_ENV = {
	SERVER_URL: 'http://192.168.1.193:8099/',
	IS_DEV: 'true',
}

/* 	
	isDEV：true为生产环境，false为开发环境
	假设开发环境的域名是 http://127.0.0.1:8099/api 或 https://xxx-test.com
	提示：
	本地如果要将请求地址切换为生产服务器，则将isDEV设置为false，注释掉判断开发环境的代码。代码如下
	const isDEV = false
	// if (typeof window !== 'undefined') {
	// isDEV = process.env.NODE_ENV === 'development' || ['http://192.168.1.193:8099'].includes(window.location.host)
	// }

	准备打包上线，将代码改回来。（开发环境也是这个代码）代码如下   
	let isDEV = true // 默认为开发环境
	if (typeof window !== 'undefined') {
		isDEV = process.env.NODE_ENV === 'development' || ['http://192.168.1.193:8099'].includes(window.location.host)
	}

*/

let isDEV = true // 默认为开发环境，但会根据当前环境动态更换开发或生产
if (typeof window !== 'undefined') {
	isDEV = process.env.NODE_ENV === 'development' || ['http://192.168.1.193:8099'].includes(window.location.host)
}
```
## 4、新增lodash 第三方库  
防抖和节流的使用方法,节流用到时再去查
```js
import { debounce,throttle } from 'lodash-es'

// 它返回一个带防抖的新函数
const debounceLogin = debounce(toLogin, 500)
function toLogin() {
	console.log(111)
}
```

参考文章：https://blog.csdn.net/qq_17335549/article/details/135022054

#  **[vue3.3-Mobile-template](https://github.com/HSg666/vue3.3-Mobile-template)** 

基于Vue3.3 + TS + Vant4 + Vite5 + Pinia + ViewPort适配 + Sass + Axios封装 + vconsole调试工具，搭建的H5移动端开发模板，开箱即用的。  

### 环境要求：

 Node:16.20.1    pnpm:8.14.0

必须装上安装pnpm，没装的看这篇文章  https://blog.csdn.net/Steven_Son/article/details/135151622 

代码管理工具推荐用：sourceTree

### 项目预览
![](https://img-blog.csdnimg.cn/direct/5d6fdf21951c40efa2ddd1b5abe89b1d.png)


![](https://img-blog.csdnimg.cn/direct/58786e2f1f1c4ff3b57adfa64ece87d1.png)

![](https://img-blog.csdnimg.cn/direct/2462980ba4fa44c1ac591aede2895971.png)

### 项目结构

```js
learn-vite -- UI 主目录  
├── dist 打包后自动生成的文件夹
├── public -- 静态资源  
├ ├── favicon.ico -- 图标  
├── src -- 源码目录  
├ ├── assets -- 全局静态资源
├ ├ ├── iconfont -- 字体和字体图标
├ ├ ├── images -- 图片存放路径
├ ├ ├── json -- 静态json
├ ├ └── scss -- index.scss 全局样式，reset.scss初始化样式
├ ├── components -- 封装的组件  
├ ├── global 配置全局URL环境变量
├ ├── hooks -- vue3 Hooks
├ ├── layout -- 全局Tabbar配置、keep-alive可配置需长缓存的路由
├ ├── polyfill 解决浏览器兼容性的文件
├ ├── router -- VUE 路由  
├ ├ ├── index -- 路由入口  
├ ├── service
├ ├ ├── apiList.ts -- 接口列表
├ ├ ├── error.ts -- 封装的接口错误提示
├ ├ ├── handleError.ts -- 处理接口请求错误
├ ├ ├── requestList.ts -- 请求函数列表 
├ ├ └── webRequest.ts -- 封装Axios请求函数
├ ├── store -- Pinia
├ ├ ├── index -- 统一导出整个pinia和store
├ ├ └── modules.ts  store模块化
├ ├── typings -- 存储TS类型别名
├ ├── utils -- 工具包  
├ ├── views -- 业务上的 vue 页面  
├ ├── App.vue -- 根组件  
├ └── main.ts -- 入口 ts  
├── components.d.ts -- 自动注册组件文件  
├── .eslintrc.js -- ESLint 配置  
├── .gitignore -- git 忽略  
├── tsconfig.json -- vscode 路径引入配置
├── index.html -- 首页  
├── package.json -- 依赖管理  
├── vite.config.ts -- vite5的相关配置 
└── windi.config.ts -- WindiCSS的配置文件
```

## 命令

```js
git clone https://github.com/HSg666/vue3.3-Mobile-template  
// 或 git clone git@github.com:HSg666/vue3.3-Mobile-template
cd learn-vite    // 切换
pnpm i           // 装依赖
pnpm start       // 启动
pnpm run build   // 打包
rm -rf node_modules  // 强行删除依赖包
```
准备打包上线时请看 <a href="#globalUrl">配置全局URL环境变量</a>，检查完配置后再执行pnpm run build 打包

部署上线后如果出现页面刷新报Nginx404，请看这篇文章并对照检查你的router/index.ts中的mode模式，更改配置后再试试就OK了。

https://blog.csdn.net/Steven_Son/article/details/135414494

## 目录

- [1、封装Router](#router)
- [2、Vant4自动按需导入](#vant4)
- [3、封装Axios请求函数、接口列表、请求错误处理](#axios)
- [4、配置全局URL环境变量](#globalUrl) 
- [5、配置alias路径别名](#alias)
- [6、封装Pinia、模块化、长缓存](#pinia)
- [7、postcss-px-to-viewport移动端适配](#postcss-px-to-viewport)
- [8、自动导入组件](#unplugin-vue-components)
- [9、封装TabBar布局容器](#tabbar)
- [10、WindiCSS样式库](#windicss)
- [11、初始化全局CSS和防止页面文本被用户选中](#resetcss)
- [12、字体与字体图标](#iconfont)
- [13、性能优化](#xnyh)
- [14、代码规范](#pretter)
- [15、配置兼容性](#jrx)
- [16、已配置第三方工具库](#threeTool)
- [17、拓展](#tuozhan)

## <span id="router">1、封装Router</span>

路径：src/router/index.ts

```js
// 需要Tabbar的组件在layoutRoutes中添加路由，Tabbar就是页面底部的 精选、分类、购物车、我的
export const layoutRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		meta: {
			title: 'home',
			keepAlive: true,
		},
		component: () => import('@/views/home/index.vue'),
	},
	{
		path: '/category',
		name: 'category',
		meta: {
			title: 'category',
			// keepAlive: true,
		},
		component: () => import('@/views/category/index.vue'),
	},
]
```

```js
// 不需要Tabbar的组件在routes中添加路由，即页面底部空空如也的组件。
export const routes: Array<RouteRecordRaw> = [
  // 这个是布局，不用改
	{
		path: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/index',
		// 需要layout的页面
		children: layoutRoutes,
	},
	// 注册的路由类似登录页
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
]

```
## 2、<span id="vant4">移动端UI库采用Vant4</span>
项目已经配置好按需导入和组件自动注册了，页面直接使用即可，无需手动注册。

除了Toast轻提示使用时需要手动引入，其他都无需手动引入。示例如下：

在vant4 Toast的函数名都改了，大家看官方文档就知道。

```js
// 示例：
<script lang="ts" setup>
import { showToast } from 'vant'
const handleClick = () => {
	showToast('轻提示')
}

 </script>
<template>
	<van-button type="primary" @click="handleClick">按钮</van-button>  
</template>
```

自动注册的组件都保存在项目根目录的 components.d.ts中，可自行查看。

配置详情：https://blog.csdn.net/Steven_Son/article/details/135544198?spm=1001.2014.3001.5501

UI库官网地址：https://vant-ui.github.io/vant/#/zh-CN/button

## <span id="axios">3、封装Axios</span>

### 1、新增axios并封装,还新增了自定义请求错误处理函数，请求类

### 2、封装api列表  apiList   

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
const params = { user:'', password:'' }  // 传参将需要传的值放入即可，跟vue2一样 
$api.get(APIs.GET_SHOPLIST, params)
	.then(() => {})
	.catch((err: AxiosRequestError) => {
		console.dir(err, 'err')
})

```
(3)、用console.dir可以捕获到详细的错误信息，还能看到我们封装的错误处理函数

data: undefined,  // 接口返回值为undefined

isServerError: false, // 是否为服务器出错

isUnAuthorized: false, // 是否已通过鉴权，也就是常见的登录状态

(4)、如果要添加或使用自定义请求函数，请在src/service/requestList.ts中添加，类似于已经存在的上传图片接口
### 3、自定义封装请求函数
1、先到service/apiList.ts中添加接口
```js
export const APIs = {
	GET_PRDDETAIL: '/m/CcbLifeGoods/getyById', // 获取商品详情
}
```
2、在service/requestList.ts中添加，用模板字符串自行拼接
<span style="color:red">注：由于get如果传多个参数需要自己拼接的，不像post直接传整个json对象给后端，所以你打算用get传多个参数，请看一下案例(采用模板字符串和&拼接方式)，见getOnlyId和getShopListFN；想用post单独传参也是ok的，见postOnlyId。</span>
```js
import { APIs } from './apiList'
class API {
	// 获取单个id数据   
	async getOnlyId(key, id) {
		return this.get(`${key}?id=${id}`)
	}
	// 获取商品列表 以及搜索  
	// key：接口名称  data: 所有参数组成的对象
	async getShopListFN(key, data) {
		// 写法1 传统
	  	// return this.get(`${key}?id=${data.id}&name=${data.name}&price=${data.price}&sale=${data.sale}&xp=${data.xp}`)
		// 写法2 解构
		const { id,name,price,sale,xp } = data
	  	// return this.get(`${key}?id=${id}&name=${name}&price=${price}&sale=${sale}&xp=${xp}`)
	}
	// 传递单个id数据
	async postOnlyId(key, data) {
		return this.post(`${key}?goodsId=${data.goodsId}`)
	}

}
```
3、页面使用
<span style="color:orange">注:自定义的方法都是绑定在$api this上的，所以直接在它身上取就可以</soan>
```js
import $api from '@/service/webRequest' // 封装好的axios请求函数
import { APIs } from '@/service/apiList' // 接口列表

const getData = async () => {
	// 单一传
	let id = route.query.id
	const { data: res } = await $api.getOnlyId(APIs.GET_PRDDETAIL, id)

	// 多个参数组装为一个对象传入
	let params = {
		id:1,
		name:'HSg',
		price:99,
		sale:3,
		xp:11
	}
	const { data: res } = await $api.getShopListFN(APIs.GET_PRDDETAIL, params)
}
```
## <span id="globalUrl">4、配置全局URL环境变量</span>
开发和正式环境地址在 global/env.ts 中配置
```js
// 静态图片前缀
export const fileServerAddress = 'http://192.168.1.179:8081/' // 客户端地址(某后端接口地址)
// const fileServerAddress = 'http://192.168.1.179:8081/' ; // 客户端地址(线上)

// 正式环境
export const PROD_ENV = {
	SERVER_URL: 'http://192.168.1.193:8090/', // 服务器地址
	IS_DEV: 'false', // 是否为开发环境
}

// 开发环境
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
	isDEV = process.env.NODE_ENV === 'development' || [fileServerAddress].includes(window.location.host)
}
```

静态图片前缀页面使用案例
```js
home.vue
// 图片前缀
import { fileServerAddress } from '@/global/env'
// 1、标签中
<img :src="fileServerAddress+'图片'">

// 2、函数中
直接使用fileServerAddress
```




## 5、<span id="alias">配置路径别名 alias</span>
示例：@/store   只要在src下的都能这样简写

总共分为4步：

1、vite.config.ts

```js
import path from 'path'
export default defineConfig({
	//新增
	resolve: {
		alias: {
			'@/assets': path.resolve(__dirname, './src/assets'),
		},
	},
})
```
2、tsconfig.json
```js
 "paths": {
      "@/assets/*": ["src/assets/*"],
    }
```
3、配置好页面使用
例如main.ts引入
```js
// 引入全局样式
import '@/assets/scss/index.scss'
```

4、更改完vite.config.ts和tsconfig.json记得重启项目。

## 6、<span id="pinia">封装Pinia、模块化、长缓存</span>

使用方式：

1、在store/modules下创建user.ts

````js
import { defineStore, acceptHMRUpdate } from 'pinia'

// 1、声明导出store名称
export const userStore = defineStore({
	id: 'user', // 2、声明store名称
	state: () => ({
		name: '很老很老的值',
	}),
	getters: {
		myName: state => {
			return `getters ${state.name}`
		},
	},
	actions: {
		changeName(name: string) {
			this.name = name
		},
	},
	
})

// 这行代码是用于支持热模块替换（HMR）的。在Pinia中，它允许接受热更新并应用到使用了userStore的地方。
// 3、为了让当前store接收热更新为它配置一下
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot))
}
````

2、导出user.ts中整个userStore给其他组件使用

store/modules/index.ts

```js
export * from './user'
```

3、store在组件中的使用方式

```js
// 1、引入
import { userStore } from '@/store' // 由于项目已配置路径别名，所以就用@/，它代表的是src

// 2、实例化
const useUserStore = userStore()

// 3、如何使用userStore中的变量和函数     看下面template中的p标签就知道，解不解构2选1
// 3.1.1  变量可用解构  例如取出name后直接使用即可
const { name } = useUserStore
// 3.1.2  变量不解构   需要加上useUserStore.name
console.log(useUserStore.name)

// 3.2  使用userStore中的函数
const handleLogin = () => {
  useUserStore.changeName('张三')
}

// 页面
<template>
  	  <p>{{ name }}</p>
      <p>{{ useUserStore.name }}</p>
</template>
```

完整代码

```js
import { userStore } from '@/store'  // 1、引入
const useUserStore = userStore() // 2、实例化

const { name } = useUserStore // 3、解构变量

// 4、使用
const handleLogin = () => {
  useUserStore.changeName('张三')
}

<template>
  	  <p>{{ name }}</p>
</template>
```



4、引入的store存储的数据默认是没有响应式的，可以用 storeToRefs 将其变为响应式。

```js
// 引入
import { storeToRefs } from "pinia";  

 // 将我们实例化的useAppstore放进去然后解构，解构出的state数据即为响应式
 const { name } = storeToRefs(useAppstore);
```

需要storeToRefs的完整代码

```js
import { userStore } from '@/store' // 引入userStore
import { storeToRefs } from "pinia";  // 取出响应式方法

const useUserStore = userStore() // 实例化
const { name } = storeToRefs(useUserStore); // 将实例化对象的数据更改为响应式并解构出来

// 使用userStore中的函数
const handleLogin = () => {
  useUserStore.changeName('张三')
}

// 页面
<template>
  	  <p>{{ name }}</p>
</template>
```

如何证明数据是否为响应式，请看这篇文章 https://blog.csdn.net/Steven_Son/article/details/128440811

封装+模块化：https://blog.csdn.net/Steven_Son/article/details/135553816?spm=1001.2014.3001.5501

长缓存：https://blog.csdn.net/Steven_Son/article/details/135551314?spm=1001.2014.3001.5501

Pinia官网文章：https://pinia.web3doc.top/introduction.html

## 7、<span id="postcss-px-to-viewport">自适应采用的是postcss-px-to-viewport</span>

详细配置说明看这篇文章：https://blog.csdn.net/Steven_Son/article/details/135554296?spm=1001.2014.3001.5501

## 8、<span id="unplugin-vue-components">自动导入组件</span>

使用components下的组件时自动注册的插件  unplugin-vue-components

作用：哪个页面要用到components下的组件无需import手动导入，直接<A/>使用即可。

所用的组件都自动保存在项目根目录的 components.d.ts 中。

## <span id="tabbar">9、封装TabBar布局容器</span>

1、路径：src/layout/index.vue

2、作用：页面整体的布局结构，如需增加/减少tabbar数量，增加时记得给新tabbar配置正确的路由，才能正常跳转。

## <span id="windicss">10、Windicss库的用法</span>

库已经配置好了，你直接使用即可。

```html
<p class="text-orange-500">橙色</p>
```

官方文档：https://windicss.org/

## 11、<span id="resetcss">初始化全局CSS和防止页面文本被用户选中</span>

src/assets/scss/reset.scss  和 src/assets/scss/index.scss 

## <span id="iconfont">12、字体和字体图标</span>

项目使用的字体和字体图标是阿里巴巴免费可商用的iconfont，无需担心是否侵权的问题。

路径：src/assets/iconfont

1、iconfont 阿里巴巴字体图标

配置文章链接： https://blog.csdn.net/Steven_Son/article/details/128149868?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22128149868%22%2C%22source%22%3A%22Steven_Son%22%7D

2、引入免费的阿里巴巴思源黑体字体  

配置文章链接：https://www.iconfont.cn/fonts/detail?spm=a313x.fonts_index.i1.d9df05512.7ccd3a81uTg3IB&cnid=nsKKStjV4gdI

## 13、<span id="xnyh">性能优化</span>

### 1、<span id="keep-alive">需要keep-alive长缓存的组件在此配置</span>

1、路由设置keepAlive属性

src/router/index.ts

```js
{
		path: '/category',
		name: 'category',
		meta: {
			title: 'category',
			keepAlive: true,   // 加这一行
		},
		component: () => import('@/views/category/index.vue'),
	},
```

2、到布局结构页面手动添加要keep-alive的组件名称

src/layout/index.vue

```js
const routerStrArr = ['home']
```

浏览器可以搭配插件vue.js Devtools 查看以及控制台网络降速测试

注意：最多缓存10个，缓存太多影响性能。

### 2、为每次打包的文件后缀添加打包时的时间戳，防止打包上线页面缓存的问题

vite.config.ts  timeStamp

### 3、为index.html增加防盗链，解决图片403

### 4、PC端时自动生成iframe框架嵌套项目并网页自动居中</span>

具体代码逻辑在 src/App.vue  onMounted中

### 5、vite.config.ts已配置诸多优化，具体请自行查看。

## 14、<span id="pretter">代码规范</span>

### 1、prettier + eslint 配置了代码规范插件

### 2、<span id="husky">husky + lint-staged  git提交规范</span>

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

## 15、<span id="jrx">配置兼容性</span>

### 1、browserslist 配置了浏览器兼容性

### 2、polyfill web项目兼容低版本浏览器插件

core-js 和 @vitejs/plugin-legacy

## 16、<span id="threeTool">已配置第三方工具库</span>  

### 1、lodash  

防抖和节流的使用方法,节流用到时再去查    

```js
import { debounce,throttle } from 'lodash-es'

// 它返回一个带防抖的新函数
const debounceLogin = debounce(toLogin, 500)
function toLogin() {
	console.log(111)
}
```

### 2、<span id="vconsole">vConsole移动端调试工具</span>

详细文章看这篇：https://blog.csdn.net/Steven_Son/article/details/135555570?spm=1001.2014.3001.5501

## <span id="tuozhan">17、拓展：</span>



### 1、如果不知道怎么用Nginx部署前端打包后的dist,可以看这篇文章

https://blog.csdn.net/Steven_Son/article/details/135414494?spm=1001.2014.3001.5501

### 2、如果要做JWT免登，请根据你的需求对以下几个文件进行更改

1、src/service/webRequest.ts  设置token的地方
2、src/service/error.ts   错误报错页
3、src/login/index.vue   登录页，登录后可能就要保存token了

### 3、本地开发的项目到手机端演示

1、修改package.json配置,更改为你电脑的IP地址，同时电脑和手机要在同个网络。
说明：连的同个WIFI、同个网线。

```js
"scripts": {
		"testMobile": "vite --host 192.168.1.193"
	}
```

2、电脑(windows)关闭防火墙，这三个都要关闭：域网络、专用网络、公用网络。
位置：安全中心 —— 防火墙和网络保护

3、pnpm testMobild 启动项目，手机访问启动后的项目链接。

### 4、解决main.ts 文件引入路径的问题

1、如果引入路径正确，但是提示找不到文件，则删除'XX',重新引入

2、检查vite.config.ts的路径别名配置是否正确,正确代码如下

```js
//新增
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), //把 src 的别名设置为 @
		},
		extensions: ['.js', '.json', '.ts'], // 这些类型的文件后缀的不需要写
	},
```

3、检查tsconfig.json的部分属性配置

```js
  "baseUrl": ".",
  "paths": {"@/*": ["src/*"]},
  "target": "ES2020",
  "module": "ES2020",
   "lib": [
      "es2020",
      "es5", 
      "es6",
      "DOM",
      "DOM.Iterable"
    ],
   "moduleResolution": "node",
    "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue", 
  	],
```

4、检查tsconfig.node.json的部分属性配置

```js
  "compilerOptions": {
	"module": "ES2020",
	"moduleResolution": "node",
	"allowSyntheticDefaultImports": true
  },
  	"include": ["vite.config.ts", "src/**/*.ts", "global/*.ts"]
```

5、在src下新建vite-env.d.ts ,解决ts无法识别引入.vue后缀的文件夹

```js
/// <reference types="vite/client" />
declare module '*.vue' {
	import type { DefineComponent } from 'vue'

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types

	const component: DefineComponent<{}, {}, any>

	export default component
}

```

每次修改完都要重启项目，或者关闭项目重启VSCode、重启项目。

### 5、使用van-nav-bar时看这里

直接使用，但由于它会盖住外部包裹层，所以你使用van-nav-bar时需要给外层container添加padding-top:92px;  也就是vant-nav-bar的2倍高度（1倍是46），因为我们设计稿是750的。

这样在van-nav-bar下的内容就不会被它盖住了。

不需要van-nav-bar的无需加此样式。

```html
<template>
	<container>
		<van-nav-bar title="首页" />  	
  </container>
</template>
<style scoped lang="scss">
  .container{
    padding-top: 92px;
  }
</style>
```
### 6、如果打开某些组件正确引入vue的api了，但还是报未找到vue文件，此时项目有缓存，关闭整个VScode重启项目即可解决。

```js
import { ref } from 'vue' // 正确引了，但提示报未找到文件
```
### 7、souceTree 如果提交代码失败请检查当前node 版本是否为16
```js
node -v    如果不是则切换为16
nvm use 16   切换后souceTree重新提交代码
```
### 8、如何深层次修改vant-ui组件样式

```js
::v-deep(.van-search) {
	background-color: #f5f5f5;
}
```
### 9、如何定义SCSS全局公共样式并使用
1、在src/assets/scss/variables.scss中定义
```js
// 主题色
$theme-color: #af1d36;
```
2、记得在vite.config.ts配置一下这个文件路径，否则页面用了找不着
vite.config.ts
```js
export default defineConfig({
	css:{
		// css预处理器
		preprocessorOptions: {
			scss: {
				// 引入 variables.scss 这样就可以在全局中使用 variables.scss中预定义的变量了
				// 给导入的路径最后加上 ;
				additionalData: '@import "@/assets/scss/variables.scss";',
			},
		},
	}
})
```
3、页面如何使用
views/home/index.vue
```html
<template>
	<p>测试</p>
</template>

<style lang="scss" scoped>
	p{
		color: $theme-color
	}
</style>
```
### 10、assets/images的图片可以用变量形式引入并使用
1、以home.vue为例

项目中已为assets配置路径别名，所以无需../
```js
import prodImg from '@/assets/images/icons/商品1.png'

<template>
	<img :src="prodImg" />
</teplate>
```
### 11、页面css布局编写规范
1、如果页面顶部有nav-bar导航栏，则用这种布局
```css
.container {
	width: 100%;
	min-height: 100vh;
	padding-top: 92px;
	overflow-x: hidden;
	overflow-y: scroll;
}
```
2、不需要导航栏的页面用这种，少了一个padding-top,因为有导航栏时页面数据会被它盖住，所以需要下移。
```css
.container {
	width: 100%;
	min-height: 100vh;
	overflow-x: hidden;
	overflow-y: scroll;
}
```
### 12、如果底部tabbar的图标不满意，要换成自定义，则需这样写
```html
<script setup lang="ts">
import { ref } from 'vue'
// 1、引入静态图
import HOME_ONE from '@/assets/images/icons/1首页.png'
import HOME_TWO from '@/assets/images/icons/2首页.png'

// 2、做点数据结构，用于页面v-for遍历用
const tabBar = [
	{
		title: '首页',
		to: {
			name: 'home',
		},
		icon: HOME_ONE, // 默认
		icon_acitve: HOME_TWO, // 选中
	},
	{
		title: '商品',
		to: {
			name: 'productList',
		},
		icon: PRODUCT_ONE,
		icon_acitve: PRODUCT_TWO,
	},
	...
]
const active = ref(0) // 默认选中第一个

</script>

<template>
	<van-tabbar v-model="active" fixed route active-color="#af1d36" inactive-color="#707070" safe-area-inset-bottom>
		<van-tabbar-item v-for="(item, index) in tabBar" :key="index" :to="item.to">
			<span>{{ item.title }}</span>
			<template #icon="props">
				<img :src="props.active ? item.icon_acitve : item.icon" />
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>


```

Author: HaushoLin

博客：https://blog.csdn.net/Steven_Son

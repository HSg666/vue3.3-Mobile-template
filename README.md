# 技术栈： Vue 3.3 / TS 5.2 / Vite5.0 / Pinia2.1.7 / router4.2.5 
# 环境： Node:16.20.1    pnpm:8.14.0
# 代码管理工具：sourceTree

# 命令
```js
cd learn-vite    // 切换
pnpm i           // 装依赖
pnpm start       // 启动
pnpm run build   // 打包
rm -rf node_modules  // 强行删除依赖包
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

（4）如果要添加或使用自定义请求函数，请在src/service/requestList.ts中添加，类似于已经存在的上传图片接口

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

二期以上搭建内容参考的文章：https://blog.csdn.net/qq_17335549/article/details/135022054
## 5、移动端UI库采用Vant4
1、已经在vite.config.ts对vant组件和css做了按需导入优化，.vue后缀的组件使用时无需手动引入，直接使用即可。 
2、除了.Vue的文件，例如.js 或 .ts 如需用到，则需手动引入。

```js
XX.js 或 XX.ts
// 示例：
 import { Toast } from 'vant'
```
3、按需导入具体逻辑

①、UI组件

由于引入了unplugin-vue-components/vite这个自动化导入组件插件，我们使用组件时不再需要手动import导入了。
它帮我们自动导入的组件存于components.d.ts中。vant-ui的按需导入在unplugin-vue-components/resolvers中，取出放置Components。

```js
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
	plugins: [
		Components({
			dts: true,
			resolvers: [VantResolver()],
		}),
	]
})
```

2、UI样式

通过vite-plugin-style-import插件取出创建出按需导入样式函数，在函数体中配置vant用到的样式路径。

代码如下：
```js
import { createStyleImportPlugin } from 'vite-plugin-style-import'

createStyleImportPlugin({
			resolves: [
				{
					libraryName: 'vant',
					libraryNameChangeCase: 'pascalCase',
					resolveStyle: name => {
						return `vant/es/${name.toLowerCase()}/index.css`
					},
				},
			],
		}),
```
4、这个UI按需导入跟以往有什么区别呢？
以往我们都是单独在plugins中单独创建vant.ts，里面存着要用到的UI组件，用到一个就去手动添加，不要就手动删除，最后在main.ts中统一导入，比较繁琐，半自动化。
现在已无需在手动去添加、删除，以及去main.ts中引入了，只需要在vite.config.ts中配置好即可，非常方便。这才是真正意义上的UI组件按需导入。要感谢那些大佬们开发的插件，让我们开发时可以简化一些操作，提高开发效率。
UI库官网地址：https://vant-ui.github.io/vant/#/zh-CN/button
## 6、解决main.ts 文件引入路径的问题
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

## 7、Vue3+TS移动端自适应  采用的是postcss-px-to-viewport
1、安装
```js
pnpm install postcss-px-to-viewport@1.1.1 --save-dev  
```

2、vite.config.ts
```js
import postcsspxtoviewport from 'postcss-px-to-viewport'

export default defineConfig({
	css: {
		postcss: {
			plugins: [
				postcsspxtoviewport({
					unitToConvert: 'px', // 要转化的单位
					viewportWidth: 750, // UI设计稿的宽度，如果你的设计稿是375就改成375  
					unitPrecision: 6, // 转换后的精度，即小数点位数
					propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
					viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
					fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
					selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
					minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
					mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
					replace: true, // 是否转换后直接更换属性值
					exclude: [/node_modules\/vant/], // 设置忽略文件，用正则做目录名匹配
					landscape: false, // 是否处理横屏情况
				}),
			]
		}
	}
})
```
提示：如果你的设计稿是375就把750改一下即可。
3、解决 Vant 375 设计尺寸问题
Vant自带是375尺寸的，而我们是750最后插件帮我们转化为375的，也就是我们写的px都是2倍的，如果vant也跟着转化那就是375 / 2，但它不需要转化，所以在转换时我们忽略它。
如果你的设计稿是375，那就不用将忽略vant。  
```js
exclude: [/node_modules\/vant/], // 设置忽略文件，用正则做目录名匹配
```
4、注意：这个自适应插件只会转换内联样式，行内样式不会转换。
- 内联样式：我的设计稿是750，到网页时px经过postcss的处理后自动除以2，等于15px。   如果你是375，px则无需乘以2。
```css
<style scoped lang="scss">
.box{
	font-size: 30px; 
}
</style>
```

- 行内样式：写多少就是多少
```html
<span style="font-size: 15px">测试</span>
```


参考文章：https://www.cnblogs.com/goloving/p/15238345.html

# 搭建三期
## 1、pinia store数据长缓存

1、安装
```js
pnpm add pinia-plugin-persistedstate@2.3.0 -S
```

2、pinia引入使用
store/index.ts
```js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 使用持久化存储插件
pinia.use(piniaPluginPersistedstate)
```

3、需要长缓存的store这样配置
```js
store/modules/user.ts

export const useStore = defineStore({
	id: 'user',
	state: () => ({
		name: '很老很老的值',
	}),
	actions: {
		changeName(name: string) {
			this.name = name
		},
	},
	// 核心代码在这里 ↓
	//persist:true //存储整个对象
	// 选择性的长缓存
	persist: {
		storage: localStorage, //default localStorage
		//设置['name'] -->只会将name 这个key进行缓存
		paths: ['name'],
	},
})
```
参考文章： https://download.csdn.net/blog/column/12471199/133916576

## 2、iconfont 阿里巴巴字体图标
配置文章链接： https://blog.csdn.net/Steven_Son/article/details/128149868?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22128149868%22%2C%22source%22%3A%22Steven_Son%22%7D


## 3、引入免费的阿里巴巴普惠体 2.0字体  
配置文章链接：https://blog.csdn.net/Steven_Son/article/details/128149269

## 4、使用components下的组件时自动注册的插件  unplugin-vue-components
作用：哪个页面要用到components下的组件无需import手动导入，直接<A/>使用即可。
安装
```js
pnpm i unplugin-vue-components -D
```
文章链接：https://blog.csdn.net/weixin_42373175/article/details/130225348

## 5、封装TabBar布局容器
1、路径：src/layout/index.vue
2、作用：页面整体的布局结构，如需增加/减少tabbar数量，增加时记得给新tabbar配置正确的路由，才能正常跳转。
## 6、性能优化：需要keep-alive长缓存的组件在此配置

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

## 7、本地开发的项目到手机端演示
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

## 8、新增vConsole移动端调试工具
1、安装
```js
pnpm i vconsole
```
2、使用时在src/main.ts 打开，不用就注释
```js
import '@/utils/vconsole.ts'
```

## 9、为index.html增加防盗链，解决图片403

## 10、新增如果是PC端网页，则动态创建一个iframed结构包裹项目，让网页自动居中。

具体代码逻辑在 src/App.vue  onMounted中

## 11、为每次打包的文件后缀添加打包时的时间戳，防止打包上线页面缓存的问题
vite.config.ts  timeStamp

## 拓展：如果不知道怎么用Nginx部署前端打包后的dist,可以看这篇文章
https://blog.csdn.net/Steven_Son/article/details/135414494?spm=1001.2014.3001.5501

## 如果要做JWT免登，请根据你的需求对以下几个文件进行更改
1、src/service/webRequest.ts  设置token的地方
2、src/service/error.ts   错误报错页
3、src/login/index.vue   登录页，登录后可能就要保存token了


Author: Houslin
博客：https://blog.csdn.net/Steven_Son
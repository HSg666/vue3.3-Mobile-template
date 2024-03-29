import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer' // css自动添加兼容性前缀
import WindiCss from 'vite-plugin-windicss' // css便捷样式库
import path from 'path'
import legacy from '@vitejs/plugin-legacy' // 兼容web低版本浏览器插件
import { getProcessEnv } from './src/global/env' // 获取项目请求地址

const timeStamp = new Date().getTime() // 为每次打包的文件新增当前的时间戳，防止页面缓存的问题
// 全局自动注册components中的组件，需要使用到其中的组件无需import导入，直接使用即可
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport from 'postcss-px-to-viewport'

export default defineConfig({
	// 如果是线上则用 ./ 否则本地用 / ,如果不配置这个上线后静态资源会访问不到
	base: process.env.NODE_ENV === 'production' ? './' : '/',
	server: {
		host: '0.0.0.0',
		port: 5173,
		proxy: {
			'^/api': {
				target: `${getProcessEnv('SERVER_URL') || ''}`, //目标源，目标服务器，真实请求地址
				changeOrigin: true, //支持跨域
				rewrite: path => path.replace(/^\/api/, '/api'), //重写真实路径,替换/api
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				// 浏览器兼容性
				autoprefixer({
					overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
				}),
				postcsspxtoviewport({
					unitToConvert: 'px', // 要转化的单位
					viewportWidth: 750, // UI设计稿的宽度，如果你的设计稿是375就改成375
					viewportHeight: 1334, // (Number) The height of the viewport. IOS6/7/8
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
			],
		},
		// css预处理器
		preprocessorOptions: {
			scss: {
				// 引入 variables.scss 这样就可以在全局中使用 variables.scss中预定义的变量了
				// 给导入的路径最后加上 ;
				additionalData: '@import "@/assets/scss/variables.scss";',
			},
		},
	},
	plugins: [
		vue(),
		WindiCss(),
		// 兼容web低版本浏览器插件 1
		legacy({
			targets: ['cover 99.5%'],
		}),

		// 全局自动注册components中的组件，需要使用到其中的组件无需import导入，直接使用即可
		Components({
			dts: true,
			resolvers: [VantResolver()],
		}),
	],
	// 兼容web低版本浏览器插件
	optimizeDeps: {
		include: ['core-js', 'vant', 'axios', 'pinia', 'vue', 'vue-router'],
	},
	//路径别名 alias
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), //把 src 的别名设置为 @
			'@/assets': path.resolve(__dirname, './src/assets'),
		},
		extensions: ['.mjs', '.ejs', '.tsx', '.jsx', '.js', '.json', '.ts'], // 这些类型的文件后缀的不需要写
	},
	build: {
		outDir: path.resolve(__dirname, 'dist'), // 打包输出文件夹
		sourcemap: false,
		assetsInlineLimit: 4096, //小于此阈值 kb 的导入或引用资源将内联为 base64 编码
		emptyOutDir: true, // 每次构建时清除dist目录
		rollupOptions: {
			output: {
				entryFileNames: `js/[name]-[hash].${timeStamp}.js`, // 入口文件输出的文件夹名称
				chunkFileNames: `js/[name]-[hash].${timeStamp}.js`, //chunk包输出的文件夹名称
				assetFileNames: `[ext]/[name]-[hash].${timeStamp}.[ext]`, //静态文件输出的文件夹名称
			},
		},
		chunkSizeWarningLimit: 1300,
		minify: 'terser',
		cssCodeSplit: true,
	},
})

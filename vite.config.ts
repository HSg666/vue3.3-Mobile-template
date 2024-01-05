import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer' // css自动添加兼容性前缀
import WindiCss from 'vite-plugin-windicss' // css便捷样式库
import path from 'path'
import legacy from '@vitejs/plugin-legacy' // 兼容web低版本浏览器插件
import { getProcessEnv } from './src/global/env' // 获取项目请求地址

export default defineConfig({
	server: {
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
				autoprefixer({
					overrideBrowserslist: ['Chrome > 40', 'ff> 31', 'ie 11'],
				}),
			],
		},
	},
	plugins: [
		vue(),
		WindiCss(),
		// 兼容web低版本浏览器插件 1
		legacy({
			targets: ['cover 99.5%'],
		}),
	],
	// 兼容web低版本浏览器插件 2
	optimizeDeps: {
		include: ['core-js'],
	},
	//新增
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), //把 src 的别名设置为 @,
		},
	},
	build: {
		outDir: path.resolve(__dirname, 'dist'), // 打包输出文件夹
		sourcemap: false,
		assetsInlineLimit: 4096, //小于此阈值 kb 的导入或引用资源将内联为 base64 编码
		emptyOutDir: true, // 每次构建时清除dist目录
		rollupOptions: {
			output: {
				manualChunks: {
					pinia: ['pinia'],
				},
				entryFileNames: 'js/[name]-[hash].js', // 入口文件输出的文件夹名称
				chunkFileNames: 'js/[name]-[hash].js', //chunk包输出的文件夹名称
				assetFileNames: '[ext]/[name]-[hash].[ext]', //静态文件输出的文件夹名称
			},
		},
		chunkSizeWarningLimit: 1300,
		minify: 'terser',
		cssCodeSplit: true,
	},
})

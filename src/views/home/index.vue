<script lang="ts" setup name="home">
import { onMounted, reactive, toRefs, ref } from 'vue'
import { showToast } from 'vant'

interface State {}

const useShowList = () => {
	const state: State = reactive({})
	return toRefs(state)
}
const {} = useShowList()

const isFixed = ref(true)
const activeNames = ref(['1'])

const introduceList = [
	{ id: 1, name: '1、封装Router' },
	{ id: 2, name: '2、Vant4自动按需导入' },
	{ id: 3, name: '3、封装Axios请求函数、接口列表、请求错误处理' },
	{ id: 4, name: '4、配置全局URL环境变量' },
	{ id: 5, name: '5、配置alias路径别名' },
	{ id: 6, name: '6、封装Pinia、模块化、长缓存' },
	{ id: 7, name: '7、postcss-px-to-viewport移动端适配' },
	{ id: 8, name: '8、自动导入组件' },
	{ id: 9, name: '9、WindiCSS样式库' },
	{ id: 10, name: '10、初始化全局CSS和防止页面文本被用户选中' },
	{ id: 11, name: '11、字体与字体图标' },
	{
		id: 12,
		name: '12、性能优化',
		children: [
			'1、需要keep-alive长缓存的组件在此配置',
			'2、为每次打包的文件后缀添加打包时的时间戳，防止打包上线页面缓存的问题',
			'3、为index.html增加防盗链，解决图片403',
			'4、PC端时自动生成iframe框架嵌套项目并网页自动居中',
			'5、vite.config.ts已配置诸多优化，具体请自行查看。',
		],
	},
	{ id: 13, name: '13、代码规范', children: ['1、prettier + eslint 配置了代码规范插件', '2、husky + lint-staged git提交规范'] },
	{ id: 14, name: '14、配置兼容性', children: ['1、browserslist 配置了浏览器兼容性', '2、polyfill web项目兼容低版本浏览器插件'] },
	{ id: 15, name: '15、已配置第三方工具库', children: ['1、lodash', '2、vConsole移动端调试工具'] },
	{
		id: 16,
		name: '16、拓展',
		children: [
			'1、如果不知道怎么用Nginx部署前端打包后的dist,可以看这篇文章',
			'2、如果要做JWT免登，请根据你的需求对以下几个文件进行更改',
			'3、本地开发的项目到手机端演示',
			'4、解决main.ts 文件引入路径的问题',
			'5、封装TabBar布局容器',
		],
	},
]

const handleClick = () => {
	showToast('轻提示')
}

onMounted(() => {})
</script>
<template>
	<div class="container">
		<!-- <van-nav-bar title="首页" :fixed="isFixed" /> -->
		<van-collapse v-model="activeNames">
			<van-collapse-item v-for="title in introduceList" :key="title.id" :title="title.name" :name="title.id" :is-link="title.children ? true : false">
				<van-cell v-for="item in title.children" :key="item" :title="item" />
			</van-collapse-item>
		</van-collapse>

		<!-- <van-button type="primary" @click="handleClick">主要按钮</van-button> -->
	</div>
</template>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 150px;
	text-align: center;
	background-color: #39a9ed;
}

.container {
	width: 100%;
	min-height: 100vh;
	padding-top: 92px;
	overflow-x: hidden;
	overflow-y: scroll;
}
</style>

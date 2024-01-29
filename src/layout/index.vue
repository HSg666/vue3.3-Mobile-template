<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'

const template = () => {}

onMounted(() => {})

//底部tab栏相关
const useTabBar = () => {
	const state = reactive({
		tabBar: [
			{
				title: '精选',
				to: {
					name: 'home',
				},
				icon: 'home-o',
			},
			{
				title: '版本介绍',
				to: {
					name: 'category',
				},
				icon: 'apps-o',
			},
			{
				title: '购物车',
				to: {
					name: 'shopcart',
				},
				icon: 'shopping-cart-o',
				badge: 0,
			},
			{
				title: '我的',
				to: {
					name: 'mycenter',
				},
				icon: 'contact-o',
			},
		],
	})
	return toRefs(state)
}

const { tabBar } = useTabBar()

// 这里是做长缓存性能优化    浏览器可以搭配插件vue.js Devtools 查看以及控制台网络降速测试
// 1、需要长缓存的组件名称
const routerStrArr = ['home']
</script>
<template>
	<!-- 2、 include：需要长缓存的组件名称  max：最多缓存10个，缓存太多影响性能  -->
	<div class="layout-container">
		<router-view v-slot="{ Component }">
			<component :is="Component" v-if="!$route.meta.keepAlive" />
			<KeepAlive :include="routerStrArr" :max="10">
				<component :is="Component" v-if="$route.meta.keepAlive" />
			</KeepAlive>
		</router-view>
	</div>

	<TabBar :data="tabBar"></TabBar>
</template>

<style scoped lang="scss">
.layout-container {
	// margin-bottom: 100px;
	min-height: 100vh;
}
</style>

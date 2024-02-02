<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {})

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

	<TabBar></TabBar>
</template>

<style scoped lang="scss">
.layout-container {
	// margin-bottom: 100px;
	min-height: 100vh;
}
</style>

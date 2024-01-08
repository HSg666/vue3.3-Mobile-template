<script setup lang="ts">
// 这里是做长缓存性能优化    浏览器可以搭配插件vue.js Devtools 查看以及控制台网络降速测试
// 1、需要长缓存的组件名称
const routerStrArr: any = []
</script>

<template>
	<router-view v-slot="{ Component }">
		<component :is="Component" v-if="!$route.meta.keepAlive" />

		<!-- 2、 include：需要长缓存的组件名称
      max：最多缓存10个，缓存太多影响性能  -->
		<KeepAlive :include="routerStrArr" :max="10">
			<component :is="Component" v-if="$route.meta.keepAlive" />
		</KeepAlive>
	</router-view>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
export default {
	name: 'TabBar',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

const tabBar = [
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
]

const active = ref(0)
</script>

<template>
	<van-tabbar v-model="active" fixed route safe-area-inset-bottom>
		<van-tabbar-item v-for="(item, index) in tabBar" :key="index" :to="item.to" :name="item.to.name" :icon="item.icon" :badge="item.badge">{{ item.title }}</van-tabbar-item>
	</van-tabbar>
</template>

<style lang="scss" scoped></style>

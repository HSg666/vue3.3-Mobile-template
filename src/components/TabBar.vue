<script lang="ts">
export default {
	name: 'TabBar',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

interface tabProps {
	data?: [
		{
			title: string
			to: string
			name: string
			icon: string
			badge: number
		},
	]
}

const props = defineProps<tabProps>()
// console.log(props.data, "props.data");

const active = ref(0)
const isButton = ref(true)
</script>

<template>
	<nut-tabbar v-model="active" :bottom="isButton" unactive-color="#7d7e80" active-color="#1989fa">
		<nut-tabbar-item v-for="(item, index) in props.data" :key="index" :to="item.to.name" :tab-title="item.title" :icon="item.icon" :num="item.badge"></nut-tabbar-item>
	</nut-tabbar>
</template>

<style lang="scss" scoped>
// :global(.nut-tabbar-bottom) {
// 	bottom: 36px !important;
// }
</style>

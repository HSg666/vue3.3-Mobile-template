<script lang="ts">
export default {
	name: 'TabBar',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
interface tabTo {
	name: string
}

interface tabProps {
	data: [
		{
			title: string
			to: tabTo
			icon: string
			badge?: number | undefined
		},
	]
}

const props = defineProps<tabProps>()
// console.log(props.data, "props.data");

const active = ref(0)
</script>

<template>
	<van-tabbar v-model="active" fixed route>
		<van-tabbar-item v-for="(item, index) in props.data" :key="index" :to="item.to" :name="item.to.name" :icon="item.icon" :badge="item.badge">{{ item.title }}</van-tabbar-item>
	</van-tabbar>
</template>

<style lang="scss" scoped></style>

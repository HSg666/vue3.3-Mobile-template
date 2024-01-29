<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const isFixed = ref(true)
const versionList = [
	{
		id: 1,
		name: 'Node 16.20.1',
	},
	{
		id: 2,
		name: 'pnpm 8.14.0',
	},
	{
		id: 3,
		name: 'TypeScript 5.2.2',
	},
	{
		id: 4,
		name: 'Vue3 3.3.11',
	},
	{
		id: 5,
		name: 'Vite 5.0.8',
	},
	{
		id: 6,
		name: 'vue-router 4.2.5',
	},
	{
		id: 7,
		name: 'Vant 4.8.2',
	},
	{
		id: 8,
		name: 'Axios 1.6.4',
	},
	{
		id: 9,
		name: 'Pinia 2.1.7',
	},
	{
		id: 10,
		name: 'pinia-plugin-persistedstate 2.3.0',
	},
	{
		id: 11,
		name: 'Sass 1.69.7',
	},
	{
		id: 12,
		name: 'postcss-px-to-viewport 1.1.1',
	},
	{
		id: 13,
		name: 'windicss 3.5.6',
	},
	{
		id: 14,
		name: 'husky 8.0.3',
	},
	{
		id: 15,
		name: 'vconsole 3.15.1',
	},
	{
		id: 16,
		name: 'lodash-es 4.17.21',
	},
	{
		id: 17,
		name: 'autoprefixer 10.4.16',
	},

	{
		id: 18,
		name: 'lint-staged 15.2.0',
	},
	{
		id: 19,
		name: 'eslint 8.56.0',
	},
	{
		id: 20,
		name: 'unplugin-vue-components 0.26.0',
	},
	{
		id: 21,
		name: 'nvm 1.1.10',
	},
]

onMounted(() => {})
</script>
<template>
	<van-nav-bar title="版本介绍" :fixed="isFixed" />
	<van-cell v-for="item in versionList" :key="item.id" :title="item.name" />
</template>

<style scoped lang="scss"></style>

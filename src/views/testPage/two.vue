<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
	<div class="app bg-gray-50 min-h-screen pb-16">
		<!-- 顶部导航栏 -->
		<nav class="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
			<div class="flex items-center px-4 h-12">
				<div class="flex-1 relative">
					<input type="text" placeholder="四件套" class="w-full h-8 pl-8 pr-3 text-sm bg-gray-100 rounded-full border-none" />
					<i class="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
				</div>
				<div class="flex items-center ml-4 space-x-4">
					<i class="fas fa-home text-gray-600"></i>
					<i class="far fa-star text-gray-600"></i>
					<i class="far fa-user text-gray-600"></i>
				</div>
			</div>
		</nav>

		<!-- 主要内容区域 -->
		<div class="pt-12">
			<!-- Banner -->
			<div class="relative h-40 overflow-hidden">
				<img :src="bannerImage" class="w-full h-full object-cover" alt="banner" />
			</div>

			<!-- 今日爆款 -->
			<div class="mt-4 px-4">
				<div class="flex justify-between items-center mb-3">
					<h2 class="text-lg font-medium">今日爆款</h2>
					<a href="#" class="text-sm text-gray-500">查看全部 ></a>
				</div>
				<div class="grid grid-cols-3 gap-3">
					<div v-for="item in hotItems" :key="item.id" class="rounded-lg overflow-hidden">
						<img :src="item.image" class="w-full aspect-square object-cover" :alt="item.title" />
					</div>
				</div>
			</div>

			<!-- 今日上新 -->
			<div class="mt-6 px-4">
				<div class="flex justify-between items-center mb-3">
					<h2 class="text-lg font-medium">今日上新</h2>
					<a href="#" class="text-sm text-gray-500">查看全部 ></a>
				</div>
				<div class="grid grid-cols-3 gap-3">
					<div v-for="item in newItems" :key="item.id" class="rounded-lg overflow-hidden">
						<img :src="item.image" class="w-full aspect-square object-cover" :alt="item.title" />
					</div>
				</div>
			</div>

			<!-- 筛选栏 -->
			<div class="sticky top-12 bg-white z-40 mt-4 px-4 py-3 flex justify-between border-b">
				<button class="flex items-center text-sm">
					分类·全部
					<i class="fas fa-chevron-down ml-1 text-xs"></i>
				</button>
				<button class="flex items-center text-sm">
					排序·热卖
					<i class="fas fa-chevron-down ml-1 text-xs"></i>
				</button>
				<button class="flex items-center text-sm">
					品宫格
					<i class="fas fa-chevron-down ml-1 text-xs"></i>
				</button>
			</div>

			<!-- 商品列表 -->
			<div class="px-4 py-3">
				<div v-for="product in products" :key="product.id" class="bg-white rounded-lg mb-3 p-3">
					<div class="flex">
						<img :src="product.image" class="w-24 h-24 rounded-lg object-cover" :alt="product.title" />
						<div class="flex-1 ml-3">
							<h3 class="text-sm line-clamp-2">{{ product.title }}</h3>
							<div class="mt-2 text-xs text-gray-500">{{ product.tag }}</div>
							<div class="mt-2 flex items-center justify-between">
								<div class="flex items-center">
									<span class="text-red-500 text-lg font-medium">¥{{ product.price }}</span>
									<span class="ml-1 text-sm text-gray-500">+ {{ product.coins }}金币</span>
								</div>
								<button class="!rounded-button bg-red-500 text-white text-sm px-3 py-1">立即购买</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const bannerImage = 'https://ai-public.mastergo.com/ai/img_res/bc0965ac75aca633620d63ed72ed209e.jpg'

const hotItems = [
	{
		id: 1,
		title: '护肤套装',
		image: 'https://ai-public.mastergo.com/ai/img_res/b05f0b9fee9825c013aa09875bd2977a.jpg',
	},
	{
		id: 2,
		title: '加湿器',
		image: 'https://ai-public.mastergo.com/ai/img_res/7fe79aa7ad58464d039f86db2d665584.jpg',
	},
	{
		id: 3,
		title: '精华液',
		image: 'https://ai-public.mastergo.com/ai/img_res/9e5921eb9cfa53994fc6b9b8c3c4a925.jpg',
	},
]

const newItems = [
	{
		id: 1,
		title: '防晒霜',
		image: 'https://ai-public.mastergo.com/ai/img_res/8365ae8b27df65e24a4038d6b43c8370.jpg',
	},
	{
		id: 2,
		title: '复古收音机',
		image: 'https://ai-public.mastergo.com/ai/img_res/1beaf759efaf58eb907dbcf4565d6976.jpg',
	},
	{
		id: 3,
		title: '车载充电器',
		image: 'https://ai-public.mastergo.com/ai/img_res/bc2d8ca425497dfab4f764dd4af41631.jpg',
	},
]

const products = [
	{
		id: 1,
		title: 'Adore Me 安睡记忆枕助眠枕慢回弹记忆棉成人专用枕芯42*70cm',
		image: 'https://ai-public.mastergo.com/ai/img_res/188cf1c6e858e6e68ac91f0e40c6b399.jpg',
		tag: '【太空记忆棉L3S慢回弹】贴合颈椎',
		price: '1.00',
		coins: '1000',
	},
	{
		id: 2,
		title: '雅棉 A类100支全棉贡缎四件套新疆长绒棉床品套件1.8米云朵男士',
		image: 'https://ai-public.mastergo.com/ai/img_res/20e49c92a9fd253684b796a4b5e6238e.jpg',
		tag: '【太空记忆棉L3S慢回弹】贴合颈椎',
		price: '1.00',
		coins: '1000',
	},
]
</script>

<style scoped>
.app {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>

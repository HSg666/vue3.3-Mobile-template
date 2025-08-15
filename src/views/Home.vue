<template>
	<div class="home-container pb-[50px]">
		<!-- 顶部导航栏 -->
		<div class="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
			<div class="flex items-center px-4 h-[44px]">
				<van-search v-model="searchValue" placeholder="四件套" class="flex-1" shape="round" />
				<div class="flex items-center ml-2 space-x-4">
					<van-icon name="home-o" size="24" class="text-gray-600" />
					<van-icon name="star-o" size="24" class="text-gray-600" />
					<van-icon name="user-o" size="24" class="text-gray-600" />
				</div>
			</div>
		</div>

		<!-- 主要内容区域 -->
		<div class="mt-[44px]">
			<!-- 广告横幅 -->
			<div class="relative h-[160px] bg-gradient-to-r from-green-100 to-green-50 px-4 py-6">
				<div class="flex justify-between">
					<div class="flex flex-col justify-center">
						<h2 class="text-2xl font-bold text-green-800">绿色照明</h2>
						<p class="text-green-600 mt-2">科学护眼</p>
					</div>
					<div class="w-[160px] h-[160px]">
						<img src="@/assets/house.png" alt="护眼照明" class="w-full h-full object-contain" />
					</div>
				</div>
			</div>

			<!-- 今日爆款 -->
			<div class="px-4 mt-4">
				<div class="flex justify-between items-center mb-3">
					<h3 class="text-lg font-bold">今日爆款</h3>
					<van-button text="查看全部 >" type="text" class="text-gray-500" />
				</div>
				<div class="grid grid-cols-3 gap-3">
					<div v-for="i in 3" :key="i" class="rounded-lg overflow-hidden">
						<van-image :src="`https://picsum.photos/200/200?random=${i}`" width="100%" radius="8" />
					</div>
				</div>
			</div>

			<!-- 今日上新 -->
			<div class="px-4 mt-6">
				<div class="flex justify-between items-center mb-3">
					<h3 class="text-lg font-bold">今日上新</h3>
					<van-button text="查看全部 >" type="text" class="text-gray-500" />
				</div>
				<div class="grid grid-cols-3 gap-3">
					<div v-for="i in 3" :key="i" class="rounded-lg overflow-hidden">
						<van-image :src="`https://picsum.photos/200/200?random=${i + 3}`" width="100%" radius="8" />
					</div>
				</div>
			</div>

			<!-- 筛选条件栏 -->
			<div class="sticky top-[44px] bg-white z-40 border-b border-gray-100">
				<van-dropdown-menu>
					<van-dropdown-item v-model="category" :options="categoryOptions" />
					<van-dropdown-item v-model="sort" :options="sortOptions" />
					<van-dropdown-item title="宫格" @click="toggleGrid" />
				</van-dropdown-menu>
			</div>

			<!-- 商品列表 -->
			<div class="px-4 mt-4">
				<div class="space-y-4">
					<van-card
						v-for="i in 4"
						:key="i"
						price="1.00"
						desc="【天空记忆L3S系列】"
						title="Adore Me 安睡记忆枕助眠枕慢回弹记忆棉成人专用枕芯42*70cm"
						:thumb="`https://picsum.photos/200/200?random=${i + 6}`"
					>
						<template #tags>
							<van-tag type="danger">限时特惠</van-tag>
						</template>
						<template #footer>
							<div class="flex items-center justify-between">
								<span class="text-orange-500">+1000金币</span>
								<van-button round type="danger" size="small">立即购买</van-button>
							</div>
						</template>
					</van-card>
				</div>
			</div>
		</div>

		<!-- 底部导航栏 -->
		<van-tabbar v-model="activeTab" fixed>
			<van-tabbar-item icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item icon="gift-o">权益</van-tabbar-item>
			<van-tabbar-item icon="shopping-cart-o">电商</van-tabbar-item>
			<van-tabbar-item icon="points">积分</van-tabbar-item>
			<van-tabbar-item icon="user-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref('')
const activeTab = ref(0)
const category = ref('all')
const sort = ref('hot')

const categoryOptions = [
	{ text: '全部', value: 'all' },
	{ text: '家居', value: 'home' },
	{ text: '电器', value: 'appliance' },
]

const sortOptions = [
	{ text: '热卖', value: 'hot' },
	{ text: '最新', value: 'new' },
	{ text: '价格', value: 'price' },
]

const toggleGrid = () => {
	// 切换宫格视图逻辑
}
</script>

<style scoped>
.home-container {
	min-height: 100vh;
	background-color: #f7f8fa;
}
</style>

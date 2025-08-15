<template>
	<div class="page-container">
		<!-- 顶部导航 -->
		<header class="top-navigation">
			<div class="nav-content">
				<div class="search-section">
					<van-icon name="search" class="search-icon" />
					<div class="search-input" @click="openSearch">
						<span>四件套</span>
					</div>
				</div>

				<div class="nav-icons">
					<van-icon name="home-o" class="nav-icon" />
					<van-icon name="star-o" class="nav-icon" />
					<van-icon name="user-circle-o" class="nav-icon" />
				</div>
			</div>
		</header>

		<main class="main-content">
			<!-- 主视觉区 -->
			<section class="hero-section" @click="openBrandStory">
				<div class="hero-overlay">
					<h1 class="hero-title">绿色照明 科学护眼</h1>
					<p class="hero-subtitle">久量用科技改善生活</p>
					<div class="hero-action">
						<button class="hero-button">了解更多</button>
					</div>
				</div>
			</section>

			<!-- 商品推荐模块 -->
			<section class="product-recommend">
				<!-- 今日爆款 -->
				<div class="hot-products-section">
					<div class="section-header">
						<h2 class="section-title">今日爆款</h2>
						<div class="view-all" @click="viewAllProducts('hot')">
							<span>查看全部</span>
							<van-icon name="arrow" class="arrow-icon" />
						</div>
					</div>

					<div class="hot-products-list">
						<!-- 爆款商品 -->
						<div v-for="product in hotProducts" :key="product.id" class="product-card" @click="goToDetail(product)">
							<img :src="product.image" :alt="product.name" class="product-img" loading="lazy" />
						</div>
					</div>
				</div>

				<!-- 今日上新 -->
				<div class="new-products-section">
					<div class="section-header">
						<h2 class="section-title">今日上新</h2>
						<div class="view-all" @click="viewAllProducts('new')">
							<span>查看全部</span>
							<van-icon name="arrow" class="arrow-icon" />
						</div>
					</div>

					<div class="new-products-list">
						<!-- 上新商品 -->
						<div v-for="product in newProducts" :key="product.id" class="product-card" @click="goToDetail(product)">
							<img :src="product.image" :alt="product.name" class="product-img" loading="lazy" />
						</div>
					</div>
				</div>
			</section>

			<!-- 筛选排序区 -->
			<section class="filter-section">
				<div class="filter-container">
					<div class="filter-category">
						<span class="filter-label">分类:</span>
						<div class="filter-dropdown">
							<van-dropdown-menu active-color="#07c160">
								<van-dropdown-item v-model="category" :options="categoryOptions" @change="filterProducts" />
							</van-dropdown-menu>
						</div>
					</div>

					<div class="filter-sort">
						<span class="filter-label">排序:</span>
						<div class="filter-dropdown">
							<van-dropdown-menu active-color="#07c160">
								<van-dropdown-item v-model="sortBy" :options="sortOptions" @change="sortProducts" />
							</van-dropdown-menu>
						</div>
					</div>

					<div class="filter-view">
						<van-icon name="apps-o" class="filter-view-icon" />
					</div>
				</div>
			</section>

			<!-- 商品列表区 -->
			<section class="product-list-section">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div class="product-list-grid">
						<!-- 商品卡片 -->
						<div v-for="product in displayProducts" :key="product.id" class="product-list-card">
							<div class="product-list-image">
								<img :src="product.image" :alt="product.name" class="product-list-img" loading="lazy" />
							</div>
							<div class="product-list-content">
								<p class="product-list-name">{{ product.name }}</p>
								<div class="product-list-price-container">
									<p class="product-list-price">{{ product.price }}</p>
									<p v-if="product.originalPrice" class="product-list-original-price">{{ product.originalPrice }}</p>
								</div>
								<button class="product-list-buy-button">立即购买</button>
							</div>
						</div>
					</div>
				</van-list>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Icon, DropdownMenu, DropdownItem, Dialog, List } from 'vant'
import { useMockProductService } from '@/service/mockProductService'

// 使用Mock服务
const { fetchProducts, fetchHotProducts, fetchNewProducts } = useMockProductService()

// 响应式状态
const loading = ref(false)
const finished = ref(false)
const page = ref(1)
const pageSize = ref(10)

// 商品数据
const allProducts = ref<any[]>([])
const displayProducts = ref<any[]>([])
const hotProducts = ref<any[]>([])
const newProducts = ref<any[]>([])

// 分类和排序
const category = ref('all')
const categoryOptions = [
	{ text: '全部', value: 'all' },
	{ text: '家纺', value: 'bedding' },
	{ text: '家具', value: 'furniture' },
	{ text: '家电', value: 'appliance' },
	{ text: '数码', value: 'digital' },
	{ text: '家居', value: 'home' },
]

const sortBy = ref('hot')
const sortOptions = [
	{ text: '热卖', value: 'hot' },
	{ text: '新品', value: 'new' },
	{ text: '价格', value: 'price' },
]

// 加载数据
const onLoad = async () => {
	try {
		// 首次加载或翻页
		const result = await fetchProducts(page.value, pageSize.value, category.value)

		// 追加数据
		allProducts.value = [...allProducts.value, ...result.data]
		displayProducts.value = allProducts.value

		// 更新分页状态
		page.value++
		loading.value = false

		// 判断是否加载完全部数据
		if (result.data.length < pageSize.value) {
			finished.value = true
		}
	} catch (error) {
		console.error('加载商品失败:', error)
		loading.value = false
		finished.value = true
	}
}

// 初始化加载推荐商品
const initRecommendProducts = async () => {
	try {
		hotProducts.value = await fetchHotProducts()
		newProducts.value = await fetchNewProducts()
	} catch (error) {
		console.error('加载推荐商品失败:', error)
	}
}

// 筛选商品
const filterProducts = () => {
	// 根据分类筛选
	displayProducts.value = allProducts.value.filter(product => category.value === 'all' || product.category === category.value)
}

// 排序商品
const sortProducts = () => {
	switch (sortBy.value) {
		case 'hot':
			displayProducts.value.sort((a, b) => b.sales - a.sales)
			break
		case 'new':
			displayProducts.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			break
		case 'price':
			displayProducts.value.sort((a, b) => parseFloat(a.price.replace('¥', '')) - parseFloat(b.price.replace('¥', '')))
			break
	}
}

// 页面跳转和交互方法
const openSearch = () => {
	// 打开搜索页面
	Dialog.alert({
		title: '搜索',
		message: '搜索功能开发中...',
	})
}

const openBrandStory = () => {
	// 打开品牌故事
	Dialog.alert({
		title: '品牌故事',
		message: '品牌故事详情开发中...',
	})
}

const goToDetail = (product: any) => {
	// 跳转到商品详情
	Dialog.alert({
		title: '商品详情',
		message: `商品：${product.name}\n价格：${product.price}`,
	})
}

const viewAllProducts = (type: string) => {
	// 查看全部商品
	Dialog.alert({
		title: type === 'hot' ? '今日爆款' : '今日上新',
		message: '查看全部商品功能开发中...',
	})
}

// 生命周期钩子
onMounted(() => {
	initRecommendProducts()
	onLoad() // 初始加载商品列表
})
</script>

<style scoped lang="scss">
// 颜色变量
$white: #ffffff;
$gray-100: #f0f0f0;
$gray-500: #4a5568;
$gray-600: #2d3748;
$primary-color: #07c160;
$bg-light: #f7fafc;
$bg-hover: #edf2f7;
$bg-active: #e2e8f0;

// 混入
@mixin flex-center {
	display: flex;
	align-items: center;
}

.page-container {
	min-height: 100vh;
	position: relative;
	background-color: #f9fafb;
}

.top-navigation {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background-color: white;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	z-index: 50;
}

.nav-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.75rem 1rem;
}

.search-section {
	display: flex;
	align-items: center;
	flex: 1;
}

.search-icon {
	color: #6b7280;
	margin-right: 0.5rem;
	font-size: 1.125rem;
}

.search-input {
	flex: 1;
	background-color: #f3f4f6;
	border-radius: 9999px;
	padding: 0.5rem 1rem;
	color: #6b7280;
	display: flex;
	align-items: center;
	cursor: pointer;
}

.nav-icons {
	display: flex;
	align-items: center;
	margin-left: 1rem;
	gap: 1rem;
}

.nav-icon {
	color: #374151;
	font-size: 1.25rem;
}

.main-content {
	padding-top: 4rem;
	padding-bottom: 5rem;
}

/* 主视觉区样式 */
.hero-section {
	position: relative;
	width: 100%;
	height: 250px; /* 根据设计调整高度 */
	background-color: #f0f0f0; /* 可以添加背景色或背景图 */
	cursor: pointer;
	overflow: hidden;
}

.hero-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 0 20px;
	background: linear-gradient(to right, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.8));
	color: white;
}

.hero-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 10px;
	background: linear-gradient(to right, #ffffff, #f0f0f0);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.8);
	margin-bottom: 20px;
}

.hero-action {
	display: flex;
	justify-content: center;
}

.hero-button {
	background-color: white;
	color: #10b981;
	border: none;
	padding: 10px 24px;
	border-radius: 50px;
	font-size: 14px;
	font-weight: 500;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: all 0.3s ease;
}

.hero-button:hover {
	background-color: #f0f9f5;
	transform: translateY(-2px);
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.product-recommend {
	padding: 1rem 1rem;
	border-top-right-radius: 20px;
	background-color: white;
	border-top-left-radius: 20px;
	margin-top: -16px;
	position: relative;

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;

		.section-title {
			font-size: 16px;
			font-weight: 600;
			color: $gray-600;
		}

		.view-all {
			display: flex;
			align-items: center;
			color: $gray-500;
			font-size: 14px;

			.arrow-icon {
				margin-left: 5px;
				font-size: 14px;
			}
		}
	}

	// 商品列表样式
	.hot-products-list,
	.new-products-list {
		display: flex;
		overflow-x: auto;
		padding: 0 16px 10px;
		gap: 10px;

		.product-card {
			flex: 0 0 auto;
			width: 120px;
			height: 120px;
			border-radius: 8px;
			overflow: hidden;

			.product-img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition: transform 0.3s ease;

				&:hover {
					transform: scale(1.05);
				}
			}
		}
	}
}

.filter-section {
	.filter-container {
		@include flex-center;
		justify-content: space-between;
		padding: 12px 16px;
		background-color: $white;
		border-bottom: 1px solid $gray-100;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.filter-category,
	.filter-sort {
		@include flex-center;
	}

	.filter-label {
		font-size: 14px;
		color: $gray-500;
		margin-right: 10px;
		white-space: nowrap;
	}

	.filter-dropdown {
		flex-grow: 1;
		min-width: 100px;
	}

	// Vant Dropdown Menu 覆盖样式
	.van-dropdown-menu {
		&-item {
			height: 100%;
		}

		&-title {
			font-size: 14px;
			color: $gray-600;
		}
	}

	.filter-view {
		@include flex-center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: $bg-light;
		transition: background-color 0.2s ease;
		cursor: pointer;

		&-icon {
			font-size: 20px;
			color: $gray-500;
		}

		&:hover {
			background-color: $bg-hover;
		}

		&:active {
			background-color: $bg-active;
		}
	}

	// 移动设备适配
	@media (max-width: 375px) {
		padding: 10px 12px;

		.filter-label {
			font-size: 12px;
			margin-right: 8px;
		}

		.filter-dropdown {
			min-width: 80px;
		}

		.filter-view {
			width: 36px;
			height: 36px;

			&-icon {
				font-size: 18px;
			}
		}
	}
}

.product-list-section {
	padding: 0.5rem;
	padding-top: 1rem;
}

.product-list-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.75rem;
}

.product-list-card {
	background-color: #ffffff;
	border-radius: 0.75rem;
	overflow: hidden;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease-in-out;
}

.product-list-card:hover {
	transform: scale(1.02);
}

.product-list-image {
	width: 100%;
	position: relative;
}

.product-list-placeholder {
	width: 100%;
	height: 10rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f3f4f6;
}

.product-list-placeholder-text {
	color: #9ca3af;
	font-size: 0.875rem;
	text-align: center;
}

.product-list-content {
	padding: 0.75rem;
}

.product-list-name {
	font-size: 0.875rem;
	font-weight: 500;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	margin-bottom: 0.5rem;
	line-height: 1.4;
	color: #333;
}

.product-list-price-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.5rem;
}

.product-list-price {
	font-size: 1rem;
	font-weight: 600;
	color: #e53935;
}

.product-list-original-price {
	font-size: 0.75rem;
	color: #9ca3af;
	text-decoration: line-through;
}

.product-list-buy-button {
	width: 100%;
	padding: 0.5rem;
	background-color: #3b82f6;
	color: white;
	border: none;
	border-radius: 0.25rem;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.product-list-buy-button:hover {
	background-color: #2563eb;
}

// 图片样式
.product-list-image,
.product-badge {
	position: relative;
	overflow: hidden;
	border-radius: 8px;

	.product-list-img,
	.product-img {
		width: 100%;
		// height: 200px;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	&:hover {
		.product-list-img,
		.product-img {
			transform: scale(1.05);
		}
	}
}
</style>

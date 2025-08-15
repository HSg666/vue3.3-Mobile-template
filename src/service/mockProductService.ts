import { ref } from 'vue'

// 图片生成函数
const generateProductImage = (category: string, index: number) => {
	// 使用 Picsum 随机图片服务，按分类生成不同风格的图片
	const categoryImageMap = {
		bedding: `https://picsum.photos/seed/bedding-${index}/400/400`,
		furniture: `https://picsum.photos/seed/furniture-${index}/120/120`,
		appliance: `https://picsum.photos/seed/appliance-${index}/120/120`,
		digital: `https://picsum.photos/seed/digital-${index}/120/120`,
		home: `https://picsum.photos/seed/home-${index}/400/400`,
	}

	return categoryImageMap[category] || `https://picsum.photos/seed/product-${index}/400/400`
}

// 模拟商品数据生成器
const generateMockProducts = (count: number) => {
	const categories = ['bedding', 'furniture', 'appliance', 'digital', 'home']
	const products = []

	for (let i = 0; i < count; i++) {
		const category = categories[Math.floor(Math.random() * categories.length)]
		products.push({
			id: 1000 + i,
			name: `高品质${category}产品 ${i + 1}`,
			price: `¥${(Math.random() * 500).toFixed(2)}`,
			originalPrice: `¥${(Math.random() * 800).toFixed(2)}`,
			category: category,
			sales: Math.floor(Math.random() * 1000),
			createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
			// 为每个商品生成图片
			image: generateProductImage(category, i),
		})
	}

	return products
}

// Mock产品服务
export const useMockProductService = () => {
	// 生成大量模拟数据
	const allMockProducts = generateMockProducts(6)

	// 模拟获取商品列表
	const fetchProducts = async (page: number, pageSize: number, category?: string) => {
		return new Promise(resolve => {
			// 模拟网络延迟
			setTimeout(() => {
				// 根据分类过滤
				const filteredProducts = category && category !== 'all' ? allMockProducts.filter(p => p.category === category) : allMockProducts

				// 分页
				const startIndex = (page - 1) * pageSize
				const endIndex = startIndex + pageSize
				const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

				resolve({
					data: paginatedProducts,
					total: filteredProducts.length,
				})
			}, 300) // 模拟300ms网络延迟
		})
	}

	// 模拟获取热门商品
	const fetchHotProducts = async () => {
		return new Promise<any[]>(resolve => {
			setTimeout(() => {
				resolve(
					allMockProducts
						.sort((a, b) => b.sales - a.sales)
						.slice(0, 4)
						.map(product => ({
							...product,
							name: `热销${product.name}`,
						})),
				)
			}, 200)
		})
	}

	// 模拟获取新品商品
	const fetchNewProducts = async () => {
		return new Promise<any[]>(resolve => {
			setTimeout(() => {
				resolve(
					allMockProducts
						.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
						.slice(0, 4)
						.map(product => ({
							...product,
							name: `新品${product.name}`,
						})),
				)
			}, 200)
		})
	}

	return {
		fetchProducts,
		fetchHotProducts,
		fetchNewProducts,
	}
}

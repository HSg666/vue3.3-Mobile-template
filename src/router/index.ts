import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 主要tabbar
export const layoutRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		meta: {
			title: 'home',
			keepAlive: true,
		},
		component: () => import('@/views/home/index.vue'),
	},
	{
		path: '/category',
		name: 'category',
		meta: {
			title: 'category',
			// keepAlive: true,
		},
		component: () => import('@/views/category/index.vue'),
	},
	{
		path: '/mycenter',
		name: 'mycenter',
		meta: {
			title: 'mycenter',
		},
		component: () => import('@/views/mycenter/index.vue'),
	},
	{
		path: '/shopcart',
		name: 'shopcart',
		meta: {
			title: 'shopcart',
		},
		component: () => import('@/views/shopcart/index.vue'),
	},
]

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/index',
		// 需要layout的页面
		children: layoutRoutes,
	},

	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/account',
		name: 'account',
		component: () => import('@/views/account.vue'),
	},

	// 替代vue2中的'*'通配符路径
	{ path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHashHistory(),
	routes,
})

router.beforeEach((_to, _from, next) => {
	next()
})

export default router

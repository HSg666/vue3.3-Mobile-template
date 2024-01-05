import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login.vue'),
	},
	{
		name: 'account',
		path: '/account',
		component: () => import('@/views/account.vue'),
	},
]

const router = createRouter({
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHistory(),
	routes,
})

router.beforeEach((_to, _from, next) => {
	next()
})

export default router

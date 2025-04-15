<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
	<div class="min-h-screen bg-gray-50">
		<!-- 顶部个人信息 -->
		<div class="fixed top-0 w-full bg-white shadow-sm z-50">
			<div class="flex items-center p-4">
				<img src="https://ai-public.mastergo.com/ai/img_res/f0fb3a72dfe5038bf84ee6155e8ced25.jpg" class="w-16 h-16 rounded-full" alt="品牌logo" />
				<span class="ml-3 text-lg font-medium">福利宫-小雅</span>
			</div>
		</div>

		<!-- 主要内容区域 -->
		<div class="pt-24 pb-20">
			<!-- 订单管理 -->
			<div class="bg-white mb-3 p-4">
				<div class="flex justify-between items-center mb-4">
					<span class="text-base font-medium">我的订单</span>
					<span class="text-sm text-gray-500">全部订单 ></span>
				</div>
				<div class="grid grid-cols-4 gap-2 text-center">
					<div class="flex flex-col items-center">
						<i class="fas fa-wallet text-2xl mb-1 text-gray-600"></i>
						<span class="text-sm">待付款</span>
					</div>
					<div class="flex flex-col items-center">
						<i class="fas fa-box text-2xl mb-1 text-gray-600"></i>
						<span class="text-sm">待发货</span>
					</div>
					<div class="flex flex-col items-center">
						<i class="fas fa-truck text-2xl mb-1 text-gray-600"></i>
						<span class="text-sm">待收货</span>
					</div>
					<div class="flex flex-col items-center">
						<i class="fas fa-undo text-2xl mb-1 text-gray-600"></i>
						<span class="text-sm">退款/售后</span>
					</div>
				</div>
			</div>

			<!-- 分佣收益 -->
			<div class="bg-white mb-3 p-4">
				<div class="flex justify-between items-center mb-4">
					<span class="text-base font-medium">分佣收益</span>
					<span class="text-sm text-gray-500">更多明细 ></span>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-gray-600">累计分佣收益</p>
								<p class="text-lg font-medium mt-1">¥ 370.63</p>
							</div>
							<img src="https://ai-public.mastergo.com/ai/img_res/5d19ab0d9f7db399dc6c0be2eac14278.jpg" class="w-10 h-10" alt="金币图标" />
						</div>
					</div>
					<div class="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-gray-600">累计提现</p>
								<p class="text-lg font-medium mt-1">¥ 370.63</p>
							</div>
							<img src="https://ai-public.mastergo.com/ai/img_res/aa13268a2391a01406498fd5f58a5349.jpg" class="w-10 h-10" alt="奖牌图标" />
						</div>
					</div>
				</div>
			</div>

			<!-- 优惠券管理 -->
			<div class="bg-white mb-3 p-4">
				<div class="flex justify-between items-center mb-4">
					<span class="text-base font-medium">我的卡券</span>
					<span class="text-sm text-gray-500">更多详情 ></span>
				</div>
				<div class="grid grid-cols-3 gap-4">
					<div class="text-center">
						<i class="fas fa-ticket-alt text-2xl mb-1 text-gray-600"></i>
						<p class="text-sm">未使用</p>
						<span class="text-xs text-red-500">1张</span>
					</div>
					<div class="text-center">
						<i class="fas fa-check-circle text-2xl mb-1 text-gray-600"></i>
						<p class="text-sm">已使用</p>
						<span class="text-xs text-gray-400">1张</span>
					</div>
					<div class="text-center">
						<i class="fas fa-calendar-times text-2xl mb-1 text-gray-600"></i>
						<p class="text-sm">已过期</p>
						<span class="text-xs text-gray-400">12张</span>
					</div>
				</div>
			</div>

			<!-- 功能入口 -->
			<div class="bg-white mb-3">
				<div class="p-4 flex items-center justify-between border-b">
					<span class="text-base">地址管理</span>
					<i class="fas fa-chevron-right text-gray-400"></i>
				</div>
				<div class="p-4 flex items-center justify-between">
					<span class="text-base">购物车</span>
					<i class="fas fa-chevron-right text-gray-400"></i>
				</div>
			</div>

			<!-- 客服服务 -->
			<div class="bg-white p-4 text-center">
				<p class="text-base mb-4">24H 客服服务</p>
				<img src="https://ai-public.mastergo.com/ai/img_res/aa10114dedc0ea657e8ae983f3523d4e.jpg" class="w-32 h-32 mx-auto mb-2" alt="客服二维码" />
				<p class="text-sm text-gray-500">及时了解物流进度</p>
				<button class="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm !rounded-button">联系客服</button>
			</div>
		</div>

		<!-- 底部导航 -->
		<div class="fixed bottom-0 w-full bg-white border-t">
			<div class="grid grid-cols-5 py-2">
				<div class="flex flex-col items-center">
					<i class="fas fa-home text-xl text-gray-600"></i>
					<span class="text-xs mt-1">首页</span>
				</div>
				<div class="flex flex-col items-center">
					<i class="fas fa-gift text-xl text-gray-600"></i>
					<span class="text-xs mt-1">权益</span>
				</div>
				<div class="flex flex-col items-center">
					<i class="fas fa-shopping-bag text-xl text-gray-600"></i>
					<span class="text-xs mt-1">电商</span>
				</div>
				<div class="flex flex-col items-center">
					<i class="fas fa-star text-xl text-gray-600"></i>
					<span class="text-xs mt-1">积分</span>
				</div>
				<div class="flex flex-col items-center">
					<i class="fas fa-user text-xl text-red-500"></i>
					<span class="text-xs mt-1 text-red-500">我的</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style scoped>
.bg-gradient-to-r {
	background-size: 200% 200%;
	transition: background-position 0.3s ease;
}
.bg-gradient-to-r:hover {
	background-position: 100% 0;
}
</style>

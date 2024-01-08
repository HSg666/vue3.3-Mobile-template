<script lang="ts" setup name="login">
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
const userStore = useStore()
const { name } = storeToRefs(userStore)

const router = useRouter()
const toAccount = () => {
	router.push({
		name: 'account',
	})
}
const changStore = () => {
	userStore.changeName('林生哥')
	toAccount()
}
</script>
<template>
	<div class="container">
		321321321321321
		<div class="btn" @click="toAccount">toAccount测试的撒</div>
		<!-- <Button>测试的</Button> -->
		<nut-button type="primary">登录</nut-button>
		<p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>

		<div @click="changStore">{{ name }}</div>
		<router-view />
	</div>
</template>
<style lang="scss" scoped>
.container {
	min-height: 100vh;
	// background-color: pink;
	.btn {
		font-size: 24px;
	}
	p {
		font-size: 16px;
	}
}
</style>

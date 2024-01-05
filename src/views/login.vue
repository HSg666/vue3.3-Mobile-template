<script lang="ts" setup name="login">
import { useRouter } from 'vue-router'

const router = useRouter()
function toAccount() {
	router.push({
		name: 'account',
	})
}
</script>
<template>
	<div class="container">
		321321321321321
		<div @click="toAccount">toAccount测试的撒</div>
		<router-view />
	</div>
</template>
<style lang="scss" scoped></style>

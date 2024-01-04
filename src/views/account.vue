<script lang="ts" setup>
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import AxiosRequestError from '@/service/error'
import $api from '@/service/webRequest'
import { APIs } from '@/service/apiList'

const getShop = async () => {
	try {
		const res = await $api.getShopList()
		console.dir(res, 'res')
	} catch (error: AxiosRequestError) {
		console.dir(error, 'error')
	}
}
getShop()

$api.get(APIs.GET_SHOPLIST)
	.then(() => {})
	.catch((err: AxiosRequestError) => {
		console.dir(err, 'err')
	})

const userStore = useStore()

const router = useRouter()
function toLogin() {
	router.push({
		name: 'login',
	})
}
</script>
<template>
	<div @click="toLogin">toLogin</div>
	<div>{{ userStore.name }}</div>
	<router-view></router-view>
</template>

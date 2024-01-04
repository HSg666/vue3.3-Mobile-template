<script lang="ts" setup name="account">
import { useStore } from '@/store'
import AxiosRequestError from '@/service/error'
import $api from '@/service/webRequest'
import { APIs } from '@/service/apiList'
import { debounce } from 'lodash-es'

console.log(debounce, 'lodash')

// $api.get(APIs.GET_SHOPLIST)
// 	.then(() => {})
// 	.catch((err: AxiosRequestError) => {
// 		console.dir(err, 'err')
// 	})

const userStore = useStore()
const debounceLogin = debounce(toLogin, 500)
function toLogin() {
	console.log(111)
}
</script>
<template>
	<div @click="debounceLogin">toLogin</div>

	<div>{{ userStore.name }}</div>
	<router-view></router-view>
</template>

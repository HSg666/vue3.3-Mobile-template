<script lang="ts" setup>
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

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

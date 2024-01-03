<template>
	<div @click="toLogin">toLogin</div>
	<router-view></router-view>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function toLogin() {
	router.push({
		name: 'login',
	})
}
</script>

<script lang="ts" setup name="login">
import { useRouter } from 'vue-router'

const router = useRouter()
function toAccount() {
	router.push({
		name: 'login',
	})
}
</script>
<template>
	<div @click="toAccount">toAccount</div>
	<router-view></router-view>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function toAccount() {
	router.push({
		name: 'account',
	})
}
</script>
<template>
	<div @click="toAccount">toAccount</div>
	<router-view></router-view>
</template>

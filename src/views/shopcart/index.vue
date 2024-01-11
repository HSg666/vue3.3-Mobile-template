<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const isFixed = ref(true)

onMounted(() => {})
</script>
<template>
	<van-nav-bar title="购物车" :fixed="isFixed" />
</template>

<style scoped lang="scss"></style>

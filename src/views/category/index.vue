<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const isFixed = ref(true)

onMounted(() => {})
</script>
<template>
	<van-nav-bar title="商品分类" :fixed="isFixed" />
</template>

<style scoped lang="scss"></style>

<script lang="ts" setup name="home">
import { onMounted } from 'vue'

onMounted(() => {})
</script>
<template>
	<nut-navbar title="首页">
		<template #left></template>
	</nut-navbar>
	<!-- <div class="container">
		首页
		
	</div> -->
</template>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 1000px;
	overflow-x: hidden;
	overflow-y: scroll;
	background-color: #949090;
}
</style>

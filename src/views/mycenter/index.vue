<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {})

const toGithub = () => {
	window.location.href = 'https://github.com/HSg666/learn-vite'
}
</script>

<!-- about -->
<template>
	<div class="about_container">
		<div class="item avatar">
			<van-image width="100" height="100" round src="/src/assets/images/mypic.jpg" />
		</div>
		<div class="item author">项目作者：HaushoLin</div>

		<div class="item url" @click="toGithub">
			<p class="label">项目地址:</p>
			<p>https://github.com/HSg666/learn-vite</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.about_container {
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	.item {
		margin: 30px 0;
		text-align: center;
	}
	.author {
		font-size: 32px;
	}
	.url {
		color: #4ca9f2;
		font-size: 28px;
		.label {
			text-align: center;
		}
		a {
			color: #4ca9f2;
		}
	}
}
</style>

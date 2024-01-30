<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<!-- about -->
<template>
	<div class="about_container">
		<div class="item avatar">
			<van-image width="100" height="100" round src="/src/assets/images/mypic.jpg" />
		</div>
		<div class="item author">项目作者：HaushoLin</div>

		<div class="project">Github项目地址：</div>
		<div class="item url">
			<a href="https://github.com/HSg666/vue3.3-mobile-template">https://github.com/HSg666/vue3.3-mobile-template</a>
		</div>

		<div class="project">Gitee项目地址：</div>
		<div class="item url">
			<a href="https://gitee.com/HaushoLin/vue3.3-Mobile-template">https://gitee.com/HaushoLin/vue3.3-Mobile-template</a>
		</div>
		<div class="project">
			博客地址：
			<a href="https://blog.csdn.net/Steven_Son" class="url">https://blog.csdn.net/Steven_Son</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.about_container {
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	.project {
		width: 100%;
		text-align: left;
		text-indent: 1em;
	}
	.item {
		width: 100%;
		margin: 3vw 0 5vw;
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

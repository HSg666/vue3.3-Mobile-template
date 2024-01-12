<script lang="ts" setup name="home">
import { onMounted, reactive, toRefs, ref } from 'vue'

interface State {
	imgList: string[]
	vantshow: boolean
}

const useShowList = () => {
	const state: State = reactive({
		vantshow: false,
		imgList: ['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg', 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'],
	})
	return toRefs(state)
}
const { imgList, vantshow } = useShowList()

const isFixed = ref(true)

onMounted(() => {})
</script>
<template>
	<div class="container">
		<van-nav-bar title="首页" :fixed="isFixed" />
		<van-swipe :autoplay="3000" class="my-swipe" style="height: 200px">
			<van-swipe-item v-for="image in imgList" :key="image">
				<img :src="image" />
			</van-swipe-item>
			<template #indicator="{ active, total }">
				<div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
			</template>
		</van-swipe>
		<van-button type="primary" @click="vantshow = true">主要按钮</van-button>
		<van-overlay :show="vantshow" @click="vantshow = false">
			<div class="wrapper">
				<div class="content">
					<div class="box">
						<div class="left" style="width: 25%; height: 100%; background-color: deepskyblue; text-align: center">标题</div>
						<div class="right" style="width: 75%; height: 100%; background-color: orange"></div>
					</div>
					<div class="box">
						<div class="left" style="width: 25%; height: 100%; background-color: deepskyblue"></div>
						<div class="right" style="width: 75%; height: 100%; background-color: orange"></div>
					</div>
					<div class="box">
						<div class="left" style="width: 25%; height: 100%; background-color: deepskyblue"></div>
						<div class="right" style="width: 75%; height: 100%; background-color: orange"></div>
					</div>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 150px;
	text-align: center;
	background-color: #39a9ed;
}
.custom-indicator {
	position: absolute;
	right: 5px;
	bottom: 5px;
	padding: 2px 5px;
	font-size: 12px;
	background: rgba(0, 0, 0, 0.1);
}

.navBox {
	// width: 375px;
	width: 750px;
	height: 200px;
	background-color: deeppink;
}

.wrapper {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;
	.content {
		display: flex;
		flex-direction: column;
		width: 375px;
		height: 350px;
		background: #fff;
		border-radius: 8px;
		align-items: center;
		justify-content: space-evenly;
		color: red;
	}
}

.box {
	width: 90%;
	height: 50px;
	background-color: pink;
	display: flex;
	padding-bottom: 10px;
	line-height: 50px;
	.left {
		font-size: 20px;
	}
}

.container {
	width: 100%;
	height: 1000px;
	overflow-x: hidden;
	overflow-y: scroll;
}
</style>

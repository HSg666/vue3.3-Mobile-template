<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
	// //为pc则用iframe把移动端页面显示到页面中间
	let userAgentInfo = window.navigator.userAgent
	let Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod')
	//pc
	if (!Agents.some(item => userAgentInfo.toLowerCase().includes(item.toLowerCase())) && !(self.frameElement && self.frameElement.tagName == 'IFRAME')) {
		// 检查页面是否已经有iframe   这个判断让页面拥有只保留一个iframe
		let ifrTag = document.getElementsByTagName('iframe')[0]
		if (ifrTag) {
			// 如果有，则删除它
			ifrTag.remove()
		} else {
			let ifrTag = document.createElement('iframe')
			document.body.innerHTML = ''
			ifrTag.setAttribute('src', window.location.href)
			let styleObj = {
				width: '480px',
				height: '920px',
				position: 'absolute',
				left: '50%',
				transform: 'translateX(-50%)',
			}
			Object.entries(styleObj).forEach(([key, value]: [any, string]) => {
				ifrTag.style[key] = value
			})
			document.body.append(ifrTag)
		}
	}
})
</script>

<template>
	<RouterView />
</template>

<style scoped lang="scss"></style>

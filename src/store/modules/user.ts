import { defineStore, acceptHMRUpdate } from 'pinia'

export const userStore = defineStore({
	id: 'user',
	state: () => ({
		name: '很老很老的值',
	}),
	getters: {
		myName: state => {
			return `getters ${state.name}`
		},
	},
	actions: {
		changeName(name: string) {
			this.name = name
		},
	},
	persist: {
		storage: localStorage, //default localStorage
		//设置['phone'] -->只会将phone 这个key进行缓存
		paths: ['name'],
	},
})

// 这行代码是用于支持热模块替换（HMR）的。在Pinia中，它允许接受热更新并应用到使用了userStore的地方。
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot))
}

import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore({
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

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}

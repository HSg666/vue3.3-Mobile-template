import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore({
	id: 'user',
	state: () => ({
		name: 'old name',
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
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}

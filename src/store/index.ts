import { createPinia } from 'pinia'

// 实例化pinia
export const pinia = createPinia()

// 统一导出modules下的所有store
export * from './modules'

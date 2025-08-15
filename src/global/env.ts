// 全局环境变量  请求的服务器地址在此配置

// 静态图片前缀
export const fileServerAddress = 'http://192.168.1.159:8085' // 客户端地址(某后端接口)
// export const fileServerAddress = 'http://192.168.1.159:8085' // 客户端地址(线上生产环境地址)

// 正式环境
export const PROD_ENV = {
	SERVER_URL: 'http://192.168.1.193:8090/', // 线上生产环境地址
	IS_DEV: 'false', // 是否为开发环境
}

// 开发环境 (一般本地服务器地址跟图片静态资源都是一样的，所以这里直接取静态资源的地址就行)
export const DEV_ENV = {
	SERVER_URL: fileServerAddress,
	IS_DEV: 'true',
}

let isDEV = true // 默认为开发环境，但会根据当前环境动态更换开发或生产
if (typeof window !== 'undefined') {
	isDEV = process.env.NODE_ENV === 'development' || [fileServerAddress].includes(window.location.host)
}

export type EnvKey = keyof typeof PROD_ENV

// 调用这个函数获取当前的环境变量
export function getProcessEnv(key: EnvKey): string | void {
	if (isDEV) {
		if (DEV_ENV[key] !== undefined) {
			return DEV_ENV[key]
		}
		return ''
	}
	if (PROD_ENV[key] !== undefined) {
		return PROD_ENV[key]
	}
}

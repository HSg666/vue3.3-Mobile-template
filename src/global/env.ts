// 全局环境变量  请求的服务器地址在此配置

// 正式环境
export const PROD_ENV = {
	SERVER_URL: 'http://127.0.0.1:8090/api', // 服务器地址
	IS_DEV: 'false', // 是否为测试环境
}

// 测试环境
export const DEV_ENV = {
	SERVER_URL: 'http://127.0.0.1:8099/api',
	IS_DEV: 'true',
}

// 假设测试环境的域名是 http://127.0.0.1:8099/api 或 https://xxx-test.com
// const isDEV = process.env.NODE_ENV === 'development' || ['xxx-test.com'].includes(location.host)
const isDEV = process.env.NODE_ENV === 'development' || ['http://127.0.0.1:8099'].includes(location.host)
// const isDEV = false  // 用于本地切换测试线上服务器，用完要注释掉，防止上线后域名还用的本地的

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

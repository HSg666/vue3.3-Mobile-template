// 全局环境变量  请求的服务器地址在此配置

// 静态图片前缀
export const fileServerAddress = 'http://192.168.1.159:8085' // 客户端地址(某后端接口)
// export const fileServerAddress = 'http://192.168.1.159:8085' // 客户端地址(线上)

// 正式环境
export const PROD_ENV = {
	SERVER_URL: 'http://192.168.1.193:8090/', // 服务器地址
	IS_DEV: 'false', // 是否为开发环境
}

// 开发环境
export const DEV_ENV = {
	SERVER_URL: 'http://127.0.0.1:8099/',
	IS_DEV: 'true',
}

/* 	
	isDEV：true为生产环境，false为开发环境
	假设开发环境的域名是 http://127.0.0.1:8099/api 或 https://xxx-test.com
	提示：
	本地如果要将请求地址切换为生产服务器，则将isDEV设置为false，注释掉判断开发环境的代码。代码如下
	const isDEV = false
	// if (typeof window !== 'undefined') {
	// isDEV = process.env.NODE_ENV === 'development' || ['http://192.168.1.193:8099'].includes(window.location.host)
	// }

	准备打包上线，将代码改回来。（开发环境也是这个代码）代码如下   
	let isDEV = true // 默认为开发环境
	if (typeof window !== 'undefined') {
		isDEV = process.env.NODE_ENV === 'development' || ['http://192.168.1.193:8099'].includes(window.location.host)
	}

*/

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

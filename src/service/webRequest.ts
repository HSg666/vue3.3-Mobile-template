// 封装请求函数
import API from './requestList'
import AxiosRequestError from './error'
import { handleError } from './handleError'
import { getProcessEnv } from '../global/env'
import { showLoadingToast, closeToast } from 'vant'

const $api = new API({
	// 这个是请求的后台的服务的地址
	getServerUrl: () => {
		return `${getProcessEnv('SERVER_URL') || ''}`
	},
})

// 请求的拦截器
$api.request.interceptors.request.use((config: any) => {
	const headers = config.headers || {}
	// 这个地方可以自定义请求头
	/**
	 * 请求拦截器
	 * 客户端发送请求 -> [请求拦截器] -> 服务器
	 * token校验(JWT) : 接受服务器返回的token,存储到pinia或本地储存当中
	 */

	// 获取缓存中的token，如果没有则去登录页
	// const token = localStorage.getItem('longsheng_token') || ''
	// if (!token) {
	// 	// 跳转到登录页面
	// 	window.location.href = '/login'
	// }

	// 防止接口缓存
	config.headers = {
		'Cache-Control': 'no-cache',
		Pragma: 'no-cache',
		Expires: '0',
		'If-Modified-Since': '0',
		// Authorization: token, // 这个是自定义的请求头，还可以加 token 等
		...headers,
	}
	if (config.loading) {
		showLoadingToast({
			message: '加载中...',
			forbidClick: true,
		})
	}

	return config
})

// 响应的拦截器
$api.request.interceptors.response.use(undefined, async (err: AxiosRequestError) => {
	closeToast()

	err = handleError(err) // 调用我们自定义的 错误处理方法
	if (err.isUnAuthorized) {
		// 401未授权的情况的处理    直接去登录页
		// window.location.href = '/login'
	}
	// 还可以自定义其他的情况的处理

	return Promise.reject(err)
})

// 在 page 页面就可以直接调用这个 $api 请求接口
export default $api

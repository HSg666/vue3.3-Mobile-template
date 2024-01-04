// 封装请求函数
import API from './requestList'
import AxiosRequestError from './error'
import { handleError } from './handleError'

const $api = new API({
	url: 'http://127.0.0.1:8090/api/', // 这个是请求的后台的服务的地址
})

// 请求的拦截器
$api.request.interceptors.request.use((config: any) => {
	const headers = config.headers || {}
	// 这个地方可以自定义请求头
	config.headers = {
		...headers,
		language: 'en', // 这个是自定义的请求头，还可以加 token 等
	}
	return config
})

// 响应的拦截器
$api.request.interceptors.response.use(undefined, async (err: AxiosRequestError) => {
	err = handleError(err) // 调用我们自定义的 错误处理方法
	if (err.isUnAuthorized) {
		// 未授权的情况的处理
	}
	// 还可以自定义其他的情况的处理

	return Promise.reject(err)
})

// 在 page 页面就可以直接调用这个 $api 请求接口
export default $api

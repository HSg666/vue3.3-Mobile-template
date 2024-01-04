// 封装axios
import axios, { AxiosInstance } from 'axios'
import { handleError } from './handleError'

function createRequestInstance(getServerUrl: () => string): AxiosInstance {
	const instance = axios.create({
		timeout: 1000 * 60 * 5, // 超时时间
		withCredentials: true, // 允许跨域携带cookie
		baseURL: `${getServerUrl()}`, // 请求地址
	})

	instance.interceptors.response.use(
		async res => {
			return res
		},
		async err => {
			// 应用自定义错误处理函数
			err = await handleError(err)
			return Promise.reject(err)
		},
	)

	return instance
}

export default createRequestInstance

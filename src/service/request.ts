import axios, { AxiosInstance } from 'axios'

function createRequestInstance(url: string): AxiosInstance {
	const instance = axios.create({
		timeout: 1000 * 60 * 5, // 超时时间
		withCredentials: true, // 允许跨域携带cookie
		baseURL: url, // 请求地址
	})
	return instance
}

export default createRequestInstance

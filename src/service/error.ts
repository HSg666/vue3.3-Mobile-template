// 作用：专门处理axios请求的错误信息
import { AxiosError } from 'axios'

// 服务器报错返回 Error 的时候的数据结构，可以和后端商量定义，但是所有接口的格式要统一
export type ErrorResponse = {
	status: number // http 状态码，这个是必须的
	// 其他自定义类型类型
}

class AxiosRequestError extends Error {
	data: ErrorResponse | undefined

	raw: AxiosError

	isUnAuthorized = false // 权限错误 401

	isServerError = false // 服务器错误 500 等

	constructor(status: number, message: string, raw: AxiosError, data?: ErrorResponse) {
		// 调用父类「Error」的构造函数
		super(message)
		this.data = data // 后端返回的 data
		this.raw = raw // axios 返回的原始数据
		this.isUnAuthorized = status === 401
		this.isServerError = status >= 500
		this.message = this.message || '' //给用户展示的错误消息，后续可以自定义
	}
}

export default AxiosRequestError

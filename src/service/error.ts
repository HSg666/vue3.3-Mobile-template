// 作用：专门处理axios请求的错误信息
import { AxiosError } from 'axios'
import { Toast } from 'vant'

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

		switch (status) {
			case 400:
				Toast.fail('请求错误(400)')
				break
			case 401:
				Toast.fail('未授权，请重新登录(401)')
				break
			case 403:
				Toast.fail('拒绝访问(403)')
				break
			case 404:
				Toast.fail('请求出错(404)')
				break
			case 408:
				Toast.fail('请求超时(408)')
				break
			case 500:
				Toast.fail('服务器错误(500)')
				break
			case 501:
				Toast.fail('服务未实现(501)')
				break
			case 502:
				Toast.fail('网络错误(502)')
				break
			case 503:
				Toast.fail('服务不可用(503)')
				break
			case 504:
				Toast.fail('网络超时(504)')
				break
			case 505:
				Toast.fail('HTTP版本不受支持(505)')
				break
			default:
				Toast.fail(`连接出错(${this.message})!`)
				break
		}

		this.message = this.message || '' //给用户展示的错误消息，后续可以自定义
	}
}

export default AxiosRequestError

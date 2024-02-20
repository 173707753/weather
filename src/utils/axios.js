import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { statusWhiteList } from '@/config/index'
import router from '@/router/index'
import { Message } from 'element-ui'
import { objToUrlParamString } from '@/utils/utils'

// 设置默认请求超时事件  60s
axios.defaults.timeout = 60000

// 默认把请求视为切换路由就会把pending状态的请求取消，false为不取消
axios.defaults.routeChangeCancel = true

//验证返回其他状态码
axios.defaults.validateStatus = function(status) {
	return status >= 200 && status <= 500 // 默认的
}
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true
axios.defaults.route

// NProgress Configuration
NProgress.configure({
	showSpinner: false, //是否展示 spinner
})

let pendingRequest = [] // 用于存储目前状态为pending的请求标识信息

/**
 * 请求的拦截处理
 * @param config - 请求的配置项
 */
const handleRequestIntercept = (config) => {
	NProgress.start() // start progress bar
	config.headers.token = sessionStorage.getItem('token') || ''
	let whiteParamsObj = {}
	// whiteCancelParams : [] 取消请求白名单  里面存放的为 params 中需要忽略的key值
	if (
		config.params &&
		config.params.whiteCancelParams &&
		config.params.whiteCancelParams.length
	) {
		config.params.whiteCancelParams.forEach((item) => {
			whiteParamsObj[item] = config.params[item]
		})
		delete config.params.whiteCancelParams
	}
	let whiteParamsString = objToUrlParamString(whiteParamsObj)
	// 区别请求的唯一标识，这里用方法名+请求路径
	let requestMark = `${config.method} ${config.url}${whiteParamsString}`
	// 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
	const markIndex = pendingRequest.findIndex((item) => {
		return item.name === requestMark
	})
	// 存在，即重复了
	if (markIndex !== -1) {
		// 取消上个重复的请求
		pendingRequest[markIndex].cancel()
		// 删掉在pendingRequest中的请求标识
		pendingRequest.splice(markIndex, 1)
	}
	// （重新）新建针对这次请求的axios的cancelToken标识
	const CancelToken = axios.CancelToken
	const source = CancelToken.source()
	config.cancelToken = source.token
	// 设置自定义配置requestMark项，主要用于响应拦截中
	config.requestMark = requestMark
	// 记录本次请求的标识

	pendingRequest.push({
		name: requestMark,
		cancel: source.cancel,
		routeChangeCancel: config.routeChangeCancel, // 可能会有优先级高于默认设置的routeChangeCancel项值
	})
	return config
}

/**
 * 响应的拦截处理
 * @param config - 请求的配置项
 */
const handleResponseIntercept = (config) => {
	// 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
	const markIndex = pendingRequest.findIndex((item) => {
		return item.name === config.requestMark
	})
	// 找到了就删除该标识
	markIndex !== -1 && pendingRequest.splice(markIndex, 1)
}

//HTTP request 请求拦截
axios.interceptors.request.use(
	handleRequestIntercept, //处理请求拦截器
	(error) => {
		return Promise.reject(error)
	}
)

//HTTP response 响应拦截
axios.interceptors.response.use(
	(res) => {
		var message = ''
		handleResponseIntercept(res.config)
		NProgress.done()
		const status = res.data.code || 200
		message = res.data.message || '未知错误'
		//如果在白名单里则自行catch逻辑处理
		if (statusWhiteList.includes(status)) return Promise.reject(res)
		//如果是401则跳转到登录页面
		console.log(status)
		if (status === 1001) {
			router.push({
				path: '/home',
			})
		}
		if (status === 2999) {
			router.push({
				path: '/home',
			})
			sessionStorage.clear()
		}
		// 如果请求为非200否者默认统一处理
		if (status !== 200) {
			Message({
				message: message,
				type: 'error',
			})
			return Promise.reject(new Error(message))
		}
		return res
	},
	(error) => {
		NProgress.done()
		let errorFormat = {
			err: error,
		}
		const response = error.response
		// 请求已发出，但服务器响应的状态码不在 2xx 范围内
		if (response) {
			handleResponseIntercept(response.config)
			// 设置返回的错误对象格式（按照自己项目实际需求）
			errorFormat = {
				status: response.status,
				data: response.data,
			}
		}
		// 如果是主动取消了请求，做个标识
		if (axios.isCancel(error)) {
			errorFormat.selfCancel = true
		}
		console.error(errorFormat)
		return Promise.reject(new Error(errorFormat))
	}
)

export default axios

export { pendingRequest }

import { isString, merge } from '../utils'
import type { AxiosTransform, CreateAxiosOptions } from './AxiosTransform'
import { VAxios } from './Axios'
import { formatRequestDate, joinTimestamp, setObjToUrlParams } from './utils'
import type { AxiosRequestConfigRetry } from '@/types/axios'
import proxy from '@/config/proxy'
import { TOKEN_NAME } from '@/config/global'

const env = import.meta.env.MODE || 'development'

// 如果是mock模式 或 没启用直连代理 就不配置host 会走本地Mock拦截 或 Vite 代理
const host = env === 'mock' || !proxy.isRequestProxy ? '' : (proxy[env as keyof typeof proxy] as any).host

// 数据处理，方便区分多种处理方式
const transform: AxiosTransform = {
  transformResponseHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options

    // 如果204无内容直接返回
    const method = res.config.method?.toLowerCase()
    if (res.status === 204 || method === 'put' || method === 'patch')
      return res

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse)
      return res

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse)
      return res.data

    // 错误的时候返回
    const { data } = res
    if (!data)
      throw new Error('请求接口错误')

    //  这里 code为 后台统一的字段，需要在 types.ts内修改为约定的数据格式
    const { reason } = data

    // 根据返回格式判断是否是正确的接口
    const hasSuccess = !(reason && reason.length)
    if (hasSuccess)
      return res.data

    throw new Error(`请求接口错误, 错误原因: ${reason}`)
  },
  // 请求前处理配置
  beforeRequestHook: (config, options) => {
    const { apiUrl, isJoinPrefix, urlPrefix, joinParamsToUrl, formatDate, joinTime = true } = options

    // 添加接口前缀
    if (isJoinPrefix && urlPrefix && isString(urlPrefix))
      config.url = `${urlPrefix}${config.url}`

    // 将baseUrl拼接
    if (apiUrl && isString(apiUrl))
      config.url = `${apiUrl}${config.url}`

    const params = config.params || {}
    const data = config.data || false

    if (formatDate && data && !isString(data))
      formatRequestDate(data)

    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) { // URLSearchParams or object
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      }
      else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    }
    else if (!isString(params)) {
      if (formatDate)
        formatRequestDate(params)

      if (
        Reflect.has(config, 'data')
        && config.data
        && (Object.keys(config.data).length > 0 || data instanceof FormData)
      ) {
        config.data = data
        config.params = params
      }
      else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params
        config.params = undefined
      }
      if (joinParamsToUrl)
        config.url = setObjToUrlParams(config.url as string, { ...config.params, ...config.data })
    }
    else {
      // 兼容restful风格
      config.url += params
      config.params = undefined
    }
    return config
  },

  // 请求拦截器处理
  requestInterceptors: (config, options) => {
    // 请求之前处理localStorage里的token，注意TOKEN_NAME应该为token的路径
    const token = localStorage.getItem(TOKEN_NAME)
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    return config
  },

  // 响应拦截器处理
  responseInterceptors: (res) => {
    return res
  },

  // 响应错误处理
  // eslint-disable-next-line object-shorthand
  responseInterceptorsCatch: async function (error: any) {
    const { config } = error
    if (!config || !config.requestOptions?.retry)
      return Promise.reject(error)

    config.retryCount = config.retryCount || 0

    if (config.retryCount >= config.requestOptions.retry.count)
      return Promise.reject(error)

    config.retryCount += 1

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(config)
      }, config.requestOptions.retry.delay || 100)
    })
    config.headers = { ...config.headers, 'Content-Type': 'application/json;charset=UTF-8' }
    return backoff.then((config) => {
      // the following request will be binded to axiosInstance, aso the following line is safe
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      request.request(config as AxiosRequestConfigRetry, (config as any).requestOptions)
    })
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    merge(<CreateAxiosOptions>{
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
      // e.g.: authenticationScheme: 'Bearer'
      authenticationScheme: '',
      // timeout, 10s
      timeout: 10 * 1000,
      // with cookies
      withCredentials: true,
      // request headers configuration
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      // request data and response data process transformation
      transform,
      // request options, the following options can be overrided in indepedent request
      requestOptions: {
        // api url
        apiUrl: host,
        // auto join api prefix
        isJoinPrefix: true,
        // url prefix, e.g.: /api
        urlPrefix: '/v1/api',
        // whether we need native reponse result.
        // if we need the header information of response, then enable this option
        isReturnNativeResponse: false,
        // whether we need do transformations to response
        // if needed, enable it.
        isTransformResponse: false,
        // whether we need join the params to url, when we initiate a post request
        joinParamsToUrl: false,
        // whether we need format the request data time
        formatDate: true,
        // add timestamp
        joinTime: true,
        // ignore repeat request
        ignoreRepeatRequest: true,
        // with token or not
        withToken: true,
        // retry count and delay
        retry: {
          count: 0,
          delay: 1000,
        },
        // if there is an error, warning or not
        errorWarning: false,
      },
    }, opt || {},
    ),
  )
}
export const request = createAxios()

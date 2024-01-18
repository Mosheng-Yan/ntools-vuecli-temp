import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { HttpRequestConfig } from './type'

class HttpRequest {
  instance: AxiosInstance
  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功的拦截')
        return res.data
      },
      (err) => {
        console.log('全局响应失败的拦截')
        return err
      }
    )

    // 混入到全局拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: HttpRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      )
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HttpRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HttpRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HttpRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HttpRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HttpRequest

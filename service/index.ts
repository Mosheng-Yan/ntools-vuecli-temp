import HttpRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const httpRequest1 = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log('new HttpRequest时混入的请求成功的拦截')
      return config
    },
    requestFailureFn: (err) => {
      console.log('new HttpRequest时混入的请求失败的拦截')
      return err
    },
    responseSuccessFn: (res) => {
      console.log('new HttpRequest时混入的响应成功的拦截')
      return res
    },
    responseFailureFn: (err) => {
      console.log('new HttpRequest时混入的响应失败的拦截')
      return err
    },
  },
})

// export const httpRequest2 = new HttpRequest({
//   baseURL: 'http://example.com:1888',
//   timeout: 8000
// })

export default httpRequest1

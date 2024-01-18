import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios'

interface HttpInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface HttpRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: HttpInterceptors<T>
}

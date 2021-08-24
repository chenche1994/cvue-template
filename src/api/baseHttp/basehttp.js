import axios from 'axios';
import { getTokenByKey } from '@/utils/token'
import { Loading } from "element-ui"
import { clearEmptySearch } from '@/utils/util.js'

/**
 * options: 常见到请求参数包括，URL，method是，data等
 * options.showLoading    是否显示loading
 */
export default class BaseHttp {
  constructor (options){
    this.create(options)
  }
  create(options={}){
    let loading
    const { headers = {}, timeout = 45000, interceptors = {}, ...option } = options
    // axios实例
    this._http = axios.create({
      headers: {'Content-Type': 'application/json', ...headers},
      timeout, 
      ...option
    })
    // 请求拦截
    this._http.interceptors.request.use((request)=>{
      const token = getTokenByKey('user', 'token')
      request.headers["token"] = token;
      request.showLoading && (loading = Loading.service())
      return interceptors.request ? interceptors.request(request) : request
    }, error=>{
      console.log(error);
    })

    // 响应拦截
    this._http.interceptors.response.use((response)=>{
      loading && loading.close()
      return interceptors.response ? interceptors.response(response) : response
    }, error=>{
      console.error(error);
      loading && loading.close()
      return Promise.reject(error) 
    })
  }
  // 实际请求方法
  $http({ url = '', data = {}, method = 'get', paramsType = '', config = {} }){
    return this._http({
      method,
      url,
      ...this._enhanceData({ method, paramsType, data }),
      ...config
    })
  }
  // 格式化请求参数，如果请求方法为get或delete，请求参数为params，其他为data
  _enhanceData({method = '', paramsType, data}){
    method = method.toLowerCase()
    const defaultParamsType = paramsType || ((method === 'get' || method === 'delete') ? 'params' : 'data')
    //get请求时过滤为xxx=''的字段
    if (defaultParamsType === 'params') {
      data = clearEmptySearch(data)
    }
    data = { [defaultParamsType]: data }
    return data
  }
}
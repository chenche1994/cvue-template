import { Message } from 'element-ui'
import BaseHttp from './basehttp'
import { removeToken } from '@/utils/token'
// 跳转到登录页
async function toLoginPage () {
  Message.error('登录已过期，请重新登录...')
  removeToken()
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
}
const http = new BaseHttp({
  withCredentials: true, // 跨域携带cookie，nginx配置可注释掉
})
/**
 * 
 * @param {showMsg} 是否展示成功消息
 * @param {needCatch} 接口错误时是否提示错误信息，默认值为展示
 * @param {params} 其他参数，url,method, config.showLoading等
 */
function ajax({showMsg = false, needCatch, ...params}){
  return http.$http(params).then(res=>{
    let msg = res.data.msg
    if(res.data){
      if (params.config && params.config.responseType === 'blob') {
        return res
      }else if(res.data.code === 1 || res.data.data){
        if(res.data.code === 401){
          toLoginPage()
          return Promise.reject({})
        }else if(res.data.code === 501){
          msg = res.data.data
          Message.error(msg)
          return Promise.reject({})
        }
      }
      showMsg && msg && Message.success(msg)
      return res.data
    }
    const err = new Error(msg || res.statusText || res.status)
    err.response = res.data || {}
    err.code = res.status
    return Promise.reject(err)
  }).catch(({ response = {}, message })=>{
    if(response.code === 401){
      return toLoginPage()
    }
    !needCatch && response && message && Message.error(message)
    return Promise.reject(response)
  })
}
export default ajax
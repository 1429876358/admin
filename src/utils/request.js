import axios from 'axios'
// import store from '@/store'
import { getToken } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

service.interceptors.request.use(
  config => {
    // 真实项目使用 Token字段
    if (getToken()) {
      config.headers['token'] = getToken()
    }
    // 模拟数据必须验证
    // store.dispatch('global/showLoading')
    return config
  },
  error => {
    // console.log('1234')
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000 && res.code !== 200) {
      if (res.code === 40001) {
        // Toast.fail(res.message)
        // console.log(res.message)
      }
      // 50001: Illegal token 50008: Token 非法 50012: 另一台设备登录 50014: Token 过期
      if (res.code === 50001 || res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // Toast.fail(res.message)
        // console.log(res.message)
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload()
        // })
      }
      // store.dispatch('global/hideLoading')
      return Promise.reject(new Error(res.message || res.msg || 'Error'))
    } else {
      // store.dispatch('global/hideLoading')
      return res.data
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // Toast.fail(error.message)
    // console.log(error.message)
    // store.dispatch('global/hideLoading')
    return Promise.reject(error)
  }
)

export default service

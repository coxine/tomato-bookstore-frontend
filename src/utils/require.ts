import axios from 'axios'

import { showToast, ToastSeverity } from '../components/UI/ToastMessageUtils'

// axios实例
const instance = axios.create({
  baseURL: 'https://read-back.cos.tg',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 判断是否登录
const hasToken = () => {
  return !(sessionStorage.getItem('token') == '')
}

// 当前实例的拦截器，对所有向后端的请求进行处理，在其头部中加入token
instance.interceptors.request.use(
  (config) => {
    if (hasToken()) {
      config.headers['token'] = sessionStorage.getItem('token')
    }
    return config
  },
  (error) => {
    console.log('Axios request error: \n' + error)
    showToast({
      title: '错误！',
      message: '页面出错，请刷新或者重新登录！',
      severity: ToastSeverity.Warning,
      duration: 3000,
    })
    return Promise.reject()
  }
)

// 当前实例的拦截器，对所有从后端收到的返回结果进行处理，验证http的状态码
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response
    } else {
      return Promise.reject()
    }
  },
  (error) => {
    console.log('Axios response error: \n' + error)
    showToast({
      title: '错误！',
      message: '服务器出错！请重新尝试！',
      severity: ToastSeverity.Warning,
      duration: 3000,
    })
    return Promise.reject()
  }
)

export { instance as axios }

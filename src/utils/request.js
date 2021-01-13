/*
请求模块
那里需要使用那里导入
*/

import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  // 定义后端返回的原始数据处理
  // 参数 data 就是后端返回的原始数据(未经处理的 JSON格式字符串)
  transfromResponse: [function (data) {
    // 后端返回的数据可能不是JSON格式字符串
    // 如果不是的话，用JSONbig.parse调用就会出错
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // TODO handle the exception
      console.log('转换失败', err)
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state

  // 用户登入，给一个统一的token设置
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器

export default request

/*
请求模块
那里需要使用那里导入
*/

import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器

// 响应拦截器

export default request

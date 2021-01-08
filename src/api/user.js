/*
  用户相关请求模块
*/

import request from '@/utils/request'

/*
  登入注册
*/

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/*
  短信验证码发送
*/

export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

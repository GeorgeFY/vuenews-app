/*
  用户相关请求模块
*/

import request from '@/utils/request'
// import store from '@/store/'
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

/*
  获取当前登入用户的信息
*/

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

/*
  获取文章频道列表
*/

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/*
  测试代码，别人把登入用户的文章列表全部删除了。使用登入用户，但是鉴权值给Null,让服务器返回默认的推荐列表项。在继续
*/
export const getUserChannelsTest = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels',
    headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: 'null'
    }
  })
}

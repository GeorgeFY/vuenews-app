/*
  文章相关请求模块
*/

import request from '@/utils/request'

/*
  登入注册
*/

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

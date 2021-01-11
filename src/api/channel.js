/*
  频道相关请求
*/
import request from '@/utils/request'

/*
  获取所以文章频道列表
*/

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

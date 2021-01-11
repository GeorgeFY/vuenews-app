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

/*
  添加频道列表
*/

export const addUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

/*
  删除指定频道列表
*/

export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}

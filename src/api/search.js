/*
  搜索请求
*/
import request from '@/utils/request'

/*
  获取搜索联想建议
*/

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q // 搜索关键字
    }
  })
}

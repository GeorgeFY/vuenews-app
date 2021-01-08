/*
封装本地存储模块
*/

// 获取本地存储数据

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 为什么把 JSON.parse 放到 try-catch 中？
  // 因为 data 可能不是 JSON 格式字符串
  try {
    // 尝试把 data 转为 JavaScript 对象
    return JSON.parse(data)
  } catch (err) {
    // TODO handle the exception
    // data 不是 JSON 格式字符串，直接原样返回
    return data
  }
}

// 设置本地存储数据
export const setItem = (name, value) => {
  // 如果value是对象，把value转换为json格式字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

// 移除本地存储数据
export const removeItem = name => {
  window.localStorage.removeItem(name)
}

import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 防止页面刷新，数据丢失，把数据存储在本地存储中
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})

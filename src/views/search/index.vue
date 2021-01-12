<template>
  <div class="search-container">
    <!-- 搜索栏 开始-->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏 结束-->
    <!-- 搜索结果 开始-->
    <search-result
     v-if="isResultShow"
     :searchText="searchText"
     ></search-result>
    <!-- 搜索结束 结束-->
    <!-- 联系建议 开始-->
    <search-suggestion
     v-else-if="searchText"
     :searchText="searchText"
     @search = "onSearch"
     ></search-suggestion>
    <!-- 联系建议 结束-->
    <!-- 历史记录 开始-->
    <search-history v-else
      :searchHistorys="searchHistorys"
    ></search-history>
    <!-- 历史记录 结束-->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestions'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { getHistorySearch } from '@/api/search'
import { mapState } from 'vuex'
// import bus from './bus.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果显示
      searchHistorys: getItem('search-historys') || [] // 搜索历史数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.laodSearchHistory()
  },
  mounted () {
    // this.clearInput()
  },
  methods: {
    onSearch (searchText) {
      // console.log('onSearch')
      // 如果是搜索建议点击过来的，调用onSearch方法 是子传父，参数有子组件传递过来
      // 把传递过来的参数(点击的联想建议)替换为输入框里面的内容
      this.searchText = searchText
      // 先判断历史数据里面是否有，有 先删除
      const index = this.searchHistorys.indexOf(searchText)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      this.searchHistorys.unshift(searchText)
      setItem('search-historys', this.searchHistorys)
      this.isResultShow = true
    },
    async laodSearchHistory () {
      let lacalHistory = getItem('search-historys') || []
      // console.log(lacalHistory)本地存储里面数据
      if (this.user) {
        const { data } = await getHistorySearch()
        // console.log(data.data.keywords) 线上存储数据
        lacalHistory = [...new Set([
          ...lacalHistory,
          ...data.data.keywords
        ])]
        // console.log(lacalHistory) 合并后数据
      }
      this.searchHistorys = lacalHistory
    }
  }
}
</script>

<style lang="less" scoped>
</style>

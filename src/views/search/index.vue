<template>
  <div class="search-container">
    <!-- 搜索栏 开始-->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏 结束-->
    <!-- 搜索结果 开始-->
    <search-result v-if="isResultShow"></search-result>
    <!-- 搜索结束 结束-->
    <!-- 联系建议 开始-->
    <search-suggestion v-else-if="searchText"></search-suggestion>
    <!-- 联系建议 结束-->
    <!-- 历史记录 开始-->
    <search-history v-else ></search-history>
    <!-- 历史记录 结束-->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestions'
import SearchResult from './components/search-result'
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
      isResultShow: false // 控制搜索结果显示
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onSearch () {
      console.log('onSearch')
      this.isResultShow = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list"
       :key="index"
       :title="article.title"
       />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // 1 请求数据
      const { data } = await getSearchResult({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索字符
      })
      // 2 数据放在数据列表
      const { results } = data.data
      this.list.push(...results)
      // 3 关闭本次loading
      this.loading = false
      // 4 判断是否还有数据 有则从新获取 没有 关闭加载更多 finish设置为true
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
</style>

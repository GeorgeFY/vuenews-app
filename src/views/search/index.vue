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
      />
    </form>
    <!-- 搜索栏 结束-->
    <!-- 联系建议 开始-->
    <!-- 联系建议 结束-->
    <!-- 历史记录 开始-->
    <!-- 历史记录 结束-->
    <!-- 搜索结果 开始-->
    <!-- 搜索结束 结束-->
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  components: {},
  props: {},
  data () {
    return {
      searchText: ''
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str,index) in suggestions"
      :key="index"
      @click="onSearch(str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
import { Toast } from 'vant'
// import bus from '../bus.js'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想数据
    }
  },
  computed: {},
  watch: {
    // 属性名，需要被监视的数据
    searchText: {
      // 数据发生改变会执行handler
      handler: debounce(async function () {
        const searchContent = this.searchText
        if (!searchContent) {
          return
        }
        const { data } = await getSearchSuggestions(this.searchText)
        // console.log(data)
        if (data.data.options.length === 0) {
          Toast.fail('没有对应数据,请从新查找')
        }
        this.suggestions = data.data.options
      }, 1000),
      immediate: true // 回调会在监听开始就被调用
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    highlight (str) {
      // RegExp 正则表达式构造函数 参数1 字符串 参数2 匹配模式 返回值 正则对象
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color: red">${this.searchText}</span>`
      )
    },
    onSearch (str) {
      this.$emit('search', str)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

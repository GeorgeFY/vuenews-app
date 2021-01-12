<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      title="hello"
    ></van-cell>
    <van-cell
      icon="search"
      title="hello111"
    ></van-cell>
  </div>
</template>

<script>
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
    }
  },
  computed: {},
  watch: {
    // 属性名，需要被监视的数据
    searchText: {
      handler () {
        console.log('hello')
      },
      immediate: true
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>

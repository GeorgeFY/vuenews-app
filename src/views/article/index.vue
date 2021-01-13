<template>
  <div class="article-container">
    文章详情
  </div>
</template>

<script>
// 需要获取文章ID参数
// 1 this.$router.params.xxx
// 2 props传参  在路由中配置props:true 可以直接this.articleId使用
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>
</style>

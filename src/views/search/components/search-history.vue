<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
    <div v-if="isDeleteShow">
      <span>全部删除</span>
      &nbsp;
      <span @click="isDeleteShow = false">完成</span>
    </div>
   <van-icon v-else
    @click="isDeleteShow = true"
    name="delete" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history,index) in searchHistorys"
      :key="index"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
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

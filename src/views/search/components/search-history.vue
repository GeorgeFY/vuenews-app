<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
    <div v-if="isDeleteShow">
      <span
        @click="deleteAllSearch"
      >全部删除</span>
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
      @click="onDelete(history, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
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
    onDelete (history, index) {
      if (this.isDeleteShow) {
        // 如果是删除状态
        this.searchHistorys.splice(index, 1)
        // 数据持久化
        // 1:修改本地存储数据
        setItem('search-historys', this.searchHistorys)
        // 2：修改线上数据(如果登入)
      } else {
        // 非删除状态，展示搜索结果
        this.$emit('search', history)
      }
    },
    deleteAllSearch () {
      this.$emit('update-histories', [])
    }
  }
}
</script>

<style lang="less" scoped>
</style>

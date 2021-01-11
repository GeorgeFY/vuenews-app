<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot='title' class="channel-title">我的频道</div>
      <van-button
      type="danger"
      plain
      round
      size="mini"
      class="edit-btn"
      >编辑</van-button>
    </van-cell>
    <!-- gutter设置间距-->
    <van-grid :gutter="10">
      <van-grid-item
        class='grid-item'
        v-for="value in 8"
        :key="value"
        text="文字"
      ></van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot='title' class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class='grid-item'
        v-for="value in 8"
        :key="value"
        text="文字"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {},
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

<style scoped lang="less">
.channel-edit{
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  .edit-btn{
    width: 60px;
  }
  .channel-title{
    font-size: 16px;
    color: #333333;
  }
  .grid-item{
    width: 80px;
    height: 43px;
    background-color: #f4f5f6 !important;
    /deep/.van-grid-item__text{
      font-size: 14px;
      color: #222222;
    }
  }
}
</style>

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
        v-for="(channel,index) in userChannels"
        :key="index"
        :text="channel.name"
      ></van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot='title' class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="6">
      <van-grid-item
        class='grid-item'
        v-for="(channel,index) in recommendChannels"
        :key="index"
        :text="channel.name"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  computed: {
    // 推荐频道
    recommendChannels () {
      const arr = []
      for (let i = 0; i < this.allChannels.length; i++) {
        for (let j = 1; j < this.userChannels.length; j++) {
          var flag = false
          if (this.allChannels[i].id === this.userChannels[j].id) {
            flag = true
            break
          }
        }
        if (!flag) {
          arr.push(this.allChannels[i])
        }
      }
      console.log(arr, '123')
      return arr
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      // 获取所以频道
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
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

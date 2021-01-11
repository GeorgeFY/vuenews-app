<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 文章列表 开始-->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab :title="channel.name"
      v-for="channel in channels"
      :key="channel.id"
      >
        <article-list :channel='channel'></article-list>
      </van-tab>
      <!-- 占位 开始-->
      <div slot="nav-right"
      class="wap-nav-placeholder"
      >
      </div>
      <!-- 占位 结束-->
      <div slot="nav-right"
      class="wap-nav-wrap"
      @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 文章列表 结束-->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%"
    >
      <channel-edit :user-channels='channels'
      @close="isChannelEditShow = false"
      :active="active"
      @update-active="onUpdatActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
import { Toast } from 'vant'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        let channels = []
        if (this.user) {
          console.log('用户登入')
          const { data } = await getUserChannels()
          // console.log(data)
          channels = data.data.channels
        } else {
          // 未登入
          // console.log('用户未登入')
          const localChannels = getItem('user-channels')
          if (localChannels) {
            // 有本地频道数据，则使用
            // console.log('本地存储里面有数据')
            channels = localChannels
            // console.log(channels, '本地存储里面有数据')
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            // console.log('本地存储里面没有有数据')
            const { data } = await getUserChannels()
            channels = data.data.channels
            // console.log(channels, '本地存储里面没有数据')
          }
        }
        // 将数据放到组件中
        this.channels = channels
      } catch (e) {
        // TODO handle the exception
        console.log(e)
        Toast.fail('数据获取失败')
      }
    },
    onUpdatActive (index) {
      this.active = index
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs{
    /deep/.van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line{
      width: 15px;
      height: 3px;
      background: #3296FA;
      bottom: 20px;
    }
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    height: 43px;
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    opacity: .9;
    .van-icon{
      font-size: 24px;
    }
    &:before{
      content: '';
      width: 1px;
      height: 43px;
      background: url(line.png) no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>

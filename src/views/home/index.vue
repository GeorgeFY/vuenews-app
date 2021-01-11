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
      <channel-edit></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
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
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
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

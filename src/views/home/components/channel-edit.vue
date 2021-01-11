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
      @click="isEdit = !isEdit"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <!-- gutter设置间距-->
    <van-grid :gutter="6">
      <van-grid-item
        class='grid-item'
        :class="{ active: index === active }"
        :icon="(isEdit && index > 0) ? 'clear' : ''"
        v-for="(channel,index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
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
        @click="onAdd(channel)"
      ></van-grid-item>
    </van-grid>
    <!-- <van-button @click="test">asdasd</van-button> -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
// import { getUserChannels } from '@/api/user'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false // 控制编辑删除图标是否显示
    }
  },
  computed: {
    ...mapState(['user']),
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
    },
    async onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) {
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态，删除频道
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，切换频道
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      // 如果删除的是激活之前的频道
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      this.$emit('update-active', index)
      this.$emit('close')
    }
    /*  测试是否添加成功到后端服务器
    async test () {
      const { data } = await getUserChannels()
      console.log(data.data.channels)
    } */
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
      margin-top: 0; /* 解决点击编辑后，文字往下压的bug */
    }
    /deep/ .van-grid-item__icon{
      position: absolute;
      right: 0px;
      top: 0px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>

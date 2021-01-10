<template>
  <div class="my-container">
    <!-- 头部信息 开始-->
    <van-cell-group v-if="user" class="my-info">
      <!-- 用户信息 开始-->
      <van-cell class="base-info" title="单元格" value="内容" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{currentUser.name}}</div>
        <van-button
          class="update-btn"
          size="small"
          round
        >编辑资料</van-button>
      </van-cell>
      <!-- 用户信息 结束-->
      <!-- 头部数据 开始-->
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div solt='text' class="text-wrap">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div solt='text' class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div solt='text' class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div solt='text' class="text-wrap">
            <div class="count">{{currentUser.like_count > 0 ? currentUser.like_count : 0}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
      <!-- 头部数据 结束-->
    </van-cell-group>
    <!-- 头部信息 结束-->
    <!-- 没有登入显示 开始-->
    <div v-else class="not-login">
      <div @click="$router.push('/login')">
        <img class="mobile" src="./mobile.png">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!-- 没有登入显示 结束-->
    <!-- 收藏历史 开始-->
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏" />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史" />
    </van-grid>
    <!-- 收藏 历史 结束-->
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell
    @click="onLogout"
     v-if="user"
     class="logout-cell"
     title="退出登入"
     />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  created () {
    this.loadCurrentUser()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getUserInfo()
      this.currentUser = data.data
      console.log(this.currentUser)
    },
    onLogout () {
      // 退出登入，把vuex里面的states中user设置为null（dailog）
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped="">
  .my-container{
    .my-info{
      background: url("./banner.png") no-repeat;
      background-size: cover;
      .base-info{
        box-sizing: border-box;
        height: 115px;
        background-color: unset;
        padding-top: 38px;
        padding-bottom: 11px;
        .avatar{
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid #FFFFFF;
          margin-right: 11px;
        }
        .name{
          font-size: 15px;
          color: #FFFFFF;
        }
        .update-btn{
          height: 16px;
          font-size: 10px;
          color: #666666;
        }
      }
      .data-info{
        .data-info-item{
          height: 66px;
          color: #FFFFFF;
          .text-wrap{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count{
              font-size: 18px;
            }
            .text{
              font-size: 11px;
            }
          }
        }
      }
      /deep/ .van-grid-item__content {
        background-color: unset;
      }
    }
    .not-login{
      height: 180px;
      background: url(banner.png) no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile{
        width: 66px;
        height: 66px;
      }
      .text{
        font-size: 14px;
        color: #FFFFFF;
      }
    }
    /deep/ .nav-grid {
      .nav-grid-item {
        height: 70px;
        .toutiao {
          font-size: 22px;
        }
        .toutiao-shoucang {
          color: #eb5253;
        }
        .toutiao-lishi {
          color: #ff9d1d;
        }
        .van-grid-item__text {
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .logout-cell{
      text-align: center;
      color: #d86262;
    }
    .mb-4 {
      margin-bottom: 4px;
    }
  }
</style>

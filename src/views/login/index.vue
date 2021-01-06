<template>
  <div class="login-container">
    <van-nav-bar
    class="app-nav-bar"
      title="登入"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
      <template #button>
          <van-button size="mini" class="sent-btn" round>发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button class="login-btn" type="info" block @click="onLogin">登入</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      // 1:找到数据接口(接口文档)
      // 2:封装请求方法
      // 3:请求调用登入
      try {
        const res = await login(this.user)
        console.log('登入成功', res)
      } catch (err) {
        // TODO handle the exception
        if (err.response.status === 400) {
          console.log('登入失败', err)
        }
      }
      // 4:处理响应结果
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .sent-btn{
    width: 76px;
    height: 23px;
    background: #EDEDED;
    .van-button__text{
      height: 11px;
      font-size: 11px;
      color: #666666;
      font-weight: 400;
    }
  }
  .login-btn-wrap {
    padding: 26px 14px;
    .login-btn {
      background: #6DB4FB;
      border-radius: 5px;
      border: none;
      .van-button__text {
        font-size: 15px;
        color: #FFFFFF;
      }
    }
  }
}
</style>

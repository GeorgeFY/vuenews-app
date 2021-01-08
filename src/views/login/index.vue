<template>
  <div class="login-container">
    <van-nav-bar
    class="app-nav-bar"
      title="登入"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="onLogin"
    :validate-first="true"
    :show-error="false"
    :show-error-message="false"
    ref="login-from"
    @failed="onFailed">
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        name="mobile"
        center
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        name="code"
        center
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
      <template #button>
        <van-count-down v-if="isCountDownShow"
        :time="1000 * 6"
        format="ss s"
        @finish="isCountDownShow = false"/>
        <van-button v-else size="mini" class="sent-btn" round @click.prevent="onSengSms" :loading="isSendSmsLoading">发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" native-type="submit" block >登入</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false // 发送验证码按钮的 loading 状态
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登入中...',
        forbidClick: true,
        duration: 0
      })
      // 1:找到数据接口(接口文档)
      // 2:封装请求方法
      // 3:请求调用登入
      try {
        const res = await login(this.user)
        console.log('登入成功', res)
        Toast.success('登入成功')
      } catch (err) {
        // TODO handle the exception
        if (err.response.status === 400) {
          console.log('登入失败', err)
          Toast.fail('登入失败')
        }
      }
      // 4:处理响应结果
    },
    onFailed (error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSengSms () {
      try {
        await this.$refs['login-from'].validate('mobile')
        this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
        const res = await sendSms(this.user.mobile)
        this.isCountDownShow = true
        console.log(res)
      } catch (err) {
        // TODO handle the exception
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁,请稍后在发送'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          // 未知错误
          message = '发送失败!请重试'
        }
        Toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false
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

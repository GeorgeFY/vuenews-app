<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button size="small"
    class="post-btn"
    @click="onPost"
    :disabled="!message"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
import { Toast } from 'vant'
export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: '' // 输入框内容
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      Toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      // 找到数据接口
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      // 请求提交数据
      // 处理响应结果
      // 关闭弹出层，数据视图更新
      this.$emit('post-success', data.data.new_obj)
      Toast.success('发布成功')
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment{
  padding: 14px;
  display: flex;
  align-items: center;
  .post-btn{
    width: 50px;
    color: white;
    background-color: red;
    border-radius: 5px;
  }
}
</style>

<template>
  <div class="commnet-reply">
    <!-- 头部信息-->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left"
       name="cross"
       @click="$emit('close')"
      ></van-icon>
    </van-nav-bar>
    <!-- /头部信息-->
    <!--当前评论项 -->
    <comment-item
    :comment="comment"></comment-item>
    <!-- /当前评论项-->
    <!-- 所以评论回复-->
    <van-cell title="所有回复"></van-cell>
    <comment-list
      :source="comment.com_id"
      type="c"
      :list="commentList"
    ></comment-list>
    <!-- /所以评论回复-->
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论-->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostSuccess"
      ></post-comment>
    </van-popup>
    <!-- /发布评论-->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论的恢复列表
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPostSuccess (comment) {
      // 将发布成功的评论放到最顶部
      this.commentList.unshift(comment)
      // 更新评论的恢复数量
      this.comment.reply_count++
      // 关闭发布弹出层
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 200px;
      height: 30px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
  }
</style>

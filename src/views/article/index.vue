<template>
  <div class="article-container">
   <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <div class="main-wrap">

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="isShowArticle">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <van-button
            class="follow-btn"
            :type="article.is_followed ? 'info' : 'danger'"
            round
            size="small"
            :icon="article.is_followed ? '' : 'plus'"
          >{{article.is_followed ? '已关注' : '关注'}}</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="markdown-body article-content" v-html="article.content">
        </div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        color="#777"
        name="star-o"
      />
      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
// 需要获取文章ID参数
// 1 this.$router.params.xxx
// 2 props传参  在路由中配置props:true 可以直接this.articleId使用
import './github-markdown.css'
import { getArticleById } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isShowArticle: true, // 默认有文章显示
      article: {} // 文章数据
    }
  },
  computed: {},
  watch: {},
  created () {
    this.laodArticle()
  },
  mounted () {},
  methods: {
    async laodArticle () {
      try {
        const { data } = await getArticleById(this.articleId)
        console.log(data.data)
        this.article = data.data
      } catch (err) {
        this.isShowArticle = false
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 14px;
      margin: 0;
      color: #3a3a3a;
      background-color: #fff;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 11px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 14px;
      /deep/ p {
        text-align: justify;
      }
    }
  }
  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
  }
  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

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
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}
</style>

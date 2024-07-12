<template>
  <el-card class="hot-posts">
    <template #header>
      <div class="hot-posts-header"><el-icon><List /></el-icon>热门帖子</div>
    </template>
    <div class="post-list">
      <div class="post-item" v-for="(post, index) in hotPosts" :key="post.title">
        <span class="post-rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
        <div class="post-info">
          <span class="post-title">{{ post.title }}</span>
          <span class="post-meta">{{ post.meta }}</span>
        </div>
        <span class="post-views">{{ post.views }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
import { List } from '@element-plus/icons-vue';

export default {
  name: 'HotPosts',
  components: {
    List
  },
  data() {
    return {
      hotPosts: [
        { title: '在野外不被死的99种方法', meta: '作者: 重生之我是贝爷', views: '1w+ 浏览' },
        { title: '在野外不冷死的99种方法', meta: '作者: 重生之我是贝爷2', views: '9k+ 浏览' },
        { title: '帖子标题', meta: '作者: 帖子作者', views: '浏览量' },
        { title: '帖子标题', meta: '作者: 帖子作者', views: '浏览量' },
        { title: '帖子标题', meta: '作者: 帖子作者', views: '浏览量' }
      ]
    };
  }
}
</script>

<style scoped>
.hot-posts {
  margin-bottom: 20px;
}
.hot-posts-header {
  font-weight: bold;
  display: flex;
  align-items: center;
}
.post-list {
  display: flex;
  flex-direction: column;
}
.post-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.post-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
  color: white;
}
.rank-1 {
  background-color: red;
}
.rank-2 {
  background-color: orange;
}
.rank-3 {
  background-color: yellow;
}
.rank-4,
.rank-5,
.rank-6 {
  background-color: grey;
}
.post-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.post-title {
  font-weight: bold;
}
.post-meta {
  color: #999;
  font-size: 0.9em;
}
.post-views {
  margin-left: 10px;
  color: #999;
  font-size: 0.9em;
}
</style>

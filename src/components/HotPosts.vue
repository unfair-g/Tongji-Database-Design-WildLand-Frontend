<template>
  <el-card class="hot-posts">
    <template #header>
      <div class="hot-posts-header"><el-icon><List /></el-icon>热门帖子</div>
    </template>
    <div class="post-list">
      <div class="post-item" v-for="(post, index) in hotPosts" :key="post.post_id" @click="goToPostDetail(post)">
        <span class="post-rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
        <div class="post-info">
          <span class="post-title">{{ post.title }}</span>
          <span class="post-meta">作者：{{ post.author_name }}</span>
        </div>
        <span class="post-stars">收藏量{{ post.stars_number }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
import { List } from '@element-plus/icons-vue';
import axios from '@/axios'; // 确保路径是正确的

export default {
  name: 'HotPosts',
  components: {
    List
  },
  data() {
    return {
      hotPosts:[],
    };
  },
  methods: {
    async fetchHotPosts() {
      try {
        const response = await axios.get('/api/Posts/TopPosts');
        this.hotPosts = response.data;  // 将返回的数据赋值给 hotPosts
      } catch (error) {
        console.error('获取热门帖子失败:', error);
        this.$message.error('获取热门帖子失败，请稍后再试');
      }
    },
    goToPostDetail(post) {
      const postID = post.post_id;
      const postKind = post.post_kind;
      if (postKind === 0) {
        this.$router.push({ path: `/home/forum/post/share/${postID}` }); 
      } else if (postKind === 1) {
        this.$router.push({ path: `/home/forum/post/lease/${postID}` }); 
      } else {
        this.$router.push({ path: `/home/forum/post/recruit/${postID}` }); 
      }
    }
  },
  mounted() {
    this.fetchHotPosts();
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
.post-stars {
  margin-left: 10px;
  color: #999;
  font-size: 0.9em;
}
</style>

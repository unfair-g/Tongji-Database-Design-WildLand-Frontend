<template>
  <el-card class="post-item">
    <template #header>
      <div class="post-header">
        <img :src="post.avatar" alt="avatar" class="avatar">
        <div class="post-details">
          <div class="post-info">
            <span class="username">{{ post.username }}</span>
            <span class="time">{{ post.time }}</span>
          </div>
          <div class="post-stats">
            <span class="stat-item"><el-icon><View /></el-icon>{{ post.views }}</span>
            <span class="stat-item" @click="toggleLike">
              <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !isLiked, 'icon-dianzanxuanzhong': isLiked}"></i>
              {{ likes }}
            </span>
            <span class="stat-item"><el-icon><ChatLineSquare /></el-icon> {{ post.comments }}</span>
            <span class="stat-item" @click="toggleStar">
              <el-icon v-if="!isStarred"><Star /></el-icon>
              <el-icon v-else><StarFilled /></el-icon>
            </span>
          </div>
        </div>
      </div>
    </template>

    <div class="post-content">
      <h4>{{ post.title }}</h4>
      <p>{{ post.content }}</p>
    </div>
  </el-card>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ArticleCard',
  props: {
    post: {
      type: Object,
      default: () => ({
        avatar: require('@/assets/avatar.jpg'),
        username: 'fby',
        time: '19分钟前',
        title: '当我在泉州海滩发现了一个露营宝地！',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...',
        views: 350,
        likes: 101,
        comments: 5
      })
    }
  },
  setup(props) {
    const isLiked = ref(false);
    const likes = ref(props.post.likes);
    const isStarred = ref(false);

    const toggleLike = () => {
      isLiked.value = !isLiked.value;
      likes.value = isLiked.value ? likes.value + 1 : likes.value - 1;
    };

    const toggleStar = () => {
      isStarred.value = !isStarred.value;
    };

    return {
      isLiked,
      likes,
      toggleLike,
      isStarred,
      toggleStar
    };
  }
};
</script>

<style scoped>
.post-item {
  margin-bottom: 20px;
  width: 1200px; /* 调整宽度，根据需要设置合适的值 */
}
.post-header {
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.post-details {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
.post-info {
  display: flex;
  flex-direction: column;
  margin-right: auto; /* 将 post-stats 推到右侧 */
}
.post-stats {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.stat-item {
  display: flex;
  align-items: center;
  margin-right: 15px; /* 间隙 */
  cursor: pointer; /* 表示这个图标是可以点击的 */
}
.time {
  color: darkgrey;
}
i {
  font-size: 25px;
}
</style>

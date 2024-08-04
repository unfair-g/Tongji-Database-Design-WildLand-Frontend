<template>
 <div v-if="view==='share'">
  <div v-for="sharepost in shareposts" :key="sharepost.post_id" justify="center">
    <el-card class="post-item">
      <template #header>
        <div class="post-header">
          <img :src="sharepost.avatar" alt="avatar" class="avatar">
          <div class="post-details">
            <div class="post-info">
              <span class="username">{{ sharepost.username }}</span>
              <span class="time">{{ sharepost.time }}</span>
            </div>
            <div class="post-stats">
              <span class="stat-item"><el-icon><View /></el-icon>{{ sharepost.views }}</span>
              <span class="stat-item" @click="toggleLike(sharepost)">
                <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !sharepost.isLiked, 'icon-dianzanxuanzhong': sharepost.isLiked}"></i>{{ sharepost.likes }}
              </span>
              <span class="stat-item"><el-icon><ChatLineSquare /></el-icon> {{ sharepost.comments }}</span>
              <span class="stat-item" @click="toggleStar(sharepost)">
                <el-icon v-if="!sharepost.isStarred"><Star /></el-icon>
                <el-icon v-else><StarFilled /></el-icon>
              </span>
            </div>
            </div>
          </div>
        </template>
        <div class="post-content" @click="goToPostDetail(sharepost)">
          <div><h4>{{sharepost.title }}</h4></div>
          <div><p> {{sharepost.shortContent }}</p></div>
        </div>
      </el-card>
    </div>  
</div><!-- end of v-if="view=='share'" -->
  <div v-else-if="view==='recruit'">
    <div v-for="recruitpost in recruitposts" :key="recruitpost.post_id" justify="center">
      <el-card class="post-item">
        <template #header>
          <div class="post-header">
            <img :src="recruitpost.avatar" alt="avatar" class="avatar">
          <div class="post-details">
            <div class="post-info">
                <span class="username">{{ recruitpost.username }}</span>
                <span class="time">{{ recruitpost.time }}</span>
            </div>
            <div class="post-stats">
              <span class="stat-item"><el-icon><View /></el-icon>{{ recruitpost.views }}</span>
              <span class="stat-item" @click="toggleLike(recruitpost)">
                <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !recruitpost.isLiked, 'icon-dianzanxuanzhong': recruitpost.isLiked}"></i>{{ recruitpost.likes }}
              </span>
              <span class="stat-item"><el-icon><ChatLineSquare /></el-icon> {{ recruitpost.comments }}</span>
              <span class="stat-item" @click="toggleStar(recruitpost)">
                <el-icon v-if="!recruitpost.isStarred"><Star /></el-icon>
                <el-icon v-else><StarFilled /></el-icon>
              </span>
            </div>
            </div>
          </div>
        </template><!-- end of post-header -->
        
        <div class="post-content" @click="goToPostDetail(recruitpost)">
          <div><h4>{{recruitpost.title }}</h4></div>
          <div><p> {{recruitpost.shortContent }}</p></div>
        </div>

      </el-card>
    </div>
  </div>

</template>

<script>

export default {
  name: 'ArticleCard',
  props: {
    view: {
      type: String,
      required:true
    }
  },
  computed: {
    shareposts() {
      return this.$store.state.post.shareposts;
    },
    recruitposts() {
      return this.$store.state.post.recruitmentposts; 
    }
  },
  methods: {
    goToPostDetail(post) {
      const postID = post.post_id;
<<<<<<< Updated upstream
      this.$router.push({ path: `/home/forum/${this.view}/${postID}` });
=======
      if (this.view === 'lease') {
        this.$router.push({ path: `/home/forum/post/lease/${postID}` });
      } else {
        this.$router.push({ path: `/home/forum/post/${this.view}/${postID}` });
      }      
>>>>>>> Stashed changes
    },
    toggleLike(post) {
      post.isLiked = !post.isLiked;
      post.likes = post.isLiked ? post.likes + 1 : post.likes - 1;
    },
    toggleStar(post) {
      post.isStarred = !post.isStarred;
    }
  }
};
</script>

<style scoped>
.post-item {
  margin-bottom: 20px;
  width: 100%; /* 调整宽度，根据需要设置合适的值 */
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
.post-content {
  display: flex;
  flex-direction: column;
  align-items: left;
}
.post-title:hover,
.post-text:hover {
  text-decoration: underline; /* 添加下划线 */
}
</style>

<template>
 <div v-if="view==='share'">
  <div v-for="sharepost in shareposts" :key="sharepost.post_id" justify="center">
    <el-card class="post-item">
      <template #header>
        <div class="post-header">
          <img :src="sharepost.avatar" alt="avatar" class="avatar">
          <div class="post-details">
            <div class="post-info">
              <span class="username">{{ sharepost.username }}{{ author_id }}</span>
              <span class="time">{{ formatTime(sharepost.post_time)  }}</span>
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
          <div class="post-title"><h4>{{sharepost.title }}</h4></div>
          <div class="post-text"><p> {{sharepost.shortContent }}</p></div>
        </div>
      </el-card>
    </div>  
</div><!-- end of v-if="view=='share'" -->
  <div v-else-if="view ==='recruit'">
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
          <div class="post-title"><h4>{{recruitpost.title }}</h4></div>
          <div class="post-text"><p>活动时间：{{recruitpost.activity_time}}；活动地点：{{recruitpost.activity_address  }}；计划招募人数：{{ recruitpost.total_recruit }}；活动要求：{{ recruitpost.requirements }}</p></div>
        </div>

      </el-card>
    </div>
  </div>
  <div v-else-if="view === 'lease'">
    <div v-for="ldleitemspost in ldleitemsposts" :key="ldleitemspost.post_id" justify="center" >
      <el-card class="post-item" @click="goToPostDetail(ldleitemspost)">
        <template #header>
         <div class="post-header">
            <img :src="ldleitemspost.avatar" alt="avatar" class="avatar">
            <div class="post-details">
              <div class="post-info">
                <span class="username">{{ ldleitemspost.username }}</span>
                <span class="time">{{ ldleitemspost.time }}</span>
              </div>
              <div class="post-stats">
                <span class="stat-item"><el-icon><View /></el-icon>{{ ldleitemspost.views }}</span>
                <span class="stat-item" @click="toggleLike">
                  <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !isLiked, 'icon-dianzanxuanzhong': isLiked}"></i>{{ ldleitemspost.likes }}
                </span>
                <span class="stat-item"><el-icon><ChatLineSquare /></el-icon> {{ ldleitemspost.comments }}</span>
                <span class="stat-item" @click="toggleStar">
                  <el-icon v-if="!isStarred"><Star /></el-icon>
                  <el-icon v-else><StarFilled /></el-icon>
                </span>
              </div>
            </div>
          </div>
        </template>

        <div class="post-content">
          <img :src="ldleitemspost.item_image" class="image" alt="order image">
          <div style="padding: 14px;flex:1;">
            <span>{{ ldleitemspost.item_name}}</span>
            <div><span>商品简介: {{ ldleitemspost.item_summary}}</span></div>
            <div><span>商品新旧程度：{{ ldleitemspost.condition}}</span></div>
            <div class="bottom clearfix">
              <span class="price">¥{{ ldleitemspost.price }}</span>
              <el-button type="text" class="button" @click="goToPostDetail(ldleitemspost)">查看详情</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <div v-else>
    加载中……
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from '@/axios'; // 确保路径是正确的
import state from '@/store/global.js'; // 引入映射表

export default {
  name: 'ArticleCard',
  props: {
    view: {
      type: String,
      required:true
    }
  },
  data() {
    return {
      shareposts: [],
    };
  },
  mounted() {
    if (this.view === 'share') {
      this.fetchSharePosts();
    }
    
  },
  computed: {
    recruitposts() {
      return this.$store.state.post.recruitmentposts; 
    },
    ldleitemsposts() {
      return this.$store.state.post.ldleitemsposts
    }

  },
  methods: {
    fetchSharePosts() {
      const userId = state.userId;
      axios.get(`/api/Posts/GetOverview/0/${userId}`)
        .then(response => {
          this.shareposts = response.data.map(post => ({
            post_id: post.post_id,
            username: post.author_name,
            avatar: post.portrait,
            title: post.title,
            shortContent:post.short_content,
            likes: post.likes_number,
            comments: post.total_floor,
            post_time: post.post_time,
            views: 0, // Assuming views is not available in the API response
            isLiked: post.isLiked,
            isStarred: post.isStarred,
          }));
        })
        .catch(error => {
          console.error('Error fetching share posts:', error);
          this.handleError(error, '获取分享贴失败');
        });  
    },
    handleError(error, message) {
      if (error.response) {
        console.error(`${message}:`, error.response.data);
        ElMessage.error(`${message} - 错误代码: ${error.response.status}`);
      } else if (error.request) {
        console.error(`${message}: No response received`);
        ElMessage.error(`${message} - 没有收到响应`);
      } else {
        console.error(`${message}:`, error.message);
        ElMessage.error(`${message} - 错误信息: ${error.message}`);
      }
    },
    formatTime(postTime) {
      const postDate = new Date(postTime);
      const now = new Date();
      const diff = Math.floor((now - postDate) / 1000);
      if (diff < 60) {
        return `${diff} 秒前`;
      } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} 分钟前`;
      } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} 小时前`;
      } else {
        return `${Math.floor(diff / 86400)} 天前`;
      }
    },
   goToPostDetail(post) {
      const postID = post.post_id;
      if (this.view === 'lease') {
        this.$router.push({ path: `/home/forum/lease/${postID}` });
      } else {
        this.$router.push({ path: `/home/forum/post/${this.view}/${postID}` });
      }      
    },
    toggleLike(post) {
      post.isLiked = !post.isLiked;
      post.likes = post.isLiked ? post.likes + 1 : post.likes - 1;
      if (this.view === 'share') {
        axios.post('/api/LikePosts/postlike', {
        post_id: post.post_id,
        user_id: state.userId
      })
      .then(response => {
        response.data.isLiked=post.isLiked;
        response.data.likesCount=post.likes;
      })
      .catch(error => {
        console.error('Error toggling like:', error);
        this.handleError(error, '点赞操作失败');
      });
      }
    },
    toggleStar(post) {
      post.isStarred = !post.isStarred;
      if (this.view === 'share') {
        axios.post('/api/StarPosts/starpost', {
          post_id: post.post_id,
          tips:"收藏测试",
          user_id: state.userId
      })
      .then(response => {
        response.data.isStarred = post.isStarred;
        if (post.isStarred === true) {
          response.data.stars_number+=1;
        }
        else if (post.isStarred === false) {
          response.data.stars_number-=1;
        }
      })
      .catch(error => {
        console.error('Error toggling star:', error);
        this.handleError(error, '收藏操作失败');
      });
      }
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
.post-title{
  margin-bottom: 10px;
}
.post-title:hover,
.post-text:hover {
  text-decoration: underline; /* 添加下划线 */
}
.product-card {
  width: 100%; /* 固定宽度 */
  height:30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.image {
  width: 200px; /* 固定图片宽度 */
  height: 200px; /* 固定图片高度 */
  object-fit: cover;
  margin-right: 60px;
}
.price {
  color: #ff4949;
  font-size: 18px;
}
.button {
  float: right;
  padding: 0;
}
</style>
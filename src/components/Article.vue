<template>
 <div v-if="view==='share'">
  <div v-for="sharepost in filteredSharePosts" :key="sharepost.post_id" justify="center">
    <el-card class="post-item">
      <template #header>
        <div class="post-header">
          <img :src="sharepost.avatar" alt="avatar" class="avatar" @click="goToUserSpace(sharepost.author_id)">
          <div class="post-details">
            <div class="post-info">
              <span class="username">{{ sharepost.username }}</span>
              <span class="time">{{ formatTime(sharepost.post_time)  }}</span>
            </div>
            <div class="post-stats">
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
    <div v-for="recruitpost in filteredRecruitPosts" :key="recruitpost.post_id" justify="center">
      <el-card class="post-item">
        <template #header>
          <div class="post-header">
            <img :src="recruitpost.avatar" alt="avatar" class="avatar" @click="goToUserSpace(recruitpost.author_id)">
          <div class="post-details">
            <div class="post-info">
                <span class="username">{{ recruitpost.username }}</span>
                <span class="time">{{ formatTime(recruitpost.post_time) }}</span>
            </div>
            <div class="post-stats">
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
          <div class="post-text">
            <span class="post-fix">活动时间：</span><span>{{recruitpost.activity_time}}；</span>
            <span class="post-fix">活动地点：</span><span>{{recruitpost.activity_address  }}；</span>
            <span class="post-fix">计划招募人数：</span><span>{{ recruitpost.total_recruit }}；</span>
            <span class="post-fix">活动介绍: </span><span>{{ recruitpost.intro }}</span>
          </div>
        </div>

      </el-card>
    </div>
  </div>
  <div v-else-if="view === 'lease'">
   <div v-for="ldleitemspost in ldleitemsposts" :key="ldleitemspost.post_id" justify="center" >
      <el-card class="post-item">
        <template #header>
         <div class="post-header">
            <img :src="ldleitemspost.portrait" alt="avatar" class="avatar">
            <div class="post-details">
              <div class="post-info">
                <span class="username">{{ ldleitemspost.user_name }}</span>
                <span class="time">{{ formatTime(ldleitemspost.post_time) }}</span>
              </div>
              <div class="post-stats">
                <!---->
                
                <span class="stat-item" @click="toggleLike(ldleitemspost)">
                  <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !ldleitemspost.isLiked, 'icon-dianzanxuanzhong': ldleitemspost.isLiked}"></i>{{ ldleitemspost.likes_number }}
                </span>
                
                <span class="stat-item" @click="toggleStar(ldleitemspost)">
                  <el-icon v-if="!ldleitemspost.isStarred"><Star /></el-icon>
                  <el-icon v-else><StarFilled /></el-icon>
                </span>
              </div>
            </div>
          </div>
        </template>

        <div class="post-content" @click="goToPostDetail(ldleitemspost)" style="display:flex;flex-direction: row;">
          <div style="flex:1;"><img :src="ldleitemspost.post_pics[0]" class="image" alt="order image"></div>
          <div style="padding: 14px;flex:2;">
            <div class="post-title"><h4>{{ldleitemspost.title }}</h4></div><!--带接口完善-->
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
    },
    user_id: {
      type: Number,
      default:null
    },
    star: {
      type: Boolean,
      default:false
    },
    post_id:{
      type: Number,
      default:null
    },
    searchQuery: {
      type: String,
      default:null
    }
  },
  data() {
    return {
      shareposts: [],
      ldleitemsposts: [],
      recruitposts: [],
      localSearchQuery:'',
    };
  },
  mounted() {
    if (this.view === 'share') {
      this.fetchSharePosts();
    }
    if (this.view === 'lease') {
      this.fetchLdlePosts();
    }
    if (this.view === 'recruit') {
      this.fetchRecruitPosts();
    }
  },
  computed: {
    filteredSharePosts() {
      if (!this.searchQuery) {
        return this.shareposts;
      }
      const query = this.searchQuery.toLowerCase();
      return this.shareposts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.username.toLowerCase().includes(query) 

      );
    },
    filteredRecruitPosts() {
      if (!this.searchQuery) {
        return this.recruitposts;
      }
      const query = this.searchQuery.toLowerCase();
      return this.recruitposts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.intro.toLowerCase().includes(query) ||
          post.username.toLowerCase().includes(query) ||
          post.activity_address.toLowerCase().includes(query) ||
          post.activity_time.toLowerCase().includes(query) 
          
      );
    },
    
  },
  methods: {
    fetchSharePosts() {
      if (this.user_id == null) {
        const userId = state.userId;
        axios.get(`/api/Posts/GetOverview/0/${userId}`)
          .then(response => {
            this.shareposts = response.data.map(post => ({
              post_id: post.post_id,
              username: post.author_name,
              author_id:post.author_id,
              avatar: post.portrait,
              title: post.title,
              shortContent : post.content.length > 40 ? post.content.substring(0, 40) + '...' : post.content,
              likes: post.likes_number,
              comments: post.total_floor,
              post_time: post.post_time,
              isLiked: post.isLiked,
              isStarred: post.isStarred,
            }));
            if(this.star)
              this.shareposts=this.shareposts.filter(element=>element.post_id==this.post_id)
          })
          .catch(error => {
            console.error('Error fetching share posts:', error);
            this.handleError(error, '获取分享贴失败');
          });
      }
      else {
        axios.get(`/api/Posts/GetUserPosts/${state.userId}/${this.user_id}/0`)
          .then(response => {
            this.shareposts = response.data.data.map(post => ({
              post_id: post.post_id,
              username: post.author_name,
              author_id:this.user_id,
              avatar: post.portrait,
              title: post.title,
              shortContent: post.short_content,
              likes: post.likes_number,
              comments: post.total_floor,
              post_time: post.post_time,
              isLiked: post.isLiked,
              isStarred: post.isStarred,
            }));
          })
          .catch(error => {
            console.error('Error fetching share posts:', error);
            this.handleError(error, '获取分享贴失败');
          });
      }
    },
    fetchLdlePosts() {
      if (this.user_id == null) {
        axios.get(`/api/LdleitemsPosts/GetLdleitemsPostsByUserId?user_id=${state.userId}`)
        .then(response => {
          this.ldleitemsposts = response.data;
          if(this.star)
            this.ldleitemsposts=this.ldleitemsposts.filter(element=>element.post_id==this.post_id)
        })
        .catch(error => {
          console.log(this.ldleitemsposts)
          console.error('Error fetching products:', error);
        });
      }
      else {
        axios.get(`/api/LdleitemsPosts/GetLdleitemsPostsByAuthorAndUserId`, {
          params: {
            author_id: this.user_id,
            user_id:state.userId
          }
        })
          .then(response => {
           this.ldleitemsposts = response.data
          })
          .catch(error => {
            console.error('Error fetching share posts:', error);
            this.handleError(error, '获取闲置贴失败');
          });
      }
    },
    async fetchRecruitPosts() {
      if (this.user_id == null) {
        const userId = state.userId;
        axios.get(`/api/RecruitmentPosts/GetOverview/2/${userId}`)
        .then(response => {
          this.recruitposts = response.data.map(post => ({
            post_id: post.post_id,
            author_id: post.author_id,
            username: post.author_name,
            avatar: post.portrait,
            title: post.title,
            shortContent:post.short_activity_summary,
            likes: post.likes_number,
            comments: post.total_floor,
            post_time: post.post_time,
            isLiked: post.isLiked,
            isStarred: post.isStarred,
            activity_time: post.activity_time,
            activity_address: post.location,
            total_recruit: post.planned_count,
            intro:post.short_activity_summary,
          }))
          if(this.star)
            this.recruitposts=this.recruitposts.filter(element=>element.post_id==this.post_id)
        })
        .catch(error => {
          console.error('Error fetching recruit posts:', error);
          this.handleError(error, '获取招募贴失败');
        }); 
      }
      else {
        axios.get(`/api/RecruitmentPosts/GetRecruitmentPostByAuthor/${this.user_id}/${state.userId}`)
        .then(response => {
          this.recruitposts = response.data.data.map(post => ({
            post_id: post.post_id,
            author_id: post.author_id,
            username: post.author_name,
            avatar: post.portrait,
            title: post.title,
            shortContent:post.short_activity_summary,
            likes: post.likes_number,
            comments: post.total_floor,
            post_time: post.post_time,
            isLiked: post.isLiked,
            isStarred: post.isStarred,
            activity_time: post.activity_time,
            activity_address: post.location,
            total_recruit: post.planned_count,
            intro:post.short_activity_summary,
          }));
        })
          .catch(error => {
          console.error('Error fetching recruit posts:', error);
          this.handleError(error, '获取招募贴失败');
        }); 
      }
    },
    handleError(error, message) {
      if (error.response) {
        if (error.response.status == '404') {
          ElMessage.error('暂时未发布该类帖子！')
        }
        else {
          console.error(`${message}:`, error.response.data);
          ElMessage.error(`${message} - 错误代码: ${error.response.status}`);
        }
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
        this.$router.push({ path: `/home/forum/post/lease/${postID}` });
      } else {
        this.$router.push({ path: `/home/forum/post/${this.view}/${postID}` });
      }      
    },
    toggleLike(post) {

      axios.post('/api/LikePosts/postlike', {
        post_id: post.post_id,
        user_id: state.userId
      })
      .then(response => {
        post.isLiked=response.data.isLiked;
        post.likes=response.data.likesCount;
      })
      .catch(error => {
        console.error('Error toggling like:', error);
        this.handleError(error, '点赞操作失败');
      });     
    },
    toggleStar(post) {
      axios.post('/api/StarPosts/starpost', {
        post_id: post.post_id,
        tips: "收藏测试",
        user_id: state.userId
      })
      .then(response => {
        post.isStarred=response.data.isStarred;
      })
      .catch(error => {
        console.error('Error toggling star:', error);
        this.handleError(error, '收藏操作失败');
      });
    },
    goToUserSpace(author_id) {
      if (author_id == state.userId) {
        this.$router.push({
          path: `/home/userspace`
        })
      }
      else {
        this.$router.push({
          path: `/home/userspace/${author_id}`
        })
      }
    }
  },
  watch: {
    view(newValue) {
      if (newValue === 'lease') {
        this.fetchLdlePosts();
      }
      else if (newValue === 'share') {
        this.fetchSharePosts();
      }
      else if (newValue === 'recruit') {
        this.fetchRecruitPosts();
      }
    },
    searchQuery(newVal) {
      this.localSearchQuery = newVal;
    }
  },
  created() {
    if (this.view === 'lease') {
      this.fetchLdlePosts();
    }
    else if (this.view === 'share') {
      this.fetchSharePosts();
    } else if (this.view === 'recruit') {
      this.fetchRecruitPosts();
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
  object-fit: cover;
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

.post-text span{
  margin-right: 2%;
  color: grey;
}

.post-text .post-fix{
  margin-right: 0;
  font-weight: bold;
  color: rgb(98, 98, 98);
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
  margin-right: 10px;
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
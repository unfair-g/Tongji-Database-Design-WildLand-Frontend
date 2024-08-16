<template>
  <el-card class="post-container">
    <div v-if="post">
      <div class="post-header">
        <img :src="post.portrait" alt="avatar" class="avatar" @click="goToUserSpace(post.author_id)">
        <div class="post-details">
          <div class="post-info">
            <span class="username">{{ post.author_name }}</span>
            <span class="time">发布时间：{{ post.post_time }}</span>
          </div>
          <div v-if="isPostOwner" class="post-visible-states">
            <el-select
              v-model="value"
              placeholder="修改帖子可见状态"
              size="large"
              style="width: 240px"
            >
            <!-- v-model="post.exhibit_status" -->
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
          <el-button @click="goBackToForumView" style="width: 20px">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
      </div>

      <div class="post-content">
        <div v-if="type === 'share'">
          <div class="post-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p  class="post-text">{{ post.content }}</p>
            <div class="image-gallery">
              <div  v-for="(imageRow, rowIndex) in imageRows" :key="rowIndex" class="image-row">
                <el-image v-for="(image, index) in imageRow" 
                :key="index" 
                style="width: 250px; height: 250px"
                :fit="'cover'"
                :src="image" 
                :alt="'Image ' + (rowIndex * 3 + index + 1)" 
                :class="imageClass"
                :preview-src-list="allImages"
                :initial-index="rowIndex * 3 + index"
              />
              </div>
            </div>
            
            <div class="post-location">
          <el-icon><Location /></el-icon> {{ post.post_position }}
          <span  v-if="!isPostOwner" class="delete-button" @click="openDeleteDialog">删除</span>
        </div>
        <el-dialog
          v-model="deleteDialogVisible"
          title="确认删除"
          width="30%"
        >
          <span>{{'您是否确认删除这条帖子'}}</span>
          <template v-slot:footer>
            <el-button @click="cancelDelete">否</el-button>
            <el-button type="primary" @click="confirmDelete">是</el-button>
          </template>
        </el-dialog>
            
          </div>
          <div class="post-stats">
            <el-button class="stat-item" @click="toggleLike(post)">
              <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !post.isLiked, 'icon-dianzanxuanzhong': post.isLiked}"></i>
              <span>点赞</span>
              <span>{{ post.likes_number }}</span>
              
            </el-button>
            <el-button class="stat-item" @click="toggleStar(post)">
              <el-icon v-if="!post.isStarred"><Star /></el-icon>
              <el-icon v-else><StarFilled /></el-icon>
              收藏
            </el-button>
            <el-button class="stat-item">
              <el-icon><ChatLineSquare /></el-icon> 评论{{ post.total_floor }}</el-button>
            <el-button class="stat-item"  @click="goToReportPostWindow">
              <el-icon><Bell/></el-icon>举报
            </el-button>
          </div>

          <div class="comments-section">
            <CommentInput
              v-model:commentContent="comment"
              :postId="this.postID"
            />
            <!-- 这里的评论回复的是帖子 -->
            <div >
              <CommentItem
                :postId="this.postID"
              />
            </div>
          </div>
        </div>

        <div v-if="type === 'recruit'">
          <h3 class="post-title">{{ post.title }}</h3>
          <h4 >
            <div class="recruit-number recruit-info">
              <p>招募人数：{{ post.total_recruit }} </p>
              <p>已招募到人数：{{ post.recruited_number }} </p>
              <p>已报名人数：{{ post.signedup_number }} </p>
            </div>
            <p class="recruit-info">活动时间：{{ post.activity_time }}</p>
            <p class="recruit-info">活动地点：{{ post.activity_address}}</p>
            <p class="recruit-info">活动要求：{{ post.requirements}}</p>
          </h4>
          <div class="post-location">
          <el-icon><Location /></el-icon> {{ post.location }}
          <span v-if="isPostOwner" class="delete-button" @click="openDeleteDialog('post')">删除</span>
        </div>
        <el-dialog
          v-model="deleteDialogVisible"
          title="确认删除"
          width="30%"
        >
          <span>{{deleteMessage}}</span>
          <template v-slot:footer>
            <el-button @click="cancelDelete">否</el-button>
            <el-button type="primary" @click="confirmDelete">是</el-button>
          </template>
        </el-dialog>
        <div class="post-stats">
          <el-button class="stat-item" @click="toggleLike(post)">
            <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !post.isLiked, 'icon-dianzanxuanzhong': post.isLiked}"></i>
            <span>点赞</span>
            <span>{{ post.likes }}</span>
          </el-button>
          <el-button v-if="!isPostOwner" class="sign-up"  @click="toggleSignUpInput" ref="buttonRef" >
             参与报名</el-button>

          <el-button v-if="isPostOwner" class="sign-up">
             结束招募
          </el-button>
          <el-button class="stat-item" @click="goToReportPostWindow">
            <el-icon><Bell/></el-icon>举报
          </el-button>
        </div>
        <div class="comments-section">
          <div v-if="showSignUpInput">
            <SignUpInput
            :avatar="post.avatar"
            v-model:signupContent="signup"
            @submit-signup="addSignUp"
          />
          </div>
          <SignUpItem
            v-for="signup in post.signups_details"
            :isSignupOwner="isSignupOwner"
            :isPostOwner="isPostOwner"
            :key="signup.signup_id"
            :signup="signup"
            @delete-signup="openDeleteDialog('signup', $event)"
          
          />
          <!-- <CommentItem
            v-for="comment in post.comments_details"              
            :key="comment.comment_id"
            :comment="comment"
            @delete-comment="openDeleteDialog('comment', $event)"
            @delete-reply="openDeleteDialog('reply', $event, comment)"
            @toggle-like="toggleLike"
            @add-reply="addReply"
          /> -->
        </div>
        </div>
        <!-- :Ptitle="post.title"
          :Pcontent="post.content"
          :Pusername="post.username"
          :PuserID="post.user_id" -->
        <ReportPost
          v-model:isReportDialogVisible="isReportPostWindowVisible"
          :isDetailShow="false"
          :thisPostId="this.postID"
          :post="post"
          @closeDialog="isReportPostWindowVisible=false"
        />  
        <!-- 用于举报帖子 -->
        
      </div>
      
    </div>
    
    <div v-else>
      
    </div>
    
  </el-card>
</template>

<script>
import CommentInput from '@/components/CommentInput.vue';
import CommentItem from '@/components/CommentItem.vue';
import SignUpInput from '@/components/SignUpInput.vue';
import SignUpItem from '@/components/SignUpItem.vue';
import ReportPost from '@/components/ReportPostWindow.vue'
import axios from '@/axios'; // 确保路径是正确的
import state from '@/store/global.js'; // 引入映射表
import { ElMessage } from "element-plus";

export default {
  name: 'ShareForumDetail',
  components: {
    CommentInput,
    CommentItem,
    SignUpInput,
    SignUpItem,
    ReportPost,
  },
  props: ['type','postID'],
  data() {
    return {
      deleteDialogVisible: false, // 控制删除弹窗显示
      currentImage: '',
      currentIndex: 0,
      isStarSolid: true,
      value: '',
      comment: '',
      signup:'',
    
      deleteType: '', // 删除类型（帖子或评论或报名）
      deleteComment: null, // 要删除的评论
      deleteReply: null, // 要删除的回复
      deleteSignup:null, // 要删除的报名
      parentComment: null, // 回复的父评论
      isReportPostWindowVisible:false,//举报弹窗显示
      showSignUpInput: false, // 控制SignUpInput显示
      options: [
        { label: '仅自己可见', value: 0 },
        { label: '所有人可见', value: 1 }
      ],
      post: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to.params.postID !== from.params.postID ) {
        this.fetchData();
      }
    }
  },
  computed: {
    imageRows() {
      if (!this.post || !this.post.post_pics) return [];
      let rows = [];
      for (let i = 0; i < this.post.post_pics.length; i += 3) {
        rows.push(this.post.post_pics.slice(i, i + 3));
      }
      return rows;
    },
    imageClass() {
      if (!this.post || !this.post.post_pics) return '';
      let className = '';
      if (this.post.post_pics.length === 1) {
        className = 'image-one';
      } else if (this.post.post_pics.length === 2) {
        className = 'image-two';
      } else {
        className = 'image-multiple';
      }
      return className;
    },
    allImages() {
      return this.post ? this.post.post_pics : [];
    },
    isPostOwner() {
      return this.post && this.post.author_id === state.userId; // 根据实际逻辑调整
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const user_id = state.userId;
        const response = await axios.get(`/api/Posts/GetPostDetail/${this.postID}/${user_id}`);
        this.post = response.data;
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
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
    toggleLike(post) {
      post.isLiked = !post.isLiked;
      post.likes_number = post.isLiked ? post.likes_number + 1 : post.likes_number - 1;
      axios.post('/api/LikePosts/postlike', {
        post_id: post.post_id,
        user_id: state.userId
      })
      .then(response => {
        response.data.isLiked=post.isLiked;
        response.data.likesCount=post.likes_number;
      })
      .catch(error => {
        console.error('Error toggling like:', error);
        this.handleError(error, '点赞操作失败');
      });
    },
    toggleStar(post) {
      post.isStarred = !post.isStarred;
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
    },
    goBackToForumView() {
      this.$router.push({ path: `/home/forum` });
    },
    openDeleteDialog() {
      this.deleteDialogVisible = true;
    },
    confirmDelete() {
      if (this.deleteType === 'post') {
        // 这里处理帖子删除操作
      } else if (this.deleteType === 'comment' && this.deleteComment) {
        const index = this.post.comments_details.indexOf(this.deleteComment);
        if (index !== -1) {
          this.post.comments_details.splice(index, 1);
        }
      } else if (this.deleteType === 'reply' && this.deleteReply && this.parentComment) {
        const index = this.parentComment.replies.indexOf(this.deleteReply);
        if (index !== -1) {
          this.parentComment.replies.splice(index, 1);
        }
      } else if (this.deleteType === 'signup' && this.deleteSignup) {
        const index = this.post.signups_details.indexOf(this.deleteSignup);
        if (index !== -1) {
          this.post.signups_details.splice(index, 1);
        }
      }
      this.deleteDialogVisible = false;
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    },
    addSignUp(newSignUp) {
      this.post.signups_details.push(newSignUp);
      this.post.comments += 1;
    },
    goToReportPostWindow() {
      this.isReportPostWindowVisible = true;
      console.log('Dialog Visible:', this.isReportSharePostWindowVisible);
    },
    toggleSignUpInput() {
      this.showSignUpInput = !this.showSignUpInput;
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
  }
};
</script>

<style scoped>
.post-container {
  width: 65%;
  margin-top: 3vh;
  margin-left: 17vw;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 3px solid #1D5B5E;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}
.post-visible-states {
  margin-right: 15px;
}
.post-content {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 10px;
}
.post-title {
  margin-bottom: 20px;
  margin-top: 15px;
}
.post-text {
  font-size:14px;
}
.post-location {
  margin-top: 8px;
  font-size:14px;
}
.image-gallery {
  display: flex;
  flex-direction: column;
  margin-top:20px;
  /* align-items: center; 没有解决居中问题 */
}
.el-image{
  margin-right: 20px;
}
.image-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.image-one {
  width: 75%;
}
.image-two {
  width:40%;
}
.image-multiple {
  width: 25%;
}

.post-header {
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%; /* 使头像变成圆形 */
  object-fit: cover; /* 确保图片以正确比例显示 */
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
  margin-right: auto;
}

.post-stats {
  margin-top:20px ;
  display: flex;
  align-items:center;
  gap:150px;
  justify-content: space-between;
  width: 100%;
}
.stat-item {
  display: flex;
  align-items: center;
  gap:5px;
  font-size: 18px;
  margin-right: 15px;
  cursor: pointer;
  background-color: #fff !important; /* 设置按钮的背景颜色 */
  color: #1D5B5E !important; /* 设置按钮的文字颜色 */
  border-color: #1D5B5E !important; /* 设置按钮的边框颜色 */
}

.el-button:active {
  background-color: #1e4040 !important; /* 设置按钮点击时的背景颜色 */
  color: #fff !important; /* 设置按钮点击时的文字颜色 */
  border-color: #1e4040 !important; /* 设置按钮点击时的边框颜色 */
}
.time {
  color: darkgrey;
}
.stat-item i,
.stat-item el-icon {
  margin-right:5px;
}
.delete-button {
  color: red;
  cursor: pointer;
  margin-left: 15px; /* 调整位置 */
}

.delete-button:hover {
  text-decoration: underline;
}

.location{
  margin-right:20px;
  color:grey;
  font-size:14px;
}


.delete-comment-button {
  color: red;
}

.comments-section{
  margin-top: 20px;
}

.recruit-info{
  margin-top:5px;
  margin-right: 25px;
  margin-bottom: 5px;
}
.sign-up{
  margin-left: 200px;
  margin-right: 200px;
  background-color: #1D5B5E ; 
  color: #fff ;
  border-color: #fff ; 
  font-size:18px;
}
.recruit-number{
  display:flex;
  flex-direction: flex-start;
  gap:300px;
}

</style>

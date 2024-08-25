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
              @change="updateExhibitStatus"
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
              <span  v-if="isPostOwner" class="delete-button" @click="openDeleteDialog">删除</span>
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
              <span>{{ post.likes_number }}</span>
              <span style="margin-left: 10px;">{{ post.isLiked ? '已点赞' : '点赞' }}</span>
              
            </el-button>
            <el-button class="stat-item" @click="toggleStar(post)">
              <el-icon v-if="!post.isStarred"><Star /></el-icon>
              <el-icon v-else><StarFilled /></el-icon>
              <span>{{ post.isStarred ? '已收藏' : '收藏' }}</span>
            </el-button>
            <el-button class="stat-item">
              <el-icon><ChatLineSquare /></el-icon>
              <span>{{post.total_floor }}</span>
              <span style="margin-left: 10px;">评论</span> 
            </el-button>
            <el-button class="stat-item"  @click="goToReportPostWindow">
              <el-icon><Bell/></el-icon>举报
            </el-button>
          </div>

          <div class="comments-section">
            <CommentInput
              :postID="Number(this.postID)"
              @comment-submitted="fetchPosts"
            />
            <!-- 展示直接评论帖子的评论 -->
            <div v-for="comment in directComments" :key="comment.comment_id">
              <CommentItem
                :postID="Number(this.postID)"
                :comment="comment"
                :isReply="false"
                @reply-submitted="fetchPosts"
                @comment-deleted="fetchPosts"
              />
              <!-- 显示相同 floor_number 的其他评论 -->
              <div v-for="reply in getSameFloorComments(comment.floor_number, comment.comment_id)" :key="reply.comment_id" class="reply-comment">
                <CommentItem
                  :postID="Number(this.postID)"
                  :comment="reply"
                  :isReply="true"
                  @reply-submitted="fetchPosts"
                  @comment-deleted="fetchPosts"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="type === 'recruit'">
          <h3 class="post-title">{{ post.title }}</h3>
          <h4 >
            <div class="recruit-number recruit-info">
              <p>招募人数：{{ post.planned_count }} </p>
              <p>已招募到人数：{{ post.current_count }} </p>
              <p>已报名人数：{{ this.signups.length }} </p>
            </div>
            <p class="recruit-info">活动时间：{{ post.activity_time }}</p>
            <p class="recruit-info">活动地点：{{ post.location}}</p>
            <p class="recruit-info">活动介绍：{{ post.activity_summary}}</p>
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
          </h4>
          <div class="post-location">
          <el-icon><Location /></el-icon> {{ post.post_position }}
          <span v-if="isPostOwner" class="delete-button" @click="openDeleteDialog">删除</span>
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
        <div class="post-stats">
          <el-button class="stat-item" @click="toggleLike(post)">
            <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !post.isLiked, 'icon-dianzanxuanzhong': post.isLiked}"></i>
            <span>{{ post.likes_number }}</span>
            <span style="margin-left: 10px;">{{ post.isLiked ? '已点赞' : '点赞' }}</span>
          </el-button>
          <div v-if="!isPostOwner">
            <div v-if="post.recruit_status === 1">
              <!-- 此时正在招募 -->
              <el-button v-if="!post.isApplied" class="sign-up" v-click-outside="onClickOutside" @click="toggleSignUpInput" ref="buttonRef" >
                参与报名
              </el-button>
              
              <el-button v-if="post.isApplied" class="sign-up" :disabled="true" ref="buttonRef" >
                已报名，等待审核
              </el-button>
            </div>
            <div v-if="post.recruit_status === 0">
              <!-- 此时已经停止招募 -->
              <el-button class="sign-up" :disabled="true" ref="buttonRef" >
                已停止招募
              </el-button>
            </div>
          </div>
            <el-popover
                v-if="isAlertVisible"
                ref="popoverRef"
                :virtual-ref="buttonRef"
                trigger="click"
                virtual-triggering
                width="400"
                @hide="onPopoverHide"
              >
                <el-alert
                  v-if="isAlertVisible"
                  title="您已被禁言不可参与报名"
                  type="error"
                  show-icon
                  class="custom-alert"
                  @close="onAlertClose"
                />
              </el-popover>

            
          
          <div v-if="isPostOwner" >
            <el-button v-if="post.recruit_status === 1" class="sign-up" @click="openFinishDialog">
              结束招募
            </el-button>
            <el-button v-if="post.recruit_status === 0" class="sign-up" :disabled="true">
              已结束招募
            </el-button>
          </div>
          <el-dialog
            v-model="finishDialogVisible"
            title="确认结束招募"
            width="30%"
          >
            <span>{{'您是否确认结束招募此活动？'}}</span>
            <template v-slot:footer>
              <el-button @click="cancelFinish">否</el-button>
              <el-button type="primary" @click="confirmFinish">是</el-button>
            </template>
          </el-dialog>
          <el-button class="stat-item" @click="goToReportPostWindow">
            <el-icon><Bell/></el-icon>举报
          </el-button>
        </div>
        <div class="comments-section">
          <div v-if="showSignUpInput">
            <SignUpInput
              :postID="Number(this.postID)"
              @signup-submitted="fetchPosts"
            />
          </div>
          <div v-if="isPostOwner">
            <h3>所有的报名信息：</h3>
            <div v-for="signup in this.signups" :key="signup.application_id">
              <SignUpItem
                :postID="Number(this.postID)"
                :signup="signup"
                :is-post-owner="this.isPostOwner"
                :current_count="post.current_count"
                :planned_count="post.planned_count"
                @change-signup="fetchPosts"
                class="signup-card"
              />
            </div>
          </div>
          <div v-else>
            <div  v-if="post.isApplied">
              <h3>我的报名情况：</h3>
              <div v-for="signup in this.signups.filter(signup => signup.user_id === this.localMyId)" :key="signup.application_id">
                <SignUpItem
                  :postID="Number(this.postID)"
                  :signup="signup"
                  :is-post-owner="this.isPostOwner"
                  @change-signup="fetchPosts"
                  class="signup-card"
                />
              </div>
            </div>
            
            <h3 v-if="this.signups.filter(signup => signup.review_status === 1).length!==0">所有招募通过的报名情况</h3>
            <div v-for="signup in this.signups.filter(signup => signup.review_status === 1)" :key="signup.application_id">
              <SignUpItem
                :postID="Number(this.postID)"
                :signup="signup"
                :is-post-owner="this.isPostOwner"
                @change-signup="fetchPosts"
                class="signup-card"
              />
            </div>
          </div>
  
          

        </div>
        </div>
        <!-- :Ptitle="post.title"
          :Pcontent="post.content"
          :Pusername="post.username"
          :PuserID="post.user_id" -->
        <ReportWindow
          v-model:isReportDialogVisible="isReportPostWindowVisible"
          :reportID="Number(this.postID)"
          :isReportPost="true"
          
        />  
        <!-- 用于举报帖子 -->
        
      </div>
      
    </div>
    
    <div v-else>
      
    </div>
    
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const buttonRef = ref(null)
const popoverRef = ref(null)

</script>
<script>
import CommentInput from '@/components/CommentInput.vue';
import CommentItem from '@/components/CommentItem.vue';
import SignUpInput from '@/components/SignUpInput.vue';
import SignUpItem from '@/components/SignUpItem.vue';
import ReportWindow from '@/components/ReportPostWindow.vue'
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
    ReportWindow,
  },
  props: ['type','postID'],
  data() {
    return {
      deleteDialogVisible: false, // 控制删除弹窗显示
      finishDialogVisible: false, // 控制结束招募弹窗显示
      currentImage: '',
      currentIndex: 0,
      isStarSolid: true,
      value: '',
      comments: [],//存储所有评论
      signups: [],
      isReportPostWindowVisible:false,//举报弹窗显示
      showSignUpInput: false, // 控制SignUpInput显示
      options: [
        { label: '仅自己可见', value: 0 },
        { label: '所有人可见', value: 1 }
      ],
      post: null,
      BeSilenced: state.mute_status, // 根据state.mute_status来确定
      isAlertVisible: false,
      
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
    localMyId() {
      return state.userId || null;  // 如果 userId 未定义，返回 null 或其他默认值
    },
    directComments() {
      return this.comments.filter(comment => !comment.parent_comment_id);
    },
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
    this.fetchComments();
  },
  methods: {
    async fetchData() {
      const user_id = state.userId || null;
      if (!user_id) {
        console.error('User ID is not defined');
        return;
      }
      if (this.type === 'share') {
        try {
          
          const postResponse = await axios.get(`/api/Posts/GetPostDetail/${this.postID}/${user_id}`);

          // 分别处理两个请求的响应
          this.post = postResponse.data;
          this.value = this.post.exhibit_status;
  
          console.log('帖子数据获取成功:', this.post, this.comments);
        } catch (error) {
          console.error('Error fetching sharepost data:', error);
          ElMessage.error('获取分享贴详情失败');
        }
      }
      else if (this.type === 'recruit') {
        try {
          const postResponse = await axios.get(`/api/RecruitmentPosts/GetPostDetail/${this.postID}/${user_id}`);
          this.post = postResponse.data;
          this.value = this.post.exhibit_status;

          console.log('帖子数据获取成功:', this.post);
        } catch (error) {
          console.error('Error fetching recruitpost data:', error);
          ElMessage.error('获取招募贴详情失败');
        }
      }
    },
    async fetchComments() {
      const user_id = state.userId || null;
      if (!user_id) {
        console.error('User ID is not defined');
        return;
      }
      if (this.type === 'share') {
        try {
          console.log('Fetching comments for postID:', this.postID);
          const commentsResponse = await axios.get(`/api/Comments/GetComment/${this.postID}/${user_id}`);
            this.comments = commentsResponse.data.sort((a, b) => {
              return new Date(a.comment_time) - new Date(b.comment_time);
            }) || [];

          // 如果 comments 为空，且没有其他错误，避免弹窗
          if (this.comments.length === 0) {
            console.log('No comments found.');
            return;
          }

          console.log('Comments fetched successfully:', this.comments);
        } catch (error) {
          if (error.response && error.response.data) {
            // 处理响应数据中包含的错误信息
          
          } else {
            // 处理技术错误，如连接问题
            this.handleError(error, '获取评论失败');
          }
        }
      } else if (this.type === 'recruit') {
        try {
          const signupResponse = await axios.get(`/api/Applications/ReviewingApplications/${this.postID}`);
          this.signups = signupResponse.data || [];
          if (this.signups.length === 0) {
            console.log('No signups found.');
            return;
          }
          console.log('Signups fetched successfully:', this.signups);
          
        }catch (error) {
          if (error.response && error.response.data) {
            // 处理响应数据中包含的错误信息
          } else {
            // 处理技术错误，如连接问题
            this.handleError(error, '获取报名失败');
          }
        }
      }
    },
    async updateExhibitStatus(newValue) {
      try {
        const response = await axios.put(`api/Posts/UpdateExhibitStatus/${this.postID}/${newValue}`);
        if (response.data != null) {
          ElMessage.success('帖子可见状态已更新');
        }
      }catch (error) {
        this.handleError(error, '更新失败：');
      }
    },
    fetchPosts(){
      this.fetchData();
      this.fetchComments();
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
      axios.post('/api/LikePosts/postlike', {
        post_id: post.post_id,
        user_id: state.userId
      })
      .then(response => {
        post.isLiked=response.data.isLiked;
        post.likes_number=response.data.likesCount;
        console.log('点赞成功');
        this.fetchPosts();

      })
      .catch(error => {
        console.error('Error toggling like:', error);
        this.handleError(error, '点赞操作失败');
        this.fetchPosts();

      });
    },
    toggleStar(post) {
      axios.post('/api/StarPosts/starpost', {
        post_id: post.post_id,
        tips:"收藏测试",
        user_id: state.userId
      })
      .then(response => {
        post.isStarred = response.data.isStarred;
        this.fetchPosts();
      })
      .catch(error => {
        console.error('Error toggling star:', error);
        this.handleError(error, '收藏操作失败');
        this.fetchPosts();
      });
    },
    goBackToForumView() {
      this.$router.push({ path: `/home/forum` });
    },
    openDeleteDialog() {
      this.deleteDialogVisible = true;
    },
    openFinishDialog() {
      this.finishDialogVisible = true;
    },
    confirmDelete() {
      this.deleteDialogVisible = false;
      axios.delete(`api/Posts/${this.postID}`)
        .then(response => {
          if (response.data !=null) {
            this.goBackToForumView();          
          }
      })
      .catch(error => {
        this.handleError(error, '删除帖子失败');
        this.fetchPosts();

      })    
    },
    confirmFinish() {
      this.finishDialogVisible = false;
      const recruit_status = 0;
      axios.put(`api/RecruitmentPosts/UpdateRecruitStatus/${this.postID}/${recruit_status}`)
        .then(response => {
          if (response.data !=null) {
            this.goBackToForumView();          
          }
      })
      .catch(error => {
        this.handleError(error, '结束招募失败');
        this.fetchPosts();
      })    
    },
    cancelFinish() {
      this.finishDialogVisible = false;
      this.fetchPosts();

    },
    addSignUp(newSignUp) {
      this.post.signups_details.push(newSignUp);
      this.post.comments += 1;
    },
    goToReportPostWindow() {
      this.isReportPostWindowVisible = true;
      console.log('Dialog Visible:', this.isReportPostWindowVisible);
    },
    toggleSignUpInput() {
      if (this.BeSilenced) {
        this.isAlertVisible = true;
        // console.log('已点击',this.isAlertVisible);
        return;
      }
      this.showSignUpInput = !this.showSignUpInput;
    },
    // addComment(newComment) {

    // }
    getReplies(parentCommentId) {
      return this.comments.filter(comment => comment.parent_comment_id === parentCommentId);
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
    },
    // 获取与当前 comment 具有相同 floor_number 的其他评论
    getSameFloorComments(floor_number, excludeCommentId) {
      return this.comments.filter(
        comment => comment.floor_number === floor_number && comment.comment_id !== excludeCommentId
      ).sort((a, b) => {
        return new Date(a.comment_time) - new Date(b.comment_time);
      });
    },
    onClickOutside() {
      if (this.$refs.popoverRef && this.$refs.popoverRef.popperRef) {
        this.$refs.popoverRef.popperRef.delayHide?.();
      }
    },
    onAlertClose() {
      this.isAlertVisible = false;
      if (this.popoverRef && this.popoverRef.popperRef) {
        this.popoverRef.popperRef.hide();
      }
    },
    onPopoverHide() {
      // 每次隐藏 popover 时重置 alert 的显示状态
      this.isAlertVisible = true;
    },
  }
};
</script>

<style scoped>
.username{
  font-size: 16px;
}
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
.reply-comment {
  margin-left: 40px; /* 为回复添加缩进 */
  border-left: 2px solid #e0e0e0; /* 可选的左侧边框样式 */
  padding-left: 20px;
  margin-top: 10px;
}
.signup-card{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
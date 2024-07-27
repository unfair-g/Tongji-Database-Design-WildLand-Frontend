<template>
  <el-card class="post-container">
    <div v-if="sharepost">
      <div class="post-header">
        <img :src="sharepost.avatar" alt="avatar" class="avatar">
        <div class="post-details">
          <div class="post-info">
            <span class="username">{{ sharepost.username }}</span>
            <span class="time">发布时间：{{ sharepost.time }}</span>
          </div>
          <div class="post-visible-states">
            <el-select
              v-model="value"
              placeholder="修改帖子可见状态"
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-button @click="goBackToForumView" style="width: 20px">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
      </div>

      <div class="post-content">
        <h3 class="post-title">{{ sharepost.title }}</h3>
        <p v-for="line in sharepost.content" :key="line" class="post-text">{{ line }}</p>
        <div class="image-gallery">
          <div v-for="(imageRow, rowIndex) in imageRows" :key="rowIndex" class="image-row">
            <img v-for="(image, index) in imageRow" 
            :key="index" 
            :src="image" 
            :alt="'Image ' + (rowIndex * 3 + index + 1)" 
            :class="imageClass"
            @click="showImage(image)"
          >
          </div>
        </div>
        <el-dialog
          v-model="dialogVisible"
          width="80%"
          :show-close="true"
          
        >
         <div class="image-dialog">
           <el-button @click="prevImage" class="prev-button" ><el-icon><ArrowLeftBold /></el-icon></el-button>
            <img :src="currentImage" alt="Enlarged image" style="width: 100%;">
          <el-button @click="nextImage" class="next-button"><el-icon><ArrowRightBold /></el-icon></el-button>
         </div>
        </el-dialog>

        <div class="post-location">
          <el-icon><Location /></el-icon> {{ sharepost.location }}
          <span class="delete-button" @click="openDeleteDialog('post')">删除</span>
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
      </div>
      <div class="post-stats">
        <el-button class="stat-item" @click="toggleLike(sharepost)">
          <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !sharepost.isLiked, 'icon-dianzanxuanzhong': sharepost.isLiked}"></i>
          <span>点赞</span>
          <span>{{ sharepost.likes }}</span>
          
        </el-button>
        <el-button class="stat-item" @click="toggleStar(sharepost)">
          <el-icon v-if="!sharepost.isStarred"><Star /></el-icon>
          <el-icon v-else><StarFilled /></el-icon>
          收藏
        </el-button>
        <el-button class="stat-item">
          <el-icon><ChatLineSquare /></el-icon> 评论{{ sharepost.comments }}</el-button>
        <el-button class="stat-item">
          <el-icon><Bell/></el-icon>举报
        </el-button>
      </div>

      <div class="comments-section">
        <div class="my-comment">
          <img :src="sharepost.avatar" alt="avatar" class="avatar">
          <textarea v-model="comment" placeholder="发表你的评论"></textarea>
          <el-button type="primary" @click="submitComment" :disabled="!comment">点击提交</el-button>
        </div>

        <div v-for="comment in sharepost.comments_details" :key="comment.user_id" class="comment-item">
          <img :src="comment.avatar" alt="avatar" class="avatar">
          <div class="comment-details">
            <div class="one-comment">
              <div class="comment-info">
                <div class="comment-header">
                  <span class="comment-username">{{ comment.username }}</span>
                </div>
                <div class="comment-content">{{ comment.content }}</div>
                <div class="comment-footer">
                  <span class="timestamp">{{ comment.timestamp }}</span>
                  <span class="location">IP: {{ comment.location }}</span>
                  <span type="text" class="delete-comment-button" @click="openDeleteDialog('comment', comment)">删除</span>
                </div>
              </div>
              <div class="comment-stats">
                <span class="stat-item" @click="toggleLike(comment)">
                  <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !comment.isLiked, 'icon-dianzanxuanzhong': comment.isLiked}"></i>{{ comment.likes }}
                </span>
                <span class="stat-item"><el-icon><ChatLineSquare /></el-icon> {{ comment.comments }}</span>
              </div>
            </div>
          
            <div class="replies-section">
              <div v-for="reply in comment.replies" :key="reply.user_id" class="reply-item">
                <img :src="reply.avatar" alt="avatar" class="avatar">
                <div class="reply-details">
                  <div class="reply-header">
                    <span class="comment-username">{{ reply.username }}</span>               
                  </div>
                  <div class="reply-content">{{ reply.content }}</div>
                  <div class="reply-footer">
                    <span class="timestamp">{{ reply.timestamp }}</span>
                    <span class="location">IP: {{ reply.location }}</span>
                    <span type="text" class="delete-comment-button" @click="openDeleteDialog('reply', reply, comment)">删除</span>
                  </div>
                </div>
                <div class="comment-stats">
                  <span class="stat-item" @click="toggleLike(reply)">
                    <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !reply.isLiked, 'icon-dianzanxuanzhong': reply.isLiked}"></i>{{ reply.likes }}
                  </span>
                  <span class="stat-item"><el-icon><ChatLineSquare /></el-icon> {{ reply.comments }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <div v-else>加载中......</div>
  </el-card>
</template>

<script>
export default {
  name: 'ShareForumDetail',
  props: ['sharepostID'],
  data() {
    return {
      dialogVisible: false,
      deleteDialogVisible: false, // 控制删除弹窗显示
      currentImage: '',
      currentIndex: 0,
      isStarSolid: true,
      value: '',
      comment: '',
      deleteMessage: '', // 删除确认消息
      deleteType: '', // 删除类型（帖子或评论）
      deleteComment: null, // 要删除的评论
      deleteReply: null, // 要删除的回复
      parentComment: null // 回复的父评论
    };
  },
  computed: {
    sharepost() {
      const sharePostID = this.sharepostID;
      return this.$store.state.post.shareposts.find(sharepost => sharepost.post_id === parseInt(sharePostID));
    },
    imageRows() {
      if (!this.sharepost || !this.sharepost.post_images) return [];
      let rows = [];
      for (let i = 0; i < this.sharepost.post_images.length; i += 3) {
        rows.push(this.sharepost.post_images.slice(i, i + 3));
      }
      return rows;
    },
    imageClass() {
      if (!this.sharepost || !this.sharepost.post_images) return '';
      let className = '';
      if (this.sharepost.post_images.length === 1) {
        className = 'image-one';
      } else if (this.sharepost.post_images.length === 2) {
        className = 'image-two';
      } else {
        className = 'image-multiple';
      }
      return className;
    },
    allImages() {
      return this.sharepost ? this.sharepost.post_images : [];
    }
  },
  methods: {
    showImage(image) {
      this.currentIndex = this.allImages.indexOf(image);
      this.currentImage = image;
      this.dialogVisible = true;
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.allImages.length - 1;
      }
      this.currentImage = this.allImages[this.currentIndex];
    },
    nextImage() {
      if (this.currentIndex < this.allImages.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.currentImage = this.allImages[this.currentIndex];
    },
    toggleLike(sharepost) {
      sharepost.isLiked = !sharepost.isLiked;
      sharepost.likes = sharepost.isLiked ? sharepost.likes + 1 : sharepost.likes - 1;
    },
    toggleStar(sharepost) {
      sharepost.isStarred = !sharepost.isStarred;
    },
    goBackToForumView() {
      this.$router.push({ path: `/home/forum` });
    },
    openDeleteDialog(type, item = null, parentComment = null) {
      this.deleteType = type;
      if (type === 'reply') {
        this.deleteReply = item;
        this.parentComment = parentComment;
      } else {
        this.deleteComment = item;
      }
      this.deleteMessage = type === 'post' ? '您是否确认删除这条帖子？' : (type === 'comment' ? '您是否确认删除这条评论？' : '您是否确认删除这条回复？');
      this.deleteDialogVisible = true;
    },
    confirmDelete() {
      if (this.deleteType === 'post') {
        // 这里处理帖子删除操作
      } else if (this.deleteType === 'comment' && this.deleteComment) {
        const index = this.sharepost.comments_details.indexOf(this.deleteComment);
        if (index !== -1) {
          this.sharepost.comments_details.splice(index, 1);
        }
      } else if (this.deleteType === 'reply' && this.deleteReply && this.parentComment) {
        const index = this.parentComment.replies.indexOf(this.deleteReply);
        if (index !== -1) {
          this.parentComment.replies.splice(index, 1);
        }
      }
      this.deleteDialogVisible = false;
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    },
    submitComment() {
      if (this.comment.trim() !== '') {
        const newComment = {
          avatar: this.sharepost.avatar,
          username: 'fby', // 假设当前用户的用户名
          user_id: 56, // 随便起了一个ID
          timestamp: new Date().toLocaleString(),
          location: '上海', // 假设当前用户的位置
          content: this.comment,
          likes: 0,
          comments: 0,
          replies: []
        };
        this.sharepost.comments_details.push(newComment);
        this.comments += 1;
        this.comment = ''; // 清空输入框
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
}
.post-title {
  margin-bottom: 10px;
  margin-top: 10px;
}
.post-text {
  margin-top: 7px;
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

.image-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.image-row img {
  margin-right: 20px;
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
.image-dialog {

  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 60%; /* 确保容器的高度填满父元素 */
}
.image-dialog img {
  max-width: 75%; /* 最宽为容器宽度的75% */
  max-height: 50%; /* 高度不超过容器高度 */
  width: auto; /* 宽度自适应 */
  height: auto; /* 高度自适应 */
}

.post-item {
  margin-bottom: 20px;
  width: 100%;
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
.comment-stats{
  display: flex;
  gap:30px;
  justify-content: flex-end;
  cursor: pointer;
}
.post-stats {
  margin-top:20px ;
  display: flex;
  align-items:center;
  gap:150px;
  justify-content: space-between;
  width: 300px;
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
  color: rgb(15, 130, 218);
  cursor: pointer;
  margin-left: 15px; /* 调整位置 */
}

.delete-button:hover {
  text-decoration: underline;
}
.comment-username{
  color:red;
  font-size:17px;
  margin-bottom:5px ;
}

.comments-section {
  margin-top: 20px;
}

.comment-item,
.reply-item {
  display: flex;
  margin-bottom: 10px;
}

.comment-details,
.reply-details {
  flex: 1;
  margin-left: 10px;
}
.one-comment{
  display: flex;
  justify-content: space-between;
}
.comment-header,
.reply-header {
  display: flex;
  flex-direction: column;
}
.location,
.timestamp{
  margin-right:20px;
  color:grey;
  font-size:14px;
}
.comment-content,
.reply-content {
  margin-top: 5px;
}

.comment-footer,
.reply-footer {
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  gap:30px;
  color:grey;
  font-size: 14px;

}


.delete-comment-button {
  color: red;
}

.my-comment{
  display: flex;
  justify-content: flex-end; /* 将子元素水平对齐到右边 */
  align-items: flex-start; /* 将子元素垂直对齐到底部 */
  margin-top: 20px;
  margin-bottom: 20px;
}

.my-comment textarea{
  flex: 1;
  height: 80px;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  resize: none;
}
.my-comment el-button{
  height: 40px;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end; /* 将按钮垂直对齐到容器底部 */
}
.my-comment el-button:hover{
  background-color: #66b1ff;
}
</style>

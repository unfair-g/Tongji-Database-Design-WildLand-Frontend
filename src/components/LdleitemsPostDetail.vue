<template>
  <el-card class="post-container">
    <div v-if="ldleitemsPost">
      <div class="post-header">
        <img :src="ldleitemsPost.avatar" alt="avatar" class="avatar">
        <div class="post-header-info">
          <span class="username">{{ ldleitemsPost.username }}</span>
        </div>
        <el-button @click="goBackToForumView" class="close-button">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>
      <div class="post-details" style="display:flex;">
        <div class="details-text" style="flex:1;">
          <span class="time">发布时间：{{ ldleitemsPost.time }}</span>
          <h1 class="item-name">{{ ldleitemsPost.item_name }}</h1>
          <span class="item-summary">商品简介: {{ ldleitemsPost.item_summary }}</span>
          <span class="item-condition">商品新旧程度：{{ ldleitemsPost.condition }}</span>
        </div>

        <div class="post-visible-states">
          <el-select
            v-model="value"
            placeholder="修改帖子可见状态"
            size="small"
            class="visibility-select"
          >
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>
      </div>
      <div style="padding-top:20px;margin-bottom:20px;"><el-icon><Location/></el-icon>上海市/嘉定区/同济大学</div>
      <div class="post-content">
        <el-dialog
          v-model="dialogVisible"
          width="80%"
          :show-close="true"
        >
        </el-dialog>
        <el-dialog
          v-model="deleteDialogVisible"
          title="确认删除"
          width="30%"
        >
          <span>{{ deleteMessage }}</span>
          <template v-slot:footer>
            <el-button @click="cancelDelete">否</el-button>
            <el-button type="primary" @click="confirmDelete">是</el-button>
          </template>
        </el-dialog>
      </div>

      <div class="image-gallery">
        <img v-for="(image, index) in ldleitemsPost.item_images" :key="index" :src="image" class="gallery-image">
      </div>  

      <div class="post-stats">
        <el-button class="stat-item" @click="toggleLike(ldleitemsPost)">
          <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !ldleitemsPost.isLiked, 'icon-dianzanxuanzhong': ldleitemsPost.isLiked}"></i>
          <span>点赞</span>
          <span>{{ ldleitemsPost.likes }}</span>
        </el-button>
        <el-button class="stat-item" @click="toggleStar(ldleitemsPost)">
          <el-icon v-if="!ldleitemsPost.isStarred"><Star /></el-icon>
          <el-icon v-else><StarFilled /></el-icon>
          收藏
        </el-button>
        <el-button class="stat-item">
          <el-icon><ChatLineSquare /></el-icon> 评论{{ ldleitemsPost.comments }}
        </el-button>
        <el-button class="stat-item">
          <el-icon><Bell/></el-icon>举报
        </el-button>
      </div>


      <div class="dashed-line"></div>
      <div class="action-buttons">
        <el-button class="pay" @click="Rent_Success()">立即租赁</el-button>
      </div>

    </div>
    <div v-else>加载中......</div>
  </el-card>

  <!--发布成功-->
<el-dialog 
  v-model="RentSuccess"
  width="40%"
  height="40%"
  v-if="RentSuccess">
    <div class="bg">
      <div class="bg-container">
        <div class="success-container">
          <div class="borrow">
            <el-icon color="green" size="160"><SuccessFilled/></el-icon>
            <div style="font-size:x-large;margin-top:20px;text-align:center;margin-bottom:20px;">租赁成功</div>
          </div>
          <div class="success">
            <el-button type="text" class="Pbutton" @click="GoToOrder(product)">查看订单</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'ldleitemsPost',
  props: ['ldleitemsPostID'],
  data() {
    return {
      dialogVisible: false,
      deleteDialogVisible: false,
      currentImage: '',
      currentIndex: 0,
      isStarSolid: true,
      value: '',
      comment: '',
      deleteMessage: '',
      deleteType: '',
      deleteComment: null,
      deleteReply: null,
      parentComment: null,
      options: [
        { label: '仅自己可见', value: '仅自己可见' },
        { label: '所有人可见', value: '所有人可见' }
      ],
      RentSuccess:false
    };
  },
  computed: {
    ldleitemsPost() {
      const ldleitemsPostID = this.ldleitemsPostID;
      return this.$store.state.post.ldleitemsposts.find(ldleitemsPost => ldleitemsPost.post_id === parseInt(ldleitemsPostID));
    }
  },
  methods: {
    toggleLike(ldleitemsPost) {
      ldleitemsPost.isLiked = !ldleitemsPost.isLiked;
      ldleitemsPost.likes = ldleitemsPost.isLiked ? ldleitemsPost.likes + 1 : ldleitemsPost.likes - 1;
    },
    toggleStar(ldleitemsPost) {
      ldleitemsPost.isStarred = !ldleitemsPost.isStarred;
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
        const index = this.ldleitemsPost.comments_details.indexOf(this.deleteComment);
        if (index !== -1) {
          this.ldleitemsPost.comments_details.splice(index, 1);
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
    addComment(newComment) {
      this.ldleitemsPost.comments_details.push(newComment);
      this.ldleitemsPost.comments += 1;
    },
    addReply({ parentComment, reply }) {
      const comment = this.ldleitemsPost.comments_details.find(c => c.comment_id === parentComment.comment_id);
      if (comment) {
        comment.replies.push(reply);
      }
    },
    Rent_Success(){
      this.RentSuccess=true;
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

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.post-header-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.username {
  font-weight: bold;
  margin-right: 20px;
}

.close-button {
  width: 20px;
  margin-right:-30px;
  margin-top:-60px;
}

.post-details {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position:relative;
}

.details-text {
  display: flex;
  flex-direction: column;
  padding-right: 20px; 
  flex:1;
  font-weight:bold;
  font-size:larger;
}

.item-image {
  width: 250px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  position:absolute;
  right:30px;
  top:-35px;
}

.time {
  color: darkgrey;
}

.item-name {
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
}

.item-summary,
.item-condition {
  font-size: 14px;
  margin-top: 5px;
}

.post-visible-states {
  display: flex;
  justify-content: flex-end;
  margin-top: -45px;
  margin-right:30px;
}

.visibility-select {
  width: 240px;
}

.post-stats {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 30px; /* 增加按钮之间的间隔 */
  justify-content: flex-start;
  width: 100%; /* 调整宽度以适应新的间隔 */
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  cursor: pointer;
  background-color: #fff !important;
  color: #1D5B5E !important;
  border-color: #1D5B5E !important;
  margin-left:80px;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  margin-left:50px;
}

.gallery-image {
  width: 30%; /* 每张图片占据父容器的30%宽度 */
  max-width: 250px; /* 设置最大宽度，防止图片过大 */
  height: auto;
  border-radius: 8px;
  margin: 10px;
  object-fit: cover;
  border:1px solid #1D5B5E;
}

.dashed-line {
  border-top: 2px dashed #1D5B5E;
  margin: 30px 0; /* 上下增加一些间距 */
}

.action-buttons {
  display: flex;
  margin-top: 20px; /* 增加与上面按钮的间距 */
  justify-content: flex-start;
  gap: 280px; /* 增加按钮之间的间隔 */
  justify-content: center;
}

.pay {
  font-size: 28px;
  cursor: pointer;
  background-color: #1D5B5E !important;
  color: #fff !important;
  border-color: #fff !important;
}

.el-button:active {
  background-color: #1e4040 !important;
  color: #fff !important;
  border-color: #1e4040 !important;
}

.comments-section {
  margin-top: 20px;
}

.bg-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-container {
  background-color: white;
  padding: 40px;
  margin:0px;
  border-radius: 10px;
  text-align: center;
  max-width: 600px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position:relative;
}

.borrow {
  flex: 1;
  margin-top:30px;
}

.success {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: inline-block;
  background-color: #1D5B5E;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom:20px;
}

.Pbutton {
  float: center;
  color:#ddd;
}

</style>

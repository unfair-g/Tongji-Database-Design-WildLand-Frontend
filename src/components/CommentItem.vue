<template>
  <div>
    <div class="comment-item">
      <img :src="this.localComment.portrait" alt="avatar" class="avatar">
      <div class="comment-details">
        <div class="one-comment">
          <div class="comment-info">
            <div class="comment-header">
              <span class="comment-username">{{ this.localComment.author_name }}</span>
              <span v-if="isReply" class="comment-username">回复</span>
              <span v-if="isReply" class="comment-username">{{ this.localComment.reply_name }}</span>
            </div>
            <div class="comment-content">{{ this.localComment.content }}</div>
            <div class="comment-footer">
              <span class="timestamp">{{ this.localComment.comment_time }}</span>
              <span v-if="isCommentOwner" type="text" class="delete-comment-button" @click="openDeleteDialog">删除</span>
              <span v-if="!isCommentOwner" type="text" class="delete-comment-button" @click="goToReportPostWindow"><el-icon><Bell/></el-icon>举报</span>
            </div>
          </div>
          <div class="comment-stats">
             <span class="stat-item" @click="toggleLike">
              <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !this.localComment.isLiked, 'icon-dianzanxuanzhong': this.localComment.isLiked}"></i>{{ this.localComment.likes_number }}
            </span>
            <span class="stat-item" @click="toggleReplyInput">
              <el-icon><ChatLineSquare /></el-icon>
            </span>
          </div>

        </div>
       
        <!-- 根据 showReplyInput 的值控制显示与隐藏 -->
        <div v-if="showReplyInput" class="reply-input">
          <CommentInput
            v-model:commentContent="replyContent"
            :postID="this.localPostId"
            :parentCommentId="this.localComment.comment_id"
            @comment-submitted="hideReplyInput"
          />
        </div>
      </div>
    </div>
    <!-- 删除确认对话框 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="确认删除"
      width="30%"
    >
      <span>{{'您是否确认删除这条评论'}}</span>
      <template v-slot:footer>
        <el-button @click="cancelDelete">否</el-button>
        <el-button type="primary" @click="confirmDelete">是</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import CommentInput from '@/components/CommentInput.vue';
import axios from '@/axios';
import state from '@/store/global.js';
// import { ElMessage } from 'element-plus';

export default {
  name: 'CommentItem',
  components: {
    CommentInput,

  },
  props: {
    postID: {
      type: Number,
      required: true
    },
    comment: {
      type: Object,
      required: true
    },
    isReply: {
      type: Boolean,
      required:true,
    }
  },
  data() {
    return {
      localPostId: this.postID,
      replyContent: '',
      deleteDialogVisible: false,
      isReportPostWindowVisible: false,
      localComment: { ...this.comment },
      showReplyInput: false, // 控制回复输入框显示与隐藏
    };
  },
  computed: {
    isCommentOwner() {
      return this.localComment && this.localComment.author_id === state.userId;
    }
  },
  methods: {
    toggleLike() {
      this.localComment.isLiked = !this.localComment.isLiked;
      this.localComment.likes_number = this.localComment.isLiked ? this.localComment.likes_number + 1 : this.localComment.likes_number - 1;
      axios.post('/api/LikeComments/commentlike', {
        comment_id: this.localComment.comment_id,
        user_id: state.userId
      })
      .then(response => {
        response.data.isLiked = this.localComment.isLiked;
        response.data.likesCount = this.localComment.likes_number;
      })
      .catch(error => {
        console.error('Error toggling like:', error);
        this.handleError(error, '点赞操作失败');
      });
    },
    toggleReplyInput(commentId) {
      // 如果当前显示的输入框是点击的同一个评论，则隐藏它；否则，显示对应的输入框
      this.activeReplyInputId = this.activeReplyInputId === commentId ? null : commentId;
    },
    openDeleteDialog() {

      this.deleteDialogVisible = true;
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    },
    confirmDelete() {
      // 删除评论逻辑
    },
    goToReportPostWindow() {
      this.isReportPostWindowVisible = true;

    },
    hideReplyInput() {
      this.showReplyInput = false;
      this.$emit('reply-submitted'); // 触发事件，通知父组件
      
    }
  }
};
</script>


<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
}
.comment-item {
  display: flex;
  margin-bottom: 10px;
}
.comment-details {
  flex: 1;
  margin-left: 10px;
}
.one-comment {
  display: flex;
  justify-content: space-between;
}
.comment-info {
  display: flex;
  flex-direction: column;
}
.comment-header {
  display: flex;
  flex-direction: start;
}
.comment-username{
  margin-right: 7px;
  color: red;
}
.location,
.timestamp {
  margin-right: 20px;
  color: grey;
  font-size: 14px;
}
.comment-content {
  margin-top: 5px;
}
.comment-footer {
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  color: grey;
  font-size: 14px;
}
.delete-comment-button {
  color: red;
}
.comment-stats {
  display: flex;
  gap: 30px;
  justify-content: flex-end;
  cursor: pointer;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  cursor: pointer;

}
.replies-section {
  margin-left: 50px;
}
</style>
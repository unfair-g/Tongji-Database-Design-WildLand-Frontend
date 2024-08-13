<template>
  <div>
    <div v-for="comment in comments.filter(comment => comment.parent_comment_id === null)" :key="comment.comment_id" class="comment-item">
      <img :src="comment.portrait" alt="avatar" class="avatar">
      <div class="comment-details">
        <div class="one-comment">
          <div class="comment-info">
            <div class="comment-header">
              <span class="comment-username">{{ comment.author_name }}</span>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
            <div class="comment-footer">
              <span class="timestamp">{{ comment.comment_time }}</span>
              <span v-if="isCommentOwner" type="text" class="delete-comment-button" @click="openDeleteDialog">删除</span>
            </div>
          </div>
          <div class="comment-stats">
            <span class="stat-item" @click="toggleLike(comment)">
              <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !comment.isLiked, 'icon-dianzanxuanzhong': comment.isLiked}"></i>{{ comment.likes_number }}
            </span>
            <span class="stat-item" @click="toggleReplyInput">
              <el-icon><ChatLineSquare /></el-icon> {{ getReplies(comment.comment_id).length }}
            </span>
          </div>
          
        </div>
        <div v-if="showReplyInput" class="reply-input">
            <CommentInput
              v-model:commentContent="replyContent"
              :postId="this.postID"
              :parentCommentId="comment.comment_id"
            />
        </div>
        
        <div v-if="getReplies(comment.comment_id).length > 0" class="replies-section">
          <div v-for="reply in getReplies(comment.comment_id)" :key="reply.comment_id" >
            <div class="comment-item reply">
              <img :src="reply.portrait" alt="avatar" class="avatar">
              <div class="comment-details">
                <div class="one-comment">
                  <div class="comment-info">
                    <div class="comment-header">
                      <span class="comment-username">{{ subReply.author_name }}</span>
                      <span class="comment-username">回复</span>
                      <span class="comment-username">{{ subReply.reply_name }}</span>
                    </div>
                    <div class="comment-content">{{ reply.content }}</div>
                    <div class="comment-footer">
                      <span class="timestamp">{{ reply.comment_time }}</span>
                      <span v-if="isCommentOwner" type="text" class="delete-comment-button" @click="openDeleteDialog(reply)">删除</span>
                    </div>
                  </div><!-- end of comment-info -->
                  <div class="comment-stats">
                    <span class="stat-item" @click="toggleLike(reply)">
                      <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !reply.isLiked, 'icon-dianzanxuanzhong': reply.isLiked}"></i>{{ reply.likes_number }}
                    </span>
                    <span class="stat-item" @click="toggleReplyInput">
                      <el-icon><ChatLineSquare /></el-icon> {{getReplies(reply.comment_id).length}}
                    </span>
                  </div><!-- end of comment-stats -->
                </div><!-- end of one-comment -->
              </div><!-- end of comment-details -->

            </div><!-- end of comment-item reply -->
            
            <div v-if="showReplyInput" class="reply-input">
              <CommentInput
                v-model:commentContent="replyContent"
                :postId="this.postID"
                :parentCommentId="reply.comment_id"
              />
            </div>
            
            <div v-if="getReplies(reply.comment_id).length > 0" class="replies-section">
              <div v-for="subReply in getReplies(reply.comment_id)" :key="subReply.comment_id">
                <div class="comment-item sub-reply">
                  <img :src="subReply.portrait" alt="avatar" class="avatar">
                  <div class="comment-details">
                    <div class="one-comment">
                      <div class="comment-info">
                        <div class="comment-header">
                          <span class="comment-username">{{ subReply.author_name }}</span>
                          <span class="comment-username">回复</span>
                          <span class="comment-username">{{ subReply.reply_name }}</span>
                        </div>
                        <div class="comment-content">{{ subReply.content }}</div>
                        <div class="comment-footer">
                          <span class="timestamp">{{ subReply.comment_time }}</span>
                          <span v-if="isCommentOwner" type="text" class="delete-comment-button" @click="openDeleteDialog(subReply)">删除</span>
                        </div>
                      </div><!-- end of comment-info -->
                      <div class="comment-stats">
                        <span class="stat-item" @click="toggleLike(subReply)">
                          <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !subReply.isLiked, 'icon-dianzanxuanzhong': subReply.isLiked}"></i>{{ subReply.likes_number }}
                        </span>
                        <span class="stat-item" @click="toggleReplyInput">
                          <el-icon><ChatLineSquare /></el-icon> {{ subReply.floor_number }}
                        </span>
                      </div><!-- end of comment-stats -->
                    </div><!-- end of one-comment -->
                  </div><!-- end of comment-details -->
                </div>
                <div v-if="showReplyInput" class="reply-input">
                  <CommentInput
                    v-model:commentContent="replyContent"
                    :postId="this.postID"
                    :parentCommentId="subReply.comment_id"
                  />
                </div>
              </div><!-- end of subReply -->
            </div><!-- end of subReply -->
            
          </div><!-- end of Reply -->
        </div><!-- end of Reply -->


      </div><!-- end of root comment-details -->

      
      

    </div><!-- end of a root comment -->
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
import axios from '@/axios'; // 确保路径是正确的
import state from '@/store/global.js'; // 引入映射表
import { ElMessage } from "element-plus";

export default {
  name: 'CommentItem',
  components: {
    CommentInput
  },
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: [], // 存储所有评论
      showReplyInput: false,
      replyContent: '',
      parentComment: null,
      deleteDialogVisible:false,
    };
  },
  created() {
    this.fetchComments(); // 获取评论数据
    // this.fetchUsername();
  },
  computed:{
    isCommentOwner(comment){
      return comment && comment.author_id===state.userId;
    }
  },
  methods: {
    async fetchComments() {
      const myUserId = state.userId;
      const myPostId = this.postId;
      try {
        const response = await axios.get(`/api/Comments/GetComment/${myPostId}/${myUserId}`);
        this.comments = response.data; // 假设返回的数据结构是一个数组
        console.log('评论获取成功:',this.comments)
      } catch (error) {
        console.error('Error fetching comments:', error);
        ElMessage.error('获取评论失败');
      }
    },
    toggleLike(comment) {
      comment.isLiked = !comment.isLiked;
      comment.likes_number = comment.isLiked ? comment.likes_number + 1 : comment.likes_number - 1;
      axios.post('/api/LikeComments/commentlike', {
        comment_id: comment.comment_id,
        user_id: state.userId
      })
      .then(response => {
        response.data.isLiked=comment.isLiked;
        response.data.likesCount=comment.likes_number;
      })
      .catch(error => {
        console.error('Error toggling like:', error);
        this.handleError(error, '点赞操作失败');
      });
    },
    toggleReplyInput() {
      this.showReplyInput = !this.showReplyInput;
    },
    submitReply() {
      this.showReplyInput = false;
    },
    openDeleteDialog(parentComment = null) {
      this.parentComment = parentComment;
      this.deleteDialogVisible = true;
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    },
    confirmDelete() {
      //删除评论逻辑
    },
    getReplies(parentCommentId) {
      return this.comments.filter(comment => comment.parent_comment_id === parentCommentId) || [];
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

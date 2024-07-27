<template>
  <div>
    <div class="comment-item">
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
              <span type="text" class="delete-comment-button" @click="emitDeleteComment(comment)">删除</span>
            </div>
          </div>
          <div class="comment-stats">
            <span class="stat-item" @click="emitToggleLike(comment)">
              <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !comment.isLiked, 'icon-dianzanxuanzhong': comment.isLiked}"></i>{{ comment.likes }}
            </span>
            <span class="stat-item" @click="toggleReplyInput">
              <el-icon><ChatLineSquare /></el-icon> {{ comment.comments }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showReplyInput" class="reply-input">
      <CommentInput
        :avatar="comment.avatar"
        v-model:commentContent="replyContent"
        @submit-comment="submitReply"
      />
    </div>
    <div class="replies-section">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.user_id"
        :comment="reply"
        @delete-comment="emitDeleteReply"
        @toggle-like="emitToggleLike"
        @delete-reply="emitDeleteReply"
      />
    </div>
  </div>
</template>

<script>
import CommentInput from '@/components/CommentInput.vue';

export default {
  name: 'CommentItem',
  components: {
    CommentInput
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showReplyInput: false,
      replyContent: ''
    };
  },
  methods: {
    emitDeleteComment(comment) {
      this.$emit('delete-comment', comment);
    },
    emitDeleteReply(reply) {
      this.$emit('delete-reply', reply);
    },
    emitToggleLike(comment) {
      this.$emit('toggle-like', comment);
    },
    toggleReplyInput() {
      this.showReplyInput = !this.showReplyInput;
    },
    submitReply() {
      const newReply = {
        comment_id: new Date().toLocaleString(),
        avatar: this.comment.avatar,
        username: 'fby', // 假设当前用户的用户名
        user_id: 56, // 随便起了一个ID
        timestamp: new Date().toLocaleString(),
        location: '上海', // 假设当前用户的位置
        content: this.replyContent,
        likes: 0,
        comments: 0,
        replies: []
      };
      this.$emit('add-reply', { parentComment: this.comment, reply: newReply });
        this.replyContent = '';
        this.comments += 1;
      this.showReplyInput = false;
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
  flex-direction: column;
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

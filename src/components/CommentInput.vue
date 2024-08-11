<template>
  <div class="comment-input">
    <img :src="avatarUrl" alt="avatar" class="avatar">
    <textarea 
      v-model="localCommentContent" 
      placeholder="发表你的评论">
    </textarea>
    <el-button type="primary" @click="submitComment" :disabled="!localCommentContent">点击提交</el-button>
  </div>
</template>

<script>
import axios from '@/axios'; // 确保路径是正确的
import state from '@/store/global.js'; // 引入映射表
import { ElMessage } from "element-plus";

export default {
  name: 'CommentInput',
  props: {
    postId: {
      type: Number,
      required: true
    },
    parentCommentId: {
      type: Number,
      default: null,
      required: true
    },
    commentContent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localPostId: this.postId,
      localParentCommentId:this.parentCommentId,
      localCommentContent: this.commentContent,
      avatarUrl: '', // 新增变量
    };
  },
  watch: {
    commentContent(newVal) {
      this.localCommentContent = newVal;
    }
  },
  methods: {
    async submitComment() {
      if (this.localCommentContent.trim() !== '') {
        try {
          const response = await axios.post('/api/Comments/PushComment', {
            author_id: state.userId,
            content: this.localCommentContent,
            parent_comment_id: this.parentCommentId,
            post_id: this.postId
          });
          if (response.data.success) {
            ElMessage.success('评论提交成功'); // 添加成功提示
          }
        }catch (error) {
          this.handleError(error, '评论提交失败');
        }
        this.localCommentContent = ''; // 清空输入框
      }
    },
    async fetchData() {
      try {
        const user_id = state.userId;
        const avatarResponse = await axios.get(`/api/Users/GetUserPortrait/${user_id}`);
        this.avatarUrl = avatarResponse.data.portraitUrl;
        if (avatarResponse.data.success) {
          ElMessage.success('头像获取成功'); // 添加成功提示
        }
      } catch (error) {
        console.error('Error fetching  avatar:', error);
        this.handleError(error,'头像获取失败')
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
  },
  mounted() {
    this.fetchData(); // Ensure avatar is loaded when the component is mounted
  }
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%; /* 使头像变成圆形 */
  object-fit: cover; /* 确保图片以正确比例显示 */
}
.comment-input{
  display: flex;
  justify-content: flex-end; /* 将子元素水平对齐到右边 */
  align-items: flex-start; /* 将子元素垂直对齐到底部 */
  margin-top: 20px;
  margin-bottom: 20px;
}

.comment-input textarea{
  flex: 1;
  height: 80px;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  resize: none;
}
.comment-input el-button{
  height: 40px;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end; /* 将按钮垂直对齐到容器底部 */
}
.comment-input el-button:hover{
  background-color: #66b1ff;
}
</style>

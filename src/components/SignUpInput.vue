<template>
  <div class="signUp-input">
    <img :src="avatarUrl" alt="avatar" class="avatar">
    <textarea 
      v-model="localSignUpContent" 
      placeholder="你的申请理由">
    </textarea>
    <el-button type="primary" @click="submitSignup" :disabled="!localSignUpContent">点击提交</el-button>
  </div>
</template>

<script>
import axios from '@/axios'; // 确保路径是正确的
import state from '@/store/global.js'; // 引入映射表
import { ElMessage } from "element-plus";
export default {
  name: 'SignUpInput',
  props: {
    postID: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      localPostId: this.postID,
      localSignUpContent: this.signupContent,
      avatarUrl: '', // 头像
    };
  },
  watch: {
    signupContent(newVal) {
      this.localSignUpContent = newVal;
    }
  },
  methods: {
    async submitSignup() {
      if (this.localSignUpContent.trim() !== '') {
        try {
          const response = await axios.post(`api/Applications/create`, {
            application_number: 1,
            application_reasons: this.localSignUpContent,
            recruit_post_id: this.localPostId,
            user_id: state.userId
          });
          console.log('服务器响应:', response);
          if (response.data) {
            ElMessage.success('申请提交成功'); // 添加成功提示
            this.$emit('signup-submitted'); // 触发事件，通知父组件
          }       
        } catch (error) {
          this.handleError(error, '申请提交失败');
        }
        this.localSignUpContent = ''; // 清空输入框

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
.signUp-input{
  display: flex;
  justify-content: flex-end; /* 将子元素水平对齐到右边 */
  align-items: flex-start; /* 将子元素垂直对齐到底部 */
  margin-top: 20px;
  margin-bottom: 20px;
}

.signUp-input textarea{
  flex: 1;
  height: 80px;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  resize: none;
}
.signUp-input el-button{
  height: 40px;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end; /* 将按钮垂直对齐到容器底部 */
}
.signUp-input el-button:hover{
  background-color: #66b1ff;
}
</style>

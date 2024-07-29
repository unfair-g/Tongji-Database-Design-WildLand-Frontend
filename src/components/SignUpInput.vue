<template>
  <div class="signUp-input">
    <img :src="avatar" alt="avatar" class="avatar">
    <textarea 
      v-model="localSignUpContent" 
      placeholder="你的申请理由">
    </textarea>
    <el-button type="primary" @click="submitSignup" :disabled="!localSignUpContent">点击提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'SignUpInput',
  props: {
    avatar: {
      type: String,
      required: true
    },
    signupContent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localSignUpContent: this.signupContent
    };
  },
  watch: {
    signupContent(newVal) {
      this.localSignUpContent = newVal;
    }
  },
  methods: {
    submitSignup() {
      if (this.localSignUpContent.trim() !== '') {
        const newSignUp = {
          comment_id: new Date().toLocaleString(),
          avatar: this.avatar,
          username: 'fby', // 假设当前用户的用户名
          user_id: 56, // 随便起了一个ID
          timestamp: new Date().toLocaleString(),
          location: '上海', // 假设当前用户的位置
          content: this.localSignUpContent,
          likes: 0,
          comments: 0,
          replies: []
        };
        this.$emit('submit-signup', newSignUp);
        this.localSignUpContent = ''; // 清空输入框
        this.$emit('update:signupContent', ''); // 更新父组件中的 signupContent
      }
    }
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

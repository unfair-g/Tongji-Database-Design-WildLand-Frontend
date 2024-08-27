<template>
  <el-card>
    <div class="signup-item">
      <img :src="signup.portrait" alt="avatar" class="avatar" @click="goToUserSpace(this.localSignup.user_id)">
      <div class="signup-details">
        <div class="one-signup">
          <div class="signup-info">
            <div class="signup-header">
              <span class="signup-username" @click="goToUserSpace(this.localSignup.user_id)">{{ this.localSignup.user_name }}</span>
            </div>
            <div class="signup-content">{{ this.localSignup.application_reasons }}</div>
            <div class="signup-footer">
              <span class="timestamp">{{ this.localSignup.application_time }}</span>
            </div>
            <div v-if="isPostOwner" >
              <div v-if="!isPending" class="ownerChoice">
                <el-button color="rgb(232, 225, 225)" @click="reviewSignup(0)">
                  拒绝申请
                </el-button>
                <el-button color="#1D5B5E" @click="reviewSignup(1)">
                  招募通过
                </el-button>
              </div>
              <div v-if="isPending" class="ownerChoice">
                <el-button color="#1D5B5E" @click="reviewSignup(2)">
                  撤销当前审核状态
                </el-button>
              </div>
              <div>
                <span v-if="this.localSignup.review_status === 0" class="review-condition">已拒绝该人的申请</span>
                <span v-if="this.localSignup.review_status === 1" class="review-condition">已通过该人的申请</span>
                <span v-if="this.localSignup.review_status === 2" class="review-condition">未审核该人的申请</span>
              </div>
            </div>
            <div v-if="!isPostOwner" class="review-status">
              <span type="text" class="review-condition" >报名进度：</span>
              <span v-if="this.localSignup.review_status === 2" type="text" class="review-condition" >尚未审核</span>
              <span v-if="this.localSignup.review_status === 1" type="text" class="review-condition" >报名通过</span>
              <span v-if="this.localSignup.review_status === 0" type="text" class="review-condition" >拒绝参加</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </el-card>
</template>

<script>
import axios from '@/axios';
import state from '@/store/global.js';
import { ElMessage } from 'element-plus';

export default {
  name: 'SignUpItem',

  props: {
    postID: {
      type: Number,
      required:true
    },
    signup: {
      type: Object,
      required:true
    },
    isPostOwner: {
      type: Boolean,
      required:true,
    },
    planned_count: {
      type: Number,
      required:true
    },
    current_count: {
      type: Number,
      required:true
    },
  },
  data() {
    return {
      localPostId: this.postID,
      localSignup: { ...this.signup },
      isPending: this.signup.review_status !== 2, // 是否显示撤销按钮
    };
  },
  methods: {
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
    reviewSignup(review_status) {
      if (review_status === 1 && this.current_count >= this.planned_count) {
        ElMessage.warning('报名人数已满，不能再通过更多申请');
        return;
      }
      axios.put(`api/Applications/UpdateReviewStatus/${this.localSignup.application_id}/${review_status}`)
      .then(response => {
        if (response.data !== null) {
          console.log('报名审核状态修改成功',review_status);
          this.localSignup.review_status = review_status;
          this.isPending = this.localSignup.review_status !== 2;
          this.$emit('change-signup');
          }
        })
      .catch(error => {
          this.handleError(error, '报名审核状态改变失败');
      })
      
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
.signup-item {
  display: flex;
  margin-bottom: 10px;
}
.signup-details {
  flex: 1;
  margin-left: 10px;
}
.one-signup {
  display: flex;
  justify-content: space-between;
}
.signup-info {
  display: flex;
  flex-direction: column;
}
.signup-header {
  display: flex;
  flex-direction: column;
}
.location,
.timestamp {
  margin-right: 20px;
  color: grey;
  font-size: 14px;
}
.signup-content {
  margin-top: 5px;
}
.signup-footer {
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  color: rgb(232, 225, 225);
  font-size: 14px;
}
.review-condition,
.signup-username {
  color: red;
  margin-top: 10px;
}
.ownerChoice{
  margin-bottom: 10px;
}

</style>
<template>
  <div class="post-detail-wrapper">
    <div class="post-detail-box">
      <div class="post-detail-header">
        帖子审核
        <el-icon @click="closeDetail">
          <Close />
        </el-icon>
      </div>
      <hr />
      <div class="post-detail-content">
        <div class="post-info">
          <div class="post-title">帖子标题: <span class="post-content">{{ postTitle }}</span></div>
          <div class="post-category">
            帖子类别: 
            <span class="post-type" :class="{'active': postType === '分享贴'}">分享贴</span>
            <span class="post-type" :class="{'active': postType === '招募贴'}">招募贴</span>
            <span class="post-type" :class="{'active': postType === '闲置贴'}">闲置贴</span>
          </div>
          <div class="post-body">帖子内容: <span class="post-content post-body-content">{{ postContent }}</span></div>
          <div class="post-publisher">发布者名称: <span class="post-content">{{ publisherName }}</span></div>
          <div class="review-opinion">审核意见:</div>
          <div class="actions">
            <el-button :class="{selected: !rejectSelected}" @click="approvePost">允许发布</el-button>
            <el-button :class="{selected: rejectSelected}" @click="selectReject">驳回修改</el-button>
          </div>
          <div v-if="rejectSelected" class="reject-reason">
            <div class="post-content">驳回原因:</div>
            <textarea v-model="rejectReason" placeholder="填写驳回原因" class="post-content"></textarea>
          </div>
        </div>
        <el-button class="confirm-button" @click="confirmAction">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const closeDetail = () => {
      router.push({ name: 'PostAudit' })
    }

    const postTitle = ref('示例标题')
    const postType = ref('分享贴') // 帖子类型：分享贴，招募贴，闲置贴
    const postContent = ref('这是帖子内容。如果内容过长，可以用滚动条拖动。')
    const publisherName = ref('发布者名称')
    const publisherId = ref('发布者ID')

    const rejectSelected = ref(false)
    const rejectReason = ref('')

    const selectReject = () => {
      rejectSelected.value = true
    }

    const approvePost = () => {
      rejectSelected.value = false
      // 执行允许发布的操作
    }

    const confirmAction = () => {
      if (rejectSelected.value) {
        console.log('驳回原因:', rejectReason.value)
      } else {
        console.log('允许发布')
      }
      router.push({ name: 'PostAudit' })
    }

    return {
      closeDetail,
      postTitle,
      postType,
      postContent,
      publisherName,
      publisherId,
      rejectSelected,
      rejectReason,
      selectReject,
      approvePost,
      confirmAction
    }
  },
  components: {
    Close
  }
}
</script>

<style scoped>
.post-detail-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.post-detail-box {
  width: 85%;
  height: 85%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 2px solid #1D5B5E;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* 防止内容溢出 */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  margin-bottom: 10px;
}

.post-detail-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  padding-bottom: 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-title,
.post-category,
.post-body,
.post-publisher,
.review-opinion {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 40px; /* Add more indentation */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-content {
  font-size: 18px;
  font-weight: normal;
}

.post-category .post-type {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: #FEFFFF;
  border: 1px solid black;
}

.post-category .post-type.active {
  background-color: #1D5B5E;
  color: white;
  border: none;
}

.post-body-content {
  display: inline-block;
  padding: 10px;
  border: 1px solid #1D5B5E;
  border-radius: 5px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-left: 40px; /* Add more indentation */
}

.actions .el-button {
  background-color: #1D5B5E;
  color: white;
  opacity: 0.5;
}

.actions .el-button.selected {
  opacity: 1;
}

.reject-reason {
  margin-top: 10px;
  width: 100%;
  padding-left: 40px; /* Add more indentation */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.reject-reason div {
  margin-bottom: 10px;
}

.reject-reason textarea {
  width: 70%; /* Adjust width */
  height: 80px; /* Adjust height */
  border: 1px solid #1D5B5E;
  border-radius: 5px;
  padding: 10px;
  resize: none; /* Remove default scrollbar */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.confirm-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #1D5B5E;
  color: white;
}
</style>

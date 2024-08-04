<template>
  <div class="post-detail-wrapper">
    <div class="post-detail-box">
      <div class="post-detail-header">
        举报内容
        <el-icon @click="closeDetail">
          <Close />
        </el-icon>
      </div>
      <hr />
      <div v-if="postReportDetail" class="post-detail-content">
        <div class="post-info">
          <div class="post-title">帖子标题: <span class="post-content">{{ postReportDetail.postTitle }}</span></div>
          <div class="post-category">
            帖子类别: 
            <span class="post-type" :class="{'active': postReportDetail.postType === '分享贴'}">分享贴</span>
            <span class="post-type" :class="{'active': postReportDetail.postType === '招募贴'}">招募贴</span>
            <span class="post-type" :class="{'active': postReportDetail.postType === '闲置贴'}">闲置贴</span>
          </div>
          <div class="post-body">帖子内容: <span class="post-content post-body-content">{{ postReportDetail.postContent }}</span></div>
          <div class="post-publisher">发布者名称: <span class="post-content">{{ postReportDetail.publisherName }}</span></div>
          <div class="post-body">举报原因: <span class="post-content post-body-content">{{ postReportDetail.ReportReason }}</span></div>
          <div class="post-body">举报状态: <span class="post-content post-body-content">{{ postReportDetail.state }}</span></div>
        </div>
        <el-button class="confirm-button" @click="confirmAction">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Close } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const closeDetail = () => {
      router.push({ name: 'ReportReview' })
    }

    return {
      closeDetail
    }
  },
  computed: {
    ...mapState('admin', ['postReportDetail'])
  },
  created() {
    this.fetchPostReportDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions('admin', ['fetchPostReportDetail']),
    confirmAction() {
      console.log('举报处理完成')
      this.$router.push({ name: 'ReportReview' })
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
  overflow: hidden;
  box-sizing: border-box;
}

.post-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px; /* Updated font size */
  margin-bottom: 10px;
}

hr {
  margin: 10px 0;
}

.post-detail-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.post-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.post-title,
.post-category,
.post-body,
.post-publisher {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 40px;
  box-sizing: border-box;
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

.confirm-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #1D5B5E;
  color: white;
}
</style>

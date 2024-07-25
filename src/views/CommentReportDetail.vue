<template>
  <div class="comment-report-wrapper">
    <div class="report-detail-box">
      <div class="report-detail-header">
        举报内容
        <el-icon @click="closeDetail">
          <Close />
        </el-icon>
      </div>
      <hr />
      <div v-if="commentReportDetail" class="report-detail-content">
        <div class="report-info">
          <div class="report-comment-content">
            评论内容:
            <textarea v-model="commentReportDetail.commentContent" class="report-textarea" readonly></textarea>
          </div>
          <div class="report-commenter-name">
            评论者名称: <span class="report-content">{{ commentReportDetail.commenterName }}</span>
          </div>
          <div class="report-reason">
            举报原因:
            <textarea v-model="commentReportDetail.ReportReason" class="report-textarea" readonly></textarea>
          </div>
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
      router.push({ name: 'ReportReview', query: { selectedOption: 'comments' } })
    }

    return {
      closeDetail
    }
  },
  computed: {
    ...mapState('admin', ['commentReportDetail'])
  },
  created() {
    this.fetchCommentReportDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions('admin', ['fetchCommentReportDetail']),
    confirmAction() {
      console.log('举报处理完成')
      this.$router.push({ name: 'ReportReview', query: { selectedOption: 'comments' } })
    }
  },
  components: {
    Close
  }
}
</script>

<style scoped>
.comment-report-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.report-detail-box {
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

.report-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  margin-bottom: 10px;
}

hr {
  margin: 10px 0;
}

.report-detail-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.report-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.report-comment-content,
.report-reason {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 40px;
  box-sizing: border-box;
}

.report-comment-content,
.report-reason {
  display: flex;
  align-items: center;
}

.report-comment-content textarea,
.report-reason textarea {
  margin-left: 10px;
  width: calc(100% - 150px); /* Adjust as needed */
  height: 80px;
  border: 1px solid #1D5B5E;
  border-radius: 5px;
  padding: 10px;
  resize: none;
  box-sizing: border-box;
  font-size: 18px;
  background-color: #f5f5f5;
}

.report-commenter-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 40px;
  box-sizing: border-box;
}

.confirm-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #1D5B5E;
  color: white;
}
</style>

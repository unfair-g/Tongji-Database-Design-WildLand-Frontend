<template>
  <el-dialog
    :title="dialogTitle"
    v-model="localIsReportDialogVisible"
    width="55%"
    center
    @close="handleClose"
  >
    <div class="report-container">
      <el-divider></el-divider>
      <div class="report-info-form">
        <el-form :model="reportForm" ref="reportForm" @submit.prevent="submitForm" label-width="150px">
         
          <el-form-item label="举报原因：" prop="reportReason" style="font-weight: bold;">
            <el-input
              type="textarea"
              v-model="reportForm.reportReason"
              placeholder="请输入你的举报原因"
              rows=5
            />
          </el-form-item>
         
          <el-form-item class="buttons">
            <el-button type="default" @click="handleClose">取消</el-button>
            <el-button type="primary" color="#1D5B5E" native-type="submit">确认举报</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import axios from '@/axios'; // 确保路径是正确的
import state from '@/store/global.js'; // 引入映射表
import { ElMessage } from 'element-plus';

export default {
  name: 'ReportWindow',
  props: {
    isReportDialogVisible: {
      type: Boolean,
      default: false,
    },
    reportID: {
      type: Number,
      required:true,
    },
    isReportPost: {
      type: Boolean,
      required: true, // true->"post" 或 false->"comment"
    },

  },
  data() {
    return {
      localIsReportDialogVisible: this.isReportDialogVisible,
      reportForm: {
        reportReason: '',
      }

    };
  },
  computed: {
    dialogTitle() {
      return this.isReportPost ? '举报帖子' : '举报评论';
    },
  },
  watch: {
    isReportDialogVisible(newVal) {
      this.localIsReportDialogVisible = newVal;
    },

    localIsReportDialogVisible(newVal) {
      this.$emit('update:isReportDialogVisible', newVal);
    }
  },
  methods: {
    async submitForm() {
      if (!this.reportForm.reportReason.trim()) {
        ElMessage.error('请输入你的举报理由，不能为空');
        return;
      }
      const userId = state.userId;
      try {
        let response;
        console.log("提交的数据：", {
          reportID: this.reportID,
          user_id: userId,
          report_reason: this.reportForm.reportReason
        });
        if (this.isReportPost) {
          response = await axios.post(`/api/PostReports/pushreportpost`, {
            post_id: this.reportID,
            user_id: userId,
            report_reason: this.reportForm.reportReason,
          });
      
        } else {
          response = await axios.post(`/api/CommentReports/pushcommentreport`, {
            comment_id: this.reportID,
            user_id: userId,
            report_reason: this.reportForm.reportReason,
          });
        }
        if (response && response.data != null) {
          ElMessage.success('成功提交举报，请等待审核');
        }
        else {
          ElMessage.error('举报提交失败，请稍后再试');
        }
      } catch (error) {
        console.error('举报失败:', error);
        ElMessage.error('举报提交失败，请稍后再试');
      }
      this.handleClose();

      console.log('Form submitted:', this.reportForm);
    },
    resetForm() {
      this.reportForm = {
        reportReason: '',
      };
    },
    handleClose() {
      this.resetForm();
      this.localIsReportDialogVisible = false;
    },
    
  }
};
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.el-divider {
  height: 1px;
  background-color: grey; /* 分界线颜色 */
  margin: 20px 0; /* 上下间距 */
  width: 100%;
}
.report-info-form {
  margin-top: 2px;
}
</style>

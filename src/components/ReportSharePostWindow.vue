<template>
  <el-dialog
    title="举报帖子"
    v-model="localIsShareReportDialogVisible"
    width="55%"
    center
    @close="handleClose"
  >
    <div class="report-container">
      <el-divider></el-divider>
      <div class="report-info-form">
        <el-form :model="reportForm" ref="reportForm" @submit.prevent="submitForm" label-width="150px">
          <el-form-item label="帖子标题：" prop="postTitle" style="font-weight: bold;">
            {{ reportForm.postTitle }}
          </el-form-item>
          <el-form-item label="帖子内容：" prop="postContent" style="font-weight: bold;">
            {{ reportForm.postContent }}
          </el-form-item>
          <el-form-item label="帖主用户名：" prop="postUsername" style="font-weight: bold;">
            {{ reportForm.postUsername }}
          </el-form-item>
          <el-form-item label="发布者ID：" prop="postUserID" style="font-weight: bold;">
            {{ reportForm.postUserID }}
          </el-form-item>
          <el-form-item label="举报原因：" prop="reportReason" style="font-weight: bold;">
            <el-input
              type="textarea"
              v-model="reportForm.reportReason"
              placeholder="请输入你的举报原因"
              rows="5"
            />
          </el-form-item>
          <el-form-item label="审核进度：" prop="reportProcedure" style="font-weight: bold;">
            待审核
          </el-form-item>
          <el-form-item class="buttons">
            <el-button type="default" @click="handleClose">取消</el-button>
            <el-button type="primary" color="#1D5B5E" native-type="submit" @click="confirmDialog">确认举报</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'ReportSharePost',
  props: {
    isShareReportDialogVisible: {
      type: Boolean,
      default: false,
    },
    PostSuccess: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required:true,
    },
  },
  data() {
    return {
      localIsShareReportDialogVisible: this.isShareReportDialogVisible,
      reportForm: {
        postTitle: this.post.title,
        postContent: this.post.content,
        postUsername: this.post.username,
        postUserID: this.post.user_id,
        reportReason: '',
        Audits: '',
      }
    };
  },
  watch: {
    post: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.reportForm.postTitle = newVal.title;
          this.reportForm.postContent = newVal.content;
          this.reportForm.postUsername = newVal.username;
          this.reportForm.postUserID = newVal.user_id;
        }
      }
    },
    isShareReportDialogVisible(newVal) {
      this.localIsShareReportDialogVisible = newVal;
    },
    localIsShareReportDialogVisible(newVal) {
      this.$emit('update:isShareReportDialogVisible', newVal);
    }
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.reportForm);
    },
    resetForm() {
      this.reportForm = {
        postTitle: '',
        postContent: '',
        postUsername: '',
        postUserID: '',
        reportReason: '',
        Audits: '',
      };
    },
    handleClose() {
      this.closeDialog();
      this.$emit('closeDialog');
    },
    closeDialog() {
      this.localIsShareReportDialogVisible = false;
    },
    confirmDialog() {
      this.localIsShareReportDialogVisible = false;
      this.$emit('update:PostSuccess', true);
      // 添加发布成功逻辑
    }
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

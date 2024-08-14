<template>
  <el-dialog
    title="举报帖子"
    v-model="localIsReportDialogVisible"
    width="55%"
    center
    @close="handleClose"
  >
    <div class="report-container">
      <el-divider></el-divider>
      <div class="report-info-form">
        <el-form :model="reportForm" ref="reportForm" @submit.prevent="submitForm" label-width="150px">
          <div v-if="localIsDetailShow">
            
          </div>
          <el-form-item label="举报原因：" prop="reportReason" style="font-weight: bold;">
            <el-input
              type="textarea"
              v-model="reportForm.reportReason"
              placeholder="请输入你的举报原因"
              rows="5"
            />
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
  name: 'ReportPost',
  props: {
    isReportDialogVisible: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required:true,
    },
    isDetailShow: {
      type: Boolean,
      default:false,
      required:true,
    }
  },
  data() {
    return {
      localIsDetailShow: this.isDetailShow,
      localIsReportDialogVisible: this.isReportDialogVisible,
      reportForm: {
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

    isDetailShow(newVal) {
      this.localIsDetailShow = newVal;
    },
    isReportDialogVisible(newVal) {
      this.localIsReportDialogVisible = newVal;
    },
    localIsDetailShow(newVal) {
      this.$emit('update:isDetailShow', newVal);
    },
    localIsReportDialogVisible(newVal) {
      this.$emit('update:isReportDialogVisible', newVal);
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
      this.localIsDetailShow = false;
      this.localIsReportDialogVisible = false;
    },
    confirmDialog() {
      this.localIsDetailShow = false;
      this.localIsReportDialogVisible = false;
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

<template>
  <el-dialog
    title="举报帖子"
    v-model="localIsRecruitReportDialogVisible"
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
          <el-form-item label="活动时间：" prop="actTime" style="font-weight: bold;">
            {{ reportForm.actTime }}
          </el-form-item>
          <el-form-item label="活动地点：" prop="actLocation" style="font-weight: bold;">
            {{ reportForm.actLocation }}
          </el-form-item>
          <el-form-item label="活动要求：" prop="actRequirements" style="font-weight: bold;">
            {{ reportForm.actRequirements }}
          </el-form-item>          
          <el-form-item label="招募人数：" prop="actTotalRecruits" style="font-weight: bold;">
            {{ reportForm.actTotalRecruits }}
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
  name: 'ReportRecruitPost',
  props: {
    isRecruitReportDialogVisible: {
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
      localIsRecruitReportDialogVisible: this.isRecruitReportDialogVisible,
      reportForm: {
        postTitle: this.post.title,
        actTime: this.post.activity_time,
        actLocation: this.post.activity_address,
        actTotalRecruits: this.post.total_recruit,
        actRequirements:this.post.requirements,
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
          this.reportForm.postUsername = newVal.username;
          this.reportForm.postUserID = newVal.user_id;
          this.reportForm.actTime = newVal.activity_time;
          this.reportForm.actLocation = newVal.activity_address;
          this.reportForm.actTotalRecruits = newVal.total_recruit;
          this.reportForm.actRequirements = newVal.requirements;
        }
      }
    },
    isRecruitReportDialogVisible(newVal) {
      this.localIsRecruitReportDialogVisible = newVal;
    },
    localIsRecruitReportDialogVisible(newVal) {
      this.$emit('update:isRecruitReportDialogVisible', newVal);
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
      this.localIsRecruitReportDialogVisible = false;
    },
    confirmDialog() {
      this.localIsRecruitReportDialogVisible = false;
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

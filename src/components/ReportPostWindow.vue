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
            <el-button type="primary" color="#1D5B5E" native-type="submit" @click="submitReport">确认举报</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import axios from '@/axios'; // 确保路径是正确的
import state from '@/store/global.js'; // 引入映射表
import { ElMessage } from "element-plus";

export default {
  name: 'ReportPost',
  props: {
    isReportDialogVisible: {
      type: Boolean,
      default: false,
    },
    thisPostId: {
      type: Number,
      required: true,
      default:null
    },
    thisCommentId: {
      type: Number,
      required: true,
      default:null
    }
   
  },
  data() {
    return {
      localIsReportDialogVisible: this.isReportDialogVisible,
      reportForm: {
        reportReason: '',
      }
    };
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
    submitForm() {
      console.log('Form submitted:', this.reportForm);
    },
    resetForm() {
      this.reportForm = {
        reportReason: '',
      };
    },
    handleClose() {
      this.localIsReportDialogVisible = false;
      this.$emit('closeDialog');
    },
   
    async submitReport() {
      if (this.thisPostId != null) {
        axios.post('/api/PostReports/pushreportpost', {
          post_id: this.thisPostId,
          user_id: state.userId,
          report_reason:this.reportForm.reportReason          
        }).then(
          response => {
            if (response.status === 200) {
              ElMessage.success('举报提交成功')
            }
          }
        ).catch(
          error => {
            if (error.response) {
              // 请求已发出，但服务器以状态码进行响应
              // 超出了2xx的范围
              console.error('Error:', error.response.data);
              ElMessage.error(error.response.data.message);
              // 显示错误信息
              if (error.response.status === 401) {
                // 特别处理已经举报过的情况
                console.log('You have already reported this post.');
              }
            } else if (error.request) {
              // 请求已经发起，但没有收到响应
              ElMessage.error('没有收到响应');
              console.error('No response received:', error.request);
            } else {
              // 在设置请求时发生了某些事情，触发了一个错误
              console.error('Error', error.message);
              ElMessage.error('错误信息： ${error.message}');
            }
          }
        )
      }


      this.localIsReportDialogVisible = false;

      
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

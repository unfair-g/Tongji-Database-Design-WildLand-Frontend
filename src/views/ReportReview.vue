<template>
  <div class="main">
    <div class="report-options">
      <span
        :class="{ selected: selectedOption === 'posts' }"
        @click="selectOption('posts')"
      >
        帖子举报
      </span>
      <span
        :class="{ selected: selectedOption === 'comments' }"
        @click="selectOption('comments')"
      >
        评论举报
      </span>
      <span
        :class="{ selected: selectedOption === 'review' }"
        @click="selectOption('review')"
      >
        审核记录
      </span>
    </div>

    <div class="table-wrapper">
      <el-table v-if="selectedOption !== 'review'" :data="currentTableData" style="width: 100%">
        <el-table-column prop="reportContent" label="举报内容" width="200" align="center" class-name="single-line" />
        <el-table-column prop="reporter" label="举报人" width="300" align="center" class-name="single-line" />
        <el-table-column prop="reportedUser" label="被举报人" width="200" align="center" class-name="single-line" />
        <el-table-column prop="reason" label="举报原因" width="300" align="center" class-name="single-line" />
        <el-table-column prop="reportTime" label="举报时间" width="200" align="center" class-name="single-line" />
        <el-table-column label="操作台" width="300" align="center">
          <template #default="scope">
            <div :class="{'row-disabled': scope.row.isReviewed}">
              <el-button 
                :class="{ 'selected-action': scope.row.action === 'check' }"
                type="primary" 
                color="#1D5B5E" 
                :disabled="scope.row.isReviewed"
                @click="handleAction(scope.row, 'check')">
                <CircleCheck />通过
              </el-button>
              <el-button 
                :class="{ 'selected-action': scope.row.action === 'close' }"
                type="primary" 
                color="#1D5B5E" 
                :disabled="scope.row.isReviewed"
                @click="handleAction(scope.row, 'close')">
                <CircleClose />拒绝
              </el-button>
              <el-button 
                :class="{ 'selected-action': scope.row.action === 'more' }"
                type="primary" 
                color="#1D5B5E" 
                :disabled="scope.row.isReviewed"
                @click="handleAction(scope.row, 'more')">
                <MoreFilled />更多
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-table v-if="selectedOption === 'review'" :data="reviewLogs" style="width: 100%">
        <el-table-column prop="reportType" label="举报类型" width="150" align="center" class-name="single-line" />
        <el-table-column prop="reportContent" label="举报内容" width="200" align="center" class-name="single-line" />
        <el-table-column prop="reporter" label="举报人" width="200" align="center" class-name="single-line" />
        <el-table-column prop="reportedUser" label="被举报人" width="200" align="center" class-name="single-line" />
        <el-table-column prop="reason" label="举报原因" width="300" align="center" class-name="single-line" />
        <el-table-column prop="reviewTime" label="审核时间" width="200" align="center" class-name="single-line" />
        <el-table-column prop="reviewStatus" label="审核状态" width="150" align="center" class-name="single-line" />
      </el-table>

      <el-alert
        v-if="currentTableData.length === 0 && selectedOption !== 'review'"
        title="当前无需要审核的举报"
        type="info"
        center
      />
    </div>
  </div>
</template>

<script>
import { CircleCheck, CircleClose, MoreFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { mapState, mapActions } from 'vuex'
import axios from '@/axios'

export default {
  components: {
    CircleCheck,
    CircleClose,
    MoreFilled
  },
  data() {
    return {
      selectedOption: 'posts', // 默认选择“帖子举报”
      admin_id: '',
      reviewLogs: [] // 存储审核记录
    };
  },
  computed: {
    ...mapState('admin', ['postsTableData', 'commentsTableData', 'admin_id']),
    currentTableData() {
      if (this.selectedOption === 'reviewLogs') {
        return this.reviewLogs;
      }
      return this.selectedOption === 'posts' ? this.postsTableData : this.commentsTableData;
    }
  },
  created() {
    const selectedOption = this.$route.query.selectedOption
    if (selectedOption) {
      this.selectedOption = selectedOption
    }
    this.admin_id = this.$route.query.admin_id;
    this.fetchPostsTableData();
    this.fetchCommentsTableData();
    this.fetchReviewLogs();
  },
  methods: {
    ...mapActions('admin', ['fetchPostsTableData', 'fetchCommentsTableData']),
    async fetchReviewLogs() {
      try {
        const postsResponse = await axios.get('/api/PostReports/reviewedList');
        const commentsResponse = await axios.get('/api/CommentReports/reviewedList');
        // 打印帖子举报的响应数据
        console.log('Posts Response:', postsResponse.data);

        // 打印评论举报的响应数据
        console.log('Comments Response:', commentsResponse.data);
        const postsData = postsResponse.data.data.map(item => ({
          reportType: '帖子举报',
          reportContent: item.post_title, 
          reporter: item.user_name,
          reportedUser: item.post_author_name,
          reason: item.report_reason,
          reviewTime: item.report_time,
          reviewStatus: item.report_status === 1 ? '通过' : '不通过',
          ...item
        }));
        const commentsData = commentsResponse.data.data.map(item => ({
          reportType: '评论举报',
          reportContent: item.comment_content, 
          reporter: item.user_name,
          reportedUser: item.comment_author_name,
          reason: item.report_reason,
          reviewTime: item.report_time,
          reviewStatus: item.report_status === 1 ? '通过' : '不通过',
          ...item
        }));
        const combinedData = [...postsData, ...commentsData];
        combinedData.sort((a, b) => new Date(b.reviewTime) - new Date(a.reviewTime));
        this.reviewLogs = combinedData;
      } catch (error) {
        console.error("Failed to fetch review logs", error);
      }
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    async handleAction(row, action) {
      if (action === 'more') {
        const routeName = this.selectedOption === 'posts' ? 'PostReportDetail' : 'CommentReportDetail';
        this.$router.push({ name: routeName, params: { id: row.id } });
        return;
      }

      const reportStatus = action === 'check' ? 1 : 0; // 1 表示通过，0 表示拒绝
      const updateApi = this.selectedOption === 'posts'
        ? '/api/PostReports/updatePostReport'
        : '/api/CommentReports/updateCommentReport';
        
      const payload = {
        report_id: row.id,
        administrator_id: this.admin_id,
        report_status: reportStatus,
      };

      try {
        const response = await axios.post(updateApi, payload);
        console.log('Response from server:', response);

        if (response.data.message === "success") {
          // 删除该行
          const index = this.currentTableData.indexOf(row);
          if (index !== -1) {
            this.currentTableData.splice(index, 1); // 从数组中移除该行
          }

          // 显示操作成功的消息
          const message = action === 'check' ? '已通过举报' : '已拒绝举报';
          ElMessage({
            message: message,
            type: 'success',
          });
        } else {
          throw new Error('操作失败');
        }

      } catch (error) {
        console.error("Failed to update report status", error);
        ElMessage({
          message: '操作失败，请重试',
          type: 'error',
        });
      }
    }
  }
}
</script>


<style scoped>
.main {
  padding: 20px;
}

.report-options {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  margin-left: 8%;
}

.report-options span {
  font-size: 24px;
  cursor: pointer;
  color: rgba(196, 196, 196, 0.5);
}

.report-options .selected {
  color: #1D5B5E;
  opacity: 1;
}

.table-wrapper {
  width: 85%;
  min-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
}

.row-disabled {
  background-color: #f5f5f5;
  color: #dcdcdc;
}

.el-button.disabled {
  background-color: #dcdcdc;
  border-color: #dcdcdc;
}

.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selected-action {
  background-color: #E0E0E0 !important;
  border-color: #E0E0E0 !important;
  color: #FFFFFF !important;
}

.el-alert {
  margin-top: 20px;
}
</style>

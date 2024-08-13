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
    </div>
    <div class="table-wrapper">
      <el-table :data="currentTableData" style="width: 100%">
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

      <el-alert
        v-if="currentTableData.length === 0"
        title="当前无需要审核的举报"
        type="info"
        center
      />
    </div>
  </div>
</template>

<script>
import { CircleCheck, CircleClose, MoreFilled } from '@element-plus/icons-vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  components: {
    CircleCheck,
    CircleClose,
    MoreFilled
  },
  data() {
    return {
      selectedOption: 'posts', // 默认选择“帖子举报”
      admin_id:''
    }
  },
  computed: {
    ...mapState('admin', ['postsTableData', 'commentsTableData', 'admin_id']), // 添加 admin_id
    currentTableData() {
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
  },
  methods: {
    ...mapActions('admin', ['fetchPostsTableData', 'fetchCommentsTableData']),
    selectOption(option) {
      this.selectedOption = option;
    },
    async handleAction(row, action) {
      const reportStatus = action === 'check' ? 1 : 0; // 1 表示通过，0 表示拒绝
      const updateApi = this.selectedOption === 'posts'
        ? 'https://localhost:7218/api/PostReports/updatePostReport'
        : 'https://localhost:7218/api/CommentReports/updateCommentReport';
        
      const payload = {
        report_id: row.id,
        administrator_id: this.admin_id, // 从 Vuex store 中获取 admin_id
        report_status: reportStatus,
      };

      // 打印 payload 以调试
      console.log('Sending payload:', payload);

      try {
        const response = await axios.post(updateApi, payload);
        console.log('Response from server:', response);

        row.isReviewed = true; // 将行标记为已审核
        row.action = action; // 保存动作状态以更改按钮颜色
      } catch (error) {
        console.error("Failed to update report status", error);
      }

      if (action === 'more') {
        const routeName = this.selectedOption === 'posts' ? 'PostReportDetail' : 'CommentReportDetail';
        this.$router.push({ name: routeName, params: { id: row.id } });
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
  background-color: #1D5B5E;
}

.el-button.disabled.selected-action {
  background-color: #1D5B5E;
}
</style>

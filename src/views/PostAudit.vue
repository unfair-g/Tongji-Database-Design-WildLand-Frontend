<template>
  <div class="table-wrapper">
    <el-table :data="postAuditTableData" style="width: 100%">
      <el-table-column prop="title" label="帖子标题" width="300" align="center" />
      <el-table-column prop="author" label="帖子作者" width="300" align="center" />
      <el-table-column
        label="帖子类型"
        width="300"
        align="center"
        :formatter="formatPostKind"
      />
      <el-table-column prop="post_time" label="发表时间" width="300" align="center" />
      <el-table-column label="操作台" width="300" align="center">
        <template #default="scope">
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
            @click="handleAction(scope.row, 'more')">
            <MoreFilled />更多
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Show message if postAuditTableData is empty -->
    <el-alert
      v-if="postAuditTableData.length === 0"
      title="当前无需要审核的帖子"
      type="info"
      center
    />
  </div>
</template>

<script>
import axios from 'axios';
import { CircleCheck, CircleClose, MoreFilled } from '@element-plus/icons-vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    CircleCheck,
    CircleClose,
    MoreFilled
  },
  data() {
    return {
      admin_id: '' // 新增 admin_id 数据属性
    }
  },
  computed: {
    ...mapState('admin', ['postAuditTableData'])
  },
  created() {
    this.admin_id = this.$route.query.admin_id;
    this.fetchPostAuditTableData();
  },
  watch: {
    postAuditTableData: {
      handler(newVal) {
        console.log('postAuditTableData has changed:', newVal);
        // Additional logic can be added here if needed
      },
      deep: true // Deep watch
    }
  },
  methods: {
    ...mapActions('admin', ['fetchPostAuditTableData', 'updatePostAuditStatus']),
    async handleAction(row, action) {
      if (action === 'check' || action === 'close') {
        try {
          const status = action === 'check' ? 1 : 0;
          const response = await axios.post('https://localhost:7218/api/PostReviews/updatePostReview', {
            post_id: row.id,
            admin_id: this.admin_id,
            status: status
          });

          if (response.status === 200) {
            // Update the status in the store
            this.updatePostAuditStatus({ id: row.id, status: true });
            row.isReviewed = true; // Mark the row as reviewed
            row.action = action; // Save the action state to change button color
          }
        } catch (error) {
          console.error('Failed to update post review status:', error);
        }
      }
      if (action === 'more') {
        this.$router.push({ name: 'PostDetail', params: { id: row.id } });
      }
    },
    formatPostKind(row) {
      switch (row.post_kind) {
        case 0:
          return '分享贴';
        case 1:
          return '闲置贴';
        case 2:
          return '招募贴';
        default:
          return '未知类型';
      }
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  width: 85%;
  min-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
}
.el-button.disabled {
  background-color: #dcdcdc;
  border-color: #dcdcdc;
}
.selected-action {
  background-color: #1D5B5E;
}
.el-button.disabled.selected-action {
  background-color: #1D5B5E;
}
</style>

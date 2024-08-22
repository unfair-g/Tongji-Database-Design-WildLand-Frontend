<template>
  <div class="table-wrapper">
    <el-table :data="geekAuditTableData" style="width: 100%">
      <el-table-column prop="applicant" label="申请人" width="200" align="center" />
      <el-table-column prop="expertise" label="擅长领域" width="200" align="center" />
      <el-table-column label="资质证明" width="300" align="center">
        <template #default="scope">
          <el-link
            type="primary"
            @click="openDialog(scope.row.qualification)"
          >
            证明
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="outdoorExperience" label="户外经历" width="300" align="center" />
      <el-table-column prop="applicationTime" label="申请时间" width="200" align="center" />
      <el-table-column label="操作台" width="200" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="CircleCheck"
            :disabled="scope.row.isReviewed"
            @click="handleAction(scope.row, 'approve')"
            :class="[
              'action-button',
              { 'selected-action': scope.row.action === 'approve' },
              { 'faded': scope.row.isReviewed && scope.row.action !== 'approve' }
            ]"
          >
            <circle-check />通过
          </el-button>
          <el-button
            type="danger"
            icon="CircleClose"
            :disabled="scope.row.isReviewed"
            @click="handleAction(scope.row, 'reject')"
            :class="[
              'action-button',
              { 'selected-action': scope.row.action === 'reject' },
              { 'faded': scope.row.isReviewed && scope.row.action !== 'reject' }
            ]"
          >
            <circle-close />拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-alert
      v-if="geekAuditTableData.length === 0"
      title="当前无需要审核的达人申请"
      type="info"
      center
    />
    <!-- Dialog for displaying the image -->
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <img :src="selectedImage" alt="资质证明" style="width: 100%;" />
    </el-dialog>
  </div>
</template>

<script>
import { CircleCheck, CircleClose } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      admin_id: '',
      dialogVisible: false,
      selectedImage: ''
    };
  },
  components: {
    CircleCheck,
    CircleClose
  },
  computed: {
    ...mapState('admin', ['geekAuditTableData'])
  },
  created() {
    this.admin_id = this.$route.query.admin_id;
    this.fetchGeekAuditTableData();
  },
  methods: {
    ...mapActions('admin', ['fetchGeekAuditTableData', 'updateGeekAuditStatus']),
    async handleAction(row, action) {
      row.isReviewed = true;
      row.action = action;

      const status = action === 'approve' ? 1 : 0;

      try {
        const response = await axios.post('https://localhost:7218/api/CertificationReviews/updateStatus', {
          admin_id: this.admin_id,
          applicant_id: row.applicant_id,
          status: status
        });

        if (response.status === 200 && response.data.message == "success") {
          const index = this.geekAuditTableData.indexOf(row);
          if (index !== -1) {
            this.geekAuditTableData.splice(index, 1);
          }

          const message = action === 'approve' ? '已通过达人申请' : '已拒绝达人申请';
          ElMessage({
            message: message,
            type: 'success',
          });
        } else {
          console.error('Failed to update the status:', response.data.message);
          ElMessage({
            message: '操作失败，请重试',
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error updating the status:', error.response ? error.response.data : error.message);
        ElMessage({
          message: '操作失败，请重试',
          type: 'error',
        });
      }
    },
    openDialog(imageUrl) {
      this.selectedImage = imageUrl;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
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

.action-button {
  transition: opacity 0.3s ease;
}

.selected-action {
  background-color: #1D5B5E !important;
  color: white !important;
}

.faded {
  opacity: 0.5;
}

.el-button.disabled {
  background-color: #dcdcdc !important;
  border-color: #dcdcdc !important;
  cursor: not-allowed;
}
</style>

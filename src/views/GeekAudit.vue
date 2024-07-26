<template>
    <div class="table-wrapper">
      <el-table :data="geekAuditTableData" style="width: 100%">
        <el-table-column prop="applicant" label="申请人" width="200" align="center" />
        <el-table-column prop="expertise" label="擅长领域" width="200" align="center" />
        <el-table-column prop="qualification" label="资质证明" width="300" align="center" />
        <el-table-column prop="outdoorExperience" label="户外经历" width="300" align="center" />
        <el-table-column prop="applicationTime" label="申请时间" width="200" align="center" />
        <el-table-column label="操作台" width="200" align="center">
          <template #default="scope">
            <el-button type="primary" icon="CircleCheck" @click="handleAction(scope.row, 'approve')">通过</el-button>
            <el-button type="danger" icon="CircleClose" @click="handleAction(scope.row, 'reject')">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-alert
        v-if="geekAuditTableData.length === 0"
        title="当前无需要审核的达人申请"
        type="info"
        center
      />
    </div>
  </template>
  
  <script>
  import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
  import { mapState, mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        CircleCheck,
        CircleClose
      }
    },
    computed: {
      ...mapState('admin', ['geekAuditTableData'])
    },
    created() {
      this.fetchGeekAuditTableData()
    },
    methods: {
      ...mapActions('admin', ['fetchGeekAuditTableData']),
      handleAction(row, action) {
        console.log(`Action: ${action} on row:`, row)
        if (action === 'approve') {
          // Handle approval action
        } else if (action === 'reject') {
          // Handle rejection action
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .table-wrapper {
    width: 85%;
    min-width: 1200px;
    margin: 0 auto;
    overflow-x: auto;
  }
  </style>
  
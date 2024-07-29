<template>
    <div class="table-wrapper">
      <el-table :data="campgroundTableData" style="width: 100%">
        <el-table-column prop="name" label="营地名称" width="300" align="center" />
        <el-table-column prop="contact" label="联系方式" width="300" align="center" />
        <el-table-column label="操作台" width="300" align="center">
          <template #default="scope">
            <el-button 
              type="primary" 
              color="#1D5B5E"
              @click="handleAction(scope.row, 'more')">
              <More />更多
            </el-button>
            <el-button 
              type="success" 
              color="#1D5B5E"
              @click="handleAction(scope.row, 'edit')">
              <Edit />编辑
            </el-button>
            <el-button 
              type="danger" 
              color="#1D5B5E"
              @click="handleAction(scope.row, 'delete')">
              <Delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Show message if campgroundTableData is empty -->
      <el-alert
        v-if="campgroundTableData.length === 0"
        title="当前无营地数据"
        type="info"
        center
      />
    </div>
  </template>
  
  <script>
  import { More, Edit, Delete } from '@element-plus/icons-vue'
  import { mapState, mapActions } from 'vuex'
  
  export default {
    components: {
      More,
      Edit,
      Delete
    },
    computed: {
      ...mapState('admin', ['campgroundTableData'])
    },
    created() {
      this.fetchCampgroundTableData()
    },
    methods: {
      ...mapActions('admin', ['fetchCampgroundTableData']),
      handleAction(row, action) {
        console.log(`Action: ${action} on row:`, row)
        if (action === 'more') {
          // Handle more action
        } else if (action === 'edit') {
          // Handle edit action
        } else if (action === 'delete') {
          // Handle delete action
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
  .el-button {
    background-color: #1D5B5E;
    border-color: #1D5B5E;
    color: white;
  }
  .el-button:hover {
    background-color: #17494A;
    border-color: #17494A;
  }
  </style>
  
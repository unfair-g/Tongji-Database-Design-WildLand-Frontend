<template>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="帖子标题" width="300" align="center" />
        <el-table-column prop="author" label="帖子作者" width="300" align="center" />
        <el-table-column prop="post_kind" label="帖子类型" width="300" align="center" />
        <el-table-column prop="post_time" label="发表时间" width="300" align="center" />
        <el-table-column label="操作台" width="300" align="center">
          <template #default="scope">
            <el-button type="primary" color="#1D5B5E" icon="CircleCheck" @click="handleAction(scope.row, 'check')">通过</el-button>
            <el-button type="primary" color="#1D5B5E" icon="CircleClose" @click="handleAction(scope.row, 'close')">拒绝</el-button>
            <el-button type="primary" color="#1D5B5E" icon="MoreFilled" @click="handleAction(scope.row, 'more')">更多</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Show message if tableData is empty -->
      <el-alert
        v-if="tableData.length === 0"
        title="当前无需要审核的帖子"
        type="info"
        center
      />
    </div>
  </template>
  
  <script>
  import { CircleCheck, CircleClose, MoreFilled } from '@element-plus/icons-vue'
  
  export default {
    data() {
      return {
        tableData: [
          {
            title: "123",
            author: "1",
            post_kind: "2",
            post_time: "222",
            CircleCheck,
            CircleClose,
            MoreFilled
          }
        ]
      };
    },
    methods: {
      handleAction(row, action) {
        console.log(`Action: ${action} on row:`, row);
        if (action === 'more') {
          this.$router.push({ name: 'PostDetail' });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .table-wrapper {
    width: 85%;
    min-width: 1200px; /* 设置表格的最小宽度 */
    margin: 0 auto;
    overflow-x: auto; /* 添加水平滚动条 */
  }
  </style>
  
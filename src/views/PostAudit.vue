<template>
  <div class="table-wrapper">
    <el-table :data="postAuditTableData" style="width: 100%">
      <el-table-column prop="title" label="帖子标题" width="300" align="center" />
      <el-table-column prop="author" label="帖子作者" width="300" align="center" />
      <el-table-column prop="post_kind" label="帖子类型" width="300" align="center" />
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
            :disabled="scope.row.isReviewed"
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
import { CircleCheck, CircleClose, MoreFilled } from '@element-plus/icons-vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CircleCheck,
    CircleClose,
    MoreFilled
  },
  computed: {
    ...mapState('admin', ['postAuditTableData'])
  },
  created() {
    this.fetchPostAuditTableData()
  },
  watch: {
    postAuditTableData: {
      handler(newVal) {
        console.log('postAuditTableData has changed:', newVal)
        // 这里可以添加更多逻辑，例如保存变化，更新UI等
      },
      deep: true // 深度监听
    }
  },
  methods: {
    ...mapActions('admin', ['fetchPostAuditTableData', 'updatePostAuditStatus']),
    handleAction(row, action) {
      if (action === 'check' || action === 'close') {
        // Update the status in the store
        this.updatePostAuditStatus({ id: row.id, status: true })
        row.isReviewed = true // 将行标记为已审核
        row.action = action // 保存动作状态，用于改变按钮颜色
      }
      if (action === 'more') {
        this.$router.push({ name: 'PostDetail', params: { id: row.id } })
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

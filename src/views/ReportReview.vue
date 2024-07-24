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
            <el-button type="primary" color="#1D5B5E" icon="CircleCheck" @click="handleAction(scope.row, 'check')">通过</el-button>
            <el-button type="primary" color="#1D5B5E" icon="CircleClose" @click="handleAction(scope.row, 'close')">拒绝</el-button>
            <el-button type="primary" color="#1D5B5E" icon="MoreFilled" @click="handleAction(scope.row, 'more')">更多</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 如果 currentTableData 为空，显示提示信息 -->
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
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('admin', ['postsTableData', 'commentsTableData']),
    currentTableData() {
      return this.selectedOption === 'posts' ? this.postsTableData : this.commentsTableData;
    }
  },
  created() {
    this.fetchPostsTableData();
    this.fetchCommentsTableData();
  },
  methods: {
    ...mapActions('admin', ['fetchPostsTableData', 'fetchCommentsTableData']),
    selectOption(option) {
      this.selectedOption = option;
    },
    handleAction(row, action) {
      console.log(`操作: ${action} 行:`, row);
      if (action === 'more') {
        this.$router.push({ name: 'PostDetail' });
      }
    }
  },
  data() {
    return {
      selectedOption: 'posts'
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
  min-width: 1200px; /* 设置表格的最小宽度 */
  margin: 0 auto;
  overflow-x: auto; /* 添加水平滚动条 */
}

.single-line {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号表示 */
}
</style>

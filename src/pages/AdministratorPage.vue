<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="logo">WildLand</div>
        <div class="admin-details">
          <el-avatar :icon="UserFilled" size="large"></el-avatar>
          <div class="admin-info-wrapper">
            <div class="nickname">昵称: </div>
            <div class="user-id">个人ID: </div>
          </div>
        </div>
        <div class="admin-info">手机: </div>
        <div class="admin-info">邮箱: </div>
      </el-header>
      <el-container style="height: calc(100% - 190px)">
        <el-aside width="200px" class="aside">
          <el-scrollbar>
            <el-menu :default-openeds="['2','3']" @select="handleSelect" :unique-opened="true">
              <el-menu-item index="1">个人信息</el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>审核
                </template>
                <el-menu-item index="2-1">帖子审核</el-menu-item>
                <el-menu-item index="2-2">举报审核</el-menu-item>
                <el-menu-item index="2-3">达人审核</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>内容管理
                </template>
                <el-menu-item index="3-1">营地</el-menu-item>
                <el-menu-item index="3-2">户外用品</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="4">经验资讯</el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="帖子标题" width="300" align="center" />
            <el-table-column prop="author" label="帖子作者" width="300" align="center" />
            <el-table-column prop="post_kind" label="帖子类型" width="300" align="center" />
            <el-table-column prop="post_time" label="发表时间" width="300" align="center" />
            <el-table-column label="操作台" width="300" align="center">
              <template #default="scope">
                <el-button type="primary" icon="CircleCheck" @click="handleAction(scope.row, 'check')">通过</el-button>
                <el-button type="primary" icon="CircleClose" @click="handleAction(scope.row, 'close')">拒绝</el-button>
                <el-button type="primary" icon="MoreFilled" @click="handleAction(scope.row, 'more')">更多</el-button>
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { CircleCheck, CircleClose, MoreFilled, UserFilled } from '@element-plus/icons-vue'

export default {
  data() {
    return {
      activeIndex: '1',
      UserFilled,
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
    handleSelect(key) {
      this.activeIndex = key;
    },
    handleAction(row, action) {
      console.log(`Action: ${action} on row:`, row);
      // 在这里处理操作逻辑
    }
  }
};
</script>

<style scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/bg.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
}

.header, .aside, .el-main {
  background-color: rgba(255, 255, 255, 0.8);
}

.header {
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  font-size: 120px;
  color: #333;
}

.admin-details {
  display: flex;
  align-items: center;
}

.admin-info-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.nickname {
  font-size: 24px;
  margin-bottom: 10px; /* 可选: 调整间距 */
}

.user-id {
  font-size: 18px;
  margin-bottom: 10px; /* 可选: 调整间距 */
}

.admin-info {
  font-size: 16px;
  text-align: right;
  margin-left: 10px; /* 左边距 */
  margin-right: 20px; /* 右边距 */
}

.aside {
  width: 200px;
  height: 100%; /* 确保侧边栏高度为100% */
}

.el-main {
  flex-grow: 1;
  height: calc(100%); /* 确保主内容区域高度正确计算 */
}

.el-menu-vertical-demo {
  border-right: none;
  height: 100%; /* 确保菜单高度为100% */
}

.el-menu-item,
.el-submenu__title {
  font-size: 20px;
}

.el-menu-item {
  color: #333;
}

.el-menu-item.is-active {
  color: #1D5B5E;
}
</style>

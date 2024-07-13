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
        <el-aside :width="isCollapsed ? '50px' : '200px'" class="aside" :class="{ collapsed: isCollapsed }">
          <el-scrollbar v-show="!isCollapsed">
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
          <el-button class="collapse-button" @click="toggleCollapse">
            <el-icon>
              <Fold v-if="!isCollapsed" style="font-size: 40px;" />
              <Expand v-else style="font-size: 40px;" />
            </el-icon>
            <span v-if="!isCollapsed" class="collapse-text">收起</span>
            <span v-else class="collapse-text">展开</span>
          </el-button>
        </el-aside>
        <el-main>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="帖子标题" width="240" align="center" />
            <el-table-column prop="author" label="帖子作者" width="240" align="center" />
            <el-table-column prop="post_kind" label="帖子类型" width="240" align="center" />
            <el-table-column prop="post_time" label="发表时间" width="240" align="center" />
            <el-table-column label="操作台" width="240" align="center">
              <template #default="scope">
                <el-button type="primary" :icon="scope.row.CircleCheck"></el-button>
                <el-button type="primary" :icon="scope.row.CircleClose"></el-button>
                <el-button type="primary" :icon="scope.row.MoreFilled"></el-button>
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
import { CircleCheck, CircleClose, Fold, Expand, MoreFilled, UserFilled } from '@element-plus/icons-vue'

export default {
  components: {
    CircleCheck,
    CircleClose,
    MoreFilled,
    UserFilled
  },
  data() {
    return {
      activeIndex: '1',
      UserFilled,
      Fold,
      Expand,
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
      ],
      isCollapsed: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
<<<<<<< Updated upstream:L1KEAB0T/YourComponent.vue
=======
    },
    handleAction(row, action) {
      console.log(`Action: ${action} on row:`, row);
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
>>>>>>> Stashed changes:src/pages/AdministratorPage.vue
    }
  }
};
</script>

<style scoped>
.common-layout {
  height: 100%;
  width: 100%;
  background: url('@/assets/bg.jpg') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.7; /* Ensure background opacity remains at 70% */
  display: flex;
  flex-direction: column;
}

.header {
  height: 190px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  position:relative;
  color:#1D5B5E;
  font-size:60px;
  font-family: 'LOGO',sans-serif !important;
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
  margin-bottom: 10px;
}

.user-id {
  font-size: 18px;
  margin-bottom: 10px;
}

.admin-info {
  font-size: 16px;
  text-align: right;
  margin-left: 10px;
  margin-right: 20px;
}

.aside {
<<<<<<< Updated upstream:L1KEAB0T/YourComponent.vue
  width: 200px;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%; /* Ensure sidebar height is 100% */
=======
  height: 100%;
  position: relative;
  transition: width 0.3s;
  background-color: white;
}

.collapse-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  display: flex;
  align-items: center;
}

.collapse-text {
  font-size: 16px;
  margin-left: 5px;
>>>>>>> Stashed changes:src/pages/AdministratorPage.vue
}

.el-main {
  background-color: rgba(255, 255, 255, 0.8);
  flex-grow: 1;
<<<<<<< Updated upstream:L1KEAB0T/YourComponent.vue
  height: calc(100%); /* Ensure main content area height is calculated properly */
}

.el-menu-vertical-demo {
  border-right: none;
  height: 100%; /* Ensure menu height is 100% */
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
=======
  height: calc(100%);
>>>>>>> Stashed changes:src/pages/AdministratorPage.vue
}
</style>

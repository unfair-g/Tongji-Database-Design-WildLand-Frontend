<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="logo">WildLand</div>
        <div class="admin-details">
          <div class="admin-avatar-info">
            <el-avatar :icon="UserFilled" size="large"></el-avatar>
            <div class="admin-info-wrapper">
              <div class="nickname">昵称: {{ nickname }}</div>
              <div class="user-id">个人ID: {{ userId }}</div>
            </div>
          </div>
          <div class="admin-info phone-info">手机: {{ phone }}</div>
          <div class="admin-info email-info">邮箱: {{ email }}</div>
        </div>
      </el-header>
      <el-container style="height: calc(100% - 190px)">
        <el-aside :width="isCollapsed ? '50px' : '200px'" class="aside" :class="{ collapsed: isCollapsed }">
          <el-scrollbar v-show="!isCollapsed">
            <el-menu :default-openeds="['1','2','3']" @select="handleSelect" :unique-opened="true">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>审核
                </template>
                <el-menu-item index="1-1" @click="navigateTo('PostAudit')">帖子审核</el-menu-item>
                <el-menu-item index="1-2" @click="navigateTo('ReportReview')">举报审核</el-menu-item>
                <el-menu-item index="1-3">达人审核</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>内容管理
                </template>
                <el-menu-item index="2-1">营地</el-menu-item>
                <el-menu-item index="2-2">户外用品</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>经验资讯
                </template>
<<<<<<< Updated upstream:L1KEAB0T/AdministratorPage.vue
                <el-menu-item index="4-1">标签管理</el-menu-item>
                <el-menu-item index="4-2">资讯管理</el-menu-item>
=======
                <el-menu-item index="3-1" @click="navigateTo('TagAudit')">标签管理</el-menu-item>
                <el-menu-item index="3-2" @click="navigateTo('FlashAudit')">资讯管理</el-menu-item>
>>>>>>> Stashed changes:src/pages/AdministratorPage.vue
              </el-sub-menu>
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
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Fold, Expand, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('admin', ['nickname', 'userId', 'phone', 'email'])
  },
  setup() {
    const router = useRouter()
    const navigateTo = (routeName) => {
      router.push({ name: routeName })
    }

    return {
      navigateTo,
      UserFilled,
      Fold,
      Expand,
      isCollapsed: false
    }
  },
  data() {
    return {};
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
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
  position: relative;
  color: #1D5B5E;
  font-size: 60px;
  font-family: 'LOGO', sans-serif !important;
}

.admin-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

.admin-avatar-info {
  display: flex;
  align-items: center;
  position: absolute;
  left: 30%;
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

.phone-info {
  position: absolute;
  left: 55%;
  font-size: 16px;
  text-align: left;
}

.email-info {
  position: absolute;
  left: 80%;
  font-size: 16px;
  text-align: left;
}

.aside {
  height: 100%;
  position: relative;
  transition: width 0.3s;
  background-color: white;
}

.el-menu-item,
.el-sub-menu {
  font-size: 20px; /*改这个值修改大小*/
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
}

.el-main {
  flex-grow: 1;
  height: calc(100%);
  background-color: rgba(255, 255, 255, 0.7);
}
</style>

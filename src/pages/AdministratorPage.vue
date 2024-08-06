<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="logo">WildLand</div>
        <div class="admin-details">
          <div class="admin-avatar-info">
            <el-avatar :src="avatarSrc ? avatarSrc : undefined" :icon="!avatarSrc ? UserFilled : undefined" size="large"></el-avatar>
            <div class="admin-info-wrapper">
              <div class="nickname">昵称: {{ nickname }}</div>
              <div class="user-id">个人ID: {{ admin_id }}</div>
            </div>
          </div>
          <div class="admin-info phone-info">手机: {{ phone }}</div>
          <div class="admin-info email-info">邮箱: {{ Email }}</div>
        </div>
      </el-header>
      <el-container style="height: calc(100% - 190px)">
        <el-aside class="aside">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '2', '3']" @select="handleSelect" :unique-opened="true">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>审核
                </template>
                <el-menu-item index="1-1" @click="navigateTo('PostAudit')">帖子审核</el-menu-item>
                <el-menu-item index="1-2" @click="navigateTo('ReportReview')">举报审核</el-menu-item>
                <el-menu-item index="1-3" @click="navigateTo('GeekAudit')">达人审核</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>内容管理
                </template>
                <el-menu-item index="2-1" @click="navigateTo('AdminCamp')">营地</el-menu-item>
                <el-menu-item index="2-2" @click="navigateTo('OutdoorGear')">户外用品</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><i class="el-icon-s-operation"></i></el-icon>经验资讯
                </template>
                <el-menu-item index="3-1" @click="navigateTo('TagAudit')">标签管理</el-menu-item>
                <el-menu-item index="3-2" @click="navigateTo('FlashAudit')">资讯管理</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const router = useRouter()
    const admin_id = ref(null)
    const nickname = ref('')
    const phone = ref('')
    const Email = ref('')
    const avatarSrc = ref('') // 用于存储头像 URL

    // 从 sessionStorage 获取 admin_id
    const storedAdminId = sessionStorage.getItem('admin_id')

    const fetchAdminDetails = async (id) => {
      try {
        const response = await axios.get(`https://localhost:7218/api/Administrators/${id}`)
        const { admin_name, phone_number, email, portrait } = response.data.data
        nickname.value = admin_name
        phone.value = phone_number
        Email.value = email
        avatarSrc.value = portrait // 设置头像 URL
      } catch (error) {
        console.error('获取管理员信息失败', error)
      }
    }

    const navigateTo = (routeName) => {
      router.push({ name: routeName })
    }

    // 在组件挂载时获取管理员详细信息
    onMounted(() => {
      if (storedAdminId) {
        admin_id.value = storedAdminId
        fetchAdminDetails(storedAdminId)
      }
    })

    return {
      navigateTo,
      UserFilled,
      admin_id,
      nickname,
      phone,
      Email,
      avatarSrc
    }
  }
}
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
  background-color: white;
}

.el-menu-item,
.el-sub-menu {
  font-size: 20px; /*改这个值修改大小*/
  --el-menu-item-font-size: 20px;
}

.el-main {
  flex-grow: 1;
  height: calc(100%);
  background-color: rgba(255, 255, 255, 0.7);
}
</style>

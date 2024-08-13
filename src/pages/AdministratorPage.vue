<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="logo">WildLand</div>
        <div class="admin-details">
          <div class="admin-avatar-info">
            <el-avatar :src="avatarSrc ? avatarSrc : undefined" :icon="!avatarSrc ? UserFilled : undefined" size="large"></el-avatar>
            <div class="avatar-upload-wrapper">
              <el-upload
                v-if="isEditing"
                class="avatar-uploader"
                :method="'post'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                @change="handleFileChange"
              >
                <el-button size="mini" type="primary">上传头像</el-button>
              </el-upload>
            </div>
          </div>
          <div class="admin-info-wrapper">
            <div class="nickname">
              昵称: 
              <el-input v-if="isEditing" v-model="editedNickname" size="mini" />
              <span v-else>{{ nickname }}</span>
            </div>
            <div class="user-id">个人ID: {{ admin_id }}</div>
          </div>
          <div class="admin-info phone-info">
            手机: 
            <el-input v-if="isEditing" v-model="editedPhone" size="mini" />
            <span v-else>{{ phone }}</span>
          </div>
          <div class="admin-info email-info">
            邮箱: 
            <el-input v-if="isEditing" v-model="editedEmail" size="mini" />
            <span v-else>{{ Email }}</span>
          </div>
        </div>
        <div class="edit-button">
          <el-button type="primary" @click="toggleEdit">{{ isEditing ? '保存' : '编辑个人信息' }}</el-button>
        </div>
      </el-header>
      <el-container style="height: calc(100% - 190px)">
        <el-aside class="aside">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '2', '3']" @select="handleSelect" class="sidebar">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><View /></el-icon>审核
                </template>
                <el-menu-item index="1-1" @click="navigateTo('PostAudit', admin_id)">帖子审核</el-menu-item>
                <el-menu-item index="1-2" @click="navigateTo('ReportReview', admin_id)">举报审核</el-menu-item>
                <el-menu-item index="1-3" @click="navigateTo('GeekAudit', admin_id)">达人审核</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><EditPen /></el-icon>内容管理
                </template>
                <el-menu-item index="2-1" @click="navigateTo('AdminCamp')">营地</el-menu-item>
                <el-menu-item index="2-2" @click="navigateTo('OutdoorGear')">户外用品</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><Document /></el-icon>经验资讯
                </template>
                <el-menu-item index="3-1" @click="navigateTo('TagAudit')">标签管理</el-menu-item>
                <el-menu-item index="3-2" @click="navigateTo('FlashAudit')">资讯管理</el-menu-item>
              </el-sub-menu>
              <div class="flex-grow" />
              <li style="flex:1;"></li>
              <el-menu-item index="5" @click="exit">
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
              </el-menu-item>
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
import axios from '@/axios'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus' // 导入 ElMessage
import global from '@/store/global'

export default {
  setup() {
    const router = useRouter()
    const admin_id = ref(global.userId)
    const nickname = ref('')
    const phone = ref('')
    const Email = ref('')
    const avatarSrc = ref('') // 用于存储头像 URL
    const isEditing = ref(false)
    const editedNickname = ref('')
    const editedPhone = ref('')
    const editedEmail = ref('')

    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`/api/Administrators/${global.userId}`)
        const { admin_name, phone_number, email, portrait } = response.data.data
        nickname.value = admin_name
        phone.value = phone_number
        Email.value = email
        avatarSrc.value = portrait // 设置头像 URL
        editedNickname.value = admin_name
        editedPhone.value = phone_number
        editedEmail.value = email
      } catch (error) {
        console.error('获取管理员信息失败', error)
      }
    }

    const toggleEdit = async () => {
      if (isEditing.value) {
        try {
          const data = {
            admin_id: admin_id.value,
            admin_name: editedNickname.value,
            phone_number: editedPhone.value,
            email: editedEmail.value
          }
          const config = {
            method: 'put',
            url: '/api/Administrators/updateInfo',
            headers: { 
              'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
          }
          await axios(config)
            nickname.value = editedNickname.value
            phone.value = editedPhone.value
            Email.value = editedEmail.value
        } catch (error) {
          ElMessage.error(error.message)
          console.error('更新管理员信息失败', error)
        }
      }
      isEditing.value = !isEditing.value
    }

    const navigateTo = (routeName, admin_id) => {
      if (admin_id) {
        router.push({ name: routeName, query: { admin_id } });
      } else {
        router.push({ name: routeName });
      }
    };

    function exit() {
      sessionStorage.clear();
      global.Login = false;
      global.userId = 0;
      router.push({
        path:'/'
      })
    }
    
    const beforeAvatarUpload = (file) => {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGorPNG) {
        ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      
      const formData = new FormData();
      formData.append('file', file);

      axios.post(`/api/Administrators/uploadportrait/${admin_id.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      ElMessage.success('头像上传成功')
      .catch(error => {
        ElMessage.error(error.message)
      });

      return false;
    }

    const handleFileChange = (file) => {
      avatarSrc.value = URL.createObjectURL(file.raw)
    }

    // 在组件挂载时获取管理员详细信息
    onMounted(() => {
        fetchAdminDetails()
    })

    return {
      navigateTo,
      UserFilled,
      admin_id,
      nickname,
      phone,
      Email,
      avatarSrc,
      isEditing,
      editedNickname,
      editedPhone,
      editedEmail,
      toggleEdit,
      beforeAvatarUpload,
      handleFileChange,
      ElMessage,
      exit
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
  position: relative;
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
  width: 100%;
  position: relative;
}

.admin-avatar-info {
  display: flex;
  align-items: center;
  flex-direction: column; /* 改为列布局 */
  margin-left: 20%;
  margin-right: 2%; /* 增加右边距，靠近昵称和个人ID */
}

.avatar-upload-wrapper {
  margin-top: 10px;
}

.admin-info-wrapper {
  display: flex;
  flex-direction: column;
}

.nickname, .user-id {
  font-size: 16px;
  text-align: left;
  margin: 0; /* 删除上方和下方的间距 */
}

.phone-info, .email-info {
  position: absolute;
  font-size: 16px;
  text-align: left;
}

.phone-info {
  left: 55%;
}

.email-info {
  left: 80%;
}

.edit-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
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

.el-button {
  background-color: #1D5B5E;
  border-color: #1D5B5E;
  color: #fff;
}

.avatar-uploader .el-button {
  margin-top: 10px;
}

.sidebar{
    --el-menu-item-height:80px;
    --el-sub-menu-item-height:80px;
    --el-menu-item-font-size: 20px;
    min-height:80vh;
    height:100%;
    display: flex;             
    flex-direction: column; 
}
</style>

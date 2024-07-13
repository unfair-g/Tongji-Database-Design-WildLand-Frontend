<template>
  <el-card class="hot-users">
    <template #header>
      <div class="hot-users-header">热门用户</div>
    </template>
    <div class="user-list">
      <div class="user-item" v-for="user in hotUsers" :key="user.name">
        <img :src="user.avatar" alt="avatar" class="user-avatar">
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-account">帐号</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'HotUsers',
  data() { 
    return {
      hotUsers: [
        { name: '用户名', avatar: require('@/assets/avatar.jpg') },
        { name: '用户名', avatar: require('@/assets/avatar.jpg') },
        { name: '用户名', avatar: require('@/assets/avatar.jpg') },
        { name: '用户名', avatar: require('@/assets/avatar.jpg') },
        { name: '用户名', avatar: require('@/assets/avatar.jpg') }
      ]
    };
  }
}
</script>

<style scoped>
.hot-users {
  margin-bottom: 20px;
}
.hot-users-header {
  font-weight: bold;
}
.user-list {
  display: flex;
  flex-direction: column;
}
.user-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.user-name {
  font-weight: bold;
}
.user-account {
  color: #999;
}
</style>

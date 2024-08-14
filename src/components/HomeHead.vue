<template>
<el-menu
    :default-active="this.$route.path"
    :ellipsis="false"
    class="head"
    mode="horizontal"
    v-model="activeIndex"
    router
  >
    <div class="logo">WildLand</div>
    <el-menu-item class="menuitem" index="/home">主页</el-menu-item>
    <el-menu-item class="menuitem" index="/home/campground">营地</el-menu-item>
    <el-menu-item class="menuitem" index="/home/forum">论坛</el-menu-item>
    <el-menu-item class="menuitem" index="/home/product">户外用品</el-menu-item>
    <el-menu-item class="menuitem" index="/home/flash">经验资讯</el-menu-item>
    <div class="flex-grow" />
    <el-dropdown>
        <el-avatar :src="avatar" style="height:80%;width:fit-content;margin-top: auto;margin-bottom: auto;"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="SwitchButton" @click="Exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    <el-menu-item class="menuitem" index="/home/userspace">个人空间</el-menu-item>
  </el-menu>

</template>

<script setup>
import global from '@/store/global'
import axios from '@/axios'
import router from '@/router'
import { onMounted, ref } from 'vue';
import { SwitchButton } from '@element-plus/icons-vue'


const avatar=ref('')

const getUserAvatar = async () => {
    try {
        const response = await axios.get(`/api/Users/GetUserPortrait/${global.userId}`)
        avatar.value=response.data.portraitUrl
    } catch (error) {
        console.error(error)
    }
}
function searchFlash() {
  if (input.value.trim()) {
    router.push({ path: '/home/searchFlash', query: { keyword: input.value } })
  }
}

function Exit() {
  sessionStorage.clear();
  global.Login = false;
  global.userId = 0;
  router.push({
    path:'/'
  })
}

   onMounted(() => {
       getUserAvatar();
    });

</script>

<style scoped>
    .head {
        --el-menu-hover-bg-color: rgb(48,133,136,40%);
        --el-menu-hover-text-color: #ffffff;
        --el-menu-active-color: #1D5B5E;
        --el-menu-item-font-size: 20px;
        position:fixed;
        width:100%;
        height:80px;
        position: relative;
        z-index: 1;
    }

    .logo{
        font-size: 60px;
        font-family: 'LOGO',sans-serif !important;
        color:#1D5B5E;
        line-height: 80px;
    }

    .flex-grow {
        flex-grow: 1;
    }

    .menuitem{
        width:180px;
    }

    .block-col-2 .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 50px;
        margin-bottom: 20px;
    }

        .block-col-2 .el-dropdown-link {
        display: flex;
        align-items: center;
    }

</style>
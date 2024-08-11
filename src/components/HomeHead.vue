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
    <div class="searchbox">
      <el-input
        v-model="input"
        style="width: 240px;height:50px"
        placeholder="Please input"
        clearable
    />
    <el-button type="primary" :icon="Search" color="#1D5B5E"  style="height:50px" @click="searchProducts">搜索</el-button>
    </div>
    <el-menu-item class="menuitem" index="/home/userspace">个人空间</el-menu-item>
  </el-menu>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
const router = useRouter()

function searchProducts() {
  if (input.value.trim()) {
    router.push({ path: '/home/searchProduct', query: { keyword: input.value } })
  }
}
function searchFlash() {
  if (input.value.trim()) {
    router.push({ path: '/home/searchFlash', query: { keyword: input.value } })
  }
}

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

    .searchbox{
        display: flex;
        align-items: center;
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

</style>
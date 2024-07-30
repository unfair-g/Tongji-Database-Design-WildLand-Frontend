<template>
<el-menu
    :default-active="activeIndex"
    :ellipsis="false"
    class="head"
    mode="horizontal"
  >
    <div class="logo">WildLand</div>
    <el-menu-item class="menuitem" index="1" @click="toHome">主页</el-menu-item>
    <el-menu-item class="menuitem" index="2" @click="toCamp">营地</el-menu-item>
    <el-menu-item class="menuitem" index="3" @click="toForum">论坛</el-menu-item>
    <el-menu-item class="menuitem" index="4" @click="toProduct">户外用品</el-menu-item>
    <el-menu-item class="menuitem" index="5" @click="toFlash">经验资讯</el-menu-item>
    <div class="flex-grow" />
    <div class="searchbox">
      <el-input
    v-model="input"
        style="width: 240px;height:50px"
        placeholder="Please input"
        clearable
    />
    <el-button type="primary" :icon="Search" color="#1D5B5E"  style="height:50px">搜索</el-button>
    </div>
    <el-menu-item class="menuitem" index="6" @click="toUserspace">个人空间</el-menu-item>
  </el-menu>

</template>

<script setup>
import router from '../router'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input = ref('')

function toHome() {
    router.push({
        path: '/home'
    })
}

function toForum() {
    router.push({
        path: '/home/forum'
    })
}

function toCamp() {
    router.push({
        path: '/home/campground'
    })
}

function toUserspace() {
    router.push({
        path: '/home/userspace'
    })
} 

function toProduct() {
    router.push({
        path: '/home/product'
    })
}

function toFlash() {
    router.push({
        path: '/home/flash'
    })
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
<template>
<el-menu
    :default-active="activeIndex"
    :ellipsis="false"
    class="head"
    mode="horizontal"
    @select="handleSelect"
  >
    <div class="logo">WildLand</div>
    <el-menu-item class="menuitem" index="1">主页</el-menu-item>
    <el-menu-item class="menuitem" index="2">营地</el-menu-item>
    <el-menu-item class="menuitem" index="3">论坛</el-menu-item>
    <el-menu-item class="menuitem" index="4">户外用品</el-menu-item>
    <el-menu-item class="menuitem" index="5">经验资讯</el-menu-item>
    <div class="flex-grow" />
    <div class="searchbox">
      <el-input
      v-model="input2"
      style="width: 240px ;height:50px"
      placeholder="Type something"
    />
    <el-button type="primary" :icon="Search" color="#1D5B5E"  style="height:50px">搜索</el-button>
    </div>
    <el-menu-item class="menuitem" index="6">个人空间</el-menu-item>
  </el-menu>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
</script>

<style>
    .head {
        --el-menu-hover-bg-color: rgb(48,133,136,40%);
        --el-menu-hover-text-color: #ffffff;
        --el-menu-active-color: #1D5B5E;
        --el-menu-item-font-size: 20px;
        height:80px;
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
        width:200px;
    }

</style>

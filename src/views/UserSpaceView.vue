<template>
  <el-container class="usercenter">
    <el-aside>
    <el-col :span="24" style="height:100%;">
      <el-menu
        active-text-color="#1D5B5E"
        background-color="#FFFFFF"
        class="sidebar"
        default-active="1"
        text-color="#0C0C0C"
      >
         <el-menu-item index="1" @click="toPersonalCenter">
          <el-icon><icon-menu /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><ShoppingCart /></el-icon>
            <span>订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" style="height:80px" @click="toCampOrder">营地</el-menu-item>
            <el-menu-item index="2-2" style="height:80px" @click="toOrder">户外用品</el-menu-item>
            <el-menu-item index="2-3" style="height:80px" @click="toPostOrder">闲置物品</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="3" @click="toFavourites">
            <el-icon><Star /></el-icon>
            <span>收藏夹</span>
        </el-menu-item>
        <el-menu-item index="4" @click="toInformation">
          <el-icon><Bell /></el-icon>
          <span>消息中心</span>
        </el-menu-item>
        <div class="flex-grow" />
        <li style="flex:1;"></li>
         <el-menu-item index="5" @click="exit">
          <el-icon><SwitchButton /></el-icon>
          <span>退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-aside>
  <el-main style="padding:0;"> 
    <el-scrollbar height="92vh">
    <router-view></router-view>
    </el-scrollbar>
  </el-main>
  </el-container>
</template>

<script setup>
import router from '../router'
import global from '@/store/global'

import {
    Menu as IconMenu,
    ShoppingCart,
    Bell,
    Star,
    SwitchButton
} from '@element-plus/icons-vue';

function toPersonalCenter() {
  router.push({
    path:'/home/userspace'
  })
}

function toOrder() {
  router.push({
    path:'/home/userspace/order'
  })
}

function toPostOrder() {
  router.push({
    path:'/home/userspace/leaseorder'
  })
}

function toCampOrder() {
  router.push({
    path:'/home/userspace/camporder'
  })
}

function toFavourites() {
  router.push({
    path:'/home/userspace/star'
  })
}

function toInformation() {
  router.push({
    path:'/home/userspace/information'
  })
}

function exit() {
  sessionStorage.clear();
  global.Login = false;
  global.userId = 0;
  router.push({
    path:'/'
  })
}

</script>

<style scoped>
.usercenter{
  min-width: 100%;
  min-height: 100%;
}

.sidebar{
    --el-menu-item-height:80px;
    --el-sub-menu-item-height:80px;
    --el-menu-item-font-size: 20px;
    min-height:92vh;
    display: flex;             
    flex-direction: column; 
}

.el-menu-item:hover{
  background-color:rgb(48, 133, 136, 40%);
}


.el-icon{
    font-size:50px;
}

.flex-grow {
  flex-grow: 1;
}
</style>
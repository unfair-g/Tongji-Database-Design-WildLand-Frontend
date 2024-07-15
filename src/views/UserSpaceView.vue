<template>
    <el-col :span="3">
      <el-menu
        active-text-color="#1D5B5E"
        background-color="#FFFFFF"
        class="sidebar"
        default-active="2"
        text-color="#0C0C0C"
      >
         <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><ShoppingCart /></el-icon>
            <span>订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" style="height:80px">营地</el-menu-item>
            <el-menu-item index="2-2" style="height:80px">户外用品</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Star /></el-icon>
            <span>收藏</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" style="height:80px">营地</el-menu-item>
            <el-menu-item index="3-2" style="height:80px">户外用品</el-menu-item>
            <el-menu-item index="3-3" style="height:80px">帖子</el-menu-item>
            <el-menu-item index="3-4" style="height:80px">经验资讯</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="4">
          <el-icon><Bell /></el-icon>
          <span>消息中心</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</template>

<script setup>
import {
    Menu as IconMenu,
    ShoppingCart,
    Bell,
    Star
} from '@element-plus/icons-vue';


</script>

<style scoped>
.sidebar{
    --el-menu-item-height:80px;
    --el-sub-menu-item-height:80px;
    --el-menu-item-font-size: 20px;
    min-height:92vh;
}

.el-icon{
    font-size:50px;
}
</style>
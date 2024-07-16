<template>
<div class="bg">
    <div class="container">
        <h1 style="color:#1D5B5E">找回密码</h1>
        <el-form
        label-position="top"
        label-width="auto"
        :model="formLabelAlign"
        style="max-width: 600px;margin-top: 5%;"
        >
            <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name" placeholder="请输入您的用户名"  :prefix-icon="User"/>
            </el-form-item>
            <el-form-item label="手机号">
            <el-input v-model="formLabelAlign.name" placeholder="请输入您的手机号"  :prefix-icon="Iphone"/>
            </el-form-item>
            <el-form-item label="密码">
            <el-input v-model="formLabelAlign.type" placeholder="请输入您的新密码" :prefix-icon="Key"/>
            </el-form-item>
        </el-form>
        <el-button class="loginbutton" type="primary" color="#1D5B5E" @click="toHomePage">登录</el-button>
    </div>
</div>
</template>

<script setup>
import router from '../router'
import { reactive } from 'vue'
import { User, Key,Iphone } from '@element-plus/icons-vue'

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})

function toHomePage() {
  router.push({path: '/home'})
}

</script>

<style scoped>

.bg{
    background-color:rgb(255,255,255,80%);
    bottom :0;
    left:0;
    height:100vh;
    position:absolute;
    width:55%;
}

.container{
    background-color: #FFFFFF;
    box-shadow: 0 0 5px 1px #888888;
    padding-left:4%;
    padding-top:2%;
    padding-bottom:2%;
    margin-left:18%;
    margin-right:20%;
    margin-top: 25%;
}

.loginbutton{
    margin-left: 32%;
    width:calc(200vw * 80 / 1920);
    height:calc(120vw * 30 / 1920);
}

</style>
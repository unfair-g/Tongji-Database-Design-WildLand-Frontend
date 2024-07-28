<template>
<div class="bg">
    <div class="container">
        <h1 style="color:#1D5B5E">游客注册</h1>
         <el-form
    label-position="top"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px; margin-top:5%; margin-bottom: 10%;padding-right:5%"
    >
    <Avatar />
    <el-form-item label="昵称">
      <el-input v-model="formLabelAlign.name" placeholder="请输入您的昵称"  :prefix-icon="User"/>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="formLabelAlign.type" placeholder="请输入您的手机号码" :prefix-icon="Iphone"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.type" placeholder="请输入密码" :prefix-icon="Key"/>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="formLabelAlign.type" placeholder="请输入您的真实姓名" />
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="formLabelAlign.type" placeholder="请输入您的身份证号" />
    </el-form-item>
  </el-form>
  <div>
    <el-button class="cancelbutton" @click="toWelcomePage">取消</el-button>
    <el-button class="checkbutton" tyype="primary" color="#1D5B5E" @click="toHomePage">登录</el-button>
    </div>
    </div>
</div>
</template>

<script setup>
import router from '../router'
import { reactive } from 'vue'
import { User, Key, Iphone } from '@element-plus/icons-vue'
import Avatar from '../components/AvatarPicker.vue'

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})

function toHomePage() {
  router.push({path: '/home'})
}

function toWelcomePage() {
  router.push({path: '/'})
}

</script>

<style>

.bg{
    background-color:rgb(255,255,255,80%);
    bottom :0;
    left:0;
    height:100%;
    width:55%;
    position: fixed;
}

.container{
    background-color: #FFFFFF;
    box-shadow: 0 0 5px 1px #888888;
    padding-left:4%;
    padding-top:2%;
    padding-bottom:2%;
    margin-left:18%;
    margin-right:20%;
    margin-top: 10%;
}

.avatar-uploader .el-upload{
  margin-left: 35%;
  margin-bottom: 5%;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: #888888;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.cancelbutton{
    margin-left:15%;
    margin-right: 20%;
    margin-bottom: 5%;
    width:calc(150vw * 80 / 1920);
    height:calc(120vw * 30 / 1920);
}

.checkbutton{
    margin-bottom: 5%;
    width:calc(150vw * 80 / 1920);
    height:calc(120vw * 30 / 1920);
}

</style>
<template>
<div class="bg">
    <div class="role">
         <el-button class="userbutton" type="primary" color="#1D5B5E" circle>游客</el-button>
         <el-button class="adbutton" type="primary" color="#308588" circle>管理</el-button>
    </div>
    <div class="container">
    <el-form
    label-position="top"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px"
    >
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.name" placeholder="请输入您的账号"  :prefix-icon="User"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.type" placeholder="请输入密码" :prefix-icon="Key"/>
    </el-form-item>
  </el-form>
  <el-button class="loginbutton" type="primary" color="#1D5B5E" @click="toHomePage">登录</el-button>
  <div class="others">
      <el-link type="info">忘记密码</el-link>
      <el-link type="info" style="margin-left:75%;color:black">注册账号</el-link>
  </div>
    </div>
</div>
</template>

<script setup>
import router from "@/router"
import { reactive } from 'vue'
import { User, Key } from '@element-plus/icons-vue'

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})

function toHomePage() {
  router.push({path: '/home'})
}


</script>

<style>
.bg{
    background-color:rgb(255,255,255,80%);
    bottom :0;
    left:0;
    height:100%;
    width:55%;
    position: absolute;
}

.role{
    margin-top: 15%;
}

.userbutton{
    min-width: 100px; /* 更改圆形按钮的宽度 */
    height: 100px; /* 更改圆形按钮的高度 */
    font-size:38px;
    margin-left:30%;
    margin-right: 20%;
}

.adbutton{
    min-width: 100px; /* 更改圆形按钮的宽度 */
    height: 100px; /* 更改圆形按钮的高度 */
    font-size:38px;
   
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

.loginbutton{
    margin-left: 32%;
    width:calc(200vw * 80 / 1920);
    height:calc(120vw * 30 / 1920);
}

.others{
    margin-top: 3%;
}

</style>
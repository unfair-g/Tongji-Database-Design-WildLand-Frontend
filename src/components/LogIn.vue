<template>
<div class="bg">
    <div class="custom-style">
    <el-segmented v-model="role" :options="options" :block="true"/>
    </div>
    <div class="login-container">
    <el-form
    label-position="top"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px;padding-right:5%"
    >
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.name" placeholder="请输入您的账号"  :prefix-icon="User"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.type" placeholder="请输入密码" :prefix-icon="Key"/>
    </el-form-item>
  </el-form>
  <el-button class="loginbutton" type="primary" color="#1D5B5E" @click="toRolePage">登录</el-button>
  <div class="others">
      <router-link to="/enter/findkey" style="color:#888888;text-decoration: none">忘记密码</router-link>
      <router-link to="/enter/enrollment" style="margin-left:75%;color:black;text-decoration: none">注册账号</router-link>
  </div>
    </div>
</div>
</template>

<script setup>
import router from '../router'
import { reactive } from 'vue'
import { User, Key } from '@element-plus/icons-vue'
import { ref } from 'vue'

const role = ref('游客')

const options = ['游客','管理员']

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})

function toRolePage() {
  if (role.value == "游客")
    router.push({ path: '/home' });
  else
    router.push({path: '/administrator'})
}
</script>

<style>
.bg{
    background-color:rgb(255,255,255,80%);
    bottom :0;
    left:0;
    height:100vh;
    position:absolute;
    width:55%;
}

.custom-style .el-segmented {
    margin-top: 15%;
    margin-left: 30%;
    width:40%;
    font-size: 40px;
  --el-segmented-item-selected-color: #FFFFFF;
  --el-segmented-item-selected-bg-color:#1D5B5E;
  --el-border-radius-base: 30px;
}

.login-container{
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
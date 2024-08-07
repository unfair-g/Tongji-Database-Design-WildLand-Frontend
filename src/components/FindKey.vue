<template>
<div class="bg">
    <div class="container">
        <h1 style="color:#1D5B5E">找回密码</h1>
        <el-form
        label-position="top"
        label-width="auto"
        :model="findkey"
        :rules="rules"
        ref="formRef"
        style="max-width: 600px;margin-top: 5%;padding-right:5%"
        >
            <el-form-item label="用户名" prop="user_name">
            <el-input v-model="findkey.user_name" placeholder="请输入您的用户名"  :prefix-icon="User"/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone_number">
            <el-input v-model="findkey.phone_number" placeholder="请输入您的手机号"  :prefix-icon="Iphone"/>
            </el-form-item>
            <el-form-item label="密码" prop="newpassword">
            <el-input type="password" v-model="findkey.newpassword" placeholder="请输入您的新密码" :prefix-icon="Key"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmpassword">
            <el-input type="password" v-model="findkey.confirmpassword" placeholder="请确认密码" :prefix-icon="Key"/>
            </el-form-item>
        </el-form>
        <el-button v-bind:disabled="loginDisabled" class="loginbutton" type="primary" color="#1D5B5E" @click="Login">登录</el-button>
    </div>
</div>
</template>

<script setup>
import router from '../router'
import axios from '@/axios'
import { reactive,ref } from 'vue'
import { User, Key, Iphone } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import global from '@/store/global'
import CryptoJS from 'crypto-js'

const findkey = reactive({
    user_name: '',
    phone_number: '',
    newpassword: '',
    confirmpassword: ''
})

const formRef = ref()
const loginDisabled = ref(false)

const validateConfirmPassword = (rule, value, callback) => {
      if (value !== findkey.newpassword) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    };

const rules = ref({
    user_name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    phone_number: [
    { required: true, message: '请输入您的手机号码',trigger: 'blur' },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入规范的手机号码', trigger: 'blur' },
    ],
    newpassword: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    confirmpassword: [
        { required: true, message: '请确认您的密码', trigger: 'blur' },
        { validator: validateConfirmPassword, message: '两次输入密码不一致！', trigger: 'blur' }
    ]
})

const Login = () => {
  loginDisabled.value = true
  formRef.value.validate(async (valid) => {
    if(valid){
      try {
          const hashedPassword = CryptoJS.SHA256(findkey.newpassword).toString()
          const response = await axios.post('/api/Users/resetPassword', {
            user_name: findkey.user_name,
            phone_number:findkey.phone_number,
            new_password: hashedPassword
          });
          ElMessage.success('密码重置成功！');
          global.Login = true;
          //global.userId = response.data.data.user_id;
          router.push({ path: '/home' });
          console.log('登录成功', response)
        } catch (error) {
          ElMessage.error(error.response.data.message)
          console.error('登录失败', error)
        }
      }
    else {
      ElMessage.error('请完善信息！');
    }
  })
  loginDisabled.value = false
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
    margin-top: 20%;
}

.loginbutton{
    margin-left: 32%;
    width:calc(200vw * 80 / 1920);
    height:calc(120vw * 30 / 1920);
}

</style>
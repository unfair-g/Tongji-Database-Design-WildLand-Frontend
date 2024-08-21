<template>
<div class="white-bg">
    <div class="custom-style">
    <el-segmented v-model="role" :options="options" :block="true"/>
    </div>
    <div class="login-container">
    <el-form
    label-position="top"
    label-width="auto"
    :model="user"
    :rules="rules"
    ref="userRef"
    style="max-width: 600px;padding-right:5%"
    >
    <el-form-item label="用户名" prop="user_name">
      <el-input v-model="user.user_name" placeholder="请输入您的用户名"  :prefix-icon="User"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="user.password" placeholder="请输入密码" :prefix-icon="Key"/>
    </el-form-item>
  </el-form>
  <el-button v-bind:disabled="loginDisabled" class="loginbutton" type="primary" color="#1D5B5E" @click="Login">登录</el-button>
  <div class="others">
      <router-link to="/enter/findkey" style="color:#888888;text-decoration: none">忘记密码</router-link>
      <router-link to="/enter/enrollment" style="margin-left:auto;margin-right: 5%;color:black;text-decoration: none">注册账号</router-link>
  </div>
    </div>
</div>
</template>

<script setup>
import router from '../router'
import axios from '@/axios'
import { reactive } from 'vue'
import { User, Key } from '@element-plus/icons-vue'
import { ref,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import global from '@/store/global'
import { saveToSessionStorage } from '@/store/global'
import CryptoJS from 'crypto-js'

const role = ref('游客')

const options = ['游客', '管理员']

const loginDisabled = ref(false)

const userRef=ref()

const user = reactive({
    user_name: '',
    password: '',
})

const rules = ref({
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const Login = () => {
  loginDisabled.value = true
  userRef.value.validate(async (valid) => {
    if(valid){
      if (role.value == "游客") {
        try {
          const hashedPassword = CryptoJS.SHA256(user.password).toString()
          const response = await axios.post('/api/Users/login', {
            user_name: user.user_name,
            password: hashedPassword
          });
          router.push({ path: '/home' });
          global.Login = true;
          global.userId = response.data.data.user_id;
          saveToSessionStorage(true,response.data.data.user_id,true);
          ElMessage.success('登录成功！');
        } catch (error) {
          if(error.response)
            ElMessage.error(error.response.data.message)
          else
            ElMessage.error(error.message)
          loginDisabled.value = false
        }
      }
      else {
        try {
          const response = await axios.post('/api/Administrators/login', {
              admin_name: user.user_name,
              password: user.password
          });
          saveToSessionStorage(true, response.data.admin_id,true)
          global.Login = true;
          global.userId = response.data.admin_id;
          router.push({ path: '/administrator' });
          ElMessage.success('登录成功！');
          console.log('登录成功', response);
      } catch (error) {
          if(error.response)
            ElMessage.error(error.response.data.message)
          else
            ElMessage.error(error.message)
          console.error('登录失败', error);
          loginDisabled.value = false;
}
      }
    }
    else {
      ElMessage.error('请完善登录信息！');
      loginDisabled.value = false
    }
  })
}

 onMounted(() => {
   if (global.Login) {
     global.Login = false;
     global.userId = 0;
     sessionStorage.clear();
   }

  });

</script>

<style>
.white-bg{
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
    display: flex;
}

</style>
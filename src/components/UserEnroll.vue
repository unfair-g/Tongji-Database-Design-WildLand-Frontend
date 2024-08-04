<template>
<div class="bg">
    <div class="container">
        <h1 style="color:#1D5B5E">游客注册</h1>
    <el-form
    :rules="rules"
    :model="newuser"
    ref="formRef"
    label-position="top"
    label-width="auto"
    style="max-width: 600px; margin-top:5%; margin-bottom: 8%;padding-right:5%"
    >
    <Avatar />
    <el-form-item label="用户名" prop="user_name">
      <el-input v-model="newuser.user_name" placeholder="请输入您的用户名"  :prefix-icon="User"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="newuser.password" placeholder="请输入密码" :prefix-icon="Key"/>
    </el-form-item>
     <el-form-item label="确认密码" prop="confirmpassword">
      <el-input type="password" v-model="newuser.confirmpassword" placeholder="请确认密码" :prefix-icon="Key"/>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone_number">
      <el-input v-model="newuser.phone_number" placeholder="请输入您的手机号码" :prefix-icon="Iphone"/>
    </el-form-item>
     <el-form-item label="邮箱" prop="email">
      <el-input v-model="newuser.email" placeholder="请输入您的邮箱" :prefix-icon="Message"/>
    </el-form-item>
    <div style="display: flex;">  
    <el-form-item label="生日" prop="birthday">
      <el-date-picker
        v-model="newuser.birthday"
        type="date"
        placeholder="请选择您的生日"
        :disabled-date="disabledDate"
      />
    </el-form-item>
    <el-form-item label="IP" style="margin-left: auto;width:40%;" prop="location">
       <el-select
          v-model="newuser.location"
          placeholder="请选择您所在的城市"
        >
         <el-option
            v-for="city in citys"
            :key="city"
            :value="city"
          />
      </el-select>
    </el-form-item>
    </div>
  </el-form>
  <div>
    <el-button class="cancelbutton" @click="toWelcomePage">取消</el-button>
    <el-button class="checkbutton" v-bind:disabled="loginDisabled" tyype="primary" color="#1D5B5E" @click="onSubmit">登录</el-button>
    </div>
    </div>
</div>
</template>

<script setup>
import router from '../router'
import axios from 'axios'
import { ref,reactive } from 'vue'
import { User, Key, Iphone,Message } from '@element-plus/icons-vue'
import Avatar from '../components/AvatarPicker.vue'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'

const loginDisabled = ref(false)

const citys = ref([
    '上海',
    '北京' , 
    '安徽' ,
    '内蒙古',
    '浙江' 
])

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

const newuser = reactive({
  user_name: '',
  password: '',
  confirmpassword:'',
  email: '',
  phone_number: '',
  gender: 'f',
  birthday: '',
  location: ''
})

const formRef = ref()

const validateConfirmPassword = (rule, value, callback) => {
      if (value !== newuser.password) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    };

const rules = ref({
   user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  confirmpassword: [
    { required: true, message: '请确认您的密码', trigger: 'blur' },
    { validator: validateConfirmPassword,  message: '两次输入密码不一致！',trigger: 'blur' }
  ],
  email: [
     { type: 'email', message: '请输入规范的邮箱', trigger: 'blur' }
  ],
  phone_number: [
    { required: true, message: '请输入您的手机号码',trigger: 'blur' },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入规范的手机号码', trigger: 'blur' },
  ],
  birthday: [
    { required: true, message: '请输入生日', trigger: 'change' }
  ],
  location: [
    { required: true, message: '请选择IP地址', trigger: 'change' }
  ],
})

const onSubmit = () => {
      loginDisabled.value=true
      formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            const hashedPassword = CryptoJS.SHA256(newuser.password).toString()
            const response = await axios.post('https://localhost:7218/api/Users/register', {
              user_name: newuser.user_name,
              phone_number: newuser.phone_number,
              password: hashedPassword,
              gender: 'f',
              birthday: newuser.birthday,
              location: newuser.location,
              email: newuser.email
            });
            ElMessage.success('注册成功！');
            toHomePage()
            console.log('User registered:', response.data);
          } catch (error) {
            ElMessage.error(error.response.data.message);
            console.error('Error registering user:', error);
          }
        } else {
          ElMessage.error('请完善注册信息！');
        }
      });
      loginDisabled.value=false
    };


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
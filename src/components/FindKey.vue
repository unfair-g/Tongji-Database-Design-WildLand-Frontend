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
            <el-form-item label="手机号" prop="phone_number">
            <div style="display: flex;width: 100%;">
            <el-input v-model="findkey.phone_number" placeholder="请输入您的手机号"  :prefix-icon="Iphone" />
            <el-button v-if="sendDisabled" color="#1D5B5E" @click="sendCode">发送验证码</el-button>
            <el-button v-else color="#1D5B5E" disabled>
            <el-countdown
              format="ss"
              :value="deadline"
              @finish="sendDisabled=true"
            />
            </el-button>
            </div>
            </el-form-item>
            <el-form-item label="确认验证码" prop="code">
            <el-input v-model="findkey.code" placeholder="请输入验证码" :prefix-icon="Check"/>
            </el-form-item>
            <el-form-item label="密码" prop="newpassword">
            <el-input type="password" show-password :disabled="keyDisabled" v-model="findkey.newpassword" placeholder="请输入您的新密码" :prefix-icon="Key"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmpassword">
            <el-input type="password" show-password :disabled="keyDisabled" v-model="findkey.confirmpassword" placeholder="请确认密码" :prefix-icon="Key"/>
            </el-form-item>
        </el-form>
        <div style="display: flex;padding-right:10%;">
        <el-button class="loginbutton" @click="toWelcomePage">取消</el-button>
        <el-button v-bind:disabled="loginDisabled" class="loginbutton" type="primary" color="#1D5B5E" @click="Login">确认</el-button>
        </div>
    </div>
</div>
</template>

<script setup>
import router from '../router'
import axios from '@/axios'
import { reactive,ref } from 'vue'
import { Key, Iphone, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'

const findkey = reactive({
    code: '',
    phone_number: '',
    newpassword: '',
    confirmpassword: ''
})

const formRef = ref()
const loginDisabled = ref(false)
const sendDisabled = ref(true)
const keyDisabled = ref(true)
const deadline = ref(); // 一分钟倒计时
const phoneRegex = /^1[3-9]\d{9}$/;

const sendCode = async () => {
  if (phoneRegex.test(findkey.phone_number)) {
    try {
      await axios.post('/api/Register/SendVerificationCode',
        {
          phonenumber: findkey.phone_number,
          type: '重置密码'
      },{
        params: {
          phonenumber: findkey.phone_number,
          type: '重置密码'
        }
      },);
      keyDisabled.value = false;
      sendDisabled.value = false;
      deadline.value = Date.now() + 60000; // 重置为一分钟
    } catch (error) {
      ElMessage.error(error.message)
    }
  }
}

const validateConfirmPassword = (rule, value, callback) => {
      if (value !== findkey.newpassword) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    };

const rules = ref({
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
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
          await axios.post('/api/Users/fetchPassword', {
            phonenumber: findkey.phone_number,
            verificationCode:findkey.code,
            newPassword: hashedPassword
          }, {
            params: {
              phonenumber: findkey.phone_number,
              verificationCode:findkey.code,
              newPassword: hashedPassword
            }
          });
          ElMessage.success('密码重置成功！');
          router.push({ path: '/enter/login' });
      } catch (error) {
          ElMessage.error(error.response.data.message)
        }
      }
    else {
      ElMessage.error('请完善信息！');
    }
  })
  loginDisabled.value = false
}

function toWelcomePage() {
  router.push({path: '/'})
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
    margin-left: auto;
    margin-right: auto;
    width:calc(200vw * 80 / 1920);
    height:calc(120vw * 30 / 1920);
}

::v-deep .el-input-group__append{
  color: #1D5B5E;
}

</style>
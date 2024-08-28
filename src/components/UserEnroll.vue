<template>
  <div class="white-bg">
    <div class="form-container">
      <el-scrollbar height="85vh">
        <h1 style="color:#1D5B5E">游客注册</h1>
    <el-form
    :rules="rules"
    :model="newuser"
    ref="formRef"
    label-position="top"
    label-width="auto"
    style="max-width: 600px; margin-top:5%; margin-bottom: 3%;padding-right:5%"
    >
    <el-form-item prop="avatar">
     <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    @change="handleFileChange"
  >
    <el-avatar v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    </el-form-item>
    <el-form-item label="用户名" prop="user_name">
      <el-input v-model="newuser.user_name" placeholder="请输入您的用户名"  :prefix-icon="User"/>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone_number">
     <div style="display: flex;width: 100%;">
            <el-input v-model="newuser.phone_number" placeholder="请输入您的手机号"  :prefix-icon="Iphone" />
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
        <el-input v-model="newuser.code" placeholder="请输入验证码" :prefix-icon="Check"/>
      </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input :disabled="keyDisabled" type="password" v-model="newuser.password" placeholder="请输入密码" :prefix-icon="Key"/>
    </el-form-item>
     <el-form-item label="确认密码" prop="confirmpassword">
      <el-input :disabled="keyDisabled" type="password" v-model="newuser.confirmpassword" placeholder="请确认密码" :prefix-icon="Key"/>
    </el-form-item>
     <el-form-item label="邮箱" prop="email">
      <el-input :disabled="keyDisabled" v-model="newuser.email" placeholder="请输入您的邮箱" :prefix-icon="Message"/>
    </el-form-item>
    <div style="display: flex;"> 
    <el-form-item label="性别" style="margin-right: auto;width:35%">
      <el-select
        v-model="newuser.gender"
        placeholder="请选择您的性别"
        :disabled="keyDisabled"
      >
      <el-option value="男"/>
      <el-option value="女"/>
    </el-select>
    </el-form-item>
    <el-form-item label="生日" prop="birthday" style="margin-left: auto;width:40%">
      <el-date-picker
        v-model="newuser.birthday"
        type="date"
        placeholder="请选择您的生日"
        :disabled-date="disabledDate"
        :disabled="keyDisabled"
      />
    </el-form-item>
    </div>
  </el-form>
  <div>
    <el-button class="cancelbutton" @click="toWelcomePage">取消</el-button>
    <el-button class="checkbutton" v-bind:disabled="loginDisabled" tyype="primary" color="#1D5B5E" @click="onSubmit">确认</el-button>
    </div>
  </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import router from '../router'
import axios from '@/axios'
import { ref,reactive } from 'vue'
import { User, Key, Iphone,Message,Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import global,{saveToSessionStorage,provinceMap} from '@/store/global'

const loginDisabled = ref(false)
const sendDisabled = ref(true)
const keyDisabled = ref(true)
const deadline = ref(); // 一分钟倒计时
const phoneRegex = /^1[3-9]\d{9}$/;

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

const sendCode = async () => {
  if (phoneRegex.test(newuser.phone_number)) {
    try {
      await axios.post('/api/Register/SendVerificationCode',
        {
          phonenumber: newuser.phone_number,
          type: '注册新用户'
      },{
        params: {
          phonenumber: newuser.phone_number,
          type: '注册新用户'
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

const imageUrl = ref(require('../assets/default_avatar.png'))
const newuser = reactive({
  avatar:imageUrl,
  user_name: '',
  password: '',
  confirmpassword:'',
  email: '',
  phone_number: '',
  gender: '',
  birthday: '',
  location: '',
  code:''
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
  code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ],
  avatar: [
    { required: true, message: '请上传您的头像', trigger: 'change' }
  ],
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 10, message: '用户名长度不超过10位', trigger: 'blur' },
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
  ]
})

const formData = new FormData();
const avatar_upload=ref(false)

const beforeAvatarUpload = (file) => {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'

      if (!isJPGorPNG) {
        ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }
      
      avatar_upload.value=true
      formData.append('file', file);
      ElMessage.success('上传头像成功')

      return true;
}

const handleFileChange = (file) => {
  if (avatar_upload.value==true) {
    imageUrl.value = URL.createObjectURL(file.raw)
    newuser.avatar = file;
  }
}

const addLocation = async () => {
  try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;

        const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=51f79bed5ff44b6dbfb814168e68d70d&ip=${ip}`);
        const province = geoResponse.data.state_prov;
      
        const chineseProvince = provinceMap[province] || province;
        newuser.location = chineseProvince;
        
      } catch (error) {
        console.error('Error fetching location:', error);
        ElMessage.error('获取定位信息失败');
      }
}

const onSubmit = () => {
  loginDisabled.value = true
      formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            await addLocation();
            const hashedPassword = CryptoJS.SHA256(newuser.password).toString()
            if (newuser.gender == '女')
              newuser.gender = 'f';
            else if (newuser.gender == '男')
              newuser.gender = 'm';
            const response = await axios.post(`/api/Users/register_test/${newuser.user_name}/${newuser.phone_number}/${hashedPassword}`,
              formData, {
                params: {
                  Email: newuser.email,
                  Gender: newuser.gender,
                  Birthday: newuser.birthday,
                  IP: newuser.location,
                  verificationCode:newuser.code
                },
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            });
            ElMessage.success('注册成功！');
            saveToSessionStorage(true, response.data.data.user_id,true)
            global.Login = true;
            global.userId = response.data.data.user_id;
            toHomePage()
            console.log('User registered:', response.data);
          } catch (error) {
            ElMessage.error(error.message);
            loginDisabled.value=false
          }
        } else {
          ElMessage.error('请完善注册信息！');
          loginDisabled.value=false
        }
      });
    };


function toHomePage() {
  router.push({path: '/home'})
}

function toWelcomePage() {
  router.push({path: '/'})
}

</script>

<style>

.white-bg{
    background-color:rgb(255,255,255,80%);
    bottom :0;
    left:0;
    min-height:100%;
    width:55%;
    position:absolute;
}

.form-container{
    background-color: #FFFFFF;
    box-shadow: 0 0 5px 1px #888888;
    padding-left:4%;
    padding-top:2%;
    padding-bottom:2%;
    margin-left:18%;
    margin-right:20%;
    margin-top: 5%;
    margin-bottom: 5%;
}

.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
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

.avatar-uploader{
  margin-left: 30%;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
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
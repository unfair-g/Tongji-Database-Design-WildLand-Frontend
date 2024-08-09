<template>
    <div class="personalcenter">
        <el-row>
            <el-col :span="2"><h2>个人信息</h2></el-col>
            <el-col :span="4"><el-icon style="font-size:25px;cursor: pointer;color:#1D5B5E;margin-top: 1.5%;" @click="dialogFormVisible = true"><Edit /></el-icon></el-col>
        </el-row>
        <el-row style="margin-top:1%">
        <el-col :span="2">
            <el-avatar v-if="userInfo.gender=='f'" :src="avatarfemale" style="width:100px;height:100px"/>
            <el-avatar v-else :src="avatarmale" style="width:100px;height:100px"/>
        </el-col>
        <el-col :span="10">
            <el-row style="font-weight: bold;font-size:25px;margin-top: 1%">
                <el-col :span="4">{{ userInfo.user_name }} </el-col>
                <el-col :span="5">
                    <el-tag v-if="userInfo.outdoor_master_title==='1'" color="#1D5B5E" size="large" effect="dark" round>户外达人</el-tag>
                    <el-tag v-else type="info" size="large" effect="dark" @click="dialogVisible = true" round>户外达人</el-tag>
                </el-col>
            </el-row>
            <el-row style="min-width:100%;margin-top: 2%">
            <el-col :span="7">ID:{{ userInfo.user_id }}</el-col>
            <el-col :span="3">{{ user.fans }} 粉丝</el-col>
            <el-col :span="3">{{ user.follows }} 关注</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <div style="font-weight:bold;margin-top:1%">个性签名</div>
            <div style="margin-top:2%">{{ userInfo.personal_signature }}</div>
        </el-col>
        </el-row>
        <el-divider />
        <el-descriptions
            direction="vertical"
            column="5"
        >
            <el-descriptions-item width="20%">
                <template #label><div class="item-label">手机</div></template>
                {{ userInfo.phone_number }}
            </el-descriptions-item>
            <el-descriptions-item width="20%">
                <template #label><div class="item-label">邮箱</div></template>
                {{ userInfo.email }}
            </el-descriptions-item>
            <el-descriptions-item width="20%">
                 <template #label><div class="item-label">生日</div></template>
                {{ userInfo.birthday }}
            </el-descriptions-item>
            <el-descriptions-item width="20%">
                 <template #label><div class="item-label">IP</div></template>
                {{ userInfo.location }}
            </el-descriptions-item>
            <el-descriptions-item width="20%">
                 <template #label><div class="item-label">钱包</div></template>
                {{ userInfo.points }}
                 <el-button type="primary" color="#1D5B5E" round @click="ifCharge = true" style="margin-left:20%">充值</el-button>
            </el-descriptions-item>
        </el-descriptions>
    </div>

    <el-dialog
    v-model="ifCharge"
    title="钱包充值"
    width="500"
    draggable="true"
    align-center="true"
  >
    <span style="margin-right: 5%;">请选择充值数目</span>
    <el-input-number v-model="num" :min="1" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="ifCharge = false">取消</el-button>
        <el-button type="primary" color="#1D5B5E" @click="dialogVisible = false">
          确认充值
        </el-button>
      </div>
    </template>
  </el-dialog>

    <el-dialog v-model="dialogFormVisible" title="编辑资料" width="500" align-center="true">
        <AvatarPicker />
            <el-form
                label-position="top"
                label-width="auto"
                :model="user"
                :rules="rules"
                ref="formRef"
                style="max-width: 600px; margin-top:5%; margin-bottom: 10%;"
                >
                <el-form-item label="用户名">
                <el-input v-model="user.user_name" placeholder="请输入您的昵称"/>
                </el-form-item>
                <el-form-item label="性别">
                 <el-select
                    v-model="user.gender"
                    placeholder="请选择性别"
                    size="large"
                >
                <el-option value="男"/>
                <el-option value="女"/>
                </el-select>
                </el-form-item>
                <el-form-item label="生日">
                <el-date-picker
                    v-model="user.birthday"
                    type="date"
                    placeholder="请选择您的生日"
                    style="width:500px"
                />
                </el-form-item>
                 <el-form-item label="地址">
                 <el-select
                    v-model="user.location"
                    placeholder="请选择您所在的城市"
                    size="large"
                >
                <el-option
                    v-for="city in citys"
                    :key="city.value"
                    :value="city.value"
                />
                </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone_number">
                <el-input v-model="user.phone_number" placeholder="请输入您的手机号码"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email" placeholder="请输入您的邮箱" :prefix-icon="Key"/>
                </el-form-item>
                <el-form-item label="个性签名">
                <el-input v-model="user.personal_signature" placeholder="介绍一下您自己" />
                </el-form-item>
            </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit" color="#1D5B5E">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>

    <el-dialog
        v-model="dialogVisible"
        title="达人申请表"
        width="500"
    >
        <el-form 
        :model="form" 
        label-width="auto" 
        label-position="top"
        style="max-width: 600px"
        >
        
         <el-form-item label="擅长领域">
            <el-input v-model="ept_field" placeholder="请输入您擅长的领域"/>
        </el-form-item>
        <el-form-item label="户外经历">
            <el-input v-model="experience" type="textarea" placeholder="请输入您的户外经历" />
        </el-form-item>
        </el-form>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false" color="#1D5B5E">确认</el-button>
        </div>
        </template>
    </el-dialog>
</template>

<script>
import AvatarPicker from './AvatarPicker.vue'
import global from '@/store/global'
import axios from '@/axios'
import { ElMessage } from "element-plus"
import { onMounted,ref,reactive } from 'vue'

export default {
    components: {
        AvatarPicker
    },
    data() {
        return {
            num:5,
            avatarfemale:require('../assets/avatar-female.jpg'),
            avatarmale: require('../assets/avatar-male.jpg'),
            dialogVisible: false,
            ept_field: "",
            experience: "",
            citys: [
                { value: '上海' },
                { value: '北京' }, 
                { value: '安徽' },
                { value: '内蒙古' },
                { value: '浙江' }
            ]
        }
    },
    setup() {
        const dialogFormVisible = ref(false);
        const ifCharge = ref(false);

        const userInfo = ref({}); 

        const user = reactive({
                user_name: '',
                gender: '',
                birthday: '',
                phone_number: '',
                location: '',
                email: '',
                personal_signature:'',
                fans: 0,
                follows:0
        });

        const formRef = ref()

        const rules = ref({
            email: [
                { type: 'email', message: '请输入规范的邮箱', trigger: 'blur' }
            ],
            phone_number: [
                { message: '请输入您的手机号码',trigger: 'blur' },
                { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入规范的手机号码', trigger: 'blur' },
            ]
        })

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/Users/getUserInfo/${global.userId}`);
          userInfo.value = response.data.data;
          userInfo.value.birthday = userInfo.value.birthday.substring(0, 10);
          user.user_name = userInfo.value.user_name;
          if (userInfo.value.gender == 'f')
              user.gender = '女';
          else
              user.gender = '男';
          user.birthday = userInfo.value.birthday;
          user.phone_number = userInfo.value.phone_number;
          user.location = userInfo.value.location;
          user.email = userInfo.value.email;
          user.personal_signature = userInfo.value.personal_signature;
      } catch (error) {
        ElMessage.error(error.message);
      }
        }

    const onSubmit = () => {
      formRef.value.validate(async (valid) => {
          if (valid) {
              const gender = (user.gender === '女' ? 'f' : 'm')
          try {
            const response = await axios.put(`/api/Users/updatePersonalInfo/${global.userId}`, {
              userName: user.user_name,
              gender: gender,
              birthday: user.birthday,
              location: user.location,
              phoneNumber: user.phone_number,
              email: user.email,
              personal_signature:user.personal_signature
            });
            ElMessage.success('信息修改成功！');
              console.log('User registered:', response.data);
              fetchUser();
              dialogFormVisible.value = false
          } catch (error) {
            ElMessage.error(error.message);
            console.error('Error update:', error);
          }
        } else {
          ElMessage.error('请完善信息！');
        }
      });
    };

    onMounted(() => {
      fetchUser();
    });

    return {
        dialogFormVisible,
        ifCharge,
        userInfo,
        user,
        rules,
        formRef,
        onSubmit
    }
  }
}
</script>

<style scoped>
   .personalcenter{
    height:fit-content;
    background-color: rgb(255,255,255,80%);
    box-shadow: 0 0 5px 1px #888888;
    padding:1%;
    margin-bottom:1%;
   }

   .item-label{
    font-weight:bold;
   }
   
</style>
<template>
    <div class="personalcenter">
        <el-row>
            <el-col :span="2"><h2>个人信息</h2></el-col>
            <el-col :span="4"><el-icon style="font-size:25px;cursor: pointer;color:#1D5B5E;margin-top: 1.5%;" @click="dialogFormVisible = true"><Edit /></el-icon></el-col>
        </el-row>
        <el-row style="margin-top:1%">
        <el-col :span="2">
            <el-avatar :src="userInfo.portrait" style="width:100px;height:100px" />
        </el-col>
        <el-col :span="12">
            <el-row style="font-weight: bold;font-size:25px;margin-top: 1%">
                <el-col :span="6">
                  <span>{{ userInfo.user_name }} </span>
                  <span v-if="userInfo.gender==='f'" style="margin-left: 10%;color:#FF82BF"><el-icon><Female /></el-icon></span>
                  <span v-if="userInfo.gender==='m'" style="margin-left: 10%;color:#3F48CC"><el-icon><Male /></el-icon></span>
                </el-col>
                <el-col :span="6">
                    <el-tag v-if="userInfo.outdoor_master_title==='1'" color="#1D5B5E" size="large" effect="dark" round>户外达人</el-tag>
                    <el-tag v-else-if="userInfo.outdoor_master_title==='0'&&!TalentStatus" type="info" size="large" effect="dark" @click="dialogVisible = true" round>户外达人</el-tag>
                    <el-tag v-else type="info" size="large" effect="dark" round>户外达人：审核中</el-tag>
                </el-col> 
            </el-row>
            <el-row style="min-width:100%;margin-top: 2%">
            <el-col :span="7">ID:{{ userInfo.user_id }}</el-col>
            <el-col :span="3">{{ userInfo.fans }} 粉丝</el-col>
            <el-col :span="3"><span @click="isListVisible=true">{{ userInfo.follows }} 关注</span></el-col>
            <FollowedList v-model="isListVisible"/>
            </el-row>
        </el-col>
        <el-col :span="10">
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
    <el-alert v-if="userInfo.mute_status=='1'" type="error" show-icon :closable="false">
      <template #title>您因发表不当评论已被禁言，禁言至{{ userInfo.punish_end_time }}结束</template>
    </el-alert>
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
        <el-button type="primary" color="#1D5B5E" @click="onCharge">
          确认充值
        </el-button>
      </div>
    </template>
  </el-dialog>

    <el-dialog v-model="dialogFormVisible" title="编辑资料" width="500" align-center="true">
      <el-form
          label-position="top"
          label-width="auto"
          :model="user"
          :rules="rules"
          ref="UserformRef"
          style="max-width: 600px; margin-top:2%; margin-bottom: 10%;"
          >
          <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              @change="handleFileChange"
            >
          <el-avatar :src="user.avatar" class="avatar"/>
          </el-upload>
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
                    :disabled-date="disabledDate"
                    style="width:500px"
                />
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
        <el-button @click="dialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="ResetUserInfo" color="#1D5B5E">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>

    <el-dialog
        v-model="dialogVisible"
        title="达人申请表"
        width="500"
        :before-close="resetForm"
    >
        <el-form 
        :model="expert" 
        label-width="auto" 
        label-position="top"
        :rules="rules"
        ref="ExpertformRef"
        style="max-width: 600px"
        >
        <el-form-item label="资质证明" prop="image">
          <el-upload
            class="image-uploader"
            :show-file-list="false"
            @change="handleImageChange"
            :before-upload="beforeImageUpload"
          >
            <img v-if="expert.image" :src="expert.image" class="image" />
            <el-icon v-else class="image-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
         <el-form-item label="擅长领域" prop="ept_field">
            <el-input v-model="expert.ept_field" placeholder="请输入您擅长的领域"/>
        </el-form-item>
        <el-form-item label="户外经历" prop="experience">
            <el-input v-model="expert.experience" type="textarea" placeholder="请输入您的户外经历" />
        </el-form-item>
        </el-form>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="resetForm">取消</el-button>
            <el-button type="primary" @click="onSubmit()" color="#1D5B5E">确认</el-button>
        </div>
        </template>
    </el-dialog>
</template>

<script>
import global from '@/store/global'
import axios from '@/axios'
import FollowedList from './FollowedList.vue'
import { ElMessage } from "element-plus"
import { onMounted, ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'

export default {
  components: {
    Plus,
    FollowedList
  },
    data() {
        return {
          isListVisible: false,
        }
  },
  methods: {
    beforeImageUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        ElMessage.error('上传图片只能是 JPG 或 PNG 格式!');
        return false;
      }
      if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 2MB!');
        return false;
      }
      this.Proof.append('file', file);
      return true;
    },
    resetForm() {
      this.ExpertformRef.resetFields();
      this.dialogVisible = false;
    }
    },
    setup() {
        const dialogFormVisible = ref(false);
        const dialogVisible = ref(false);
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
                follows: 0,
                points:0
        });

      const expert = reactive({
          image:null,
          ept_field: '',
          experience:''
      })

      const follows=ref(null)

        const UserformRef = ref()
        const ExpertformRef = ref()

        const rules = ref({
            email: [
                { type: 'email', message: '请输入规范的邮箱', trigger: 'blur' }
            ],
            phone_number: [
                { message: '请输入您的手机号码',trigger: 'blur' },
                { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入规范的手机号码', trigger: 'blur' },
          ],
          image: { required: true, message: '请上传您的资质证明', trigger: 'change' },
          ept_field: { required: true, message: '请填写您擅长的领域', trigger: 'blur' },
          experience: { required: true, message: '请填写您的户外经历', trigger: 'blur' },
        })

const TalentStatus=ref(false)

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/Users/getUserInfo/${global.userId}`);
        userInfo.value = response.data.data.userInfo;
        if (userInfo.value.birthday != null)
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
          user.avatar = userInfo.value.portrait;
          userInfo.value.follows = response.data.data.followingCount;
        userInfo.value.fans = response.data.data.followerCount;
      } catch (error) {
        ElMessage.error(error.message);
      }
      }

      const fetchFollows = async () => {
        try {
          const response = await axios.get(`/api/Follows/getFollowedUsers/${global.userId}`);
          follows.value=response.data.data
        } catch (error) {
          console.error(error)
        }
      }

      const formData = new FormData();
      const Proof = new FormData();
      const avatar_upload=ref(false)

      const beforeAvatarUpload = (file) => {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'

      if (!isJPGorPNG) {
        ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }
      avatar_upload.value=true
      formData.set('file', file);
      ElMessage.success('上传头像成功')

      return false;
}

      const avatarchange = ref(false)

const handleFileChange = (file) => {
  if (avatar_upload.value == true) {
    user.avatar = URL.createObjectURL(file.raw)
    avatarchange.value = true;
  }
      }

      const formaDate = (dt) => {
            let year = dt.getFullYear();
            let month = (dt.getMonth() + 1).toString().padStart(2,'0');
            let date = dt.getDate().toString().padStart(2,'0');
            return `${year}-${month}-${date}`;
      }

    const ResetUserInfo = () => {
      UserformRef.value.validate(async (valid) => {
          if (valid) {
              const gender = (user.gender === '女' ? 'f' : 'm')
            try {
            await axios.put(`/api/Users/updatePersonalInfo/${global.userId}`, {
              userName: user.user_name,
              gender: gender,
              birthday: formaDate(user.birthday),
              location: user.location,
              phoneNumber: user.phone_number,
              email: user.email,
              personal_signature: user.personal_signature
            });
            if (avatarchange.value) {
              try {
                await axios.post(`/api/Users/upload_user_portrait/${global.userId}`,
                  formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  }
                })
              } catch (error) {
                ElMessage.error(error.message);
              }
            }
            dialogFormVisible.value = false;
            window.location.reload();
            ElMessage.success('信息修改成功！');
          } catch (error) {
            ElMessage.error(error.message);
            console.error('Error update:', error);
          }
        } else {
          ElMessage.error('请完善信息！');
        }
      });
      };

    const handleImageChange=(file)=> {
        expert.image = URL.createObjectURL(file.raw); 
      }
    
      const onSubmit = () => {
        ExpertformRef.value.validate(async (valid) => {
        if(valid){
          try {
             await axios.post(`/api/TalentCertifications/apply_outdoor_master/${global.userId}`,
              Proof, {
                params: {
                  ept_field: expert.ept_field,
                  experience:expert.experience
                },
              headers: {
                'Content-Type': 'multipart/form-data',
                }
             });
            ElMessage.success('申请成功！');
            dialogVisible.value = false;
          } catch (error) {
              ElMessage.error(error.message);
            }
          }
        else {
          ElMessage.error('请完善信息！');
        }
      })
      }

      const num=ref(5)

    const onCharge=async() =>{
      try {
        await axios.put(`/api/Users/${global.userId}/updateUserPoints`, userInfo.value.points+num.value,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        ElMessage.success('充值成功！')
        fetchUser()
        ifCharge.value = false;
        num.value = 5;
      } catch (error) {
        ElMessage.error(error.message)
      }
      }

      const disabledDate = (time) => {
      return time.getTime() > Date.now()
    }
    
    onMounted(() => {
      fetchUser();
    });

    return {
        dialogFormVisible,
        dialogVisible,
        ifCharge,
        userInfo,
        user,
        expert,
        follows,
        fetchFollows,
        rules,
        UserformRef,
        ExpertformRef,
        beforeAvatarUpload,
        handleFileChange,
        ResetUserInfo,
        handleImageChange,
        Proof,
        TalentStatus,
        onCharge,
        num,
        onSubmit,
        disabledDate
    }
  }
}
</script>

<style scoped>
.el-alert {
  margin-top: 20px;
  margin-bottom: 20px;
  height:50px;
}

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

   .avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  margin-left: 170px;
  margin-bottom: 20px;
}

.image-uploader .image {
  width: 150px;
  height: 150px;
  display: block;
}

.image-uploader{
  margin-left: 32%;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.image-uploader:hover {
  border-color: var(--el-color-primary);
}

.el-icon.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
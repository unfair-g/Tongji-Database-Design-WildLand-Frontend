<template>
  <el-dialog
    title="招募贴发布"
    v-model="localIsRecruitPostDialogVisible"
    width="55%"
    center
    @close="handleClose"
  >
    <div class="publish-container">
      <el-divider></el-divider>
      <div class="publish-info-form">
        <el-form :model="postForm" :rules="rules" ref="postFormRef" @submit.prevent="submitForm" label-width="100px">
          <el-form-item label="帖子标题：" prop="myTitle" style="font-weight: bold;">
            <el-input v-model="postForm.myTitle" placeholder="请输入帖子标题" />
          </el-form-item>
          <el-form-item label="活动时间：" prop="time" style="font-weight: bold;">
            <el-date-picker
              v-model="postForm.time"
              type="datetime"
              placeholder="选择活动具体时间"
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item label="活动地点：" prop="location" style="font-weight: bold;">
            <el-input v-model="postForm.location" placeholder="请输入你的活动地点" />
          </el-form-item>
          <el-form-item label="招募人数：" prop="memberNum" style="font-weight: bold;">
            <el-input v-model="postForm.memberNum" placeholder="请输入你的计划招募人数" />
          </el-form-item>
          <el-form-item label="活动介绍：" prop="summary" style="font-weight: bold;">
            <el-input 
              type="textarea"
              v-model="postForm.summary" 
              placeholder="请输入活动介绍（包括对报名者的要求）" 
              rows="5"
            />
          </el-form-item>
          <el-form-item class="buttons">
            <el-button type="default" @click="handleClose">取消</el-button>
            <el-button type="primary" color="#1D5B5E" native-type="submit" @click="confirmDialog()">立即发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { ElMessage } from "element-plus";
import axios from '@/axios'; // 确保路径是正确的
import { provinceMap } from '@/store/global.js'; // 引入映射表

export default {
  name: 'RecruitPublish',
  props: {
    isRecruitPostDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const postFormRef = ref();

    const postForm = reactive({
      myTitle: '',
      time: '',
      location: '',
      memberNum: '',
      summary: ''
    });

    const rules = ref({
      myTitle: [
        { required: true, message: '请输入帖子标题', trigger: 'blur' }
      ],
      time: [
        { required: true, message: '请选择时间', trigger: 'blur' }
      ],
      location: [
        { required: true, message: '请输入你的活动地点', trigger: 'blur' }
      ],
      memberNum: [
        { required: true, message: '请输入你的计划招募人数', trigger: 'blur' }
      ],
      summary: [
        { required: true, message: '请输入活动介绍（包括对报名者的要求）', trigger: 'blur' }
      ],
    });

    const localIsRecruitPostDialogVisible = ref(props.isRecruitPostDialogVisible);

    const userLocation = ref(''); // 新增变量用于存储用户位置

    watch(() => props.isRecruitPostDialogVisible, (newVal) => {
      localIsRecruitPostDialogVisible.value = newVal;
    });

    watch(localIsRecruitPostDialogVisible, (newVal) => {
      emit('update:isRecruitPostDialogVisible', newVal);
    });

    const submitForm = () => {
      postFormRef.value.validate((valid) => {
        if (valid) {
          console.log('Form submitted:', postForm);
        } else {
          ElMessage.error('表单验证失败');
          return false;
        }
      });
    };

    const resetForm = () => {
      postForm.myTitle = '';
      postForm.time = '';
      postForm.location = '';
      postForm.memberNum = '';
      postForm.summary = '';
    };

    const handleClose = () => {
      localIsRecruitPostDialogVisible.value = false;
      resetForm();
    };

    const getUserLocation = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        console.log('IP Address:', ip);

        const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=51f79bed5ff44b6dbfb814168e68d70d&ip=${ip}`);
        const province = geoResponse.data.state_prov;

        // 使用映射表将英文省份名称转换为中文
        const chineseProvince = provinceMap[province] || province;
        userLocation.value = chineseProvince;
        console.log('User Location:', chineseProvince);
      } catch (error) {
        console.error('Error fetching location:', error);
        ElMessage.error('获取定位信息失败');
      }
    };

    getUserLocation();

    return {
      postFormRef,
      postForm,
      rules,
      localIsRecruitPostDialogVisible,
      submitForm,
      resetForm,
      handleClose,
      getUserLocation,
      userLocation,
    };
  },
  methods: {
    async confirmDialog() {
      const time = this.postForm.time;

      if (!time) {
        ElMessage.error('请选择完整的活动时间');
        return;
      }
      const formattedTime = new Date(time).toISOString();

      const postData = {
        author_id: 123,
        post_position: this.userLocation,
        activity_summary: this.postForm.summary,
        activity_time: formattedTime,
        location: this.postForm.location,
        title: this.postForm.myTitle,
        planned_count: this.postForm.memberNum,
      };
      
      console.log('Post Data:', postData)
      try {
        const response = await axios.post('/api/Posts/PushRecruitment', postData);
        console.log('Post submitted successfully:', response.data);
        this.handleClose(); // 关闭对话框
        ElMessage.success('招募贴发布成功！');
      } catch (error) {
        console.error('Error submitting post:', error);
        this.handleError(error, '发布招募贴失败');
      }
    },
    handleError(error, message) {
      if (error.response) {
        console.error(`${message}:`, error.response.data);
        ElMessage.error(`${message} - 错误代码: ${error.response.status}`);
      } else if (error.request) {
        console.error(`${message}: No response received`);
        ElMessage.error(`${message} - 没有收到响应`);
      } else {
        console.error(`${message}:`, error.message);
        ElMessage.error(`${message} - 错误信息: ${error.message}`);
      }
    },
  }
};
</script>

<style scoped>
.publish-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.el-divider {
  height: 1px;
  background-color: grey; /* 分界线颜色 */
  margin: 20px 0; /* 上下间距 */
  width: 100%;
}
.publish-info-form {
  margin-top: 2px;
  width: 75%;
}
</style>

<template>
  <el-dialog
    title="分享贴发布"
    v-model="localIsSharePostDialogVisible"
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
          <el-form-item label="帖子内容：" prop="content" style="font-weight: bold;">
            <el-input 
              type="textarea" 
              v-model="postForm.content"
              placeholder="请输入帖子内容"
              rows="5"
              
            />
          </el-form-item>

          
          <div class="form-row">
            <div class="left-side">
              <el-form-item label="帖子位置：" prop="location" style="font-weight: bold;">
                <el-button type="primary" color="#1D5B5E" @click="addLocation">点击添加定位</el-button>
                <div v-if="postForm.location" class="location-info">
                您的IP获取成功，IP所在地：{{ postForm.location }}
              </div>
              </el-form-item>
              <div class="map-container"></div>
              
            </div>

            <div class="right-side">
              <el-form-item label="帖子图片：" prop="previewImage" style="font-weight: bold;">
                <el-button type="primary" color="#1D5B5E" @click="triggerUpload">点击添加图片</el-button>
              </el-form-item>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                ref="uploadRef"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
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
import { reactive ,ref} from 'vue'
import {ElMessage} from "element-plus";
import axios from '@/axios'; // 确保路径是正确的
import { provinceMap } from '@/store/global.js'; // 引入映射表


export default {
  name: 'SharePublish',
  props: {
    isSharePostDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isSharePostDialogVisible(newVal) {
      this.localIsSharePostDialogVisible = newVal;
    },
    localIsSharePostDialogVisible(newVal) {
      this.$emit('update:isSharePostDialogVisible', newVal);
    }
  },
  setup() {
    const postFormRef = ref();

    const postForm = reactive({
      myTitle: '',
      content: '',
      previewImage: [], // 预览的图片 URL
      location: ''
    });

    const rules = ref({
      myTitle: [
        { required: true, message: '请输入帖子标题', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '请输入帖子内容', trigger: 'blur' }
      ]
    })

    const fileList = reactive([]); // 已上传的文件列表

    // const handleUpload = () => {
    //   const uploadRef = ref('uploadRef');
    //   const files = uploadRef.value.uploadFiles;

    //   const promises = files.map(file => {
    //     const formData = new FormData();
    //     formData.append('file', file.raw);

    //     return axios.post('/api/Posts/uploadpost_pics', formData)
    //       .then(response => response.data.url);
    //   });

    //   return Promise.all(promises);
    // };

    // const uploadAllImages = async () => {
      // try {
        // const urls = await handleUpload();
        // postForm.previewImage = urls;
        // return true;
      // } catch (error) {
        // console.error('Error uploading images:', error);
        // ElMessage.error('图片上传失败');
        // return false;
      // }
    // };

    const submitForm = () => {
      postFormRef.value.validate(async (valid) => {
        if (valid) {
          console.log('Form submitted:', postForm.value);
        } else {
          ElMessage.error('表单验证失败');
          return false;
        }
      });
  };

    const resetForm = () => {
      postForm.myTitle = '';
      postForm.content = '';
      postForm.previewImage = []; // 预览的图片 URL
      postForm.location = '';
      fileList.length = 0;
    };

    const addLocation = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        console.log('IP Address:', ip);

        const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=51f79bed5ff44b6dbfb814168e68d70d&ip=${ip}`);
        const province = geoResponse.data.state_prov;

        // 使用映射表将英文省份名称翻译为中文
        const chineseProvince = provinceMap[province] || province; // 如果找不到对应的中文名称，就使用英文名称
        postForm.location = chineseProvince;
        
        console.log('Province:', chineseProvince);
      } catch (error) {
        console.error('Error fetching location:', error);
        ElMessage.error('获取定位信息失败');
      }
    };

    const triggerUpload = () => {
      document.querySelector('.upload-demo input[type=file]').click();
    };

    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
    };

    const handlePictureCardPreview = (file) => {
      console.log(file);
    };
    
   
    return {
      postFormRef,
      rules,
      postForm,
      fileList,
      submitForm,
      resetForm,
      addLocation,
      triggerUpload,
      handleRemove,
      handlePictureCardPreview,
      // handleUpload,
      // uploadAllImages,
      
    };
  },
  data() {
    return {
      localIsSharePostDialogVisible: this.isSharePostDialogVisible,
      PostSuccess: false
    };
  },
  methods: {
    handleClose() {
      this.closeDialog();
      this.resetForm();
    },
    closeDialog() {
      this.localIsSharePostDialogVisible = false;
    },
    confirmDialog() {
      const postData = {
        author_id: 123,
        content: this.postForm.content,
        exhibit_status: 1,
        post_kind: 0,
        post_position: this.postForm.location,
        post_time: new Date().toISOString(),
        title: this.postForm.myTitle,
      };
      axios.post('/api/Posts/PushShare', postData)
        .then(response => {
          console.log('Post submitted successfully:', response.data);
          this.PostSuccess = true;
          this.handleClose(); // 关闭对话框
          ElMessage.success('分享贴发布成功！');
        })
        .catch(error => {
          console.error('Error submitting post:', error);
          this.handleError(error, '发布分享贴失败');
        });
      
      this.localIsSharePostDialogVisible = false;
      

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
}

.upload-demo {
  width: 100%;
}
.form-row {
  display: flex;
  justify-content: space-between;
}

.left-side, .right-side {
  width: 48%;
}

.location-info {
  margin-top: 10px;
  font-weight: bold;
  color: #1D5B5E;
}
</style>

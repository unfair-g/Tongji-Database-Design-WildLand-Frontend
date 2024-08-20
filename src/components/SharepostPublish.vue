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
          <el-form-item label="帖子标题：" prop="title" style="font-weight: bold;">
            <el-input v-model="postForm.title" placeholder="请输入帖子标题" />
          </el-form-item>
          <el-form-item label="帖子内容：" prop="content" style="font-weight: bold;">
            <el-input 
              type="textarea" 
              v-model="postForm.content"
              placeholder="请输入帖子内容"
              :rows=5
            />
          </el-form-item>
          
          <div class="form-row">
            <div class="left-side">
              <el-form-item label="帖子位置：" prop="post_position" style="font-weight: bold;">
                <el-button type="primary" color="#1D5B5E" @click="addLocation"  :loading="locationLoading" :disabled="locationLoading">点击添加定位</el-button>
                <div v-if="postForm.post_position" class="location-info">
                  您的IP获取成功，IP所在地：{{ postForm.post_position }}
                </div>
              </el-form-item>
              <!-- <div class="map-container"></div> -->
            </div>

            <div class="right-side">
              <el-form-item label="帖子图片：" prop="previewImage" style="font-weight: bold;">
                <el-button type="primary" color="#1D5B5E" @click="triggerUpload">点击添加图片</el-button>
                <el-upload
                  ref="uploadRef"
                  class="upload-demo"
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeImageUpload"
                  :on-success="handleImageSuccess"
                  :file-list="fileList"
                  :auto-upload="false"
                  @change="handleFileChange"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </div>
          </div>

          <!-- <div> <MyMap /></div> -->

          <el-form-item class="buttons">
            <el-button type="default" @click="handleClose">取消</el-button>
            <el-button type="primary" color="#1D5B5E" native-type="submit">立即发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from '@/axios';
import { provinceMap } from '@/store/global';
import state from '@/store/global'; // 引入state
// import MyMap from '@/components/MapCard.vue';

export default {
  name: 'SharePublish',
  props: {
    isSharePostDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  // components: {
  //   MyMap
  // },
  data() {
    return {
      postForm: {
        title: '',
        content: '',
        previewImage: [],
        post_position: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入帖子标题', trigger: 'blur' },
          { min: 1, max: 40, message: '标题长度不能超过 40 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入帖子内容', trigger: 'blur' }
        ],
        post_position: [
          { required: true, message: '请添加帖子位置', trigger: 'blur' }
        ]
      },
      fileList: [],
      locationLoading: false, // 用于跟踪定位按钮的状态
      localIsSharePostDialogVisible: this.isSharePostDialogVisible
    };
  },
  watch: {
    isSharePostDialogVisible(newVal) {
      this.localIsSharePostDialogVisible = newVal;
    },
    localIsSharePostDialogVisible(newVal) {
      this.$emit('update:isSharePostDialogVisible', newVal);
    }
  },
  methods: {
    handleClose() {
      this.localIsSharePostDialogVisible = false;
      this.resetForm();
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
    async submitForm() {
      this.$refs.postFormRef.validate(async (valid) => {
        if (valid) {
          try {
            // 检查 fileList 是否有文件
            if (this.fileList.length > 9) {
              ElMessage.error('最多只能上传九张图片');
              return;
            }

            const formData = new FormData();
            this.fileList.forEach((file) => {
              console.log('File added to FormData:', file.name); // 检查文件是否被添加
              formData.append('files', file.raw);
            });

            // 日志输出 FormData 内容
            for (let pair of formData.entries()) {
              console.log(pair[0]+ ', ' + pair[1]);
            }

            const author_id = state.userId; 
            const content = encodeURIComponent(this.postForm.content);
            const post_position = encodeURIComponent(this.postForm.post_position);
            const title = encodeURIComponent(this.postForm.title);

            const response = await axios.post(`/api/Posts/PushShareWithPics/${author_id}/${content}/${post_position}/${title}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            console.log('Post submitted successfully:', response.data);
            ElMessage.success('分享贴发布成功！');
            this.handleClose();
          } catch (error) {
            console.error('Error submitting post:', error);
            this.handleError(error, '发布分享贴失败');
          }
        } else {
          ElMessage.error('表单验证失败');
          return false;
        }
      });
    },
    resetForm() {
      this.postForm.title = '';
      this.postForm.content = '';
      this.postForm.previewImage = [];
      this.postForm.post_position = '';
      this.fileList = [];
      this.locationLoading = false; // 重置定位按钮状态
    },
    async addLocation() {
      this.locationLoading = true; // 开始加载状态
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        console.log('IP Address:', ip);

        const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=51f79bed5ff44b6dbfb814168e68d70d&ip=${ip}`);
        const province = geoResponse.data.state_prov;
      
        const chineseProvince = provinceMap[province] || province;
        this.postForm.post_position = chineseProvince;
        
        console.log('Province:', chineseProvince);
      } catch (error) {
        console.error('Error fetching location:', error);
        ElMessage.error('获取定位信息失败');
      } finally {
        this.locationLoading = false; // 结束加载状态
      }
    },
    triggerUpload() {
      this.$refs.uploadRef.$el.querySelector('input[type=file]').click();
    },
    beforeImageUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        ElMessage.error('上传图片只能是 JPG 或 PNG 或 JPEG格式!');
        return false;
      }
      if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    handleImageSuccess(response, file) {
      if (response && response.message === "success") {
        const url = URL.createObjectURL(file.raw);
        this.postForm.previewImage.push(url);
        ElMessage.success('图片上传成功');
      } else {
        console.log('上传图片失败，服务器响应:', response);
        ElMessage.error('上传图片失败');
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      console.log(file);
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList;
      console.log('File list updated:', fileList);
    }
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

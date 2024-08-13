<template>
  <el-dialog
    title="闲置帖"
    v-model="localIsLdlePostDialogVisible"
    width="55%"
    center
    @close="handleClose"
  >
    <div class="publish-container">
      <el-divider></el-divider>
      <el-form :model="postForm" :rules="rules" ref="postFormRef" @submit.prevent="submitForm" label-width="100px">
        <el-form-item label="物品名称：" prop="itemName" style="font-weight: bold;">
          <el-input v-model="postForm.itemName" placeholder="请输入物品名称" />
          <div v-if="errors.itemName" class="error-message">{{ errors.itemName }}</div>
        </el-form-item>
        <el-form-item label="物品简介：" prop="itemDescription" style="font-weight: bold;">
          <el-input 
            type="textarea" 
            v-model="postForm.itemDescription"
            placeholder="请输入物品简介"
            rows="5"
          />
          <div v-if="errors.itemDescription" class="error-message">{{ errors.itemDescription }}</div>
        </el-form-item>
        <el-form-item label="物品新旧：" prop="itemCondition" style="font-weight: bold;">
          <el-input v-model="postForm.itemCondition" placeholder="请输入物品新旧程度" />
          <div v-if="errors.itemCondition" class="error-message">{{ errors.itemCondition }}</div>
        </el-form-item>
        <el-form-item label="物品价格：" prop="itemPrice" style="font-weight: bold;">
          <el-input v-model="postForm.itemPrice" placeholder="请输入物品参考价格"/>
          <div v-if="errors.itemPrice" class="error-message">{{ errors.itemPrice }}</div>
        </el-form-item>

        <div class="form-row">
          <div class="left-side">
            <el-form-item label="物品位置：" prop="itemLocation" style="font-weight: bold;">
              <el-button type="primary" color="#1D5B5E" @click="addLocation" :loading="locationLoading" :disabled="locationLoading">点击添加定位</el-button>
              <div v-if="postForm.itemLocation" class="location-info">
                您的IP获取成功,IP所在地:{{ postForm.itemLocation }}
              </div>
            </el-form-item>
            <div class="map-container"></div>
          </div>

          <div class="right-side">
            <el-form-item label="物品图片：" prop="itemImages" style="font-weight: bold;">
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
        <el-form-item class="buttons">
          <el-button type="default" @click="handleClose">取消</el-button>
          <el-button type="primary" color="#1D5B5E" native-type="submit">立即发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>

  <!-- 发布成功 -->
  <el-dialog 
    v-model="PostSuccess"
    width="40%"
    height="40%"
    v-if="PostSuccess">
    <div class="bg">
      <div class="bg-container">
        <div class="success-container">
          <div class="borrow">
            <el-icon color="green" size="160"><SuccessFilled/></el-icon>
            <div style="font-size:x-large;margin-top:20px;text-align:center;margin-bottom:20px;">发布成功</div>
          </div>
          <div class="success">
            <el-button type="text" class="Pbutton" @click="GoToOrder(product)">查看帖子</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>

import axios from 'axios';
import { ElMessage } from "element-plus";
import  globalState  from '../store/global'; // 引入 global.js 中的状态

export default {
  name: 'LdlePost',
  props: {
    isLdlePostDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      postForm: {
        itemName: '',
        itemDescription: '',
        itemPrice: '',
        itemLocation: '',
        itemImages: [],
        itemCondition:''
      },
      rules: {
        itemName: [
          { required: true, message: '请输入物品名称', trigger: 'blur' }
        ],
        itemDescription: [
          { required: true, message: '请输入物品简介', trigger: 'blur' }
        ],
        itemPrice: [
          { required: true, message: '请输入物品参考价格', trigger: 'blur' }
        ],
        itemLocation: [
          { required: true, message: '请添加物品位置', trigger: 'blur' }
        ],
        itemCondition: [
        { required: true, message: '请添加物品新旧程度', trigger: 'blur' }
        ]
      },
      fileList: [],
      locationLoading: false,
      localIsLdlePostDialogVisible: this.isLdlePostDialogVisible,
      errors: {}
    };
  },
  watch: {
    isLdlePostDialogVisible(newVal) {
      this.localIsLdlePostDialogVisible = newVal;
    },
    localIsLdlePostDialogVisible(newVal) {
      this.$emit('update:isLdlePostDialogVisible', newVal);
    }
  },
  methods: {
    handleClose() {
      this.localIsLdlePostDialogVisible = false;
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
        const postData = {
          author_id: globalState.userId,
          title: `${this.postForm.itemName} - 十分好用，安利`,
          post_time: new Date().toISOString(),
          post_position: this.postForm.itemLocation,
          post_kind: 1,
          exhibit_status: 0,
          condition: this.postForm.itemCondition,
          item_name: this.postForm.itemName,
          item_summary: this.postForm.itemDescription,
          price: parseFloat(this.postForm.itemPrice),
        };
        console.log('订单上传:', postData);
      axios.post('https://localhost:7218/api/Posts/PushLdle', postData,{headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      }
    })
        .then(response => {
          console.log('订单上传成功:', response.data);
          this.PostSuccess = true;
        })
        .catch(error => {
          console.error('上传订单时出错:', error);
        });
    },
    resetForm() {
      this.postForm.itemName = '';
      this.postForm.itemDescription = '';
      this.postForm.itemPrice = '';
      this.postForm.itemLocation = '';
      this.postForm.itemImages = [];
      this.fileList = [];
      this.locationLoading = false;
      this.errors = {};
    },
    async addLocation() {
      this.locationLoading = true;
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=51f79bed5ff44b6dbfb814168e68d70d&ip=${ip}`);
        const province = geoResponse.data.state_prov;
        this.postForm.itemLocation = province;
      } catch (error) {
        this.handleError(error, '获取定位信息失败');
      } finally {
        this.locationLoading = false;
      }
    },
    triggerUpload() {
      this.$refs.uploadRef.$el.querySelector('input[type=file]').click();
    },
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
      return true;
    },
    handleImageSuccess(response) {
      this.postForm.itemImages.push(response.url);
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      const url = URL.createObjectURL(file.raw);
      window.open(url);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    GoToOrder(product) {
      // navigate to order details or handle post success
      this.$router.push({ path: `/order/${product.id}` });
    }
  }
};
</script>

<style scoped>
.publish-container {
  padding: 20px;
}
.form-row {
  display: flex;
  justify-content: space-between;
}
.left-side {
  width: 45%;
}
.right-side {
  width: 45%;
}
.location-info {
  margin-top: 10px;
}
.buttons {
  margin-top: 20px;
}

.bg-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-container {
  background-color: white;
  padding: 40px;
  margin:0px;
  border-radius: 10px;
  text-align: center;
  max-width: 600px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position:relative;
}

.borrow {
  flex: 1;
  margin-top:30px;
}

.success {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: inline-block;
  background-color: #1D5B5E;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom:20px;
}

.Pbutton {
  float: center;
  color:#ddd;
}
</style>

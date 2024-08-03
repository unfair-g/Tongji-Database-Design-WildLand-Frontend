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
        <el-form :model="postForm" ref="postForm" @submit.prevent="submitForm" label-width="100px">
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
import { ref } from 'vue';

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
    const postForm = ref({
      myTitle: '',
      content: '',
      previewImage: [], // 预览的图片 URL
      location: ''
    });

    const fileList = ref([]); // 已上传的文件列表

    const submitForm = () => {
      console.log('Form submitted:', postForm.value);
    };

    const resetForm = () => {
      postForm.value = {
        myTitle: '',
        content: '',
        previewImage: [], // 预览的图片 URL
        location: ''
      };
      fileList.value = [];
    };

    const addLocation = () => {
      console.log('Add location');
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
      postForm,
      fileList,
      submitForm,
      resetForm,
      addLocation,
      triggerUpload,
      handleRemove,
      handlePictureCardPreview
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
      this.localIsSharePostDialogVisible = false
      this.PostSuccess = true
      //添加发布成功逻辑

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

</style>

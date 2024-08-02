<template>
    <el-dialog
    title="闲置帖"
    v-model="LisLdlePostDialogVisible"
    width="55%"
    center="true"
    v-if="!PostSuccess"
    @close="handleClose">
    <div class="container">
      <div class="post-box">
        <el-form :model="postForm" ref="postForm" @submit.prevent="submitForm">
          <el-form-item label="闲置物品名称:" prop="itemName" style="font-weight: bold;">
            <el-input v-model="postForm.itemName" placeholder="请输入物品名称" />
          </el-form-item>
          <el-form-item label="物品简介:" prop="itemDescription" style="font-weight: bold;">
            <el-input type="textarea" v-model="postForm.itemDescription" rows="5" placeholder="请输入物品简介" />
          </el-form-item>
          <el-form-item label="物品价格:" prop="itemPrice" style="font-weight: bold;">
            <el-input v-model="postForm.itemPrice" placeholder="请输入物品参考价格"/>
          </el-form-item>
          <div class="form-row">
            <div class="left-side">
              <el-form-item label="物品位置:" prop="itemLocation" style="font-weight: bold;">
                <el-button type="primary" @click="addLocation">添加定位</el-button>
              </el-form-item>
              <div class="map-container"></div>
            </div>
            <div class="right-side">
              <el-form-item label="物品图片:" prop="itemImages" style="font-weight: bold;">
                  <el-button type="primary" @click="triggerUpload">添加图片</el-button>
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
            <el-button type="default" @click="resetForm">取消</el-button>
            <el-button type="primary" native-type="submit" @click="confirmDialog()">立即发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</el-dialog>

<!--发布成功-->
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
  import { ref } from 'vue';
  
  export default {
    name: 'LdlePost',
    props: {
      isLdlePostDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isLdlePostDialogVisible(newVal) {
      this.LisLdlePostDialogVisible = newVal;
    },
    LisLdlePostDialogVisible(newVal) {
      this.$emit('update:isLdlePostDialogVisible', newVal);
    }
  },
    setup() {
      const postForm = ref({
        itemName: '',
        category: '闲置贴',
        itemDescription: '',
        itemPrice: '',
        itemLocation: '',
        itemImages: [],
      });
  
      const fileList = ref([]);
  
      const submitForm = () => {
        console.log('Form submitted:', postForm.value);
      };
  
      const resetForm = () => {
        postForm.value = {
          itemName: '',
          category: '闲置贴',
          itemDescription: '',
          itemPrice: '',
          itemLocation: '',
          itemImages: [],
        };
        fileList.value = [];
      };
  
      const addLocation = () => {
        console.log('Add location');
      };
  
      const handleRemove = (file, fileList) => {
        console.log(file, fileList);
      };
  
      const handlePictureCardPreview = (file) => {
        console.log(file);
      };

      const triggerUpload = () => {
      document.querySelector('.upload-demo input[type=file]').click();
      };
  
      return {
        postForm,
        fileList,
        submitForm,
        resetForm,
        addLocation,
        handleRemove,
        handlePictureCardPreview,
        triggerUpload,
      };
    },
    methods: {
    handleClose() {
      this.closeDialog();
    },
    closeDialog() {
      this.LisLdlePostDialogVisible = false;
    },
    confirmDialog() {
      this.LisLdlePostDialogVisible = false
      this.PostSuccess = true
      //添加支付成功逻辑
      // 切换支付成功弹窗
    },
    },
    data() {
        return {
            LisLdlePostDialogVisible: this.isLdlePostDialogVisible,
            PostSuccess: false
        }
    }
  };
  </script>
  

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
}

.post-box {
  margin-top:10px;
  background-color: #ffffff; /* White background for the post box */
  padding: 10px;
  max-width: 600px; /* Width of the post box */
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position:relative;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.left-side, .right-side {
  width: 48%;
}

.map-container {
  height: 200px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  margin-top: 10px;
  background-image: url('@/assets/map.png');
  background-size: cover; /* 使背景图覆盖整个容器 */  
  background-position: center; /* 将背景图居中显示 */  
  background-repeat: no-repeat;
}

.upload-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  position:absolute;
  right:15px;
  bottom:5px;
}

.buttons > .el-button:first-child {
  margin-right: 10px;
}

.upload-demo {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

::v-deep .el-form-item__label {  
  color: black !important; /* 使用 !important 以确保覆盖其他样式 */  
  font-weight: bold !important;
  font-size:larger;
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

.el-button{
  background-color: #fff; /* 修改背景颜色 */
  color: #1D5B5e; /* 修改文字颜色 */
  font-weight: bold;
}
.el-button:hover{
  background-color: #2e5e5e; /* 修改悬停背景颜色 */
  color: #fff; /* 修改文字颜色 */
  font-weight: bold;
}
.el-button:active{
  background-color: #1e4040; /* 修改点击背景颜色 */
  color: #fff; /* 修改文字颜色 */
  font-weight: bold;
}
</style>


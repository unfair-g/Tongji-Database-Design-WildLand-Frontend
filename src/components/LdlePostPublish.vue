<template>
    <div class="container">
      <div class="post-box">
        <el-form :model="postForm" ref="postForm">
          <el-form-item label="闲置物品名称:" prop="itemName" style="font-weight: bold;" class="form-item">
            <el-input v-model="postForm.itemName" placeholder="请输入物品名称" />
          </el-form-item>

          <el-form-item label="物品简介:" prop="itemDescription" style="font-weight: bold;" class="form-item">
            <el-input type="textarea" v-model="postForm.itemDescription" rows="5" placeholder="请输入物品简介" />
          </el-form-item>

          <el-form-item label="物品价格:" prop="itemPrice" style="font-weight: bold;" class="form-item">
            <el-input v-model="postForm.itemPrice" placeholder="请输入物品参考价格"/>
          </el-form-item>
          
          <div class="form-row">
            <div class="left-side">
              <el-form-item label="物品位置:" prop="itemLocation" style="font-weight: bold;" class="form-item">
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
            <el-button type="text" class="Pbutton" @click="GoToPost()">查看帖子</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  </template>
  
  

  <script>

  import axios from 'axios';
  import  globalState  from '../store/global'; // 引入 global.js 中的状态
  
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
  data() {
    return {
      postForm: {
        itemName: '',
        category: '闲置贴',
        itemDescription: '',
        itemPrice: '',
        itemLocation: '',
        itemImages: [],
      },
      fileList: [],
      PostSuccess: false,
      LisLdlePostDialogVisible: this.isLdlePostDialogVisible,
    };
  },
  methods: {
    getCurrentPosition(callback) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          callback(`(${latitude}, ${longitude})`);
        },
        (error) => {
          console.error('定位失败:', error);
          callback(null);
        }
      );
    },
    submitForm() {
      this.getCurrentPosition((currentPosition) => {
        const postData = {
          author_id: globalState.userId, // 根据实际情况填充作者ID
          title: `${this.postForm.itemName} - 十分好用，安利`,
          post_time: new Date().toISOString(),
          post_position: this.postForm.itemLocation || currentPosition,
          post_kind: 0, // 根据实际情况填充帖子的类型
          exhibit_status: 0, // 根据实际情况填充展览状态
          condition: this.postForm.itemDescription,
          item_name: this.postForm.itemName,
          item_summary: this.postForm.itemDescription,
          price: parseFloat(this.postForm.itemPrice),
        };

        axios.post('https://localhost:7218/api/Posts/PushLdle', postData)
          .then((response) => {
            console.log('发布成功:', response.data);
            this.PostSuccess = true;
          })
          .catch((error) => {
            console.error('发布失败:', error);
          });
      });
    },
    resetForm() {
      this.postForm = {
        itemName: '',
        category: '闲置贴',
        itemDescription: '',
        itemPrice: '',
        itemLocation: '',
        itemImages: [],
      };
      this.fileList = [];
    },
    addLocation() {
      this.getCurrentPosition((currentPosition) => {
        if (currentPosition) {
          this.postForm.itemLocation = currentPosition;
          console.log('定位成功:', currentPosition);
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
    },
    triggerUpload() {
      this.$refs.upload.click();
    },
    handleClose() {
      this.closeDialog();
    },
    closeDialog() {
      this.LisLdlePostDialogVisible = false;
    },
    confirmDialog() {
      this.submitForm(); // 点击发布按钮时提交表单
      this.LisLdlePostDialogVisible = false;
    },
  }
};
  </script>
  

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width:100%;
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

.form-item {
  margin-bottom: 20px; /* 增大每个 form-item 的外边距 */
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
  right:10px;
  bottom:-10px;
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


</style>


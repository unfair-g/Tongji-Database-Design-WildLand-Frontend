<template>
    <div class="container">
      <el-scrollbar max-height="100%">
        <el-main class="main">
          <el-form :model="newCamp" label-width="120px">
            <el-form-item label="营地ID">
              <el-input v-model="newCamp.campground_id"></el-input>
            </el-form-item>
            <el-form-item label="营地名称">
              <el-input v-model="newCamp.campground_name"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
              <el-input type="textarea" v-model="newCamp.introduction"></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-select v-model="newCamp.city" multiple placeholder="选择城市">
                <el-option label="上海" value="上海"></el-option>
                <el-option label="绍兴" value="绍兴"></el-option>
                <el-option label="桐庐" value="桐庐"></el-option>
                <el-option label="杭州" value="杭州"></el-option>
                <el-option label="湖州" value="湖州"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="newCamp.address"></el-input>
            </el-form-item>
            <el-form-item label="营位数量">
              <el-input type="number" v-model="newCamp.campsite_number"></el-input>
            </el-form-item>
            <el-form-item label="基础设施">
              <el-checkbox-group v-model="newCamp.infrastructures">
                <el-checkbox label="停车场"></el-checkbox>
                <el-checkbox label="信号"></el-checkbox>
                <el-checkbox label="卫生间"></el-checkbox>
                <el-checkbox label="消防措施"></el-checkbox>
                <el-checkbox label="淋浴房"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="可用性">
              <el-checkbox-group v-model="newCamp.availabilities">
                <el-checkbox label="可供电"></el-checkbox>
                <el-checkbox label="可拎包入住"></el-checkbox>
                <el-checkbox label="可携带宠物"></el-checkbox>
                <el-checkbox label="可明火"></el-checkbox>
                <el-checkbox label="可自带帐篷"></el-checkbox>
                <el-checkbox label="可过夜"></el-checkbox>
                <el-checkbox label="草地"></el-checkbox>
                <el-checkbox label="沙地"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="上传图片">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-success="handleUploadSuccess"
                :on-remove="handleRemoveImage"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-form>
  
          <el-carousel :interval="5000" arrow="default">
            <el-carousel-item v-for="(image, index) in newCamp.detail_images" :key="index">
              <img :src="image.url" alt="camp image" class="carousel-image">
            </el-carousel-item>
          </el-carousel>
          
          <div class="divider"></div> <!-- Divider line -->
  
          <el-button type="primary" @click="addNewCamp">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-main>
      </el-scrollbar>
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    name: 'AddCamp',
    data() {
      return {
        newCamp: {
          campground_id: '',
          campground_name: '',
          introduction: '',
          city: [],
          address: '',
          campsite_number: 0,
          infrastructures: [],
          availabilities: [],
          detail_images: [] // 储存图片的数组
        }
      };
    },
    methods: {
      ...mapMutations(['ADD_CAMP']),
      addNewCamp() {
        this.ADD_CAMP(this.newCamp);
        this.$router.push('/administrator/admincamp');
      },
      cancel() {
        this.$router.push('/administrator/admincamp');
      },
      handleUploadSuccess(response, file) {
        this.newCamp.detail_images.push({ url: file.url });
      },
      handleRemoveImage(file) {
        const index = this.newCamp.detail_images.findIndex(image => image.url === file.url);
        if (index !== -1) {
          this.newCamp.detail_images.splice(index, 1);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    line-height: 1.6;
    margin: 0;
  }
  
  .container {
    width: 70%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }
  
  .main {
    flex: 1;
    overflow: auto;
    padding-left: 100px;
    padding-right: 100px;
  }
  
  .el-button {
    margin-right: 10px;
  }
  
  .el-carousel {
    margin: 10px 140px;
  }
  
  .carousel-image {
    width: 100%;
    height: auto;
  }
  
  .divider {
    height: 1px;
    background-color: #ddd;
    margin: 10px 10px;
  }
  </style>
  
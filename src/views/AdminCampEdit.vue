<template>
    <div class="container">
      <el-scrollbar max-height="100%">
        <el-main class="main">
          <el-form :model="editedCamp" label-width="120px">
            <el-form-item label="营地名称">
              <el-input v-model="editedCamp.campground_name"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
              <el-input type="textarea" v-model="editedCamp.introduction"></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-select v-model="editedCamp.city" multiple placeholder="选择城市">
                <el-option label="上海" value="上海"></el-option>
                <el-option label="绍兴" value="绍兴"></el-option>
                <el-option label="桐庐" value="桐庐"></el-option>
                <el-option label="杭州" value="杭州"></el-option>
                <el-option label="湖州" value="湖州"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="editedCamp.address"></el-input>
            </el-form-item>
            <el-form-item label="营位数量">
              <el-input type="number" v-model="editedCamp.campsite_number"></el-input>
            </el-form-item>
            <el-form-item label="基础设施">
              <el-checkbox-group v-model="editedCamp.infrastructures">
                <el-checkbox label="停车场"></el-checkbox>
                <el-checkbox label="信号"></el-checkbox>
                <el-checkbox label="卫生间"></el-checkbox>
                <el-checkbox label="消防措施"></el-checkbox>
                <el-checkbox label="淋浴房"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="可用性">
              <el-checkbox-group v-model="editedCamp.availabilities">
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
          </el-form>
  
          <el-carousel :interval="5000" arrow="default">
            <el-carousel-item v-for="(image, index) in editedCamp.detail_images" :key="index">
              <img :src="image" alt="camp image" class="carousel-image">
            </el-carousel-item>
          </el-carousel>
          
          <div class="divider"></div> <!-- Divider line -->
  
          <el-button type="primary" @click="saveChanges">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-main>
      </el-scrollbar>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    name: 'AdminCampEdit',
    props: ['campID'],
    data() {
      return {
        editedCamp: {}
      };
    },
    computed: {
      ...mapState({
        camps: state => state.camp.camps
      })
    },
    created() {
      const campId = parseInt(this.campID);
      const camp = this.camps.find(camp => camp.campground_id === campId);
      if (camp) {
        this.editedCamp = { ...camp };
      }
    },
    methods: {
      ...mapMutations(['UPDATE_CAMP']),
      saveChanges() {
        this.UPDATE_CAMP(this.editedCamp);
        this.$router.push('/administrator/admincamp');
      },
      cancel() {
        this.$router.push('/administrator/admincamp');
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
  
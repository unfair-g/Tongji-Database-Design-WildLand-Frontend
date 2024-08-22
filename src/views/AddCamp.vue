<template>
  <div class="container">
    <el-scrollbar max-height="100%">
      <el-main class="main">
        <el-form :model="newCamp" label-width="120px">
          <el-form-item label="营地ID" required>
            <el-input v-model="newCamp.campground_id"></el-input>
          </el-form-item>
          <el-form-item label="营地名称" required>
            <el-input v-model="newCamp.campground_name"></el-input>
          </el-form-item>
          <el-form-item label="介绍" required>
            <el-input type="textarea" v-model="newCamp.slogan"></el-input>
          </el-form-item>
          <el-form-item label="城市" required>
            <el-select v-model="newCamp.city" placeholder="选择城市" required>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="绍兴" value="绍兴"></el-option>
              <el-option label="桐庐" value="桐庐"></el-option>
              <el-option label="杭州" value="杭州"></el-option>
              <el-option label="湖州" value="湖州"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" required>
            <el-input v-model="newCamp.address"></el-input>
          </el-form-item>
          <el-form-item label="营位数量" required>
            <el-input type="number" v-model="newCamp.campsite_number"></el-input>
          </el-form-item>
          <el-form-item label="基础设施" required>
            <el-checkbox-group v-model="newCamp.infrastructures">
              <el-checkbox label="停车场"></el-checkbox>
              <el-checkbox label="信号"></el-checkbox>
              <el-checkbox label="卫生间"></el-checkbox>
              <el-checkbox label="消防措施"></el-checkbox>
              <el-checkbox label="淋浴房"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="可用服务" required>
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
      
          <el-form-item label="封面图片" required>
            <el-upload
              action=""
              list-type="picture"
              :file-list="coverPicList"
              :on-change="handleCoverPicChange"
              :auto-upload="false"
            >
              <el-button size="small" type="primary" class="upgrade-btn">选择封面图片</el-button>
              <!-- eslint-disable-next-line -->
              <div slot="tip" class="el-upload__tip">仅支持一张图片上传</div>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="营地地图" required>
            <el-upload
              action=""
              list-type="picture"
              :file-list="mapPicList"
              :on-change="handleMapPicChange"
              :auto-upload="false"
            >
              <el-button size="small" type="primary" class="upgrade-btn">选择营地地图</el-button>
              <!-- eslint-disable-next-line -->
              <div slot="tip" class="el-upload__tip">仅支持一张图片上传</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="正文图片" required>
            <el-upload
              action=""
              list-type="picture"
              :file-list="introPicList"
              :on-change="handleIntroPicChange"
              :auto-upload="false"
            >
              <el-button size="small" type="primary" class="upgrade-btn">选择正文图片</el-button>
              <!-- eslint-disable-next-line -->
              <div slot="tip" class="el-upload__tip">仅支持一张图片上传</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="展示图片" required>
            <el-upload
              action=""
              list-type="picture"
              :file-list="displayPicList"
              :on-change="handleDisplayPicChange"
              :auto-upload="false"
              multiple
            >
              <el-button size="small" type="primary" class="upgrade-btn">选择展示图片</el-button>
              <!-- eslint-disable-next-line -->
              <div slot="tip" class="el-upload__tip">支持多张图片上传</div>
            </el-upload>
          </el-form-item>

          <campsite-price-input v-model="newCamp.campsites"></campsite-price-input>

    </el-form>
        
        <div class="divider"></div> <!-- Divider line -->
        <el-button type="primary" @click="addNewCamp" class="save-btn">保存</el-button>
        <el-button background-color="#ddd" @click="cancel" class="cancel-btn">取消</el-button>
      </el-main>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from '@/axios';
import CampsitePriceInput from '@/components/CampsitePriceInput.vue';

export default {
  components: {
    CampsitePriceInput
  },
  data() {
    return {
      newCamp: {
        campground_id: '', 
        campground_name: '',
        slogan: '',
        city: '',
        address: '',
        campsite_number: 0,
        infrastructures: [],
        availabilities: [],
        campsites: [],
      },
      coverPicList: [],
      mapPicList: [],
      introPicList: [],
      displayPicList: [],
    };
  },
  methods: {
    async uploadImage(file, folder, targetField) {
      if (!file) {
      console.error(`${targetField} 上传失败: file is undefined or null`);
      return;
    }
      const formData = new FormData();
      // 将文件对象附加到 FormData 中
      formData.append('files', file);
      
      console.log(`FormData ready to upload for ${targetField}`);

      try {
        const response = await axios.post(`/api/Campgrounds/UploadCampgroundImage/${this.newCamp.campground_id}/${folder}/${targetField}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(`${targetField} 上传成功:`, response.data);
      } catch (error) {
        console.error(`${targetField} 上传失败:`, error);
        if (error.response && error.response.data) {
      console.error('服务器返回的错误信息:', error.response.data);  // 打印服务器返回的错误信息
    }
      }
    },

    async addNewCamp() {
      // 首先上传文本信息以获取campground_id
      try {
        const response = await axios.post('/api/Campgrounds/AddCampground', {
          address: this.newCamp.address,
          campground_id: this.newCamp.campground_id,
          campground_name: this.newCamp.campground_name,
          campsite_number: this.newCamp.campsite_number,
          can_stay_overnight: this.newCamp.availabilities.includes("可过夜") ? "1" : "0",
          city: this.newCamp.city,//单选
          has_fire_safety: this.newCamp.infrastructures.includes("消防措施") ? "1" : "0",
          has_grass_ground: this.newCamp.availabilities.includes("草地") ? "1" : "0",
          has_parking_lot: this.newCamp.infrastructures.includes("停车场") ? "1" : "0",
          has_power_supply: this.newCamp.availabilities.includes("可供电") ? "1" : "0",
          has_sandy_ground: this.newCamp.availabilities.includes("沙地") ? "1" : "0",
          has_shower_room: this.newCamp.infrastructures.includes("淋浴房") ? "1" : "0",
          has_signal: this.newCamp.infrastructures.includes("信号") ? "1" : "0",
          is_own_tent_friendly: this.newCamp.availabilities.includes("可自带帐篷") ? "1" : "0",
          is_pet_friendly: this.newCamp.availabilities.includes("可携带宠物") ? "1" : "0",
          slogan: this.newCamp.slogan,
          toilet_number: this.newCamp.infrastructures.includes("卫生间") ? 1 : 0
        });

        // 更新campground_id
        this.newCamp.campground_id = response.data.campground_id;

        console.log('新增营地文本信息上传成功:', response.data);
      } catch (error) {
        console.error('新增营地文本信息上传失败：', error);
        return;
      }
     
      try{
      // 接下来上传图片  并行处理多个上传任务，从而提高效率
      //const uploadPromises = [];
      //if (this.coverPicList.length > 0) {
      //  uploadPromises.push(this.uploadImage(this.coverPicList[0].raw, 'camp_showpic', 'camp_showpic'));
      //}
      //if (this.mapPicList.length > 0) {
      //  uploadPromises.push(this.uploadImage(this.mapPicList[0].raw, 'camp_map', 'map_picture'));
      //}
      //if (this.introPicList.length > 0) {
      //  uploadPromises.push(this.uploadImage(this.introPicList[0].raw, 'camppic', 'camp_intropic'));
      //}
      //for (const file of this.displayPicList) {
      //  uploadPromises.push(this.uploadImage(file.raw, 'camppic', 'campground_picurl'));
      //}
      //await Promise.all(uploadPromises);

      if (this.coverPicList.length > 0) {
      await this.uploadImage(this.coverPicList[0].raw, 'camp_showpic', 'camp_showpic');
    }
    if (this.mapPicList.length > 0) {
      await this.uploadImage(this.mapPicList[0].raw, 'camp_map', 'map_picture');
    }
    if (this.introPicList.length > 0) {
      await this.uploadImage(this.introPicList[0].raw, 'camppic', 'camp_intropic');
    }
    for (const file of this.displayPicList) {
      await this.uploadImage(file.raw, 'camppic', 'campground_picurl');
    }

      // 上传营位信息
      const campsiteData = this.newCamp.campsites.map(campsite => ({
        campground_id: parseInt(this.newCamp.campground_id,10),
        price: parseInt(campsite.price,10),
        campsite_number: campsite.campsite_number
      }));

      console.log('Campsite Data:', campsiteData);

      try {
        await axios.post('/api/Campsites/addcampsite', campsiteData);
        console.log('营位信息上传成功');
      } catch (error) {
        console.error('营位信息上传失败：', error);
        this.$message({
          message: '营位信息上传失败！',
          type: 'error'
        });
        return;
      }

      // 显示成功提示信息
      this.$message({
        message: '创建新营地成功！',
        type: 'success'
      });
      this.$router.push('/administrator/admincamp');
      } catch(error) {
        console.error('新增营地文本信息上传失败：', error);
        this.$message({
        message: '创建新营地失败！',
        type: 'error'
      });
        return;
      }
    },

    handleCoverPicChange(file) {
      this.coverPicList = [file];
    },
    handleMapPicChange(file) {
      this.mapPicList = [file];
    },
    handleIntroPicChange(file) {
      this.introPicList = [file];
    },
    handleDisplayPicChange(file, fileList) {
      this.displayPicList = fileList;
    },

    cancel() {
      // Handle cancel operation
      this.newCamp = {
        campground_id: '',
        campground_name: '',
        slogan: '',
        city: '',
        address: '',
        campsite_number: 0,
        infrastructures: [],
        availabilities: [],
        campsites: [],
      };
      this.coverPicList = [];
      this.mapPicList = [];
      this.introPicList = [];
      this.displayPicList = [];
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

  .upgrade-btn {
    margin-right: 10px;
    background-color:#51969a ;
  }

  .save-btn {
    margin-right: 10px;
    background-color:#51969a ;
    transition: background-color 0.3s ease;
  }
  
  .save-btn:hover {
  background-color: #3c7579;
  border-color: #3c7579;
}

.cancel-btn {
  background-color: #fff;
  color: #51969a;
  border-color: #51969a;
  margin-right: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .cancel-btn:hover {
  background-color: #e6f0f1;
  color: #3c7579;
  border-color: #3c7579;
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
  
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
            <el-input type="textarea" v-model="newCamp.slogan"></el-input>
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
          <el-button type="primary" >上传文本信息</el-button>
          <div class="divider"></div> <!-- Divider line -->
          
          <el-form-item label="上传封面图片">   
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleFileChange('camp_showpic')"
              :on-remove="handleRemoveImage('camp_showpic')"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-button type="primary" >上传封面图片</el-button>
          </el-form-item>

          <el-form-item label="上传介绍图片">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleFileChange('camp_intropic')"
              :on-remove="handleRemoveImage('camp_intropic')"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="上传地图图片">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleFileChange('map_picture')"
              :on-remove="handleRemoveImage('map_picture')"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="上传其他图片">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleFileChange('campground_picurls', true)"
              :on-remove="handleRemoveImage('campground_picurls', true)"
              multiple
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <div class="divider"></div> <!-- Divider line -->

        <el-button type="primary" @click="addNewCamp">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-main>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from '@/axios'; // 引入配置好的axios实例

export default {
  name: 'AddCamp',
  data() {
    return {
      newCamp: {
        campground_id: '',
        campground_name: '',
        slogan: '',
        city: [],
        address: '',
        campsite_number: 0,
        infrastructures: [],
        availabilities: [],
        camp_showpic: null,
        camp_intropic: null,
        map_picture: null,
        campground_picurls: []
      }
    };
  },
  methods: {
    async addNewCamp() {
      const formData = new FormData();

      const payload = {
        address: this.newCamp.address || 'defaultAddress',
        campground_id: this.newCamp.campground_id || 0,
        campground_name: this.newCamp.campground_name || 'defaultName',
        campsite_number: this.newCamp.campsite_number || 0,
        can_stay_overnight: this.newCamp.availabilities.includes('可过夜').toString(),
        city: this.newCamp.city.join(',') || 'defaultCity',
        has_fire_safety: this.newCamp.infrastructures.includes('消防措施').toString(),
        has_grass_ground: this.newCamp.availabilities.includes('草地').toString(),
        has_parking_lot: this.newCamp.infrastructures.includes('停车场').toString(),
        has_power_supply: this.newCamp.availabilities.includes('可供电').toString(),
        has_sandy_ground: this.newCamp.availabilities.includes('沙地').toString(),
        has_shower_room: this.newCamp.infrastructures.includes('淋浴房').toString(),
        has_signal: this.newCamp.infrastructures.includes('信号').toString(),
        is_own_tent_friendly: this.newCamp.availabilities.includes('可自带帐篷').toString(),
        is_pet_friendly: this.newCamp.availabilities.includes('可携带宠物').toString(),
        slogan: encodeURIComponent(this.newCamp.slogan || 'defaultSlogan'),
        toilet_number: this.newCamp.infrastructures.includes('卫生间') ? 1 : 0
      };

      const textUrl = `api/Campgrounds/CreateCampgroundWithFiles/${encodeURIComponent(payload.address)}/${payload.campground_id}/${encodeURIComponent(payload.campground_name)}/${payload.campsite_number}/${payload.can_stay_overnight}/${encodeURIComponent(payload.city)}/${payload.has_fire_safety}/${payload.has_grass_ground}/${payload.has_parking_lot}/${payload.has_power_supply}/${payload.has_sandy_ground}/${payload.has_shower_room}/${payload.has_signal}/${payload.is_own_tent_friendly}/${payload.is_pet_friendly}/${payload.slogan}/${payload.toilet_number}`;

      try {
        // 上传文本信息
        const response = await axios.post(textUrl, formData);
        console.log('新增营地成功:', response);

        // 上传图片信息
        const uploadPromises = [];
        if (this.newCamp.camp_showpic) {
          uploadPromises.push(this.uploadImage(this.newCamp.campground_id, 'camp_showpic', 'camp_showpic', this.newCamp.camp_showpic));
        }
        if (this.newCamp.camp_intropic) {
          uploadPromises.push(this.uploadImage(this.newCamp.campground_id, 'camppic', 'camp_intropic', this.newCamp.camp_intropic));
        }
        if (this.newCamp.map_picture) {
          uploadPromises.push(this.uploadImage(this.newCamp.campground_id, 'camp_map', 'map_picture', this.newCamp.map_picture));
        }
        if (this.newCamp.campground_picurls.length > 0) {
          this.newCamp.campground_picurls.forEach((file) => {
            uploadPromises.push(this.uploadImage(this.newCamp.campground_id, 'camppic', 'campground_picurls', file));
          });
        }

        await Promise.all(uploadPromises);
        console.log('图片上传成功');
        this.$router.push('/administrator/admincamp');
      } catch (error) {
        console.error('新增营地或图片上传失败:', error);
      }
    },

    async uploadImage(campground_id, folder, targetField, file) {
      const formData = new FormData();
      formData.append('file', file);

      const imageUrl = `api/Campgrounds/UploadCampgroundImage/${campground_id}/${folder}/${targetField}`;
      try {
        const response = await axios.post(imageUrl, formData);
        console.log(`${targetField} 上传成功:`, response);
      } catch (error) {
        console.error(`${targetField} 上传失败:`, error);
      }
    },
    cancel() {
      this.newCamp = {
        campground_id: '',
        campground_name: '',
        slogan: '',
        city: [],
        address: '',
        campsite_number: 0,
        infrastructures: [],
        availabilities: [],
        camp_showpic: null,
        camp_intropic: null,
        map_picture: null,
        campground_picurls: []
      };
      this.$router.push('/administrator/admincamp');
    },

    handleFileChange(type, isMultiple = false) {
      return (file) => {
        if (isMultiple) {
          this.newCamp[type].push(file.raw);
        } else {
          this.newCamp[type] = file.raw;
        }
      };
    },

    handleRemoveImage(type, isMultiple = false) {
      return (file) => {
        if (isMultiple) {
          const index = this.newCamp[type].indexOf(file.raw);
          if (index !== -1) {
            this.newCamp[type].splice(index, 1);
          }
        } else {
          this.newCamp[type] = null;
        }
      };
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
  
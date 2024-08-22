<template>
    <div class="container">
      <el-scrollbar max-height="100%">
        <el-main class="main">
          <el-form :model="editedCamp" label-width="120px">
            <el-form-item label="营地ID">
              <el-input v-model="editedCamp.campground_id" disabled></el-input>
            </el-form-item>
            <el-form-item label="营地名称">
              <el-input v-model="editedCamp.campground_name"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
              <el-input type="textarea" v-model="editedCamp.slogan"></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-select v-model="editedCamp.city" placeholder="选择城市">
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
            <el-form-item label="可用服务">
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

            <el-form-item label="封面图片" required>
            <el-upload
              action=""
              list-type="picture"
              :file-list="coverPicList"
              :on-change="handleCoverPicChange"
              :on-remove="deleteCoverImage"
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
              :on-remove="deleteMapImage"
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
              :on-remove="deleteIntroImage"
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
              :on-remove="deleteDisplayImage"
              :auto-upload="false"
              multiple
            >
              <el-button size="small" type="primary" class="upgrade-btn">选择展示图片</el-button>
              <!-- eslint-disable-next-line -->
              <div slot="tip" class="el-upload__tip">支持多张图片上传</div>
            </el-upload>
          </el-form-item>

          <campsite-price-input v-model="editedCamp.campsites"></campsite-price-input>


          </el-form>
          
          <div class="divider"></div> <!-- Divider line -->
  
          <el-button type="primary" @click="saveChanges" class="save-btn">保存</el-button>
          <el-button @click="cancel" class="cancel-btn">取消</el-button>
        </el-main>
      </el-scrollbar>
    </div>
  </template>
  
  <script>
  import axios from '@/axios';
  import CampsitePriceInput from '@/components/CampsitePriceInput.vue';

  export default {
    name: 'AdminCampEdit',
    props: ['campID'],
    components: {
      CampsitePriceInput
    },
    data() {
    return {
      editedCamp: {
        campground_id: this.campID, // 初始化营地 ID
        campground_name: '',
        slogan: '',
        city: '',
        address: '',
        campsite_number: null,
        infrastructures: [],
        availabilities: [],
        camp_showpic: '',
        map_picture: '',
        camp_intropic: '',
        display_pictures: [],
        campsites: []
      },
      coverPicList: [],
      mapPicList: [],
      introPicList: [],
      displayPicList: []
    };
  },
  async mounted() {
    try {      
      const response = await axios.get(`api/Campgrounds/${this.campID}`);
      const data = response.data;

      // 将接口数据赋值到表单中
      this.editedCamp.campground_id = data.campground_id;
      this.editedCamp.campground_name = data.campground_name;
      this.editedCamp.slogan = data.slogan;
      this.editedCamp.city = data.city;
      this.editedCamp.address = data.address;
      this.editedCamp.campsite_number = data.campsite_number;
      
      // 基础设施和可用服务的处理
      this.editedCamp.infrastructures = [
        data.has_parking_lot === '1' ? '停车场' : '',
        data.has_signal === '1' ? '信号' : '',
        data.toilet_number > 0 ? '卫生间' : '',
        data.has_fire_safety === '1' ? '消防措施' : '',
        data.has_shower_room === '1' ? '淋浴房' : ''
      ].filter(Boolean);

      this.editedCamp.availabilities = [
        data.has_power_supply === '1' ? '可供电' : '',
        data.is_own_tent_friendly === '1' ? '可自带帐篷' : '',
        data.is_pet_friendly === '1' ? '可携带宠物' : '',
        data.has_grass_ground === '1' ? '草地' : '',
        data.has_sandy_ground === '1' ? '沙地' : '',
        data.can_stay_overnight === '1' ? '可过夜' : '',
        data.has_fire_safety === '1' ? '可明火' : ''
      ].filter(Boolean);

        // 处理图片预览
      this.coverPicList = [{ name: '封面图片', url: data.camp_showpic }];
      this.mapPicList = [{ name: '地图图片', url: data.map_picture }];
      this.introPicList = [{ name: '介绍图片', url: data.camp_intropic }];

       // 将多张展示图片放入 displayPicList
       this.displayPicList = data.campground_picurls.map((url, index) => ({
        name: `展示图片 ${index + 1}`,
        url: url
      }));

      // 获取营位数据
      const campsiteResponse = await axios.get(`api/Campsites/getcampsites/${this.campID}`);
      this.editedCamp.campsites = campsiteResponse.data;

    } catch (error) {
      console.error("Error fetching campground details:", error);
    }
  },
  methods: {
    handleCoverPicChange(file, fileList) {
      this.coverPicList = fileList;
    },
    handleMapPicChange(file, fileList) {
      this.mapPicList = fileList;
    },
    handleIntroPicChange(file, fileList) {
      this.introPicList = fileList;
    },
    handleDisplayPicChange(file, fileList) {
      this.displayPicList = fileList;
    },
    // 处理文件删除
    deleteCoverImage(file, fileList) {
        this.deleteImage(file.url, fileList);
    },
    deleteMapImage(file, fileList) {
        this.deleteImage(file.url, fileList);
    },
    deleteIntroImage(file, fileList) {
        this.deleteImage(file.url, fileList);
    },
    deleteDisplayImage(file, fileList) {
        this.deleteImage(file.url, fileList);
    },
    // 通用的图片删除函数
    async deleteImage(imageUrl, fileList) {
        try {
            await axios.delete(`api/Campgrounds/DeleteCampgroundImage/${this.editedCamp.campground_id}`, {
                headers: { 'Content-Type': 'application/json' },
                data: imageUrl  // 确保以正确的格式发送数据
            });
            console.log('imageUrl:', imageUrl); 
            this.$message.success("图片删除成功！");
            this.updateImageList(fileList, imageUrl); // 更新本地图片列表
        } catch (error) {
            console.log('imageUrl:', imageUrl); 
            this.$message.error("图片删除失败，请稍后再试。");
            console.error("Error deleting image:", error);
        }
    },

    // 更新图片列表以反映删除的图片
    updateImageList(fileList, imageUrl) {
        const index = fileList.findIndex(item => item.url === imageUrl);
        if (index !== -1) {
            fileList.splice(index, 1); // 从列表中移除已删除的图片
        }
    },
    
    //上传图片  
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
        const response = await axios.post(`/api/Campgrounds/UploadCampgroundImage/${this.editedCamp.campground_id}/${folder}/${targetField}`, formData, {
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



    async saveChanges() {
      // 这里可以使用 async/await 进行保存逻辑的处理
    try {
      const payload = {
        address: this.editedCamp.address,
        campground_id: this.editedCamp.campground_id,
        campground_name: this.editedCamp.campground_name,
        campsite_number: this.editedCamp.campsite_number,
        can_stay_overnight: this.editedCamp.availabilities.includes('可过夜') ? '1' : '0',
        city: this.editedCamp.city,
        has_fire_safety: this.editedCamp.infrastructures.includes('消防措施') ? '1' : '0',
        has_grass_ground: this.editedCamp.availabilities.includes('草地') ? '1' : '0',
        has_parking_lot: this.editedCamp.infrastructures.includes('停车场') ? '1' : '0',
        has_power_supply: this.editedCamp.availabilities.includes('可供电') ? '1' : '0',
        has_sandy_ground: this.editedCamp.availabilities.includes('沙地') ? '1' : '0',
        has_shower_room: this.editedCamp.infrastructures.includes('淋浴房') ? '1' : '0',
        has_signal: this.editedCamp.infrastructures.includes('信号') ? '1' : '0',
        is_own_tent_friendly: this.editedCamp.availabilities.includes('可自带帐篷') ? '1' : '0',
        is_pet_friendly: this.editedCamp.availabilities.includes('可携带宠物') ? '1' : '0',
        slogan: this.editedCamp.slogan,
        toilet_number: this.editedCamp.infrastructures.includes('卫生间') ? 1 : 0
      };
      // 编辑的文本信息保存
      await axios.put(`api/Campgrounds/EditCampground/${this.editedCamp.campground_id}`, payload);
      
      //同步上传图片
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
      
      // 处理营位数据并保存
      const campsitePayload = this.editedCamp.campsites.map(campsite => ({
        campsite_number: campsite.campsite_number,
        price: campsite.price
      }));

      console.log('Campsite payload being sent:', campsitePayload); // 打印营位信息
      // 编辑的营位信息保存逻辑
      await axios.post(`api/Campsites/UpdateCampsites/${this.editedCamp.campground_id}`, campsitePayload,{
        headers: {
        'Content-Type': 'application/json'
    }
      });
      
      // 保存成功后的提示或操作
      this.$message.success("营地信息已成功保存！");
      this.$router.push('/administrator/admincamp'); // 保存后返回营地列表页面
    } catch (error) {
      this.$message.error("保存失败，请稍后重试。");
      console.error("Error saving campground:", error);
    }
   },
    cancel() {
      this.editedCamp = {
        campground_id: null,
        campground_name: '',
        slogan: '',
        city: '',
        address: '',
        campsite_number: null,
        infrastructures: [],
        availabilities: [],
        camp_showpic: '',
        map_picture: '',
        camp_intropic: '',
        display_pictures: [],
        campsites: []
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
  
  .divider {
    height: 1px;
    background-color: #ddd;
    margin: 10px 10px;
  }
  </style>
  
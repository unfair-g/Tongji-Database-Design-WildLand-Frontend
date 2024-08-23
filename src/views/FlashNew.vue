<template>
  <div class="post-detail-wrapper">
    <el-form
          label-position="top"
          label-width="auto"
          :model="flash"
          :rules="rules"
          :class="'post-detail-box'"
          ref="UserformRef"
          >
      <div class="post-detail-header">
        资讯添加
        <el-icon @click="closeDetail">
          <Close />
        </el-icon>
      </div>
      <hr />
      <div class="post-detail-content">
        <el-form-item label="资讯标签: " prop="name" class="post-title">
          <el-radio-group v-model="radio">
            <el-radio 
            v-for="(tag, index) in tag"  
            :key="index"  
            :value="tag.tag_id">{{tag.tag_name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="post-info">
          <el-form-item label="资讯标题: " prop="region" class="post-title">
            <el-input
              v-model="flash.flash_title"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="资讯内容: " prop="count" class="post-body">
            <el-input
              v-model="flash.flash_content"
              style="width: 1000px"
              :rows="10"
              type="textarea"
            />
          </el-form-item>
          <div class="post-body">
            <el-form-item label="封面图片" required>
            <el-upload
              action=""
              list-type="picture"
              :file-list="coverPicList"
              :on-change="handleCoverPicChange"
              :on-remove="deleteCoverImage"
              :limit="1"
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
              :limit="1"
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
              :limit="1"
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
          </div>
        </div>
        <el-button class="confirm-button" @click="updateFlash">确认</el-button>  
      </div>
    </el-form>
  </div>
</template>

<script>
import { Close } from '@element-plus/icons-vue'
import axios from '@/axios'; // 引入配置好的axios实例
import { ref} from 'vue'
import { ElMessage } from 'element-plus' // 导入 ElMessage

export default {
  props: ['flashID'],
  data() {
    return {
      flash: {
        collection_number:  0,
        views_number:  0,
        flash_title: '填写标题',  
        flash_content: '填写内容',  
        flash_id: 111110,
        user_id: 123,
        flash_date: '2024-08-18T06:54:43.744Z',
        flash_image: 'string',
        tagId: 123,
        tagName: '营地'
      },
      tag:[],
      currentDateTime : ref(new Date().toLocaleString()),
      coverPicList: [],
      mapPicList: [],
      introPicList: [],
      displayPicList: [],
      radio : ref()
    };
  },
  components: {
    Close,
  },
  setup() {
    const rules = ref({
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
      ],
      region: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'blur',
        },
      ],
      count: [
        {
          required: true,
          message: 'Please select Activity count',
          trigger: 'blur',
        },
      ],
    })

    
    const imageUrl = ref('')
    const avatarSrc = ref('') // 用于存储头像 URL

    const beforeAvatarUpload = (file) => {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGorPNG) {
        ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      
      const formData = new FormData();
      formData.append('file', file);
      ElMessage.success('头像上传成功')
      .catch(error => {
        ElMessage.error(error.message)
      });

      return false;
    }

    const handleFileChange = (file) => {
      imageUrl.value = URL.createObjectURL(file.raw)
      avatarSrc.value = URL.createObjectURL(file.raw)
    }

    return {
      avatarSrc,
      beforeAvatarUpload,
      handleFileChange,
      ElMessage,
      imageUrl,
      rules
    }
  },
  methods: {  
    closeDetail(){
      this.$router.push({ path: `/administrator/flashaudit` })
    },
    updateFlash() {   
      // 确保 flash 对象中有需要更新的数据  
      console.log(this.flash);
      console.log(this.displayPicList[0].raw)
      console.log(this.coverPicList[0].raw)
      if (!this.flash.flash_title || !this.flash.flash_content) {  
        this.$message.error('缺少必要的更新信息');  
        return;  
      }  
      let formData = new FormData();  
      formData.append('coverFile', this.coverPicList[0].raw, this.coverPicList[0].raw.name);  
      formData.append('campFile', this.mapPicList[0].raw, this.mapPicList[0].raw.name);  
      formData.append('contextFile', this.introPicList[0].raw, this.introPicList[0].raw.name);  
      console.log(this.displayPicList)
      this.displayPicList.forEach(file => {  
          formData.append('displayFiles[]', file.raw, file.raw.name);  
          console.log(file)
      });   
      // 使用Axios发送FormData  
      axios.get(`https://localhost:7218/api/FlashTags/GetTagNameById?tag_id=${this.radio}`)  
    .then(response => {  
      // 更新 flash 对象中的 tagName  
      this.flash.tagName = response.data;  
  
      axios.post(`https://localhost:7218/api/Flashes/PostFlashAndTag?UserId=${this.flash.user_id}&FlashTitle=${this.flash.flash_title}&FlashContent=${this.flash.flash_content}&FlashImage=${this.flash.flash_image}&TagId=${this.radio}&TagName=${this.flash.tagName}`, formData, {  
          headers: {  
              'Content-Type': 'multipart/form-data'  
          }  
      })  
      .then(response => {  
          console.log(response.data);  
      })  
      .catch(error => {  
          console.error('Error uploading files:', error);  
      });
    })  
    },  
    handleCoverPicChange(file, fileList) {
      this.coverPicList = fileList;
      console.log(fileList)
      console.log(this.coverPicList)
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
    fetchTags() {
      axios.get(`https://localhost:7218/api/FlashTags`)
        .then(response => {
          this.tag = response.data;
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
    },
    // 更新图片列表以反映删除的图片
    updateImageList(fileList, imageUrl) {
        const index = fileList.findIndex(item => item.url === imageUrl);
        if (index !== -1) {
            fileList.splice(index, 1); // 从列表中移除已删除的图片
        }
    },
    
  }  ,
  created() {
    // 在组件创建时，从查询参数中获取flashId、title、content和tagName  ;
    this.fetchTags();
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display:inline-block;
}

.checkbox-group-with-images {  
  display: flex; /* 使用Flexbox布局 */  
  flex-wrap: wrap; /* 如果需要，允许换行（但在这个场景下可能不需要） */  
  /* 其他样式，如间距、对齐方式等 */  
}  
  
.checkbox-with-image {  
  display: flex; /* 每个复选框和图片的组合也使用Flexbox */  
  align-items: center; /* 垂直居中对齐图片和复选框 */  
  /* 根据需要调整间距、边距等 */  
}  
  
.checkbox-image {  
  /* 设置图片的样式，如大小、边距等 */  
  height: 73%; /* 示例高度 */  
  width: auto; /* 根据高度自动调整宽度 */  
  margin-right: 8px; /* 与复选框之间的间距 */  
}  
.post-detail-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.post-detail-box {
  width: 85%;
  height: 85%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 2px solid #1D5B5E;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* 防止内容溢出 */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  margin-bottom: 10px;
}

.post-detail-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  padding-bottom: 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-title,
.post-body{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 40px; /* Add more indentation */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.post-content {
  font-size: 18px;
  font-weight: normal;
}

.post-category .post-type {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: #FEFFFF;
  border: 1px solid black;
}

.post-category .post-type.active {
  background-color: #1D5B5E;
  color: white;
  border: none;
}

.post-body-content {
  display: inline-block;
  padding: 10px;
  border: 1px solid #1D5B5E;
  border-radius: 5px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-left: 40px; /* Add more indentation */
}

.actions .el-button {
  background-color: #1D5B5E;
  color: white;
  opacity: 0.5;
}

.actions .el-button.selected {
  opacity: 1;
}

.reject-reason {
  margin-top: 10px;
  width: 100%;
  padding-left: 40px; /* Add more indentation */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.reject-reason div {
  margin-bottom: 10px;
}

.reject-reason textarea {
  width: 70%; /* Adjust width */
  height: 80px; /* Adjust height */
  border: 1px solid #1D5B5E;
  border-radius: 5px;
  padding: 10px;
  resize: none; /* Remove default scrollbar */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.confirm-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #1D5B5E;
  color: white;
}
</style>

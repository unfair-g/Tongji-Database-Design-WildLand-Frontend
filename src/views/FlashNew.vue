<template>
  <div class="post-detail-wrapper">
    <el-form
          label-position="top"
          label-width="auto"
          :model="flash"
          :rules="rules"
          :class="'post-detail-box'"
          ref="formRef"
          >
      <div class="post-detail-header">
        资讯添加
        <el-icon @click="closeDetail">
          <Close />
        </el-icon>
      </div>
      <hr />
      <div class="post-detail-content">
        <el-form-item label="资讯标签: " prop="radio" class="post-title">
          <el-radio-group v-model="flash.radio">
            <el-radio 
            v-for="(tag, index) in tag"  
            :key="index"  
            :value="tag.tag_id">{{tag.tag_name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="post-info">
          <el-form-item label="资讯标题: " prop="flash_title" class="post-title">
            <el-input
            placeholder="请输入资讯标题"
            v-model="flash.flash_title"
              style="width: 240px"
            />
          </el-form-item>
          <el-form-item label="资讯内容: " prop="flash_content" class="post-body">
            <el-input
              placeholder="请输入资讯内容"
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
              :limit="1"
              :auto-upload="false"
            >
              <el-button size="small" type="primary" class="upgrade-btn">选择封面图片</el-button>
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
              :limit="1"
              :auto-upload="false"
            >
              <el-button size="small" type="primary" class="upgrade-btn">选择正文图片</el-button>
              <!-- eslint-disable-next-line -->
              <div slot="tip" class="el-upload__tip">仅支持一张图片上传</div>
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
import { ElMessage } from 'element-plus' // 导入 ElMessage
import global from '@/store/global'
import { ref } from 'vue'
export default {
  props: ['flashID'],
  data() {
    return {
      flash: {
        collection_number:  0,
        views_number:  0,
        flash_title: '',  
        flash_content: '',  
        user_id:  global.userId,
        flash_date: '2024-08-18T06:54:43.744Z',
        flash_image: 'string',
        tagId: 123,
        tagName: '营地',
        radio : ref()
      },
      tag:[],
      currentDateTime : ref(new Date().toLocaleString()),
      coverPicList: [],
      mapPicList: [],
      introPicList: [],
      displayPicList: [],
    };
  },
  components: {
    Close,
  },
  setup() {
    const rules = ref({
      radio: [
        { required: true, message: '请选择资讯标签', trigger: 'change' },
      ],
      flash_title: [
        {
          required: true,
          message: '请输入资讯标题',
          trigger: 'blur',
        },
      ],
      flash_content: [
        {
          required: true,
          message: '请输入资讯内容',
          trigger: 'blur',
        },
      ],
    })

    return {
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
       this.$refs.formRef.validate((valid) => {  
        if (valid) {  
        if (this.coverPicList.length === 0) {  
            ElMessage.error('请上传封面图片！');  
            return;  
          }  
          if (this.introPicList.length === 0) {  
            ElMessage.error('请上传正文图片！');  
            return;  
          }  
        if (!this.flash.flash_title || !this.flash.flash_content) {  
        this.$message.error('缺少必要的更新信息');  
        return;  
      }  
      let formData = new FormData();  
      formData.append('displayFiles', this.coverPicList[0].raw, this.coverPicList[0].raw.name);  
      formData.append('displayFiles', this.introPicList[0].raw, this.introPicList[0].raw.name);  
      // 使用Axios发送FormData  
      axios.get(`/api/FlashTags/GetTagNameById?tag_id=${this.flash.radio}`)  
    .then(response => {  
      // 更新 flash 对象中的 tagName  
      this.flash.tagName = response.data;  
      axios.post(`/api/Flashes/PostFlashAndTag?UserId=${global.userId}&FlashTitle=${this.flash.flash_title}&FlashContent=${this.flash.flash_content}&FlashImage=1&TagId=${this.flash.radio}&TagName=${this.flash.tagName}`, formData, {  
          headers: {  
              'Content-Type': 'multipart/form-data'  
          }  
      })  
        .then(response => {  
        ElMessage.success('成功添加！')
          console.log(response.data);  
          this.$router.push({ path: `/administrator/flashaudit` })  
      })  
        .catch(error => {
          ElMessage.error(error.message)  
          console.error('Error uploading files:', error);  
      });
    })  
        } else {  
          console.log('error submit!!');  
          // 注意：这里的 return false 不会阻止表单的提交，  
          // 因为 validate 的回调是在异步或稍后执行的  
          // 如果你需要阻止表单提交，你应该在表单的 @submit 事件处理程序中处理  
        }  
      });  
    },  
    handleCoverPicChange(file, fileList) {
      this.coverPicList = fileList;
      console.log(fileList)
      console.log(this.coverPicList)
    },
    handleIntroPicChange(file, fileList) {
      this.introPicList = fileList;
      if (this.introPicList[0].raw.name == this.coverPicList[0].raw.name) {
        ElMessage.error('正文图片需与封面图片不一致！')
        this.introPicList.pop()
      }
    },
    fetchTags() {
      axios.get(`/api/FlashTags`)
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

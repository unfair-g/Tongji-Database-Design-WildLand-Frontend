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
        资讯编辑
        <el-icon @click="closeDetail">
          <Close />
        </el-icon>
      </div>
      <hr />
      <div class="post-detail-content">
        <div class="post-title">资讯标签: 
          <el-radio-group v-model="radio">
            <el-radio 
            v-for="(tag, index) in tag"  
            :key="index"  
            :value="tag.tag_id">{{tag.tag_name}}</el-radio>
          </el-radio-group>
        </div>
        <div class="post-info">
          <div class="post-title">资讯标题: 
            <el-input
              v-model="flash.flashTitle"
              style="width: 240px"
            />
          </div>
          <div class="post-body">资讯内容: 
            <el-input
              v-model="flash.flashContent"
              style="width: 1000px"
              :rows="10"
              type="textarea"
            />
          </div>
        </div>
        <el-button class="confirm-button" @click="updateFlash">确认</el-button>  
      </div>
    </el-form>
  </div>
</template>

<script>
//import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { mapState, mapMutations } from 'vuex'  
import axios from '@/axios'; // 引入配置好的axios实例
import { ref} from 'vue'
import { ElMessage } from 'element-plus' // 导入 ElMessage
import global from '@/store/global'

export default {
  props: ['flashID'],
  data() {
    return {
      flash: [],
      tag:[],
      radio : ref()
    };
  },

  components: {
    Close,
  },
  computed: {  
    ...mapState([  
      'tags', // 将state中的tags映射到组件的computed属性  
      'selectedTags' // 将state中的selectedTags映射到组件的v-model上
    ])  ,
  },  
  setup() {
    const admin_id = ref(global.userId)
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
      axios.post(`https://localhost:7218/api/FlashPics/UploadFlashPic?flashId=${admin_id.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      ElMessage.success('头像上传成功')
      .catch(error => {
        ElMessage.error(error.message)
      });

      return false;
    }

    const handleFileChange = (file) => {
      avatarSrc.value = URL.createObjectURL(file.raw)
    }

    return {
      avatarSrc,
      beforeAvatarUpload,
      handleFileChange,
      ElMessage,
    }
  },
  methods: {  
    closeDetail(){
      this.$router.push({ path: `/administrator/flashaudit` })
    },
    updateFlash() {  
      // 确保 flash 对象中有需要更新的数据  
      if (!this.flash.flashId || !this.flash.flashTitle || !this.flash.flashContent) {  
        this.$message.error('缺少必要的更新信息');  
        return;  
      }  
      axios.get(`https://localhost:7218/api/FlashTags/GetTagNameById?tag_id=${this.radio}`)  
    .then(response => {  
      // 更新 flash 对象中的 tagName  
      this.flash.tagName = response.data;  
  
      // 现在 tagName 已经更新，可以发送 PUT 请求来更新 Flash  
      axios.put(`https://localhost:7218/api/Flashes/UpdateFlashAndTag`, [{  
        userId: 123,  
        flashDate: this.flash.flashDate,  
        flashImage: this.flash.flashImage,  
        collectionNumber: this.flash.collectionNumber,  
        viewsNumber: this.flash.viewsNumber,  
        flashTitle: this.flash.flashTitle,  
        flashContent: this.flash.flashContent,  
        flashId: this.flash.flashId,  
        tagId: this.radio,  
        tagName: this.flash.tagName // 这里使用更新后的 tagName  
        // 如果需要更新其他字段，也可以在这里添加  
      }])  
      .then(response => {  
        this.$message.success('资讯更新成功！');  
        console.log(response);  
        // 这里可以添加额外的逻辑，比如重新获取数据或关闭对话框  
      })  
      .catch(error => {  
        console.error('Error updating flash:', error);  
        this.$message.error('资讯更新失败，请重试！');  
      });  
    })  
    .catch(error => {  
      console.error('Error getting tag name:', error);  
      this.$message.error('获取标签名称失败，请重试！');  
    }); 
    },  
    fetchFlashes() {
      axios.get(`https://localhost:7218/api/Flashes/GetFlashByFlashId?flashId=${this.flashID}`)
        .then(response => {
          this.flash = response.data;
          this.radio = ref(this.flash.tagId)
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
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
    getImageUrl(tag) {  
      // 这里返回一个基于tag的图片URL，你可能需要根据实际情况来实现这个函数  
      return tag.image// 示例URL  
    },
    ...mapMutations([  
      'toggleTag' // 映射mutation到methods，但在这个例子中，我们实际上不需要直接调用它  
      // 因为我们使用了v-model和Element UI的el-checkbox-group，它会自动处理选中状态  
    ])    
  }  ,
  created() {
    // 在组件创建时，从查询参数中获取flashId、title、content和tagName  
    this.fetchFlashes();
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

.post-body{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 40px; /* Add more indentation */
  box-sizing: border-box; /* 包括内边距和边框 */
  
}

.post-title{
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

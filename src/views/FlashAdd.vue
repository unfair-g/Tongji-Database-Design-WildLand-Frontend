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
            <el-input
              v-model="flash.tagName"
              style="width: 240px"
            />
        </div>
        <div class="post-info">
          <div class="post-title">资讯标题: 
            <el-input
              v-model="flash.flash_title"
              style="width: 240px"
            />
          </div>
          <div class="post-body">资讯内容: 
            <el-input
              v-model="flash.flash_content"
              style="width: 1000px"
              :rows="5"
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
import { useRouter } from 'vue-router'
import { mapState, mapMutations } from 'vuex'  
import { onMounted, ref, reactive } from 'vue'
import axios from '@/axios'; // 引入配置好的axios实例

export default {
  props: ['flashID'],
  data() {
    return {
      flash: [],
      tag:[]
    };
  },

  components: {
    Close
  },
  computed: {  
    ...mapState([  
      'tags', // 将state中的tags映射到组件的computed属性  
      'selectedTags' // 将state中的selectedTags映射到组件的v-model上
    ])  ,
  },  
  methods: {  
    closeDetail(){
      this.$router.push({ path: `/administrator/flashaudit` })
    },
    updateFlash() {  
      // 确保 flash 对象中有需要更新的数据  
      if (!this.flash.flash_id || !this.flash.flash_title || !this.flash.flash_content) {  
        this.$message.error('缺少必要的更新信息');  
        return;  
      }  

      // 发送 PUT 请求来更新 Flash  
      axios.put(`https://localhost:7218/api/Flashes/${this.flashID}`, {  
        flash_id:  this.flashID,
        user_id: this.flash.user_id,
        flash_date:  this.flash.flash_date,
        flash_image:  this.flash.flash_image,
        collection_number:  this.flash.collection_number,
        views_number:  this.flash.views_number,
        flash_title: this.flash.flash_title,  
        flash_content: this.flash.flash_content,  
        // 如果需要更新其他字段，也可以在这里添加  
      })  
      .then(response => {  
        this.$message.success('资讯更新成功！');  
        // 这里可以添加额外的逻辑，比如重新获取数据或关闭对话框  
      })  
      .catch(error => {  
        console.error('Error updating flash:', error);  
        this.$message.error('资讯更新失败，请重试！');  
      });  
    },  
    fetchFlashes() {
      axios.get(`https://localhost:7218/api/Flashes/${this.flashID}`)
        .then(response => {
          this.flash = response.data;
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

.post-title,
.post-category,
.post-body,
.post-publisher,
.review-opinion {
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

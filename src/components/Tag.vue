<template>
  <div class="tag-group">  
    <el-card  
      v-for="(tag, index) in tag"  
      :key="index"  
    >  
      <div class="tag-container">  
        <el-tag :color="tag.color" class="tag-name">{{ tag.tag_name }}</el-tag>  
      </div>  
      <div class="update-tag">  
        <el-button :color="tag.updateColor || '#1D5B5E'" @click="showUpdateDialog(tag)">更新标签</el-button>  
      </div>  
      <div class="update-tag">  
        <el-button :color="tag.updateColor || '#1D5B5E'" @click="deleteTag(tag)">删除标签</el-button>  
      </div>  
      <!-- 添加 el-dialog 组件 -->  
    </el-card>  
  </div>  

  <el-dialog  
        title="标签更改"   
        v-model="dialogVisible" 
        width="30%"  
      >  
        <div class="post-detail-content">  
          <div class="post-info">  
            <div class="post-title">标签ID:  
              <el-input  
                v-model="currentTag.tag_id"  
                disabled
                style="width: 240px"  
              />  
            </div>  
            <div class="post-body">标签内容:  
              <el-input  
                v-model="currentTag.tag_name"  
                style="width: 100%; height: 100px"  
                type="textarea"  
                autosize  
              />  
            </div>  
          </div>   
        </div>  
        <template #footer>  
            <el-button @click="dialogVisible = false">取 消</el-button>  
            <el-button type="primary" @click="updateTag">确 认</el-button>  
          </template> 
      </el-dialog>  
</template>  
  
<script>  
import axios from '@/axios'; // 引入配置好的axios实例

export default {  
  name: 'HotPosts',
  data() {
    return {
      tag:[],
      dialogVisible: false,  
      currentTag: {} 
    };
  },
  methods: {
    showUpdateDialog(tag) {  
      this.dialogVisible = true;  
      this.currentTag = { ...tag }; // 浅拷贝当前标签数据到 currentTag  
    },  
    updateTag() {  
      // 使用 currentTag 的数据发送 PUT 请求  
      axios.put(`/api/FlashTags/${this.currentTag.tag_id}`, {  
        tag_id:this.currentTag.tag_id,
        tag_name: this.currentTag.tag_name,  
        // 如果需要，可以添加其他字段  
      })  
      .then(() => {  
        this.$message.success('标签更新成功！');  
        this.dialogVisible = false; // 关闭对话框  
        // 可能还需要重新获取或更新 tags 列表
        this.fetchTags();  
      })  
      .catch(error => {  
        console.error('Error updating flash:', error);  
        this.$message.error('标签更新失败，请重试！');  
      });  
    },  
    deleteTag(tag) {  
      // 弹出确认窗口  
      if (confirm('你确定要删除这个Tag吗？')) {  
        // 用户点击了确定，提交删除请求  
        axios.delete(`/api/FlashTags/${tag.tag_id}`)  
          .then(() => {  
            // 删除成功的处理逻辑，例如提示用户或刷新页面  
            alert('tag删除成功！');  
            // 这里可以添加其他逻辑，比如从前端列表中移除该Flash  
            this.fetchTags(); 
          })  
          .catch(error => {  
            // 删除失败的处理逻辑  
            console.error('Error deleting flash:', error);  
            alert('删除tag时发生错误，请稍后再试！');  
          });  
      } else {  
        // 用户点击了取消，不执行任何操作  
        alert('删除已取消！');  
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
  },
  created() {
    this.fetchTags();
  }
}  
</script>  
  
<style scoped>  
.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */  
  padding: 20px; /* 添加内部填充 */  
  background-color: rgba(255, 255, 255, 0.8);  
}  
  
.tag-container {  
  margin-bottom: 15px; /* 增加与下方内容的间隔 */  
}  
  
.detail {  
  margin-bottom: 20px; /* 增加与下方标题的间隔 */  
  font-size: 16px; /* 可选：调整字体大小 */  
  color: #333; /* 可选：调整文字颜色 */  
}  

.tag-name{
  font-size: 20px;
}
  
.heading {  
  margin-bottom: 10px; /* 增加与下方标签组的间隔 */  
  color: #555; /* 可选：调整标题颜色 */  
}  
  
.tag-group {  
  display: flex; /* 使用 Flexbox 布局来水平排列标签 */  
  align-items: center; /* 垂直居中对齐标签（如果它们的高度不同） */  
  gap: 10px; /* 在 Flex 容器中设置子元素之间的间隔 */  
}  
  
.tag-item {  
  /* 这里不需要额外的样式，但可以根据需要进行调整 */  
}  
  
.update-tag {  
  margin-top: 10px; /* 增加与上方内容的间隔 */  
}  
</style>
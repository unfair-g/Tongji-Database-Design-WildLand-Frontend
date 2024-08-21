<template>
  <div class="tag-group">  
    <el-card  
      v-for="(tag, index) in tag"  
      :key="index"  
    >  
      <div class="tag-container">  
        <el-tag :color="tag.color">{{ tag.tag_id }}</el-tag>  
      </div>  
      <div class="detail">{{ tag.tag_name || '暂无备注' }}</div> <!-- 假设每个tag都有一个location属性，或者默认为未知地区 -->  
      <div class="update-tag">  
        <el-button :color="tag.updateColor || '#1D5B5E'" @click="goToDetail(tag)">更新标签</el-button>  
      </div>  
    </el-card>  
  </div>
</template>  
  
<script>  
import axios from '@/axios'; // 引入配置好的axios实例

export default {  
  name: 'HotPosts',
  data() {
    return {
      tag:[]
    };
  },
  methods: {
    fetchTags() {
      axios.get(`https://localhost:7218/api/FlashTags`)
        .then(response => {
          this.tag = response.data;
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
    },
    goToDetail (tag) {
      const tagId = tag.tag_id
      this.$router.push({ path: `/administrator/tagaudit/${tagId}` })
    }
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
  margin-top: 20px; /* 增加与上方内容的间隔 */  
}  
</style>
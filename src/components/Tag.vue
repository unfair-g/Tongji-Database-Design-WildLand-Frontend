<template>  
  <div class="tag-group">  
    <el-card  
      v-for="(tag, index) in tag"  
      :key="index"  
    >  
      <div class="tag-container">  
        <el-tag :color="tag.color">{{ tag.title }}</el-tag>  
      </div>  
      <div class="detail">{{ tag.ps || '暂无备注' }}</div> <!-- 假设每个tag都有一个location属性，或者默认为未知地区 -->  
      <h3 class="heading">相似标签</h3>  
      <div class="tag-group">  
        <el-tag  
          type="info"  
          class="tag-item"  
        >  
          {{ tag.similarTags }}  
        </el-tag>  
      </div>  
      <div class="update-tag">  
        <el-button :color="tag.updateColor || '#1D5B5E'" @click="goToDetail()">更新标签</el-button>  
      </div>  
    </el-card>  
  </div>  
</template>  
  
<script>  
export default {  
  name: 'HotPosts',  
  computed: {
    tag() {
      return this.$store.state.tag.tags;
    },
  },
  methods: {
    goToDetail () {
      this.$router.push({ path: `/administrator/tagaudit/tagchange` })
    }
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
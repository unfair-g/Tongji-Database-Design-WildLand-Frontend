<template>
  <el-card class="flash">
    <template #header>
      <div class="flash-header">热门资讯</div>
    </template>
    <div class="flash-list">
      <div class="flash-item" v-for="(flashes) in flash" :key="flashes.flash.flash_title" @click="goToDetail(flashes)">
        <div class="img">
            <img :src="flashes.flashImage" width="60" height="60" style="border-radius: 10px; margin-right: 10px;">
        </div>
        <div class="flash-info">
          <span class="flash-title">{{ flashes.flash.flash_title }}</span>
          <span class="flash-meta">作者：{{ flashes.flash.user_id }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

import axios from '@/axios'; // 引入配置好的axios实例

export default {
  name: 'HotPosts',
  props: ['flashID'],
  data() {
    return {
      flash: []
    };
  },
  methods: {
    goToDetail (flashes) {
      const flashId = flashes.flash.flash_id;
      this.$router.push({ path: `/home/flash/${flashId}` })
    },
    fetchFlashes() {  
      axios.get('https://localhost:7218/api/Flashes/GetLatestNPopularWithTags?n=3')  
        .then(response => {  
          // 假设 response.data 是一个数组，每个元素都是一个对象，且每个对象都有 picUrls 属性  
          this.flash = response.data.map(flash => {  
            // 复制当前对象，并添加或修改 flashImage 属性  
            // 注意：这里使用扩展运算符进行浅拷贝  
            return {  
              ...flash, // 浅拷贝当前对象  
              flashImage: flash.picUrls && flash.picUrls.length > 0 ? flash.picUrls[0] : null // 赋值 picUrls[0] 给 flashImage  
            };  
          }); 
          console.log(this.flash) 
        })  
        .catch(error => {  
          // 修改日志信息，以更准确地反映错误内容  
          console.error('Error fetching flashes:', error);  
          console.log(this.flashes)
        });  
        console.log(this.flash)
    },
  },
  created() {
    this.fetchFlashes();
  }
}
</script>

<style scoped>
.flash {
  margin-bottom: 20px;
  background: transparent;
}
.flash-header {
  font-weight: bold;
  display: flex;
  align-items: center;
  background: transparent;
  font-size: 37px;
  color:#1D5B5E;
}
.flash-list {
  display: flex;
  flex-direction: column;
  background: transparent;
}
.flash-item {
  display: flex;
  align-items: center;
  margin: 3%;
}
.flash-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  font-size: 25px;
  font-weight: bold;
}
.flash-meta {
  color: #999;
  font-size: 0.9em;
}
.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
}
</style>

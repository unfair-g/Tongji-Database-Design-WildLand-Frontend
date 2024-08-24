<template>
  <flashaside  @menu-select="handleMenuSelect"/>
  <el-card class="flash">
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in flashes" :key="flash.flash_title" @click="goToDetail(flash)">
        <div class="img">
            <img style="width: 253px; height: 171px;" :src="flash.picUrls" />
        </div>
        <div class="flash-info">
            <span class="flash-title">{{ flash.flashTitle }}</span>
            <span class="flash-meta">作者： {{ flash.userId }}</span>
          <div>
            <span class="flash-like">{{ flash.collectionNumber }}收藏</span>
            <span class="flash-like">{{ flash.viewsNumber }}浏览</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

import flashaside from '../components/FlashAside.vue';
import axios from '@/axios'; // 引入配置好的axios实例
import { ElMessage } from "element-plus";

export default {
  name: 'RecommendFlash',
  props: ['flashID'],
  components: {
  flashaside
},
data() {
    return {
      currentMenu:'营地', // 默认选中的菜单项
      flashes: [],
      pic:''
    };
    
  },
  methods: {
    handleMenuSelect(index) {
      if (index !== undefined && index !== null && index !== "") {  
        this.currentMenu = index;  
      }  
    },
    fetchFlashes() {  
      axios.get(`https://localhost:7218/api/FlashTags/GetFlashInfoByTag?tag_name=${this.currentMenu}`)
        .then(response => {
          this.flashes = response.data;
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
    },
    goToDetail (flash) {
      const flashId = flash.flashId;
      this.$router.push({ path: `/home/flash/${flashId}` })
    },
    handleError(error, message) {
      if (error.response) {
        console.error(`${message}:`, error.response.data);
        ElMessage.error(`${message} - 错误代码: ${error.response.status}`);
      } else if (error.request) {
        console.error(`${message}: No response received`);
        ElMessage.error(`${message} - 没有收到响应`);
      } else {
        console.error(`${message}:`, error.message);
        ElMessage.error(`${message} - 错误信息: ${error.message}`);
      }
    }
  },
  
  watch: {
    currentMenu: 'fetchFlashes'
  },
  created() {
    this.fetchFlashes();
  }
}
</script>

<style scoped>
.img{
  max-width: 1%; /* 或者一个具体的百分比，但100%意味着图片将尝试填满其容器的宽度 */  
    height: auto; /* 让高度自动调整以保持宽高比 */  
    /* 如果有需要，你还可以添加以下样式来确保图片不会超出其容器 */  
    display: block; /* 防止图片下方出现额外的空间（由于行内元素的特性） */  
    margin: 0 auto; /* 如果需要，可以让图片在其容器内水平居中 */
}
.flash {
  margin-bottom: 20px;
  background: transparent;
}
.flash-list {
  background: transparent;
}
.flash-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 33%;
}
.flash-info {
  margin: 3%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  color:#333;
      margin-top: 1px;
      margin-bottom: 14px;
      margin-left: 250px;
      height:48px;
      font-size: 37px;
}
.flash-meta {
  color: #999;
  font-size: 0.9em;
  margin-left: 250px;
}
.flash-view {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.flash-like {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.flash-comment {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
}
</style>

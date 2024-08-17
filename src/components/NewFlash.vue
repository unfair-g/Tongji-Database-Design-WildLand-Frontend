<template>  
  <el-timeline>  
    <el-timeline-item  
      v-for="(flash, index) in flash"  
      :key="index"  
      :timestamp="flash.flash_date"  
      placement="top"  
      @click="goToDetail(flash)"
    >  
      <template #dot>  
        <i class="el-icon-info"></i>  
      </template>  
      <el-card class="flash-item">  
        <div class="flash-info">  
          <span class="flash-title">{{ flash.flash_title }}</span>  
          <div class="flex gap-2">  
            <el-tag type="info">{{ flash.tag }}</el-tag>  
          </div>  
        </div>  
      </el-card>  
    </el-timeline-item>  
  </el-timeline>  
</template>  
  
<script>  
import axios from '@/axios'; // 引入配置好的axios实例

export default {  
  props: ['flashID'],
  data() {
    return {
      flash: []
    };
    
  },
  methods: {
    fetchFlashes() {
      axios.get('https://localhost:7218/api/Flashes/GetLatestNFlash?n=3')
        .then(response => {
          this.flash = response.data;
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
    },
    goToDetail (flash) {
      const flashId = flash.flash_id
      this.$router.push({ path: `/home/flash/${flashId}` })
    }
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
}
.flash-list {
  display: flex;
  flex-direction: column;
  background: transparent;
}
.flash-item {
  display: flex;
  align-items: center;
}
.flash-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 2%;
}
.flash-tag {
  color:#333;
      padding: 2px 5px;
      margin-right: 10px;
      background-color: #e0e0e0; /* 标签背景色，可选 */
      border-radius: 3px; /* 圆角边框，可选 */
      display: inline-block; /* 使标签保持在一行内，但可以控制其尺寸和边距 */  
      margin-left: 10px; /* 根据需要添加边距 */  
}
.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
  background: transparent;
}
.el-timeline{  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
  background: transparent;
}
</style>

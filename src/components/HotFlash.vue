<template>
  <el-card class="flash">
    <template #header>
      <div class="flash-header">热门资讯</div>
    </template>
    <div class="flash-list">
      <div class="flash-item" v-for="(flashes) in flash" :key="flashes.flash_title" @click="goToDetail(flashes)">
        <div class="img">
            <img :src="flashes.picUrls" width="60" height="60" style="border-radius: 10px; margin-right: 10px;">
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
          this.flash = response.data;
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
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

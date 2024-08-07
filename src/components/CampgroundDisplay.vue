<template>
  <div class="camp-list">
    <el-col :span="20" v-for="camp in filteredCamps" :key="camp.campground_id" style="margin-bottom:25px;">
      <el-card :body-style="{ padding: '5px' }" shadow="hover" class="camp-card" @click="goToCampDetail(camp)">
        <img :src="camp.camp_showpic" class="image" alt="camp image">
        <div style="padding: 14px;">
          <span class="name">{{ camp.campground_name }}</span>
          <div class="bottom clearfix">
            <span class="introduction">{{ camp.slogan }}</span>
            <el-button type="text" class="button" @click="goToCampDetail(camp)">查看详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import axios from '@/axios'; // 引入配置好的axios实例
import { ElMessage } from "element-plus";

export default {
  name: 'CampgroundDisplay',
  props: {
    currentMenu: String
  },
  data() {
    return {
      camps: []
    };
  },
  computed: {
    filteredCamps() {
      return this.camps; 
    }
  },
  methods: {
    async fetchCamps() {
      try {
        const response = await axios.get(`/api/Campgrounds/GetCgIntro/${this.currentMenu}`);
        this.camps = response.data;
      } catch (error) {
        console.error('Failed to fetch camps:', error);
        this.handleError(error, '获取营地信息失败');
      }
    },
    goToCampDetail(camp) {
      this.$router.push({ path: `/home/campdetail/${camp.campground_id}` });
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
    currentMenu: 'fetchCamps'
  },
  created() {
    this.fetchCamps();
  }
};
</script>

<style scoped>
.camp-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}

.camp-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
}

.image {
  width: 100%;
  object-fit: cover;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.introduction {
  color: #7b7b7b;
  font-size: 14px;
}

.button {
  float: right;
  padding: 0;
}
</style>

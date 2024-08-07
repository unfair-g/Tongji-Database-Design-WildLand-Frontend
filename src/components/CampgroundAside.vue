<template>
  <el-aside width="200px" class="aside-container">
    <el-menu
      :default-active="activeIndex"
      class="aside"
      @select="handleMenuSelect"
    >
      <img src="@/assets/camp.png" alt="Camp Logo" class="logo" />
      <div class="divider"></div>
      <el-menu-item
        v-for="(city, index) in cityNames"
        :key="index"
        :index="city"
        class="menuitem"
      >
        {{ city }}
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

  <script>
import axios from '@/axios'; // 引入配置好的axios实例
import {ElMessage} from "element-plus";

export default {
  name: 'SideBarMenu',
  data() {
    return {
      cityNames: [],
      activeIndex: '上海'
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.$emit('menu-select', index); 
    },
    async fetchCityNames() {
      try {
        const response = await axios.get('/api/Campgrounds/GetCity');
        this.cityNames = response.data;
      } catch (error) {
        console.error('Error fetching city names:', error);
        this.handleError(error, '获取城市列表失败');
      }
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
  created() {
    this.fetchCityNames();
  }
};
</script>

<style scoped>
.aside-container {
  height: 100vh; /* Make the aside height 100% of the viewport height */
}

.aside {
  --el-menu-hover-bg-color: rgb(48,133,136,40%);
  --el-menu-hover-text-color: #ffffff;
  --el-menu-item-font-size: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo {
  height: 70px; /* Adjust the height as needed */
  margin: 10px 20px; /* Adjust the margin as needed */
}

.divider {
  height: 1px;
  background-color: #ddd; /* Divider color */
  margin: 0 0; /* Adjust the margin as needed */
}


.menuitem {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the text horizontally and vertically */
  text-align: center; /* Ensure text is centered within the flex container */
}

/* Custom styles for the active menu item */
.el-menu-item.is-active {
  background-color: #1D5B5E !important; /* Dark green color */
  color: #ffffff !important; /* Text color */
}

/* Apply styles using deep selector to ensure higher specificity */
::v-deep .el-menu-item.is-active {
  background-color: #1D5B5E !important; /* Dark green color */
  color: #ffffff !important; /* Text color */
}
</style>


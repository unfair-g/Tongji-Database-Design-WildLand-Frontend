<template>
    <el-aside width="200px" class="aside-container">
      <el-menu
        :default-active="activeIndex"
        class="aside"
        @select="handleMenuSelect"
      >
        <div class="divider"></div> <!-- Divider line -->
       <el-menu-item
       v-for="(tag,index) in tags"  
        :key="index"  
        :index="tag"  
        @click="handleMenuSelect(tag.tag_name)" 
        class="menuitem"  
      >
        {{ tag }}
      </el-menu-item>
      </el-menu>
    </el-aside>
  </template>
  
  <script>

  import axios from '@/axios';
  import { ref } from 'vue'

  export default {
    name: 'TagMenu',
    data() {
    return {
      Names: [],
      tags:[],
      activeIndex :ref('营地')
    };
  },
  methods: {
      handleMenuSelect(index) {
        this.activeIndex = index
        this.$emit('menu-select', index); // 触发父组件的事件，并传递选项的索引
      },
      fetchTagNames() {
      axios.get('/api/FlashTags/GetTagNames')
        .then(response => {
          this.tags = response.data;
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
    }
    },
    created() {
    this.fetchTagNames();
  }
  }
  </script>


<style scoped>
.aside-container {
  height: 5vh; /* Make the aside height 100% of the viewport height */
  width:100vh;
}

.aside {
  --el-menu-hover-bg-color: rgb(48,133,136,40%);
  --el-menu-hover-text-color: #ffffff;
  --el-menu-item-font-size: 20px;
  display: flex;
  height: 5%;
  width: 100%;
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
  width: 137px;
  height: 37px;
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


<template>
    <el-aside width="200px" class="aside-container">
      <el-menu
        :default-active="activeIndex"
        class="aside"
        @select="handleMenuSelect"
      >
        <img src="@/assets/camp.png" alt="Camp Logo" class="logo" />
        <div class="divider"></div> <!-- Divider line -->
        <el-menu-item class="menuitem" index="上海">上海</el-menu-item>
        <el-menu-item class="menuitem" index="绍兴">绍兴</el-menu-item>
        <el-menu-item class="menuitem" index="桐庐">桐庐</el-menu-item>
        <el-menu-item class="menuitem" index="杭州">杭州</el-menu-item>
        <el-menu-item class="menuitem" index="湖州">湖州</el-menu-item>
      </el-menu>
    </el-aside>
  </template>
  
  


  <script>
  export default {
    name: 'SideBarMenu',
    methods: {
      handleMenuSelect(index) {
        this.$emit('menu-select', index); // 触发父组件的事件，并传递选项的索引
      }
    }
  }
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


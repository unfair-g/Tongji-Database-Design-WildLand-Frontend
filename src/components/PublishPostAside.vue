<template>
    <el-container  class="aside-container">
        <el-menu
          :default-active="activeIndex"
          class="aside"
          @select="handleMenuSelect"
        >
            <el-menu-item class="menu-item" index="share">分享贴</el-menu-item>
            
            <el-menu-item class="menu-item" index="recruit">招募贴</el-menu-item>
                
            <el-menu-item class="menu-item" index="rent">闲置贴</el-menu-item >

        </el-menu>

    </el-container>
</template>

<script>
export default {
    name: 'PublishAside',
    props: {
      activeIndex: {
        type: String,
        required: true
      }
    },
    methods:{
        handleMenuSelect(index){
            this.$emit('menu-select', index);  // 触发父组件的事件，并传递选项的索引     
        }
    }
}
</script>

<style scoped>
.aside-container {
  display: flex;
  align-items: center; /* 垂直居中 */
  /* justify-content: center; 水平居中 */
  height: 90%; 
}
.aside {
  --el-menu-hover-bg-color: rgb(48,133,136,40%);
  --el-menu-hover-text-color: #ffffff;
  --el-menu-item-font-size: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
::v-deep .el-menu-item.is-active {
  background-color: #1D5B5E !important;
  color: #ffffff !important;
  font-weight: bold !important;
}
</style>

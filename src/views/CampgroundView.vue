<template>
    <div class="container">
      <CampgroundAside @menu-select="handleMenuSelect"/>
      <el-main>
        <!-- 根据左侧导航栏的选项显示不同的内容 -->
        <router-view></router-view>
        <!-- 根据选项显示不同内容 -->
        <CampgroundDisplay :currentMenu="currentMenu"/>

      </el-main>
    </div>

</template>
   


<script>
   import CampgroundAside from "../components/CampgroundAside.vue"
   import CampgroundDisplay from "../components/CampgroundDisplay.vue"

   export default {
     name: 'HelloWorld',
     props: {
       msg: String
     },
   
     components: {
       CampgroundAside,
       CampgroundDisplay
     },
     
    data() {
    return {
      currentMenu: '上海' // 默认选中的菜单项
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.currentMenu = index;
    }
  }
   }
   
 </script>
   
<style scoped>
   .container {
    max-width: 70%; /* 设置容器的最大宽度 */
    height: 90.4vh; /* 设置容器高度为视口高度 */
    margin: 0 auto; /* 居中显示容器 */
    display: flex;
    background-color: #ffffff; /* 设置容器的背景色为白色 */
    }

    .main {
      display: flex;

      justify-content: center; /* 水平居中 */
    }

    .CampgroundAside {
      margin: 0 auto 0 auto;
    }
</style>
<template>
    <div class="container">
      <CampgroundAside @menu-select="handleMenuSelect"/>
      <main>
        <!-- 根据左侧导航栏的选项显示不同的内容 -->
        <router-view></router-view>
        <!-- 根据选项显示不同内容 -->
        <CampgroundDisplay :currentMenu="currentMenu"/>

      </main>
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
   
<style>
   #bg{
     z-index:-1;
     top:0;
     width: 100%;
     height:100%;
     position:absolute;
   }
   
   #bg img {
     position:absolute;
     right: 0;
     bottom: 0;  
     object-fit: cover;
     width: 100%;
     height: 100%;
     opacity:25%;
   }

   .container {
    max-width: 70%; /* 设置容器的最大宽度 */
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
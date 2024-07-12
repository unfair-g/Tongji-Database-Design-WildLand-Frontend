<template>
 <div id="bg">
    <img src="../assets/bg.jpg">
 </div>
 <el-container>
 <div class="head">
   <HomeHead />
 </div>
  <div class="main">
    <MainContent />
  </div>

  <el-aside width="375px">
    <AsideContent />
  </el-aside>
  </el-container>
  
</template>

<script>
import HomeHead from "../components/HomeHead.vue"
import MainContent from "../components/Main.vue"
import AsideContent from "../components/Sidebar.vue"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  components: {
    HomeHead,
    MainContent,
    AsideContent
  }
}

</script>

<style>
#bg{
  z-index:-1;
  top:0;
  width: 100%;
  height:100%;
  position:fixed;
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
.main{
  margin-top: 110px;
  overflow: hidden;
}

</style>
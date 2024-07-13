<template>
     <div id="bg">
      <img src="../assets/bg.jpg">
     </div>
      <HomeHead />
      <router-view></router-view>
</template>

<script>
import HomeHead from "../components/HomeHead.vue"

export default {
  components: {
    HomeHead
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
</style>
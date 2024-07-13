<template>
<div id="bg">
    <img src="../assets/loginbg.png">
</div>
<router-view></router-view>
</template>

<script>

</script>

<style scoped>
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
  opacity:80%;
}
</style>
<template>
  <div id="bg">
    <video autoplay loop muted style="width: 100%">
        <source src="../assets/login.mp4" />
    </video>
  </div>
  <MyLogo />
  
</template>

<script>
  import MyLogo from "../components/MyLogo.vue"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  components: {
    MyLogo
  }
}
</script>

<style scoped>
#bg{
  z-index:-1;
  top:0;
  width: 100%;
  height:100%;
  position:absolute;
}

#bg video {
  position:absolute;
  right: 0;
  bottom: 0;  
  object-fit: cover;
  width: 100%;
  height: 100%;
}

</style>

<template>
<div id="bg">
    <img src="../assets/loginbg.png">
</div>
<component :is="currentComponent"></component>
</template>

<script>
import Login from '../components/LogIn.vue'
import Enrollment from '../components/UserEnroll.vue'

export default {
  data() {
    return {
      currentComponent:Login
    }
  },
  created() {
    this.currentComponent = this.$route.query.component;
  },
  components: {
      Login,
      Enrollment
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
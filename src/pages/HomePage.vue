<template>
    <div class="homepage">
      <HomeHead />
      <router-view></router-view>
    </div>
</template>

<script>
import HomeHead from "../components/HomeHead.vue"

export default {
  components: {
    HomeHead
  }
}

</script>
<style scoped>
  .homepage{
    min-width:100%;
    min-height:100vh;
    background: url(../assets/bg.jpg) no-repeat;
    background-size:100% 100%;
    background-attachment:fixed;
  }
</style>
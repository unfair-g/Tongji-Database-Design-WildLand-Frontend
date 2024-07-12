<template>
  <div class="app">
    <div class="login_container">
      <HomeHead class="top"></HomeHead>
      <router-view></router-view>
      <ItemView class="top" v-if="!show"></ItemView>
    </div>
  </div>
</template>

<script>
import HomeHead from '@/layout/HomeHead.vue'
import ItemView from '@/views/ItemView.vue'

export default {
  components: {
    HomeHead,
    ItemView
  },
  computed: {
    show () {
      // 根据当前路由判断是否显示 HomeHead 和 ItemView
      return this.$route.path.includes('/product/') // 假设商品详情页面的路由是 '/product'
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.login_container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.login_container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(@/assets/login.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  z-index: -1;
}

.top{
  width:100%;
}
</style>

<template>
      <router-view></router-view>
      <ItemView class="top" v-if="!show"></ItemView>
</template>

<script>
import ItemView from '@/views/ItemView.vue'

export default {
  components: {
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

</style>

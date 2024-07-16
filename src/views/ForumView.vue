<template>
 <el-container>
  <el-main class="main">
    <MainContent />
  </el-main>
  <el-aside width="375px">
    <AsideContent />
  </el-aside>
  </el-container>
</template>

<script>
import MainContent from "../components/Main.vue"
import AsideContent from "../components/Sidebar.vue"

export default {

  components: {
    MainContent,
    AsideContent
  }
}

</script>

<style>

.main{
  overflow: hidden;
}

</style>
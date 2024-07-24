<template>
  <el-card class="flash">
    <template #header>
      <div class="flash-header">热门资讯</div>
    </template>
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in flash" :key="flash.title" @click="goToDetail(flash)">
        <div class="img">
            <img src="../assets/flash-1.png" alt="" width="60" height="60" style="border-radius: 10px; margin-right: 10px;">
        </div>
        <div class="flash-info">
          <span class="flash-title">{{ flash.title }}</span>
          <span class="flash-meta">{{ flash.meta }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'HotPosts',
  props: ['flashID'],
  computed: {
    flash() {
      return this.$store.state.flash.flashes;
    },
  },
  methods: {
    goToDetail (flash) {
      const flashId = flash.flash_id
      this.$router.push({ path: `/home/flash/${flashId}` })
    }
  }
}
</script>

<style scoped>
.flash {
  margin-bottom: 20px;
  background: transparent;
}
.flash-header {
  font-weight: bold;
  display: flex;
  align-items: center;
  background: transparent;
  font-size: 37px;
  color:#1D5B5E;
}
.flash-list {
  display: flex;
  flex-direction: column;
  background: transparent;
}
.flash-item {
  display: flex;
  align-items: center;
  margin: 3%;
}
.flash-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  font-size: 25px;
  font-weight: bold;
}
.flash-meta {
  color: #999;
  font-size: 0.9em;
}
.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
}
</style>

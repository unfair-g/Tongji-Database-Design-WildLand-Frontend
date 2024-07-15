<template>
  <el-card class="flash">
    <template #header>
      <div class="flash-header">推荐资讯</div>
    </template>
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in flash" :key="flash.title">
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
  data() {
    return {
      flash: [
        { title: '野游营地 | 逃离燥热城市', meta: '作者: wsy'},
        { title: '野游营地 | 逃离燥热城市', meta: '作者: wsy'},
        { title: '野游营地 | 逃离燥热城市', meta: '作者: wsy'}
      ]
    };
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
}
.flash-list {
  display: flex;
  flex-direction: column;
  background: transparent;
}
.flash-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.flash-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
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

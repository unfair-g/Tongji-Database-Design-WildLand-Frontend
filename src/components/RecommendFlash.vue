<template>
  <el-card class="flash">
    <template #header>
      <div class="flash-header">推荐资讯</div>
    </template>
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in flash" :key="flash.title" @click="goToDetail(flash)">
        <div class="img">
            <img src="../assets/flash-1.png" alt="">
        </div>
        <div class="flash-info">
            <span class="flash-title">{{ flash.title }}</span>
          <div>
            <img src="../assets/head.png" alt="" width="22" height="22">
            <span class="flash-meta">{{ flash.meta }}</span>
            <span class="flash-like">{{ flash.like }}</span>
            <span class="flash-like">{{ flash.view }}</span>
           <span class="flash-like">{{ flash.comment }}</span>
          </div>
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
        { id:1,title: '野游营地 | 逃离燥热城市', meta: ' wsy',like:'52900 喜爱',view:'370000浏览',comment:'260评论'},
        { id:1,title: '野游营地 | 逃离燥热城市', meta: ' wsy',like:'52900 喜爱',view:'370000浏览',comment:'260评论'},
        { id:1,title: '野游营地 | 逃离燥热城市', meta: ' wsy',like:'52900 喜爱',view:'370000浏览',comment:'260评论'}
      ]
    };
  },
  methods: {
    goToDetail (flash) {
      const flashId = flash.id
      this.$router.push({ path: `/home/flash/${flashId}` })
    }
  }
}
</script>

<style scoped>
.img{
    width:253px;
    height:171px;
}
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
  background: transparent;
}
.flash-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.flash-info {
  margin: 3%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  color:#333;
      margin-top: 1px;
      margin-bottom: 14px;
      height:48px;
      font-size: 37px;
      overflow:hidden;
}
.flash-meta {
  color: #999;
  font-size: 0.9em;
}
.flash-view {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.flash-like {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.flash-comment {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
}
</style>

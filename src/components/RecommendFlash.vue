<template>
  <flashaside  @menu-select="handleMenuSelect"/>
  <el-card class="flash">
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in filteredFlashes" :key="flash.title" @click="goToDetail(flash)">
        <div class="img">
            <img :src="flash.image" />
        </div>
        <div class="flash-info">
            <span class="flash-title">{{ flash.title }}</span>
            <span class="flash-meta">作者： {{ flash.meta }}</span>
          <div>
            <span class="flash-like">{{ flash.like }}收藏</span>
            <span class="flash-like">{{ flash.view }}浏览</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

import flashaside from '../components/FlashAside.vue';

export default {
  name: 'RecommendFlash',
  props: ['flashID'],
  components: {
  flashaside
},
data() {
    return {
      currentMenu: 1, // 默认选中的菜单项
    };
  },
  computed: {
    flash() {
      return this.$store.state.flash.flashes;
    },
    filteredFlashes() {
      return this.flash.filter(flash => {return flash.tag_id === this.currentMenu;}  );
    }
  },
  methods: {
    handleMenuSelect(index) {
      this.currentMenu = index;
    },
    goToDetail (flash) {
      const flashId = flash.flash_id
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

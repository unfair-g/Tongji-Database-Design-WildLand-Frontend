<template>
  <el-menu :default-active="activeIndex"
  :ellipsis="false"
  class="el-menu-demo"
  mode="horizontal"
  active-text-color="#1D5B5E"
  @select="handleSelect"
  >

      <el-menu-item index="1" @click="toShare">
        -分享贴-
      </el-menu-item>
      <el-menu-item index="2" @click="toRecruit">
        -招募贴-
      </el-menu-item>
      <el-menu-item index="3" @click="toLease">
        -闲置贴-
      </el-menu-item>

    <div class="flex-grow" />
    <div class="menu-search">
      <el-input
        v-model="input"
        style="width: 240px;height:50px"
        placeholder="搜索帖子"
        class="search-input"
        clearable
      />
        <el-button type="primary" :icon="Search" color="#1D5B5E"  style="height:50px">搜索</el-button>
    </div>
   
  </el-menu>
  
  <el-main>

    <div v-if="currentView === 'lease'">
      <LeaseForum />
    </div>

    <div v-else>
      <ArticleCard :view="currentView"/>
    </div>

  </el-main>
   
  
</template>

<script>
import ArticleCard from '../components/Article.vue'
import LeaseForum from '../components/LeaseForum.vue'

export default {
  name: 'MainContent',
  components: {
    ArticleCard,
    LeaseForum
  },
  methods: {
    toShare(){
      this.currentView = 'share'
    },
    toRecruit(){
      this.currentView = 'recruit'
    },
    toLease(){
      this.currentView = 'lease'
    }
  },
  data() {
    return {
      currentView: 'share' // 默认显示分享贴
    }
  }
}
</script>
<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style scoped>

.el-main {
  padding: 10px;
}
.menu-search {
  display: flex;
  align-items: right;
  margin-right: 2%;

}
.el-menu-demo{
  --el-menu-hover-bg-color: rgb(48,133,136,40%);
  --el-menu-hover-text-color: #ffffff;
  --el-menu-active-color: #1D5B5E;

}
.search-input {
  width: 240px;
  margin-right: 10px;
}
.flex-grow {
  flex-grow: 1;
}
</style>

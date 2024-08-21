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
        v-model="searchQuery"
        style="width: 240px;height:50px"
        :placeholder="localPlaceHolder"
        class="search-input"
        clearable
      />
        <el-button 
          type="primary" 
          color="#1D5B5E"  
          style="height:50px" 
          @click="searchPosts"
        >
          搜索
        </el-button>
    </div>
   
  </el-menu>
  
  <el-main>
    <div>
      <ArticleCard 
        :view="currentView"
        :search-query="searchQuery"
      />
    </div>

  </el-main>
   
  
</template>

<script>
import ArticleCard from '../components/Article.vue'

export default {
  name: 'MainContent',
  components: {
    ArticleCard
  },
  methods: {
    toShare(){
      this.currentView = 'share';
      this.localPlaceHolder = '搜索分享贴';

    },
    toRecruit(){
      this.currentView = 'recruit'
      this.localPlaceHolder = '搜索招募贴';

    },
    toLease(){
      this.currentView = 'lease'
      this.localPlaceHolder = '搜索闲置贴';
    },
    searchPosts() {
      // 在这里可以执行一些额外的逻辑，例如发起请求或其他处理
      console.log('搜索内容:', this.searchQuery)
      // searchQuery 已自动通过 v-model 传递给 ArticleCard
    }
  },
  data() {
    return {
      currentView: 'share', // 默认显示分享贴
      searchQuery: '', // 搜索输入框的内容
      localPlaceHolder:'搜索分享贴',
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

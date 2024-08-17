<template>

<div class="searchbox">
      <el-input
        v-model="inputValue"
        style="width: 340px;height:50px;"
        placeholder="请输入想租赁的户外用品"
        clearable
    />
    <el-button type="primary" :icon="Search" color="#1D5B5E"  style="height:50px" @click="searchProducts">搜索</el-button>
    </div>
    <div class="searchbox">
      <el-button-group >
            <el-tabs v-model="activeTab" style="margin: 20px;">
              <el-tab-pane label="全部" name="all">
              </el-tab-pane>
              <el-tab-pane label="烹饪类" name="烹饪类">
              </el-tab-pane>
              <el-tab-pane label="工具类" name="工具类">
              </el-tab-pane>
              <el-tab-pane label="帐篷天幕类" name="帐篷天幕类">
              </el-tab-pane>
              <el-tab-pane label="桌椅类" name="桌椅类">
              </el-tab-pane>
              <el-tab-pane label="娱乐类" name="娱乐类">
              </el-tab-pane>
              <el-tab-pane label="其他" name="其他">
              </el-tab-pane>
            </el-tabs>
        </el-button-group>
    </div>
        <!--标签栏-->
        <!--标签栏-->
      <!--商品栏-->
    <ProductView :activeTab="activeTab"/>
</template>

<script>
import ProductView from './ProductView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ItemView',
  components: {
    ProductView
  },
  setup() {  
    const inputValue = ref('')  
    const activeTab = ref('all')  
    const router = useRouter()  
  
    const searchProducts = () => {  
      if (inputValue.value.trim()) {  
        router.push({ path: '/home/searchProduct', query: { keyword: inputValue.value } })  
      }  
    }  
  
    return {  
      inputValue,  
      activeTab,  
      searchProducts  
    }  
  }
}
</script>

<style scoped>


::v-deep .el-tabs__item {
  font-size: 18px;
  color:#1D5B5E;
  font-weight: bold;
}

.searchbox {  
    display: flex; /* 启用Flexbox */  
    justify-content: center; /* 水平居中 */  
    align-items: center; /* 垂直居中（如果需要的话） */  
    /* 如果你的搜索框需要在页面上垂直居中，可能需要给父元素也设置Flexbox */  
    /* 示例：给.searchbox的父元素添加display: flex; justify-content: center; align-items: center; */  
    /* 注意：这取决于你的页面布局 */  
    margin-top:20px;
}
</style>

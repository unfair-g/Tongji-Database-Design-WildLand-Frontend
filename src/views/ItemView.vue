<template>
  <div class="product-container">
    <div class="tab">
        <!--标签栏-->
        <el-button-group>
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
        <!--标签栏-->
    </div>
      <!--商品栏-->
    <ProductView :activeTab="activeTab"/>
  </div>
</template>

<script>
import ProductView from './ProductView.vue'

export default {
  name: 'ItemView',
  data () {
    return {
      searchText: '',
      activeTab: 'all'
    }
  },
  components: {
    ProductView
  }
}
</script>

<style scoped>
.tab{
  display:flex;
  justify-content: center;
}

::v-deep .el-tabs__item {
  font-size: 18px;
  color:#1D5B5E;
  font-weight: bold;
}

.product-container {
  height: 95vh;
  overflow-y: auto; /* 允许垂直滚动 */
  padding-left: 0px;
  margin-left: 10px;
}
</style>

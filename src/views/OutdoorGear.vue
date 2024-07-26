<template>
  <div class="table-wrapper">
    <el-table :data="filteredProducts" style="width: 100%">
      <el-table-column prop="product_name" label="名称" width="300" align="center" />
      <el-table-column prop="price" label="价格" width="200" align="center">
        <template #default="scope">
          ¥{{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="stock_quantity" label="余量" width="200" align="center" />
      <el-table-column label="操作台" width="300" align="center">
        <template #default="scope">
          <el-button 
            type="primary" 
            @click="handleAction(scope.row, 'more')">
            <More />更多
          </el-button>
          <el-button 
            type="success" 
            @click="handleAction(scope.row, 'edit')">
            <Edit />编辑
          </el-button>
          <el-button 
            type="danger" 
            @click="handleAction(scope.row, 'delete')">
            <Delete />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 当 filteredProducts 为空时显示提示信息 -->
    <el-alert
      v-if="filteredProducts.length === 0"
      title="当前无户外用品数据"
      type="info"
      center
    />
  </div>
</template>

<script>
import { More, Edit, Delete } from '@element-plus/icons-vue'

export default {
  components: {
    More,
    Edit,
    Delete
  },
  computed: {
    filteredProducts() {
      return this.$store.state.product.products.filter(product => product.product_tag.includes('all'));
    }
  },
  methods: {
    handleAction(row, action) {
      if (action === 'more') {
        this.goToProductDetail(row);
      } else if (action === 'edit') {
        this.goToProductEdit(row);
      } else if (action === 'delete') {
        this.deleteProduct(row);
      }
    },
    goToProductDetail(product) {
      const productId = product.product_id;
      this.$router.push({ path: `/home/product/${productId}` });
    },
    goToProductEdit(product) {
      const productId = product.product_id;
      this.$router.push({ path: `/home/product/edit/${productId}` });
    },
    deleteProduct(product) {
      // 提交删除请求
      this.$store.commit('deleteProduct', product.product_id);
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  width: 85%;
  min-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
}
.el-button {
  background-color: #1D5B5E;
  border-color: #1D5B5E;
  color: white;
}
.el-button:hover {
  background-color: #17494A;
  border-color: #17494A;
}
</style>

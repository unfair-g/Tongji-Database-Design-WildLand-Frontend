<template>
    <div class="product-list">
      <el-row :gutter="80"  justify="center">
        <el-col :span="8" v-for="product in filteredProducts" :key="product.product_id" style="margin-bottom:25px;">
          <el-card :body-style="{ padding: '5px' }" shadow="hover" class="product-card" @click="goToProductDetail(product)">
            <img :src="product.product_image" class="image" alt="product image">
            <div style="padding: 14px;">
              <span>{{ product.product_name}}</span>
              <div><span>尺寸：{{ product.size}}</span></div>
              <div><span>材料：{{ product.material}}</span></div>
              <div><span>适用人数：{{ product.suitable_users}}</span></div>
              <div><span>品牌：{{ product.brand}}</span></div>
              <div><span>商品余量：{{ product.stock_quantity}}</span></div>
              <div class="bottom clearfix">
                <span class="price">¥{{ product.price }}</span>
                <el-button type="text" class="button" @click="goToProductDetail(product)">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from 'axios';  
  
export default {  
  name: 'SearchProduct',  
  data() {  
    return {  
      filteredProducts: []  
    };  
  },  
  watch: {  
    '$route.query.keyword'(newValue, oldValue) { 
      console.log('Keyword changed from', oldValue, 'to', newValue);  
      this.filterProducts();  
    }  
  },  
  created() {  
    this.filterProducts(); // 组件创建时立即过滤产品  
  },  
  methods: {  
    filterProducts() {  
      const Keyword = this.$route.query.keyword || '';  
      axios.get('https://localhost:7218/api/OutdoorProducts/SearchProduct', {  
        params: {  
          keyword: Keyword  
        }  
      })  
      .then(response => {  
        this.filteredProducts = response.data;  
        console.log(this.filteredProducts);  
      })  
      .catch(error => {  
        console.error('Error fetching products:', error);  
      });  
    },  
    goToProductDetail(product) {  
      const productId = product.product_id;  
      this.$router.push({ path: `/home/product/${productId}` });  
    }  
  }  
}; 
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around; /* Align items to the left */
  margin-top: 20px;

}

.product-card {
  width: 350px; /* 固定宽度 */
  height: 400px; /* 固定高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.price {
  color: #ff4949;
  font-size: 18px;
}

.button {
  float: right;
  padding: 0;
}
</style>

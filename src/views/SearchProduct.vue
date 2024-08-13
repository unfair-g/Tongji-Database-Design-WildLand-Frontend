<template>
    <div class="product-list">
      <el-row :gutter="80"  justify="center">
        <el-col :span="7" v-for="product in filteredProducts" :key="product.product_id" style="margin-bottom:25px;">
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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'SearchProduct',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const products = ref([]);
    const filteredProducts = ref([]);

    const fetchProduct = () => {
      axios.get('https://localhost:7218/api/OutdoorProducts')
        .then(response => {
          products.value = response.data;
          filterProducts(); // 数据获取后进行过滤
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    };

    const filterProducts = () => {
      const keyword = route.query.keyword || '';
      if (keyword.trim()) {
        filteredProducts.value = products.value.filter(product => 
          product.product_name.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        filteredProducts.value = products.value;
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    watch(() => route.query.keyword, filterProducts);

    const goToProductDetail = (product) => {
      const productId = product.product_id;
      // Assuming you have router setup
      router.push({ path: `/home/product/${productId}` });
    };

    return { filteredProducts, goToProductDetail };
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Align items to the left */
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

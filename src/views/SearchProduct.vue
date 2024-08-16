<template>
    <div class="product-list">
      <el-row :gutter="80"  justify="center">
        <el-col :span="8" v-for="product in filteredProducts" :key="product.product_id" style="margin-bottom:25px;">
          <el-card :body-style="{ padding: '5px' }" shadow="hover" class="product-card" @click="goToProductDetail(product)">
            <img :src="product.item_image" class="image" alt="product image">
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
      this.fetchFilteredProduct();  
    }  
  },  
  created() {  
    this.fetchFilteredProduct(); // 组件创建时立即过滤产品  
  },  
  methods: {  
    /*filterProducts() {  
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
    }, */
    async fetchFilteredProduct()
    {
      try {
        const Keyword = this.$route.query.keyword || ''; 
        const productS = await axios.get('https://localhost:7218/api/OutdoorProducts/SearchProduct', {  
        params: {  
          keyword: Keyword  
        }  
      }); 
        console.log(productS)
      // 根据 post_id 从 Posts 接口获取帖子详情
      const OutDoorPromises = productS.data.map(async product => {
      //图片问题
      const detailResponse = await axios.get(`https://localhost:7218/api/OutdoorProductPics/GetPicsByProductId?productId=4`)  
        .catch(error => {  
        console.error('Error fetching product pics for product_id:', product.product_id, error);  
       // 你可以选择返回一个默认的对象或null，具体取决于你的应用逻辑  
       return { item_image: '图片加载失败' };  
      });
        console.log('oooook',detailResponse)

        const item_image=detailResponse.data.length>0?detailResponse.data[0]:'图片';
            // 将 order_id 添加到每个帖子对象中
            return { 
              ...product, 
              item_image:item_image,
            };
      });
      // 等待所有请求完成
      this.filteredProducts = await Promise.all(OutDoorPromises);
      console.log(this.products)
    }
      catch(error){
          console.error('Error fetching products:', error);
        }
    } ,
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
  justify-content:flex-start; /* Align items to the left */
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

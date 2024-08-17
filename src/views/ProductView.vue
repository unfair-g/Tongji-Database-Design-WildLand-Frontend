<template>
    <div class="product-list">
      <el-row :gutter="80"  justify="center">
        <el-col :span="filteredProducts.length < 3 ? 11 : 7"  v-for="product in filteredProducts" :key="product.product_id" style="margin-bottom:25px;">
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
  name: 'ProductView',
  props: {
    activeTab: String
  },
  data() {
    return {
      products: [], // 存储所有产品
      filteredProducts: [] // 存储筛选后的产品
    }
  },
  watch: {
    activeTab() {
      this.filterProducts(); // 当 activeTab 变化时，重新筛选产品
    }
  },
  mounted() {
    this.fetchProduct(); // 组件加载时获取所有产品
  },
  methods: {
    async fetchProduct() {
      try {
        const productS = await axios.get('https://localhost:7218/api/OutdoorProducts'); 
        console.log(productS)
      // 根据 post_id 从 Posts 接口获取帖子详情
      const OutDoorPromises = productS.data.map(async product => {
      //图片问题
      const detailResponse = await axios.get(`https://localhost:7218/api/OutdoorProductPics/GetPicsByProductId?productId=${product.product_id}`)  
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
      this.products = await Promise.all(OutDoorPromises);
      console.log(this.products)
      this.filterProducts(); // 获取数据后进行筛选
    }
      catch(error){
          console.error('Error fetching products:', error);
        }
    },
    /*fetchProduct_no_url()
    {
      axios.get('https://localhost:7218/api/OutdoorProducts')
        .then(response => {
          this.products = response.data;
          this.filterProducts(); // 获取数据后进行筛选
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },*/
    filterProducts() {
      if (this.activeTab === 'all') {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product => product.product_tag === this.activeTab);
      }
    },

    goToProductDetail (product) {
      const productId = product.product_id
      this.$router.push({ path: `/home/product/${productId}` })
    }
  },

}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
}

.product-card {
  width: 350px; /* 固定宽度 */
  height: 400px; /* 固定高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

/* 清除最后一行的右侧间距 */
.product-card:nth-child(3n) {
  margin-right: 0;
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

/* 媒体查询，适应不同屏幕尺寸 */
@media (max-width: 768px) {
  .product-card {
    width: 45%; /* 中小屏幕时每行显示两个 */
  }
}

@media (max-width: 480px) {
  .product-card {
    width: 100%; /* 小屏幕时每行显示一个 */
  }
}
</style>

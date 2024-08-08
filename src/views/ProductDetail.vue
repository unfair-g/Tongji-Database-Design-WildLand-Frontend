<template>
    <div class="product-detail" v-if="product">
      <div class="product-img">
        <img :src="product.product_image" class="image" alt="product image">
      </div>
      <div class="product-info">
        <div class="right">
          <div class="product-mess">
           <h2>{{ product.product_name }}</h2>
           <p>尺寸: {{ product.size }}</p>
           <p>材质: {{ product.material }}</p>
           <p>品牌: {{ product.brand }}</p>
           <p>适用人数: {{ product.suitable_users }}</p>
           <p>商品简介: {{ product.introduction }}</p>
           <p>商品余量: {{ product.stock_quantity }}</p>
           <div class="price">￥{{ product.price }}</div>
          </div>
          <el-tag class="love" style="color: 529A98" @click="toggleStarColor" >
            <span>
              <el-button type="text" class="button">收藏</el-button>
              <el-icon class="star" color="#ffed49" :size="30"><component class="is_solid" :is="isStarSolid ? 'Star' : 'StarFilled'"></component></el-icon>
            </span>
          </el-tag>
          <div class="pay">
            <el-button class="pay" @click="openDialog">立即租赁</el-button>
            <PayWindow v-model:dialogVisible="dialogVisible" :product="product" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import { ref } from 'vue'
import PayWindow from '@/components/PayWindow.vue'
import axios from 'axios';
import globalState from '../store/global'; // 引入 global.js 中的状态

export default {
  name: 'ProductDetail',
  components: {
    PayWindow
  },
  data() {
    return {
      isStarSolid: ref(true),
      dialogVisible: false,
      product: null,
      thisUserId: globalState.userId,
    }
  },
  props: ['productID'],
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      axios.get(`https://localhost:7218/api/OutdoorProducts/${this.productID}`)
        .then(response => {
          this.product = response.data;
          // Check if the product is already favorited
          this.checkIfFavorited();
          console.error('Error checking if product is favorited:', this.isStarSolid);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    },
    checkIfFavorited() {
      // Check if the product is already in the favorites on the backend
      axios.get(`https://localhost:7218/api/StarProducts`)
        .then(response => {
          const favoriteProducts = response.data;
          // 检查当前商品是否在收藏列表中
          this.isStarSolid = !(favoriteProducts.some(favorite => favorite.product_id === this.product.product_id&&favorite.user_id === this.thisUserId));
        })
        .catch(error => {
          console.error('Error checking if product is favorited:', error);
        });
    },
    toggleStarColor() {     
      if (!this.isStarSolid) {
        // Remove from favorites
        // Remove from backend
        axios.get(`https://localhost:7218/api/StarProducts`)
  .then(response => {
    const starProduct = response.data.find(favorite => favorite.product_id === this.product.product_id && favorite.user_id === this.thisUserId);
    
    if (starProduct) {
      // 如果找到对应的StarProduct实体，使用它的id删除
      this.deleteStarProduct(starProduct.user_id, starProduct.product_id);
    } else {
      console.error('StarProduct not found');
    }
  })
  .catch(error => {
    console.error('Error fetching StarProducts:', error);
  });
      } else {
        // Add to favorites
        
        // Add to backend
        axios.post('https://localhost:7218/api/StarProducts', {
          product_id: this.product.product_id,
          user_id: this.thisUserId
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain'
          }
        })
        .then(() => {
          this.isStarSolid = false;
          console.log('Product added to favorites:', this.product.product_id);
        })
        .catch(error => {
          console.error('Error adding product to favorites:', error);
        });
      }
      
      // Update local storage
    },
    openDialog() {
      this.dialogVisible = true;
    },

    deleteStarProduct(userId, productId) {
      axios.delete(`https://localhost:7218/api/StarProducts/${userId}/${productId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    }
  })
  .then(() => {
    this.isStarSolid = true;
    console.log('Product removed from favorites:', this.product.product_id);
  })
  .catch(error => {
    console.error('Error removing product from favorites:', error);
  });
}
  }
}
</script>

<style scoped>
.product-detail {
  display: flex;
  padding: 100px;
}

.product-img {
  flex: 1;
  padding: 10px;
  margin-right: 50px;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.product-info {
  flex: 2;
  padding: 10px;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.right {
  display: flex;
  position: relative;
  padding: 10px;
  min-height: 50px;
}

.product-mess {
  flex: 1;
}

.love {
  flex: 2;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: larger;
  padding: 20px;
  padding-left: 30px;
  background-color: #3085887d;
}

.button {
  font-size: larger;
  color: #0c0c0c;
}

.star {
  color: #ffed49;
  margin-left: 8px;
  font-size: 40px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.content {
  padding: 20px;
}

.price {
  color: #ff4949;
  font-size: 24px;
  margin-bottom: 10px;
}

.pay {
  position: absolute;
  background-size: 60px;
  background-color: #3085887d;
  right: 5px;
  bottom: 10px;
  font-size:x-large;
  color: #0c0c0c;
}
</style>

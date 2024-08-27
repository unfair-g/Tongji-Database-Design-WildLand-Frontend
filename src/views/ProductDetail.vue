<template>
    <div class="product-detail" v-if="product">
      <div class="product-img">
        <img :src="this.product.pics[0]" class="image" alt="product image">
      </div>
      <div class="product-info">
        <div class="right">
          <div class="product-mess">
           <h1 style="margin-bottom:20px;">{{ this.product.product.product_name }}</h1>
           <p style="margin-bottom:15px;">尺寸: {{ this.product.product.size }}</p>
           <p style="margin-bottom:15px;">材质: {{ this.product.product.material }}</p>
           <p style="margin-bottom:15px;">品牌: {{ this.product.product.brand }}</p>
           <p style="margin-bottom:15px;">适用人数: {{ this.product.product.suitable_users }}</p>
           <p style="margin-bottom:15px;">商品简介: {{ this.product.product.introduction }}</p>
           <p style="margin-bottom:15px;">商品余量: {{ this.product.product.stock_quantity }}</p>
           <div class="price"><h3>￥{{ this.product.product.price }}</h3></div>
          </div>
          <el-tag class="love" style="color: 529A98" @click="toggleStarColor" >
            <span>
              <el-button type="text" class="button">收藏</el-button>
              <el-icon class="star" color="#ffed49" :size="30"><component class="is_solid" :is="!this.product.isStarred ? 'Star' : 'StarFilled'"></component></el-icon>
            </span>
          </el-tag>
          <div class="pay">
            <el-button class="pay" @click="openDialog">立即租赁</el-button>
            <PayWindow v-model:dialogVisible="dialogVisible" :product="this.product" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import { ref } from 'vue'
import PayWindow from '@/components/PayWindow.vue'
import axios from '@/axios';
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
      image:'',
    }
  },
  props: ['productID'],
  created() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      console.log(this.productID)
      await axios.get(`/api/OutdoorProducts/GetProductByProductAndUserId?product_id=${this.productID}&user_id=${globalState.userId}`)
        .then(response => {
          this.product = response.data;
          console.log(this.product)
        })
        .catch(error => {
          console.error('hhhhhh Error fetching product:', error);
        });
    },
    toggleStarColor() {     
      if (this.product.isStarred) {
        // Remove from favorites
        // Remove from backend
        axios.get(`/api/StarProducts`)
  .then(response => {
    const starProduct = response.data.find(favorite => favorite.product_id === this.product.product.product_id && favorite.user_id === this.thisUserId);
    
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
        axios.post('/api/StarProducts', {
          product_id: this.product.product.product_id,
          user_id: this.thisUserId
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain'
          }
        })
        .then(() => {
          this.product.isStarred = true;
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
      axios.delete(`/api/StarProducts/DeleteStarProduct`,  {
    params: {
      userId: userId,
      productId: productId
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    }
  })
  .then(() => {
    this.product.isStarred = false;
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
  margin-bottom:10px;
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
  height: 360px;
  object-fit: cover;
}

.content {
  padding: 20px;
}

.price {
  color: #ff4949;
  font-size: 24px;
  margin-top: 20px;
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

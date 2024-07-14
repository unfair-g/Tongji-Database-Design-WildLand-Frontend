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
                <span class="price">{{ product.price }}</span>
                <el-button type="text" class="button" @click="goToProductDetail(product)">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'ProductView',
  props: {
    activeTab: String
  },
  data () {
    return {
      products: [
        { product_id: 1, product_name: '商品1', product_image: require('@/assets/1.png'), price: '¥100', product_tag: ['all', '帐篷天幕类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 2, product_name: '商品2', product_image: require('@/assets/2.png'), price: '¥200', product_tag: ['all', '工具类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 3, product_name: '商品3', product_image: require('@/assets/3.png'), price: '¥300', product_tag: ['all', '烹饪类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 4, product_name: '商品4', product_image: require('@/assets/4.png'), price: '¥400', product_tag: ['all', '帐篷天幕类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 5, product_name: '商品5', product_image: require('@/assets/5.png'), price: '¥500', product_tag: ['all', '桌椅类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 6, product_name: '商品6', product_image: require('@/assets/4.png'), price: '¥600', product_tag: ['all', '帐篷天幕类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 7, product_name: '商品7', product_image: require('@/assets/3.png'), price: '¥700', product_tag: ['all', '烹饪类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 8, product_name: '商品8', product_image: require('@/assets/2.png'), price: '¥600', product_tag: ['all', '工具类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 9, product_name: '商品9', product_image: require('@/assets/1.png'), price: '¥500', product_tag: ['all', '帐篷天幕类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 10, product_name: '商品10', product_image: require('@/assets/5.png'), price: '¥400', product_tag: ['all', '桌椅类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 11, product_name: '商品11', product_image: require('@/assets/4.png'), price: '¥300', product_tag: ['all', '帐篷天幕类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 12, product_name: '商品12', product_image: require('@/assets/3.png'), price: '¥200', product_tag: ['all', '烹饪类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 13, product_name: '商品13', product_image: require('@/assets/2.png'), price: '¥100', product_tag: ['all', '工具类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 14, product_name: '商品14', product_image: require('@/assets/1.png'), price: '¥100', product_tag: ['all', '帐篷天幕类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 },
        { product_id: 15, product_name: '商品15', product_image: require('@/assets/5.png'), price: '¥100', product_tag: ['all', '桌椅类'], size: '10*10', material: '无纺布', suitable_users: 5, brand: 'LV', stock_quantity: 20 }
      ]
    }
  },
  computed: {
    filteredProducts () {
      if (this.activeTab === 'all') {
        return this.products
      } else {
        return this.products.filter(product => product.product_tag.includes(this.activeTab))
      }
    }
  },
  methods: {
    goToProductDetail (product) {
      const productId = product.product_id
      this.$router.push({ path: `/home/product/${productId}` })
    }
  }
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

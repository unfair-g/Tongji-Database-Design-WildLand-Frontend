<template>
<div>
      <div v-for="order in orders" :key="order.id" justify="center" >
          <el-card :body-style="{ padding: '5px' }" shadow="hover" class="product-card" @click="goToOrderDetail(order)">
            <div class="content">
            <img :src="order.product_image" class="image" alt="order image">
            <div style="padding: 14px;flex:1;">
              <span>{{ order.product_name}}</span>
              <div><span>尺寸：{{ order.size}}</span></div>
              <div><span>材料：{{ order.material}}</span></div>
              <div><span>适用人数：{{ order.suitable_users}}</span></div>
              <div><span>品牌：{{ order.brand}}</span></div>
              <div><span>购买数量：{{ order.purchase_quantity}}</span></div>
              <div class="bottom clearfix">
                <span class="price">¥{{ order.price*order.purchase_quantity }}</span>
                <el-button type="text" class="button" @click="goToOrderDetail(order)">查看详情</el-button>
              </div>
            </div>
          </div>
        </el-card>
        </div>
</div>
</template>

<script>
export default ({
  name: 'LeaseView',
  computed: {
    orders() {
        return this.$store.state.order.orders
    }
  },
  methods: {
    goToOrderDetail (order) {
      const orderId = order.id
      this.$router.push({ path: `/home/userspace/order/${orderId}`,
        query: {  
        productId: order.product_id,  
        quantity: order.purchase_quantity  
      } 
    })
    }
  }
}
)
</script>

<style scoped>

.product-card {
  width: 100%; /* 固定宽度 */
  height:30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.image {
  width: 200px; /* 固定图片宽度 */
  height: 200px; /* 固定图片高度 */
  object-fit: cover;
  margin-right: 60px;
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

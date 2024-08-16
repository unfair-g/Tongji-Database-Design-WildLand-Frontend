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
                <span class="price">¥{{ order.price*order.amount }}</span>
                <el-button type="text" class="button" @click="goToOrderDetail(order)">查看详情</el-button>
              </div>
            </div>
          </div>
        </el-card>
        </div>
</div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'LeaseView',
  data() {
    return {
      orders: [],  // 存储订单信息
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        // 从 Leases 接口获取订单信息
        const ordersResponse = await axios.get('/api/Leases');
        const orders = ordersResponse.data;
        
        // 提取所有产品 ID
        //const productIds = orders.map(order => order.product_id);
        // 提取所有产品 ID
      const productIds = [...new Set(orders.map(order => order.product_id))];  // 使用 Set 去重
        // 根据产品 ID 获取产品详情
        const productDetailsPromises = productIds.map(productId =>
          axios.get(`/api/OutdoorProducts/${productId}`)
        );
        
        // 等待所有产品详情请求完成
        const productsResponses = await Promise.all(productDetailsPromises);

        // 检查获取的产品数据
        console.log('获取的产品数据:', productsResponses);
        
        // 将产品详情转换为字典，以产品 ID 为键
        const products = productsResponses.reduce((acc, response) => {
          console.log('产品详情:', response.data);
          acc[response.data.product_id] = response.data;
          return acc;
        }, {});
        
        // 合并产品详情到订单中
        const ordersWithProducts = orders.map(order => {
          const product = products[order.product_id] || {};
          return {
            ...order,
            ...product,  // 将产品详情合并到订单中
          };
        });

        // 更新订单数据
        this.orders = ordersWithProducts;
        console.log('订单',this.orders)
      } catch (error) {
        console.error('Error fetching orders or products:', error);
      }
    },
    goToOrderDetail(order) {
      const orderId = order.lease_id;
      this.$router.push({
        path: `/home/userspace/order/${orderId}`,
        query: {
          orderID: order.lease_id,
          quantity: order.amount,
        },
      });
    },
  },
};
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

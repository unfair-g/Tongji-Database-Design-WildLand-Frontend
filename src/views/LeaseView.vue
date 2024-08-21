<template>
<div>
      <div v-for="order in orders" :key="order.id" justify="center" >
          <el-card :body-style="{ padding: '5px' }" shadow="hover" class="product-card" @click="goToOrderDetail(order)">
            <div class="content">
            <img :src="order.pics[0]" class="image" alt="order image">
            <div style="padding: 14px;flex:1;">
<<<<<<< Updated upstream
              <span>{{ order.product_name}}</span>
              <div><span>尺寸：{{ order.size}}</span></div>
              <div><span>材料：{{ order.material}}</span></div>
              <div><span>适用人数：{{ order.suitable_users}}</span></div>
              <div><span>品牌：{{ order.brand}}</span></div>
              <div><span>购买数量：{{ order.stock_quantity}}</span></div>
              <div class="bottom clearfix">
                <span class="price">¥{{ order.price*order.lease.amount }}</span>
=======
              <span>{{ order.outdoorProduct.product_name}}</span>
              <div><span>尺寸：{{ order.outdoorProduct.size}}</span></div>
              <div><span>材料：{{ order.outdoorProduct.material}}</span></div>
              <div><span>适用人数：{{ order.outdoorProduct.suitable_users}}</span></div>
              <div><span>品牌：{{ order.outdoorProduct.brand}}</span></div>
              <div><span>购买数量：{{ order.outdoorProduct.stock_quantity}}</span></div>
              <div class="bottom clearfix">
                <span class="price">¥{{ order.outdoorProduct.price*order.lease.amount }}</span>
>>>>>>> Stashed changes
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
import globalState from '../store/global'; 

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
        // 从 Leases 接口获取订单信息
<<<<<<< Updated upstream
        const ordersResponse = await axios.get(`/api/Leases/GetLeasesByUserId?userId=${globalState.userId}`);
        console.log(ordersResponse)
        const orders = ordersResponse.data;
        console.log(orders);
        // 提取所有产品 ID
        //const productIds = orders.map(order => order.product_id);
        // 提取所有产品 ID
      const productIds = [...new Set(orders.map(order => order.lease.product_id))];  // 使用 Set 去重
      console.log(productIds)
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
        console.log(products)
        // 合并产品详情到订单中
        const ordersWithProducts = orders.map(order => {
          const product = products[order.lease.product_id] || {};
          return {
            ...order,
            ...product,  // 将产品详情合并到订单中
          };
        });

        // 更新订单数据
        this.orders = ordersWithProducts;
        console.log('订单',this.orders)
      } catch (error) {
=======
        await axios.get(`/api/Leases/GetLeasesByUserId?user_id=${globalState.userId}`)
        .then(response=>{
          this.orders=response.data;
          console.log(this.products)
        })
        .catch (error => {
          console.log(this.products)
>>>>>>> Stashed changes
        console.error('Error fetching orders or products:', error);
      })
    },
    goToOrderDetail(order) {
      const orderId = order.lease.lease_id;
      this.$router.push({
        path: `/home/userspace/order/${orderId}`,
        query: {
          orderID: order.lease.lease_id,
          quantity: order.lease.amount,
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

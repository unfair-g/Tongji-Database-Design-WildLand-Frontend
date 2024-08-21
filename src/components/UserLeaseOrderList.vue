<template>
  <div>
      <div v-for="order in purchase" :key="order.post_id" justify="center" >
        <el-card class="post-item" @click="goToOrderDetail(order.order_id)">

    <div class="post-content">
      <img :src="order.post_pics[0]" class="image" alt="order image">
          <div style="padding: 14px;flex:1;">
            <h1>{{ order.item_name}}</h1>
              <div><span>简介: {{ order.item_summary}}</span></div>
              <div><span>新旧程度：{{ order.condition}}</span></div>
              <div style="margin-top: 5px;margin-bottom: 10px;">
                <span>订单状态：</span>
                <span v-if="order.order_status==='1'" style="color:grey">已支付</span>
                <span v-if="order.order_status==='2'" style="color:red">已发货</span>
                <span v-else style="color:green">已收货</span>
              </div>
              <div class="bottom clearfix">
                <span class="price">¥{{ order.price }}</span>
                <el-button type="text" class="button" @click="goToOrderDetail(order.order_id)">查看详情</el-button>
              </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
    
<script>
import axios from '@/axios';
import  global  from '@/store/global.js'; // 引入 global.js 中的状态

    export default ({
      name: 'LeaseView',
      data() {
        return {
          purchase: [],
        };
      },
    mounted(){
     this.fetchPurchase();
    },
  methods: {

    async fetchPurchase() {
      try {
        const response=await axios.get('/api/Purchases/GetPurchasesByUserId', {
          params: {
            user_id:global.userId
          }
        })
        this.purchase=response.data
      }
      catch (error) {
        console.error(error)
      }
    },
        
        goToOrderDetail () {

          this.$router.push({ path: `/home/userspace/leaseorder/67039`,
          query: {  
            ldleitemsPostId: 67039
        }})
        },
        handleError(error, message) {
      if (error.response) {
        console.error(`${message}:`, error.response.data);
        this.$message.error(`${message} - 错误代码: ${error.response.status}`);
      } else if (error.request) {
        console.error(`${message}: No response received`);
        this.$message.error(`${message} - 没有收到响应`);
      } else {
        console.error(`${message}:`, error.message);
        this.$message.error(`${message} - 错误信息: ${error.message}`);
      }
    }
    }
  }
    )
    </script>
    
    <style scoped>
    .post-item {
  margin-bottom: 20px;
  width: 100%; /* 调整宽度，根据需要设置合适的值 */
}
.post-header {
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.post-details {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
.post-info {
  display: flex;
  flex-direction: column;
  margin-right: auto; /* 将 post-stats 推到右侧 */
}
.post-stats {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.stat-item {
  display: flex;
  align-items: center;
  margin-right: 15px; /* 间隙 */
  cursor: pointer; /* 表示这个图标是可以点击的 */
}
.time {
  color: darkgrey;
}

i {
  font-size: 25px;
}
    .product-card {
      width: 100%; /* 固定宽度 */
      height:30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .post-content {
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
    
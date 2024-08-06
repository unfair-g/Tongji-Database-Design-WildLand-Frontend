<template>
    <div class="order">
      <div class="product-info-header" style="display:flex;align-items: center;" shadow="hover">
        <div class="product-img">
          <img :src="ldleitemsPost.item_image" alt="product image">
        </div>
        <div style="flex:2;position:relative;">
          <h2>{{ ldleitemsPost.product_name }}</h2>
          <p>商品提供者: {{ ldleitemsPost.username }}</p>
          <p>商品简介: {{ ldleitemsPost.item_summary }}</p>
          <p>商品新旧程度: {{ ldleitemsPost.condition }}</p>
          <div class="price-tag">￥{{ ldleitemsPost.price }}</div>
          <!-- 数量输入框 -->
          </div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>订单状态</h2></div>
          <div style="text-align:center;"><p>已支付</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>订单创建时间</h2></div>
          <div style="text-align:center;"><p>{{ leaseOrder.order_date }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>收件人姓名</h2></div>
          <div style="text-align:center;"><p>{{ leaseOrder.recipient_name }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>收件人地址</h2></div>
          <div style="text-align:center;"><p>{{ leaseOrder.recipient_address }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>收件人电话</h2></div>
          <div style="text-align:center;"><p>{{ leaseOrder.recipient_phone }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>物流详情</h2></div>
          <div style="text-align:center;"><p>现处于上海市/嘉定区</p></div>
        </div>
        <div class="order_3">
          <el-button class="pay">申请退款</el-button>
        </div>
      </div>
      </template>
      
      <script>
      export default {
        name: 'PostOrderView',
          data() {
            return {
                ldleitemsPostId: null
            }
          },
        created() {  
        // 在组件创建时，你可以从$route.query中获取查询参数  
        this.ldleitemsPostId = this.$route.query.ldleitemsPostId;
        },
          computed: {
            ldleitemsPost() {
              return this.$store.state.post.ldleitemsposts.find(ldleitemsPost => ldleitemsPost.post_id === parseInt(this.ldleitemsPostId));
        },
            leaseOrder() {
              return this.$store.state.lease.lease_orders.find(leaseOrder => leaseOrder.post_id === parseInt(this.ldleitemsPostId))
            }
          }
        }
      </script>
      
      <style scoped>
      .order {
      display: flex;
      flex-direction: column;
      align-items: center; /* 水平居中 */
      justify-content: start; /* 根据需要调整 */
      width: 80%;
      max-width: 1200px; /* 最大宽度 */
      margin: 20px auto 20px auto; /* 水平居中 */
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fff;
    }
    
    .product-info-header {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ddd;
      color: black;
      padding: 10px;
      padding-bottom:30px;
      margin-bottom: 20px;
    }
    
      .order_2 {
        width: 100%; /* 设置宽度 */
        height:70%;
        border: 1px solid #ddd; /* 设置边框 */
        border-radius: 5px; /* 设置圆角 */
        background-color: #fff; /* 设置背景颜色 */
        margin: 0 auto; /* 水平居中 */
      }
    
      .order_3 {
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        width: 100%; /* 设置宽度 */
        height:60px;
        border: 1px solid #ddd; /* 设置边框 */
        border-radius: 5px; /* 设置圆角 */
        background-color: #fff; /* 设置背景颜色 */
        margin: 0 auto; /* 水平居中 */
      }
      
      .product-img {
        flex: 1;
        width: 200px;
        height: 250px;
        padding: 10px;
        margin-right: 50px;
        display: flex; /* 使用flex布局 */ 
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
      }
      
      .product-img img {
        max-width: 100%; /* 使图片宽度不超过容器宽度 */
        max-height: 100%; /* 使图片高度不超过容器高度 */
        object-fit: contain; /* 保持图片比例，并尽量填充容器 */ 
        object-position: center; /* 图片居中显示 */
      }
      
      .price-tag {
        color: red;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
    
      .pay {
      background-size: 60px;
      background-color: #3085887d;
      font-size:x-large;
      color: #0c0c0c;
    }
      </style>
      
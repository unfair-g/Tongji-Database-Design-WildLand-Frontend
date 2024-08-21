<template>
    <div class="order">
      <div class="product-info-header" style="display:flex;align-items: center;" shadow="hover">
        <div class="product-img">
          <img  alt="product image">
        </div>
        <div style="flex:2;position:relative;">
          <h2>{{ leaseOrder.item_name }}-十分好用，安利</h2>
          <p>商品提供者: {{ leaseOrder.username }}</p>
          <p>商品简介: {{ leaseOrder.item_summary }}</p>
          <p>商品新旧程度: {{ leaseOrder.condition }}</p>
          <div class="price-tag">￥{{ leaseOrder.price }}</div>
          </div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>订单状态</h2></div>
          <el-steps 
            style="max-width: 600px" 
            :active=leaseOrder.status
            align-center 
            finish-status="success"
            process-status="error"
            class="postorder-status"
          >
            <el-step title="已支付" />
            <el-step title="已发货" />
            <el-step title="已收货" />
          </el-steps>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>订单创建时间</h2></div>
          <div style="text-align:center;justify-content:center;"><p>{{ leaseOrder.order_date }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>收件人姓名</h2></div>
          <div style="text-align:center;justify-content:center;"><p>{{ leaseOrder.recipient_name }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>收件人地址</h2></div>
          <div style="text-align:center;justify-content:center;"><p>{{ leaseOrder.recipient_address }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h2>收件人电话</h2></div>
          <div style="text-align:center;justify-content:center;"><p>{{ leaseOrder.recipient_phone }}</p></div>
        </div>
      </div>
      </template>
      
<script>
import axios from '@/axios'; // 确保路径是正确的

  export default {
    name: 'PostOrderView',
    data() {
    return {
      leaseOrder: null,
      order_id:null
    };
  },
  created() {
    this.order_id = this.$route.query.ldleitemsPostId;
    this.fetchLeaseOrder(this.order_id);
  },
  methods: {

    async fetchLeaseOrder(order_id) {
      try {
        const response = await axios.get('/api/Purchases/GetPurchaseByPurchaseId', {
           params: {
            id:order_id
          }
        })
        this.leaseOrder=response.data
      }catch(error){
        this.handleError(error,'获取订单失败')
      }
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
    },
  },
};
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

    .postorder-status{
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 2%;
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
    
      .order_buttons {
      font-size:x-large;
      margin-left: auto;
      margin-right: auto;
    }
      </style>
      
<template>
    <div class="order">
      <div class="product-info-header" style="display:flex;align-items: center;" shadow="hover">

        <div style="flex:2;position:relative;">
          <h2>预约营地：{{ camporder.campground_name }}</h2>

          <div class="price-tag">￥{{ camporder.total_price }}</div>
          <p>预约人姓名：{{ camporder.order_person_name }}</p>
          <p>预约人电话：{{ camporder.order_person_phone_number }}</p>
          <p>预约人身份证：{{ camporder.order_person_id }}</p>
          <p>预约人备注：{{ camporder.remark }}</p>

        </div>
      </div>
        <div class="order_2">
          <div style="margin:10px;"><h3>开始时间</h3></div>
          <div style="text-align:center;"><p> {{ camporder.startDate }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h3>结束时间</h3></div>
          <div style="text-align:center;"><p>{{ camporder.endDate }}</p></div>
        </div>
        <div class="order_2">
          <div style="margin:10px;"><h3>预定营位</h3></div>
          <div style="text-align:center;"><p>{{ camporder.selectedCampsiteIds.join(', ') }}</p></div>
        </div>
        <div class="order_3">
          <el-button class="pay">申请退款</el-button>
        </div>
      </div>
      </template>
      
      <script>
      export default {
        name: 'CampOrderDetailView',
        props: ['id'],
        computed: {
            camporder() {
              return this.$store.state.camp_order.camp_orders.find(camporder => camporder.order_id === parseInt(this.id));
        },
          }
        }
      </script>
      
      <style scoped>
      .order {
      display: flex;
      flex-direction: column;
      align-items: center; /* 水平居中 */
      justify-content: start; /* 根据需要调整 */
      width: 60%;
      max-width: 1200px; /* 最大宽度 */
      margin: 20px auto 20px auto; /* 水平居中 */
      border: 1px solid #ddd;
      background-color: #fff;
      padding:70px;
    }
    
    .product-info-header {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ddd;
      color: black;
      padding: 20px;
      padding-bottom:30px;
      margin-bottom: 20px;
    }
    
      .order_2 {
        width: 100%; /* 设置宽度 */
        height:70%;
        border-top: 1px solid #ddd; /* 设置边框 */
        background-color: #fff; /* 设置背景颜色 */
        margin: 0 auto; /* 水平居中 */
        margin-bottom: 20px;
      }
    
      .order_3 {
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        width: 100%; /* 设置宽度 */
        height:60px;
        border-top: 1px solid #ddd; /* 设置边框 */
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
      
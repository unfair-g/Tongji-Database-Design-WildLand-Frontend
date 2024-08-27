<template>
<div class="order" v-if="this.IsVisible">
  <div class="product-info-header" style="display:flex;align-items: center;" shadow="hover">
    <div class="product-img">
      <img :src="product.outdoorProductWithPics.pics[0]" alt="product image">
    </div>
    <div style="flex:2;position:relative;">
      <h2 style="margin-bottom:20px;">{{ product.outdoorProductWithPics.productName }}</h2>
      <p style="margin-bottom:20px;">尺寸: {{ product.outdoorProductWithPics.size }}</p>
      <p style="margin-bottom:20px;">材质: {{ product.outdoorProductWithPics.material }}</p>
      <p style="margin-bottom:20px;">品牌: {{ product.outdoorProductWithPics.brand }}</p>
      <p style="margin-bottom:20px;">适用人数: {{ product.outdoorProductWithPics.suitableUsers }}</p>
      <div class="price-tag">￥{{ TotalPrice }}</div>
      <!-- 数量输入框 -->
       <el-input-number v-model="product.lease.amount" :min=product.lease.amount :max=product.lease.amount label="数量" style="position:absolute;bottom:-20px;right:0px;"></el-input-number>
      </div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h2>取货时间</h2></div>
      <div style="text-align:center;justify-content:center;margin-bottom:20px;"><p>{{ this.formatDate(product.lease.pick_time) }}</p></div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h2>归还时间</h2></div>
      <div style="text-align:center;justify-content: center;margin-bottom:20px; "><p>{{ this.formatDate(product.lease.back_time) }}</p></div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h2>配送需求</h2></div>
      <div style="text-align:center;justify-content: center;margin-bottom:20px; "><p>{{ product.lease.remark }}</p></div>
    </div>
  </div>
  </template>
  
  <script>
  import axios from '@/axios';
  import globalState from '../store/global'; 

  export default {
    name: 'OrderView',
    props: {
      quantity: {
        type: Number,
        default: 1
      }
      },
      data() {
        return {
          Lquantity:this.quantity,

          product: {},
          camp_order: {},
          IsVisible:false,

          startTime:null,
          endTime:null,
          time:"2024年4月23日",
          time2:"2024年4月24日",
          Command:"上海市嘉定区曹安公路4800号同济大学嘉定校区 fby XXXXXXXXXX",
          orderId:null
        }
      },
      async created() {  
    this.orderId = this.$route.query.orderID;

    // 获取订单详情
    try {
      await axios.get(`/api/Leases/GetLease2?leaseId=${this.orderId}&userId=${globalState.userId}`)
      .then(response=>{
        this.product=response.data;
      });
      this.IsVisible=true;
      
    } catch (error) {
      console.error('Error fetching order or product details:', error);
    }
  },
      computed: {
        TotalPrice(){
          if (this.product && this.product.outdoorProductWithPics.price && !isNaN(this.Lquantity)) {
            // 确保 product.price 是一个数字
            const price = parseFloat(this.product.outdoorProductWithPics.price);
            console.log(`Product Price: ${price}, Quantity: ${this.Lquantity}`);
            return (price * this.product.lease.amount).toFixed(2);
          }
          return 0;
        }
    },
    methods: {
      formatDate(dateTimeString) {  
      // 创建一个Date对象  
      const date = new Date(dateTimeString);  
  
      // 使用getFullYear(), getMonth() + 1, 和 getDate() 方法来获取年、月和日  
      // 注意：getMonth() 返回的是从0开始的月份，所以需要加1  
      const year = date.getFullYear();  
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 使用padStart确保月份是两位数  
      const day = date.getDate().toString().padStart(2, '0'); // 使用padStart确保日期是两位数  
  
      // 返回格式化的日期字符串  
      return `${year}-${month}-${day}`;   
      }, 
    }
  }
  </script>
  
  <style scoped>
  .order {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content:center; /* 根据需要调整 */
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
  
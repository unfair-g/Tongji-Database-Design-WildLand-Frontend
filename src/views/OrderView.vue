<template>
<div class="order">
  <div class="product-info-header" style="display:flex;align-items: center;" shadow="hover">
    <div class="product-img">
      <img :src="product.product_image" alt="product image">
    </div>
    <div style="flex:2;position:relative;">
      <h2>{{ product.product_name }}</h2>
      <p>尺寸: {{ product.size }}</p>
      <p>材质: {{ product.material }}</p>
      <p>品牌: {{ product.brand }}</p>
      <p>适用人数: {{ product.suitable_users }}</p>
      <div class="price-tag">￥{{ TotalPrice }}</div>
      <!-- 数量输入框 -->
       <el-input-number v-model="Lquantity" :min=Lquantity :max=Lquantity label="数量" style="position:absolute;bottom:-20px;right:0px;"></el-input-number>
      </div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h2>取货时间</h2></div>
      <div style="text-align:center;"><p>2024/08/24</p></div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h2>归还时间</h2></div>
      <div style="text-align:center;"><p>2024/08/26</p></div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h2>配送需求</h2></div>
      <div style="text-align:center;"><p>上海市嘉定区曹安公路4800号同济大学嘉定校区 fby XXXXXXXXXX</p></div>
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
    name: 'OrderView',
    props: {
      quantity: {
        type: Number,
        default: 1
      }
      },
      data() {
        return {
          productId: null,
          Lquantity:this.quantity
        }
      },
    created() {  
    // 在组件创建时，你可以从$route.query中获取查询参数  
    this.productId = this.$route.query.productId;  
    this.Lquantity = parseInt(this.$route.query.quantity) || this.quantity;  
    },
      computed: {
        product() {
          return this.$store.state.product.products.find(product => product.product_id === parseInt(this.productId));
    },
        TotalPrice(){
          if (this.product && this.product.price && !isNaN(this.Lquantity)) {
            // 确保 product.price 是一个数字
            const price = parseFloat(this.product.price);
            console.log(`Product Price: ${price}, Quantity: ${this.Lquantity}`);
            return (price * this.Lquantity).toFixed(2);
          }
          return 0;
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
  min-height: 100vh;
  width: 80%;
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 水平居中 */
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
  
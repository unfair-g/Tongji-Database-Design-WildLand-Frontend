<template>
  <el-dialog
    title="支付窗口"
    v-model="localDialogVisible"
    width="45%"
    center="true"
    v-if="!PaySuccess"
    @close="handleClose">
    <div class="product-info-header" style="display:flex;" shadow="hover">
      <div class="product-img">
        <img :src="product.pics[0]" alt="product image"> 
      </div>
      <div style="flex:2;">
        <h2>{{ product.product.product_name }}</h2>
        <p>尺寸: {{ product.product.size }}</p>
        <p>材质: {{ product.product.material }}</p>
        <p>品牌: {{ product.product.brand }}</p>
        <p>适用人数: {{ product.product.suitable_users }}</p>
        <p>商品余量: {{ product.product.stock_quantity }}</p>
        <!-- 数量输入框 -->  
        <el-input-number v-model="quantity" :min="1" :max=product.product.stock_quantity label="数量" style="position:absolute;right:30px;"></el-input-number>
      </div>
    </div>

    <!-- 筛选营地订单 -->
    <div class="camp-order-filter">
      <span class="title">| 筛选预定的营地订单</span>
      <div class="short-divider"></div>
      <div class="filter-container">
        <el-select v-model="selectedCampOrder" placeholder="请选择营地名称——预约时间" @change="filterCampOrders">
          <el-option
            v-for="order in campOrders"
            :key="order.order_id"
            :label="`${order.campgroundName} —— ${formatDate(order.reservedStartTime)}至${formatDate(order.reservedEndTime)}`"
            :value="order">
          </el-option>
        </el-select>

      </div>
      <div v-if="filteredCampOrders.length > 0" class="camp-orders">
        <div v-for="order in filteredCampOrders" :key="order.order_id" class="camp-order">
          <p>营地名称: {{ order.campgroundName }}</p>
          <p>预定时间: {{ formatDate(order.reservedStartTime) }} 至 {{ formatDate(order.reservedEndTime) }}</p>
          <p>营位:{{ order.campsiteNumber }}</p>
        </div>
      </div>
      <div v-else>
        <p>没有符合条件的订单</p>
      </div>
    </div>
    

    <div class="price-tag">¥{{ TotalPrice }}</div>
    <div class="payment-options">
      <p>请选择支付方式:</p>
      <el-radio-group v-model="selectedPayment">
        <el-radio-button label="支付宝支付"><el-icon><Coin /></el-icon> 支付宝</el-radio-button>
        <el-radio-button label="微信支付"><el-icon><ChatRound /></el-icon> 微信</el-radio-button>
        <el-radio-button label="银行卡支付"><el-icon><Money /></el-icon> 银行卡</el-radio-button>
        <el-radio-button label="银联卡支付"><el-icon><CreditCard /></el-icon> 银联卡</el-radio-button>
      </el-radio-group>
    </div>

    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirmDialog()" :disabled="filteredCampOrders.length === 0">立即支付</el-button>
      </span>
    </template>
  </el-dialog>

  <!--支付成功-->
  <el-dialog 
  v-model="PaySuccess"
  width="40%"
  height="40%"
  v-if="PaySuccess">
    <div class="bg">
      <div class="bg-container">
        <div class="success-container">
          <div class="borrow">
            <el-icon color="green" size="160"><SuccessFilled/></el-icon>
            <div style="font-size:x-large;margin-top:20px;text-align:center;margin-bottom:20px;">租赁成功</div>
          </div>
          <div class="success">
            <el-button type="text" class="button" @click="GoToOrder(product,this.order_ID)">查看订单</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import  globalState  from '../store/global'; // 引入 global.js 中的状态

export default {
  name: 'PayWindow',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localDialogVisible: this.dialogVisible,
      selectedPayment: '支付宝支付',
      quantity: 1,
      PaySuccess: false,
      Order: false,
      command:"",
      selectedCampOrder: null,
      filteredCampOrders: [],
      startTime:null,
      endTime:null,
      productID:this.product.product.product_id,
      ProductId:null,
      campOrders:[],
      order_ID:0,
      image:''
    }
  },
  watch: {
    dialogVisible(newVal) {
      this.localDialogVisible = newVal;
    },
    localDialogVisible(newVal) {
      this.$emit('update:dialogVisible', newVal);
    }
  },
  created() {
    this.fetchProductId();
    this.CampOrders();
  },
  methods: {
    handleClose() {
      this.closeDialog();
    },
    closeDialog() {
      this.localDialogVisible = false;
    },
    confirmDialog() {
      this.localDialogVisible = false
      this.createOrderAndUpload();
      
      //添加支付成功逻辑
      // 切换支付成功弹窗
    },
    fetchProductId() {
      axios.get(`https://localhost:7218/api/OutdoorProducts/${this.productID}`)
        .then(response => {
          this.ProductId = response.data.product_id;
        })
        .catch(error => {
          console.error('Error fetching ldle items posts:', error);
        });
        axios.get(`https://localhost:7218/api/OutdoorProductPics/GetPicsByProductId?productId=${this.product.product.product_id}`)
        .then(response =>{
           this.image=response.data?.length>0?response.data[0]:'图片'
           console.log('kkkk',this.image)
        })
    },
    createOrderAndUpload() {
      const orderData = {
        lease_id: this.generateOrderId(),
        user_id: globalState.userId,
        product_id: this.ProductId,
        pick_time: this.formatDateToFullDate(this.startTime),
        remark: `营地：${this.selectedCampOrder.campgroundName}     营位：${this.selectedCampOrder.campsiteNumber}`,
        back_time: this.formatDateToFullDate(this.endTime),
        amount:this.quantity
      };
      console.log('订单上传:', orderData.lease_id);
      console.log('订单上传:', orderData.user_id);
      console.log('订单上传成功:', orderData.pick_time);
      console.log(orderData)
      axios.post('https://localhost:7218/api/Leases', orderData,{headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      }
    })
        .then(response => {
          console.log('订单上传成功:', response.data);
          this.PaySuccess = true
        })
        .catch(error => {
          console.log(orderData)
          console.error('上传订单时出错:', error);
        });
    },
    generateOrderId() {
      this.order_ID=Math.floor(Math.random() * 100000);
      return this.order_ID;
    },
    formatDateToFullDate(dateStr) {
      // 假设 dateStr 是 "YYYY-MM-DD" 格式的日期字符串
      const [year, month, day] = dateStr.split('-');
      return `${year}-${month}-${day}.000Z`; // ISO 8601 格式的午夜时间
    },
    GoToOrder(product,orderId)   //查看订单
    {
      const productId = product.product.product_id
      this.$router.push({ path: `/home/product/${productId}/order`,
        query: {  
        productId: this.product.product.product_id,  
        quantity: this.quantity,
        startDate: this.startDate,
        endDate: this.endDate,
        command:this.command,
        orderID:orderId
      }})
      this.PaySuccess = false
      this.Order=true
    },
    filterCampOrders() {
      if (this.selectedCampOrder) {
        this.filteredCampOrders = [this.selectedCampOrder];
        this.startTime=this.filteredCampOrders[0].reservedStartTime;
        this.endTime=this.filteredCampOrders[0].reservedEndTime;
        console.log('hhhhh',this.startTime, this.endTime);
      } else {
        this.filteredCampOrders = [];
      }
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    CampOrders() {
      axios.get(`https://localhost:7218/api/ReserveOrders/GetReservationDetailsByUserId?orderPersonId=${globalState.userId}`)
        .then(response => {
          this.campOrders = response.data;
          console.log(this.campOrders)
        })
        .catch(error => {
          console.error('Error fetching ldle items posts:', error);
        });
    }
  },
  computed: {
    TotalPrice(){
      if (this.product && this.product.product.price && !isNaN(this.quantity)) {
         // 确保 product.price 是一个数字
         const price = parseFloat(this.product.product.price);
         console.log(`Product Price: ${price}, Quantity: ${this.quantity}`);
         if (!isNaN(price) && price > 0) {
          return (price * this.quantity).toFixed(2);
        }
      }
      return 0;
    },
  },

  setup() {
    const dateRange = ref([null, null]);
    const startDate = ref('');
    const endDate = ref('');

    const handleDateChange = (value) => {
      if (value && value.length === 2) {
        startDate.value = dayjs(value[0]).format('YYYY年MM月DD日');
        endDate.value = dayjs(value[1]).format('YYYY年MM月DD日');
      } else {
        startDate.value = '';
        endDate.value = '';
      }
    };

    return {
      dateRange,
      startDate,
      endDate,
      handleDateChange
    };
  },
}
</script>

<style scoped>
.product-info-header {
  color: black;
  padding: 10px;
  padding-bottom:40px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-img {
  flex: 1;
  width: 200px;
  height: 200px;
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

.payment-options {
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
}

.bg-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-container {
  background-color: white;
  padding: 40px;
  margin:0px;
  border-radius: 10px;
  text-align: center;
  max-width: 600px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position:relative;
}

.borrow {
  flex: 1;
  margin-top:30px;
}

.success {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: inline-block;
  background-color: #1D5B5E;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom:20px;
}

.button {
  float: center;
  color:#ddd;
}

.short-divider {
    height: 1px;
    width: 70px;
    background-color: #1D5B5E; /* Divider color */
    margin: 10px 10px; /* Adjust the margin as needed */
  }

.up-container {
  display: flex;
  flex-direction: column; 
  align-items: center;
}
.date-range-picker {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap:20px;
  margin-bottom: 80px;
}
.date-range-picker span{
  color:#1D5B5E;
  font-size:15px;
}

.delivery-requirements{
  margin-bottom:20px;
}



.camp-order-filter {
  margin-top: 20px;
}

.filter-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.camp-orders {
  margin-top: 20px;
}

.camp-order {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.dialog-footer {
  text-align: right;
}
</style>

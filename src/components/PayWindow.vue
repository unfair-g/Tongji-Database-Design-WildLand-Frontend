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
        <img :src="product.product_image" alt="product image"> 
      </div>
      <div style="flex:2;">
        <h2>{{ product.product_name }}</h2>
        <p>尺寸: {{ product.size }}</p>
        <p>材质: {{ product.material }}</p>
        <p>品牌: {{ product.brand }}</p>
        <p>适用人数: {{ product.suitable_users }}</p>
        <p>商品余量: {{ product.stock_quantity }}</p>
        <!-- 数量输入框 -->  
        <el-input-number v-model="quantity" :min="1" :max=product.stock_quantity label="数量" style="position:absolute;right:30px;"></el-input-number>
      </div>
    </div>

    <span class="title">| 选择预定日期</span>
        <div class="short-divider"></div> 
        <div class="up-container">
          
          <div class="date-range-picker">
            <span >请选择租赁的日期</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="取货日期"
              end-placeholder="归还日期"
              @change="handleDateChange"
            >
            </el-date-picker>
          </div>
        </div>

        <div class="delivery-requirements">
         <span class="title">| 配送需求:</span>
         <div class="short-divider"></div> 
         <el-input v-model="command" placeholder="请输入配送需求" style="margin-top:15px;"></el-input>
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
        <el-button type="primary" @click="confirmDialog()">立即支付</el-button>
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
            <el-button type="text" class="button" @click="GoToOrder(product)">查看订单</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';
import dayjs from 'dayjs';

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
      command:""
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
  methods: {
    handleClose() {
      this.closeDialog();
    },
    closeDialog() {
      this.localDialogVisible = false;
    },
    confirmDialog() {
      this.localDialogVisible = false
      this.PaySuccess = true
      //添加支付成功逻辑
      // 切换支付成功弹窗
    },
    GoToOrder(product)   //查看订单
    {
      const productId = product.product_id
      this.$router.push({ path: `/home/product/${productId}/order`,
        query: {  
        productId: this.product.product_id,  
        quantity: this.quantity,
        startDate: this.startDate,
        endDate: this.endDate,
        command:this.command
      }})
      this.PaySuccess = false
      this.Order=true
    }
  },
  computed: {
    TotalPrice(){
      if (this.product && this.product.price && !isNaN(this.quantity)) {
         // 确保 product.price 是一个数字
         const price = parseFloat(this.product.price);
         console.log(`Product Price: ${price}, Quantity: ${this.quantity}`);
         if (!isNaN(price) && price > 0) {
          return (price * this.quantity).toFixed(2);
        }
      }
      return 0;
    }
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
</style>

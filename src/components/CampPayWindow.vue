<template>
    <el-dialog
      title="支付窗口"
      v-model="localDialogVisible"
      width="45%"
      center="true"
      v-if="!PaySuccess"
      @close="handleClose"
      :style="{ padding: '40px' }">
 
      <h3>支付金额:</h3>
      <div class="price-tag">¥{{ totalPrice }}</div>

      <h3>请选择支付方式:</h3>
      <div class="payment-options">
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
    v-if="PaySuccess"
    @close="handleClose">
      <div class="bg">
        <div class="bg-container">
          <div class="success-container">
            <div class="borrow">
              <el-icon color="green" size="160"><SuccessFilled/></el-icon>
              <div style="font-size:x-large;margin-top:20px;text-align:center;margin-bottom:20px;">预约成功</div>
            </div>
            <div class="success">
              <el-button type="text" class="button" @click="GoToOrder()">查看订单</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </template>
  
<script>
export default {
    name: 'CampPayWindow',
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      totalPrice:{
        type: Number,
        required: true,
      },
      orderId: {
        type: Number, // 新增orderId属性
        required: true,
    }

    },
    data() {
      return {
        localDialogVisible: this.dialogVisible,
        selectedPayment: '支付宝支付',
        PaySuccess: false,
        Order: false
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
        this.redirectToHome();
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
      GoToOrder()   //查看订单
      {
        this.PaySuccess = false
        this.Order=true
        this.$router.push({ path: `/home/userspace/camporder/${this.orderId}` }); // 跳转到订单页面
      },
      redirectToHome() {
        this.$router.push({ path: '/home' });
      }  
    },

  }
  </script>
  
  <style scoped>


  .price-tag {
    color: red;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .payment-options {
    margin-bottom: 20px;
    margin-top: 10px;
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
  </style>
  
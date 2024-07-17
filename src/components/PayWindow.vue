<template>
  <el-dialog
    title="支付窗口"
    v-model="localDialogVisible"
    width="60%"
    center="true"
    v-if="!PaySuccess"
    @close="handleClose">
    <div class="product-info-header" style="display:flex;" shadow="hover">
      <div class="product-img">
        <img :src="product.product_image" alt="product image"> 
      </div>
      <div style="flex:2;">
        <h2>{{ product.product_name }}</h2>
        <p>尺寸: 100x200cm</p>
        <p>材质: 棉</p>
        <p>新旧程度: 全新</p>
        <p>适用人数: 2人</p>
        <!-- 数量输入框 -->  
        <el-input-number v-model="quantity" :min="1" :max="10" label="数量" style="position:absolute;right:30px;"></el-input-number>
      </div>
    </div>
    <div class="price-tag">¥89.80</div>
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
      PaySuccess: false
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
      this.$router.push({ path: `/home/product/${productId}/order` })
    }
  }
}
</script>

<style scoped>
.product-info-header {
  color: black;
  padding: 20px;
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
</style>

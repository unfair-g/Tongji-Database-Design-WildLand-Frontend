<template>
    <el-dialog
      title="支付窗口"
      v-model="localDialogVisible"
      width="45%"
      center="true"
      v-if="!RentSuccess"
      @close="handleClose">
      <div class="product-info-header" style="display:flex;" shadow="hover">
        <div class="product-img">
          <img :src="ldleitemsPost.post_pics[0]" alt="product image"> 
        </div>
        <div style="flex:2;">
          <h2 style="margin-bottom:20px;">{{ ldleitemsPost.title }}</h2>
          <p style="margin-bottom:20px;">商品提供者: {{ ldleitemsPost.user_name }}</p>
          <p style="margin-bottom:20px;">商品简介: {{ ldleitemsPost.item_summary }}</p>
          <p style="margin-bottom:20px;">商品新旧程度: {{ ldleitemsPost.condition }}</p>
          <p style="margin-bottom:20px;">收件人姓名: {{ recipientInfo.name }}</p>
          <p style="margin-bottom:20px;">收件人地址: {{ recipientInfo.address }}</p>
          <p style="margin-bottom:20px;">收件人电话: {{ recipientInfo.phone }}</p>
          <!-- 数量输入框 -->  
        </div>
      </div>
      <div class="price-tag">¥{{ ldleitemsPost.price }}</div>
      <div class="payment-options">
        <p style="margin-bottom:10px;">支付方式:</p>
        <el-radio-group v-model="selectedPayment">
          <el-radio-button label="支付宝支付"><el-icon><Coin /></el-icon> 钱包余额</el-radio-button>
        </el-radio-group>
      </div>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="confirmDialog(ldleitemsPost)">立即支付</el-button>
        </span>
      </template>
    </el-dialog>
  
    <!--发布成功-->
<el-dialog 
  v-model="RentSuccess"
  width="40%"
  height="40%"
  v-if="RentSuccess">
    <div class="bg">
      <div class="bg-container">
        <div class="success-container">
          <div class="borrow">
            <el-icon color="green" size="160"><SuccessFilled/></el-icon>
            <div style="font-size:x-large;margin-top:20px;text-align:center;margin-bottom:20px;">租赁成功</div>
          </div>
          <div class="success">
            <el-button type="text" class="Pbutton" @click="GoToOrder()">查看订单</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  </template>
  
  <script>
  import axios from '@/axios';
  import  globalState  from '../store/global'; // 引入 global.js 中的状态

  export default {
    name: 'PostPayWindow',
    props: {
      RentdialogVisible: {
        type: Boolean,
        default: false
      },
      ldleitemsPost: {
        type: Object,
        required: true
      },
    recipientInfo: {
      type: Object,
      required: true
    }
    },
    data() {
      return {
        localDialogVisible: this.RentdialogVisible,
        selectedPayment: '支付宝支付',
        quantity: 1,
        RentSuccess: false,
        Order: false,
        users: [], // 存储用户数据
        selectedUserId: null,
        orderId:0,
        money:0
      }
    },
    created() {
      this.selectedUser();
      this.fetchPoints();
      console.log(this.money)
    },
    watch: {
      RentdialogVisible(newVal) {
        this.localDialogVisible = newVal;
      },
      localDialogVisible(newVal) {
        this.$emit('update:RentdialogVisible', newVal);
      }
    },
    methods: {
      fetchLdleitemsOrder() {
      axios.get(`/api/Purchases/${this.ldleitemsOrderID}`)
        .then(response => {
          this.ldleitemsOrder = response.data;
        })
        .catch(error => {
          console.error('Error fetching ldleitems order:', error);
        });
      },
      selectedUser() {
        this.selectedUserId = globalState.userId
      },
      async fetchPoints()
      {
        axios.get(`/api/Users/getUserInfo/${globalState.userId}`)
        .then(response=>{
          this.money=response.data.data.userInfo.points;
        })
        .catch(error=>{
          console.error('Error fetching  points:', error);
        })
      },

      handleClose() {
        this.closeDialog();
      },
      closeDialog() {
        this.localDialogVisible = false;
      },
      async confirmDialog(ldleitemsPost) {
        
        console.log(ldleitemsPost.price)
        await this.fetchPoints();
        console.log('22222222',this.money)
        if(this.money<ldleitemsPost.price)
      {
        this.$alert('余额不足，请前往个人中心充值', '提示', {  
        confirmButtonText: '确定',  
        type: 'success',  
        callback: () => {  
          location.reload(); // 刷新页面  
        } 
      });
      //this.localDialogVisible = false
      }
      else{
        this.localDialogVisible = false
        this.createOrderAndUpload();
      }

        //添加支付成功逻辑 
        // 切换支付成功弹窗
      },
    createOrderAndUpload() {
      const orderData = {
        order_date: new Date().toISOString(), // 生成订单日期
        order_id: this.generateOrderId(), // 生成唯一订单ID
        order_status: 1,
        logistics_status:0,
        post_id: this.ldleitemsPost.post_id,
        recipient_address: this.recipientInfo.address,
        recipient_name: this.recipientInfo.name,
        recipient_phone: Number(this.recipientInfo.phone),
        user_id: this.selectedUserId // 确保在 Vuex store 中有 user.id
      };
      console.log('订单上传:', orderData.order_id);
      console.log('订单上传:', orderData.user_id);
      console.log('订单上传:', orderData);
      axios.post('/api/Purchases/PurchaseIdleProduct', orderData,{headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      }
    })
        .then(response => {
          console.log('订单上传成功:', response.data);
          this.RentSuccess = true;
        })
        .catch(error => {
          console.error('上传订单时出错:', error);
        });
    },
    generateOrderId() {
      this.orderId=Math.floor(Math.random() * 100000);
      return this.orderId;
    },
      GoToOrder()   //查看订单
      {
        this.$router.push({ path: `/home/userspace/leaseorder/${this.orderId}`,
          query: {  
            ldleitemsPostId: this.orderId
        }})
        this.PentSuccess = false
        this.Order=true
      },
    }
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

.Pbutton {
  float: center;
  color:#ddd;
}

  </style>
  
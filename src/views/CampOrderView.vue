<template>
    <div class="container">
      <el-main class="main">
  
      <h2>订单信息</h2>
  
      <div class="sub-container">
        <span class="title">营地名称: {{ camp.campground_name }}</span>
        <div class="divider"></div> <!-- Divider line -->
        <span>预定日期: {{ startDate }} 至 {{ endDate }}</span>
        <span>预定营位: {{ selectedCampsiteIds.join(', ') }}</span>
      </div>
      
  
      <!-- 表单 -->
      <el-form :model="orderForm" label-width="100px" class="order-form">
        <span class="title">预订人信息</span>
        <div class="divider"></div> <!-- Divider line -->
        <el-form-item label="预约人姓名" prop="order_person_name" required>
          <el-input v-model="orderForm.name"></el-input>
        </el-form-item>
        <el-form-item label="预约人电话" prop="order_person_phone_number" required>
          <el-input v-model="orderForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="预约人身份证" prop="order_person_id" required>
          <el-input v-model="orderForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="预约人备注" prop="remark">
          <el-input v-model="orderForm.remark" ></el-input>
        </el-form-item>
  
      </el-form>
  
      <div class="sub-container">
        <span class="title">价格明细</span>
        <div class="divider"></div> <!-- Divider line -->
            <div v-for="campsite in selectedCampsites" :key="campsite.id">
              {{ campsite.id }}: ¥{{ campsite.price }}
            </div>
            <p>总价: {{ totalPriceDetail }} = ¥{{ totalPrice }}</p>
      </div>
  
      <CampPayWindow
        v-model:visible="isPaymentDialogVisible"
        :totalPrice="totalPrice"
        @pay="go_to_pay"
      />
  
      </el-main>
      <el-footer>
        <span class="price-tag">¥{{ totalPrice }}</span>
        <el-button class="go-to-pay-button" type="primary" @click="showPaymentDialog()">提交订单</el-button>
      </el-footer>
    </div>
  </template>
  
  <script >
  import { mapState } from 'vuex';
  import dayjs from 'dayjs';
  import CampPayWindow from '@/components/CampPayWindow.vue'
  
  export default {
    name: 'CampOrder',
    components:{
      CampPayWindow
    },
    data() {
      return {
        orderForm: {
          order_person_name: '',
          order_person_phone_number: '',
          order_person_id: '',
          remark: '',
          isPaymentDialogVisible: false,
        }
      };
    },
    computed: {
      ...mapState({
        camps: state => state.camp.camps
      }),
      camp() {
        const campId = this.$route.query.campID;
        return this.camps.find(camp => camp.campground_id === parseInt(campId));
      },
      startDate() {
        return this.$route.query.startDate;
      },
      endDate() {
        return this.$route.query.endDate;
      },
      selectedCampsites() {
        return this.selectedCampsiteIds.map(id => {
          return this.camp.campsites.find(campsite => campsite.id === id);
        });
      },
      selectedCampsiteIds() {
        return this.$route.query.selectedCampsiteIds.split(',');
      },
      totalPrice() {
        return this.selectedCampsites.reduce((total, campsite) => {
          return total + campsite.price;
        }, 0);
      },
      totalPriceDetail() {
        return this.selectedCampsites.map(campsite => `¥${campsite.price}`).join(' + ');
      }
    },
    methods: {
      go_to_pay() {
        const orderCreatedTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const campOrder = {
          campground_id: this.camp.campground_id,
          startDate: this.startDate,
          endDate: this.endDate,
          selectedCampsiteIds: this.selectedCampsiteIds,
          order_person_name: this.orderForm.order_person_name,
          order_person_phone_number: this.orderForm.order_person_phone_number,
          order_person_id: this.orderForm.order_person_id,
          remark: this.orderForm.remark,
          //campsite_number: ,
          total_price: this.totalPrice,
          order_created_time: orderCreatedTime,
  
        };
        this.$store.dispatch('order/addCampOrder', campOrder);
      },
      showPaymentDialog() {
        this.isPaymentDialogVisible = true;
      },
  
    }
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    line-height: 1.6; /* 调整为你需要的行间距 */
    margin: 0;
  }
  
  .container {
    width: 70%; /* 设置容器的最大宽度 */
    height: 100vh; /* 设置容器高度为视口高度 */
    margin: 0 auto; /* 居中显示容器 */
    display: flex;
    flex-direction: column; /* 设置子元素为纵向排列 */
    background-color: #ffffff; /* 设置容器的背景色为白色 */
  }
  
  .sub-container {
    margin: 0 auto; /* 居中显示容器 */
    display: flex;
    flex-direction: column; /* 设置子元素为纵向排列 */
    background-color: #ffffff; /* 设置容器的背景色为白色 */
    border: 1px solid #ddd; /* 添加边框 */
    padding: 30px; /* 添加内边距 */
    margin-top: 20px;
  }
  
  .main {
    flex: 1; /* 使主内容区占据剩余空间 */
    overflow: auto; /* 如果内容溢出，则显示滚动条 */
    padding-left: 100px;
    padding-right: 100px;
  }
  
  .title {
    color:#1D5B5E;
    font-size: 18px;
    font-weight: bold;
  }
  
  .el-footer {
      background-color: #6bb3b7; /* 设置容器的背景色为白色 */
      padding: 20px; /* 设置footer的内边距 */
      padding-right: 80px; /* 设置footer的内边距 */
      border-top: 1px solid #ccc; /* 设置footer的边框 */
      height:120px;
      display: flex; /* 使用flex布局 */
      justify-content: flex-end; /* 将内容对齐到右侧 */
      margin-left: 0;
      gap:120px;
      align-items: center;
    }
  
  .price-tag {
    color:#1D5B5E;
    font-size: 32px;
    font-weight: bold;
  }
  .go-to-pay-button {
    height:70px;
    width: 260px;
    font-size: 20px;
    background-color: #1D5B5E;
  }
  .go-to-pay-button:hover {
    background-color: #2e7478; /* 更改为你希望的hover背景颜色 */
    color: #fff; /* 更改为你希望的hover文字颜色 */
  }
  
  .el-form {
    margin-top: 20px;
    border: 1px solid #ddd; /* 添加边框 */
    padding: 30px; /* 添加内边距 */
    background-color: #fff; /* 背景颜色 */
  
  }
  
  .el-form-item {
    margin-bottom: 25px;
  }
  
  .el-form-item label {
    font-weight: bold;
  }
  
  .el-input {
    width: 100%;
    height: 35px;
  }
  
  
  
  .divider {
    height: 1px;
    background-color: #ddd; /* Divider color */
    margin: 10px 10px; /* Adjust the margin as needed */
  }
  
  
  
  
  </style>
  
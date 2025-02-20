<template>
    <div class="container">
      <el-main class="main">
  
      <h2>订单信息</h2>
  
      <div class="sub-container" v-if="camp">
        <span class="title" >营地名称: {{ camp.campground_name }}</span>
        <div class="divider"></div> <!-- Divider line -->
        <span>具体位置: {{ camp.address }} </span>
        <span>预定日期: {{ startDate }} 至 {{ endDate }}</span>
        <span>预定营位: {{ selectedCampsites.map(campsite => campsite.campsite_number).join(', ') }}</span>
      </div>
      
  
      <!-- 表单 -->
      <el-form :model="orderForm" :rules="rules" label-width="100px" class="order-form" ref="orderForm">
        <span class="title">预订人信息</span>
        <div class="divider"></div> <!-- Divider line -->
        <el-form-item label="预约人姓名" prop="order_person_name" required>
          <el-input v-model="orderForm.order_person_name"></el-input>
        </el-form-item>
        <el-form-item label="预约人电话" prop="order_person_phone_number" required>
          <el-input v-model="orderForm.order_person_phone_number"></el-input>
        </el-form-item>
        <el-form-item label="预约人身份证" prop="order_person_id" required>
          <el-input v-model="orderForm.order_person_id"></el-input>
        </el-form-item>
        <el-form-item label="预约人备注" prop="remark">
          <el-input v-model="orderForm.remark" ></el-input>
        </el-form-item>
  
      </el-form>
  
      <div class="sub-container">
        <span class="title">价格明细</span>
        <div class="divider"></div> <!-- Divider line -->
            <div v-for="campsite in selectedCampsites" :key="campsite.campsite_id">
              {{ campsite.campsite_number }}: ¥{{ campsite.price }}
            </div>
            <p>总价: {{ totalPriceDetail }} = ¥{{ totalPrice }}</p>
            
      </div>
      
      <CampPayWindow
        v-model:dialogVisible="dialogVisible"
        :totalPrice="totalPrice"
        :orderId="orderId"
       />
      
      </el-main>
      <el-footer>
        <span class="price-tag">¥{{ totalPrice }}</span>
        <el-button 
        class="go-to-pay-button" 
        :type="isOrderButtonEnabled ? 'primary' : ''" 
        :disabled="!isOrderButtonEnabled" 
        @click="go_to_pay()"
        >提交订单
        </el-button>
      </el-footer>

    </div>
    
</template>
  
  <script >
  import axios from '@/axios'; // 引入配置好的axios实例
  import dayjs from 'dayjs';
  import CampPayWindow from '@/components/CampPayWindow.vue'
  import global from '@/store/global.js';
  
  export default {
    name: 'CampOrder',
    components:{
      CampPayWindow
    },
    data() {
      return {
        orderForm: { //填写表单内容
          order_person_name: '',
          order_person_phone_number: '',
          order_person_id: '',
          remark: '',
        },
        dialogVisible: false,
        camp:null, //订单对应的营地
        selectedCampsites: [], //订单选中的营位
        orderId: null,  // 新增orderId变量
        rules: {
        order_person_phone_number: [
          { required: true, message: '请输入预约人电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的中国电话号码', trigger: 'blur' }
        ],
        order_person_id: [
          { required: true, message: '请输入预约人身份证', trigger: 'blur' },
          { pattern: /^\d{15}|\d{18}|\d{17}[Xx]$/, message: '请输入有效的身份证号', trigger: 'blur' }
        ]
      }
      };
    },
    computed: {
      startDate() {
        return dayjs(this.$route.query.startDate).format('YYYY年MM月DD日');
      },
      endDate() {
        return dayjs(this.$route.query.endDate).format('YYYY年MM月DD日');
      },
      selectedCampsiteIds() {
        return this.$route.query.selectedCampsiteIds.split(',');
      },
      // 计算天数
      reservedDays() {
        const startDate = dayjs(this.$route.query.startDate);
        const endDate = dayjs(this.$route.query.endDate);
        return endDate.diff(startDate, 'day') ; 
      },
      totalPrice() {
        const campsiteTotalPrice = this.selectedCampsites.reduce((total, campsite) => {
          return total + campsite.price;
        }, 0);
        return campsiteTotalPrice * this.reservedDays; // 营位总价 * 预定天数
      },
      totalPriceDetail() {
        const campsitePriceDetails = this.selectedCampsites.map(campsite => `¥${campsite.price}`).join(' + ');
        return `(${campsitePriceDetails}) * ${this.reservedDays} 晚`;
      },
      isOrderButtonEnabled() {
      // 检查所有表单字段是否已填写
    return (
      this.orderForm.order_person_name &&
      this.orderForm.order_person_phone_number &&
      this.orderForm.order_person_id &&
      this.selectedCampsites.length > 0 &&
      this.startDate && 
      this.endDate
    );
    }
    },
    methods: {
      //接口1 获取营地信息
      async fetchCampDetails() {
      const campId = this.$route.query.campID;
      try {
        const response = await axios.get(`api/Campgrounds/getcampgrounddetails/${campId}/${global.userId}`);
          this.camp = response.data;
      } catch (error) {
        console.error('获取营地信息失败:', error);
      }
      },

      // 接口2 获取指定营地下的所有营位信息
      async fetchAllCampsites() {
      const campId = this.$route.query.campID;
      try {
        const response = await axios.get(`api/Campsites/getcampsites/${campId}`);
        return response.data;
      } catch (error) {
        console.error('获取营地的营位信息失败：', error);
        throw error;
      }
      },
      
      //接口3 获取已选营位的具体信息
      async fetchSelectedCampsites() {
    try {
      const allCampsites = await this.fetchAllCampsites();
      this.selectedCampsites = allCampsites.filter(campsite => 
        this.selectedCampsiteIds.includes(campsite.campsite_id.toString())
      );
    } catch (error) {
      console.error('获取已选营位信息失败：', error);
    }
    },
      
      //接口4 提交订单，把信息传给后端
      async go_to_pay() {
        // 表单验证
      this.$refs.orderForm.validate(async (valid) => {
        if (valid) {
          const campOrder = {
            order_person_id: global.userId,
            order_person_name: this.orderForm.order_person_name,
            order_person_phone_number: this.orderForm.order_person_phone_number,
            remark: this.orderForm.remark,
            total_price: parseInt(this.totalPrice),
            reserved_start_time: dayjs(this.$route.query.startDate).format(), //toISOString() 方法将 Day.js 对象转换为 ISO 8601 标准格式的字符串，这种格式是 YYYY-MM-DDTHH:mm:ss.sssZ
            reserved_end_time: dayjs(this.$route.query.endDate).format(),
            campsite_ids: this.selectedCampsiteIds.map(id => parseInt(id)),
            order_idcard: this.orderForm.order_person_id
          };
          try {
            console.log('开始提交订单')
            const response = await axios.post('/api/ReserveOrders/createreserveorder', campOrder);
            console.log('订单提交成功:', response.data);
            this.orderId = response.data.orderId;  // 将orderId存储到父组件的data中
            this.dialogVisible = true;
          } catch (error) {
            console.error('订单提交失败:', error);
          }
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
  
    },
    created() {
      this.fetchCampDetails();
      this.fetchSelectedCampsites();
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
    height: 90.4vh; /* 设置容器高度为视口高度 */
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
    border-width: 0;
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
  
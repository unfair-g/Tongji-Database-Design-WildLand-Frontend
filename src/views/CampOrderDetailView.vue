<template>
  <div class="order">
    <div class="product-info-header" style="display:flex;align-items: center;" shadow="hover">
      <div class="product-img">
        <img :src="camporder.map_picture" class="image" alt="product image">
      </div>
      <div style="flex:2;position:relative;">
        <h2>预约营地：{{ camporder.campground_name }}</h2>
        <div class="price-tag">￥{{ camporder.total_price }}</div>
        <p>订单创建时间：{{ formatDateTime(camporder.order_created_time) }}</p>
        <p>预约人姓名：{{ camporder.order_person_name }}</p>
        <p>预约人电话：{{ camporder.order_person_phone_number }}</p>
        <p>预约人身份证：{{ camporder.order_idcard }}</p>
        <p>备注：{{ camporder.remark }}</p>
      </div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h3>营地地址</h3></div>
      <div style="text-align:center;"><p>{{ camporder.address || '暂无数据' }}</p></div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h3>开始时间</h3></div>
      <div style="text-align:center;"><p>{{ formatDate(camporder.reserved_start_time) || '暂无数据' }}</p></div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h3>结束时间</h3></div>
      <div style="text-align:center;"><p>{{ formatDate(camporder.reserved_end_time) || '暂无数据' }}</p></div>
    </div>
    <div class="order_2">
      <div style="margin:10px;"><h3>预定营位</h3></div>
      <div style="text-align:center;"><p>{{ camporder.campsite_numbers && camporder.campsite_numbers.length > 0 ? camporder.campsite_numbers.join(', ') : '暂无数据' }}</p></div>
    </div>
    <div class="order_3">
      <el-button v-if="camporder.order_status==1" class="pay" @click="Refund">申请退款</el-button>
      <el-button v-else-if="camporder.order_status==3" class="pay" @click="cancle=true">取消退款申请</el-button>
      <el-button v-else-if="camporder.order_status==4" class="pay" disabled>退款成功</el-button>
      <el-button v-else-if="camporder.order_status==6" class="pay" disabled>入住中</el-button>
      <el-button v-else-if="camporder.order_status==5" class="pay" disabled>订单已完成</el-button>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="退款申请成功"
    width="500"
    center
    align-center
  >
  <div style="text-align: center;color: red;font-size: 20px;">详情请添加管理员说明</div>
  <img :src="require('../assets/QRcode.jpg')" style="width:450px;height: auto;"/>
  </el-dialog>

  <el-dialog
    v-model="cancle"
    width="500"
    center
    align-center
  >
  <div style="text-align: center;font-size: 20px;">确认取消退款吗？</div>
  <template #footer>
      <el-button color="#1D5B5E" @click="CancleRefund">确认</el-button>
  </template>
  </el-dialog>
</template>

<script>
import axios from '@/axios'; // 引入配置好的axios实例
import dayjs from 'dayjs';

export default {
  name: 'CampOrderDetailView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      camporder: {}, // 保存订单详情数据
      dialogVisible: false,
      cancle:false
    };
  },
  created() {
    this.fetchOrderDetails();
  },
  methods: {
    //调用接口：获取该订单具体信息
    async fetchOrderDetails() {
      try {
        const response = await axios.get(`api/ReserveOrders/GetOrderDetailsByOrderId/${this.id}`);
        this.camporder = response.data;
      } catch (error) {
        console.error('获取订单详情失败', error);
      }
    },
    formatDateTime(dateTime) {
      return dayjs(dateTime).format('YYYY年MM月DD日 HH:mm');
    },
    formatDate(date) {
      return dayjs(date).format('YYYY年MM月DD日');
    },
    async Refund() {
      try {
        await axios.put(`/api/ReserveOrders/Refund/${this.id}`)
        this.dialogVisible = true
        this.camporder.order_status=3
      } catch (error) {
        console.error('退款失败', error);
      }
    },
    async CancleRefund() {
      try {
        await axios.put(`/api/ReserveOrders/CancelRefund/${this.id}`)
        this.cancle = false
        this.camporder.order_status=1
      } catch (error) {
        console.error('取消退款失败', error);
      }
    }
  }
};
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
      padding-bottom: 10px;
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
        width:700px;

        margin-right: 50px;
        display: flex; /* 使用flex布局 */ 
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        background-color: #fff;
        border: 1px solid #ddd;
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
      margin-top: 10px;
      font-size:x-large;
      color: #0c0c0c;
    }
      </style>
      
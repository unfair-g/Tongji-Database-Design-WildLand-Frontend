<template>
    <div>
          <div v-for="camporder in camporders" :key="camporder.order_id" justify="center" >
              <el-card :body-style="{ padding: '5px' }" shadow="hover" class="camporder-card" @click="goToCampOrderDetail(camporder)">
                <div class="content">
                  <img :src="camporder.camp_showpic" class="image" alt="order image">
                  <div style="padding: 14px;flex:1;">
                   <div><h3>{{ camporder.campground_name }}</h3></div>
                  <!--div><span>预约时间：{{ camporder.startDate}}至{{ camporder.endDate}}</span></div-->
                  <div><span>订单创建时间：{{ formatOrderTime(camporder.order_created_time)}}</span></div>

                  <div>
                    <span v-if="camporder.order_status == 0">订单状态：<span style="color:red;">支付失败</span></span>
                    <span v-else-if="camporder.order_status == 1">订单状态：<span style="color:grey;">待入住</span></span>
                    <span v-else-if="camporder.order_status == 3">订单状态：<span style="color:red;">退款审核中</span></span>
                    <span v-else-if="camporder.order_status == 4">订单状态：<span style="color:green;">退款成功</span></span>
                    <span v-else-if="camporder.order_status == 6">订单状态：<span style="color:green;">入住中</span></span>
                    <span v-else>订单状态：<span>已完成</span></span>
                   </div>
                  <div class="bottom clearfix">
                    <span class="price">总价：¥{{ camporder.total_price }}</span>
                    <el-button type="text" class="button" @click="goToCampOrderDetail(camporder)">查看详情</el-button>
                  </div>
                </div>
              </div>
            </el-card>
            </div>
    </div>
    </template>
    
    <script>
    import axios from '@/axios'; // 引入配置好的axios实例\
    import global from '@/store/global.js';
    import dayjs from 'dayjs';
    
    export default ({
      name: 'UserCampOrderListView',
      data() {
        return {
          camporders: [], // 存储订单信息
        };
      },
      created() {
        this.fetchCampOrders(); // 在组件创建时获取订单信息
      },
      methods: {
        //调用接口：获取该用户的所有营地订单信息
        async fetchCampOrders() {
      try {
        const userId = global.userId; 
        const response = await axios.get(`api/ReserveOrders/GetOrderIntro/${userId}`);
        this.camporders = response.data; // 将API返回的订单数据存储到本地状态中
      } catch (error) {
        console.error("获取订单信息失败", error);
      }
    },
        goToCampOrderDetail (camporder) {
          const camporderId = camporder.order_id
          this.$router.push({ path: `/home/userspace/camporder/${camporderId}`,
        })
        },
        // 新增的日期格式化方法
        formatOrderTime(orderCreatedTime) {
          return dayjs(orderCreatedTime).format('YYYY年MM月DD日 HH:mm');
        }
      }
    }
    )
    </script>
    
    <style scoped>
    .camporder-card {
      width: 100%; /* 固定宽度 */
      height:30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding:10px;
    }
    
    .content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .image {
      width: 300px; /* 固定图片宽度 */
      height: 160px; /* 固定图片高度 */
      object-fit: cover;
      margin-right: 60px;
    }
    
    .price {
      color: #ff4949;
      font-size: 18px;
    }
    
    .button {
      float: right;
      padding: 0;
    }
    </style>